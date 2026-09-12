import {
  cropTargetRegistrySchema,
  sourceRegistrySchema,
  type CropTarget,
  type SourceRecord,
} from './models.ts';

export interface ValidatedHydroData {
  sources: SourceRecord[];
  cropTargets: CropTarget[];
}

function assertUnique(values: readonly string[], label: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error(`Duplicate ${label} detected.`);
  }
}

export function validateHydroData(
  sourceInput: unknown,
  targetInput: unknown,
): ValidatedHydroData {
  const parsedSources = sourceRegistrySchema.parse(sourceInput);
  const parsedTargets = cropTargetRegistrySchema.parse(targetInput);

  assertUnique(parsedSources.map(({ id }) => id), 'source ID');
  assertUnique(parsedTargets.map(({ id }) => id), 'crop target ID');
  assertUnique(
    parsedTargets.map(({ crop, growthStage, systemContext }) => (
      `${crop.toLowerCase()}|${growthStage?.toLowerCase() ?? ''}|${systemContext.toLowerCase()}`
    )),
    'crop/stage/system record',
  );

  const sourceIds = new Set(parsedSources.map(({ id }) => id));
  const referencedSourceIds = new Set<string>();

  for (const target of parsedTargets) {
    for (const sourceRef of target.sourceRefs) {
      if (!sourceIds.has(sourceRef)) {
        throw new Error(`Crop target ${target.id} references unknown source ${sourceRef}.`);
      }
      referencedSourceIds.add(sourceRef);
    }
  }

  for (const sourceId of sourceIds) {
    if (!referencedSourceIds.has(sourceId)) {
      throw new Error(`Source ${sourceId} is not referenced by any crop target.`);
    }
  }

  return { sources: parsedSources, cropTargets: parsedTargets };
}
