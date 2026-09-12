import { commercialEvidenceSourceRegistrySchema } from '../../lib/commercial/models.ts';

// Product evidence sources are added only with documented future product research.
export const productEvidenceSources = commercialEvidenceSourceRegistrySchema.parse([]);
