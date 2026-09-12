import {
  commercialDestinationRegistrySchema,
  merchantRegistrySchema,
} from '../../lib/commercial/models.ts';

// Infrastructure does not imply a relationship. M05 configures no live merchants or destinations.
export const merchants = merchantRegistrySchema.parse([]);
export const commercialDestinations = commercialDestinationRegistrySchema.parse([]);
