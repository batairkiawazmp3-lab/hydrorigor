import { developmentProductFixtures } from '../../data/commercial/fixtures.ts';
import { commercialDestinations, merchants } from '../../data/merchants/index.ts';
import { products } from '../../data/products/index.ts';
import { productEvidenceSources } from '../../data/products/sources.ts';
import type {
  CommercialDestination,
  CommercialEvidenceSource,
  MerchantRecord,
  ProductRecord,
} from './models.ts';
import {
  commercialDestinationRegistrySchema,
  commercialEvidenceSourceRegistrySchema,
  merchantRegistrySchema,
  productRegistrySchema,
} from './models.ts';

export interface CommercialRegistry {
  products: ProductRecord[];
  sources: CommercialEvidenceSource[];
  merchants: MerchantRecord[];
  destinations: CommercialDestination[];
}

export interface CommercialPageInput {
  affiliateDisclosure: boolean;
  affiliateDisclosureReason?: string | undefined;
  commercialDestinationIds?: string[] | undefined;
}

export interface CommercialPageState {
  destinations: CommercialDestination[];
  affiliateDestinations: CommercialDestination[];
}

function duplicateIds(records: readonly { id: string }[]): string[] {
  const seen = new Set<string>();
  return records.map(({ id }) => id).filter((id) => {
    if (seen.has(id)) return true;
    seen.add(id);
    return false;
  });
}

export function validateCommercialRegistry(input: CommercialRegistry): CommercialRegistry {
  const parsed: CommercialRegistry = {
    products: productRegistrySchema.parse(input.products),
    sources: commercialEvidenceSourceRegistrySchema.parse(input.sources),
    merchants: merchantRegistrySchema.parse(input.merchants),
    destinations: commercialDestinationRegistrySchema.parse(input.destinations),
  };

  for (const [label, records] of Object.entries(parsed)) {
    const duplicates = duplicateIds(records);
    if (duplicates.length > 0) throw new Error(`Duplicate ${label} IDs: ${duplicates.join(', ')}`);
  }

  const merchantById = new Map(parsed.merchants.map((merchant) => [merchant.id, merchant]));
  const sourceById = new Map(parsed.sources.map((source) => [source.id, source]));
  for (const product of parsed.products) {
    for (const sourceRef of product.sourceRefs) {
      if (!sourceById.has(sourceRef)) throw new Error(`Unknown product source reference for ${product.id}: ${sourceRef}`);
    }
    for (const claim of product.evidenceClaims) {
      for (const sourceRef of claim.sourceRefs) {
        const source = sourceById.get(sourceRef);
        if (!source) throw new Error(`Unknown claim source reference for ${product.id}: ${sourceRef}`);
        if (!source.supports.includes(claim.type)) {
          throw new Error(`Source ${sourceRef} does not declare support for ${claim.type}.`);
        }
      }
    }
  }

  for (const destination of parsed.destinations) {
    const merchant = merchantById.get(destination.merchantId);
    if (!merchant) throw new Error(`Unknown merchant ID for ${destination.id}: ${destination.merchantId}`);

    if (
      destination.relationship === 'affiliate'
      && (merchant.relationshipStatus !== 'affiliate' || merchant.affiliateProgramStatus !== 'active')
    ) {
      throw new Error(`Affiliate destination ${destination.id} requires an active affiliate merchant relationship.`);
    }
  }

  return parsed;
}

export const productionCommercialRegistry = validateCommercialRegistry({
  products,
  sources: productEvidenceSources,
  merchants,
  destinations: commercialDestinations,
});

export function resolveProductRecord(id: string, allowDevelopmentFixture = false): ProductRecord {
  const product = productionCommercialRegistry.products.find((candidate) => candidate.id === id)
    ?? (allowDevelopmentFixture
      ? developmentProductFixtures.find((candidate) => candidate.id === id)
      : undefined);

  if (!product) throw new Error(`Unknown or unavailable product ID: ${id}`);
  return product;
}

export function assertProductEvidenceBasis(
  product: ProductRecord,
  evidenceBasis: ProductRecord['evidenceBasis'],
) {
  if (product.evidenceBasis !== evidenceBasis) {
    throw new Error(`Evidence basis for ${product.id} does not match its product record.`);
  }
}

export function validateCommercialPageState(
  input: CommercialPageInput,
  availableDestinations: CommercialDestination[],
): CommercialPageState {
  const destinations = (input.commercialDestinationIds ?? []).map((id) => {
    const destination = availableDestinations.find((candidate) => candidate.id === id);
    if (!destination) throw new Error(`Unknown commercial destination ID: ${id}`);
    return destination;
  });
  const affiliateDestinations = destinations.filter(({ relationship }) => relationship === 'affiliate');

  if (affiliateDestinations.length > 0 && !input.affiliateDisclosure) {
    throw new Error('A page with an affiliate destination must enable affiliate disclosure.');
  }
  if (input.affiliateDisclosure && affiliateDestinations.length === 0 && !input.affiliateDisclosureReason) {
    throw new Error('Affiliate disclosure without a live affiliate destination requires an explicit explanation.');
  }
  if (!input.affiliateDisclosure && input.affiliateDisclosureReason) {
    throw new Error('An affiliate disclosure explanation requires affiliateDisclosure: true.');
  }

  return { destinations, affiliateDestinations };
}

export function resolveCommercialPageState(input: CommercialPageInput): CommercialPageState {
  return validateCommercialPageState(input, productionCommercialRegistry.destinations);
}

export function getCommercialLinkAttributes(destination: CommercialDestination) {
  return {
    href: destination.destination,
    target: '_blank' as const,
    rel: destination.relationship === 'affiliate'
      ? 'sponsored nofollow noopener noreferrer'
      : 'noopener noreferrer',
    relationship: destination.relationship,
  };
}
