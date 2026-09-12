import { cropTargets } from './crop-targets/index.ts';
import { sources } from './sources/index.ts';
import { validateHydroData } from './validate.ts';

export const hydroData = validateHydroData(sources, cropTargets);

export const hydroSourceById = new Map(
  hydroData.sources.map((source) => [source.id, source]),
);
