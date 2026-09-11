export const US_GALLON_LITERS = 3.785411784;

export const reservoirUnitValues = ['liters', 'us-gallons'] as const;
export const doseUnitValues = ['ml-per-liter', 'ml-per-us-gallon'] as const;

export type ReservoirUnit = (typeof reservoirUnitValues)[number];
export type DoseUnit = (typeof doseUnitValues)[number];

export interface NutrientMixingInput {
  reservoirVolume: number;
  reservoirUnit: ReservoirUnit;
  labelDose: number;
  doseUnit: DoseUnit;
}

export interface NutrientMixingResult {
  reservoirLiters: number;
  doseMlPerLiter: number;
  totalMl: number;
}

function assertPositiveFinite(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive finite number.`);
  }
}

export function convertVolumeToLiters(value: number, unit: ReservoirUnit): number {
  assertPositiveFinite(value, 'Reservoir volume');

  switch (unit) {
    case 'liters':
      return value;
    case 'us-gallons':
      return value * US_GALLON_LITERS;
    default:
      throw new TypeError(`Unsupported reservoir unit: ${String(unit)}`);
  }
}

export function convertDoseToMlPerLiter(value: number, unit: DoseUnit): number {
  assertPositiveFinite(value, 'Label dose');

  switch (unit) {
    case 'ml-per-liter':
      return value;
    case 'ml-per-us-gallon':
      return value / US_GALLON_LITERS;
    default:
      throw new TypeError(`Unsupported dose unit: ${String(unit)}`);
  }
}

export function calculateNutrientMix(input: NutrientMixingInput): NutrientMixingResult {
  const reservoirLiters = convertVolumeToLiters(
    input.reservoirVolume,
    input.reservoirUnit,
  );
  const doseMlPerLiter = convertDoseToMlPerLiter(input.labelDose, input.doseUnit);

  return {
    reservoirLiters,
    doseMlPerLiter,
    totalMl: reservoirLiters * doseMlPerLiter,
  };
}

export function formatMeasuredAmount(value: number, maximumFractionDigits = 2): string {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError('Amount must be a finite, non-negative number.');
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
    useGrouping: false,
  }).format(value);
}
