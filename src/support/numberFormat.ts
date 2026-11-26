/** Display metadata shared by research comparisons and product property inputs. */
interface NumberFormatMetadata {
    unit?: string | null;
    decimal_places?: number | null;
}

/**
 * Build locale-aware number formatting options from unit metadata.
 * @param metadata Unit and decimal-place metadata.
 * @param locale Locale used to validate Intl unit formatting.
 * @returns The Intl options, decimal precision and supported unit.
 */
function numberFormat(
    metadata: NumberFormatMetadata,
    locale: string,
): {
    format: Intl.NumberFormatOptions;
    precision: number;
    formattedUnit?: string;
} {
    const precision = Math.max(0, Math.min(20, metadata.decimal_places ?? 6));
    const aliases: Record<string, string> = {
        mm: 'millimeter',
        cm: 'centimeter',
        m: 'meter',
        kg: 'kilogram',
        g: 'gram',
        l: 'liter',
        litre: 'liter',
        ml: 'milliliter',
    };
    const unit = metadata.unit
        ? (aliases[metadata.unit] ?? metadata.unit.replaceAll('_', '-'))
        : undefined;
    let formattedUnit: string | undefined;

    if (unit) {
        try {
            new Intl.NumberFormat(locale, { style: 'unit', unit });
            formattedUnit = unit;
        } catch {
            /* Non-Intl units are displayed as a translated input suffix. */
        }
    }

    return {
        precision,
        formattedUnit,
        format: {
            minimumFractionDigits: metadata.decimal_places == null ? 0 : precision,
            maximumFractionDigits: precision,
            useGrouping: false,
            ...(formattedUnit
                ? { style: 'unit' as const, unit: formattedUnit, unitDisplay: 'short' as const }
                : {}),
        },
    };
}

type NumberValue = number | bigint | string | null | undefined;

/** Format a numeric value with Intl; numeric strings use a dot as the decimal separator. */
function formatNumber(
    value: NumberValue,
    locale = 'de-DE',
    options: Intl.NumberFormatOptions = {},
): string {
    if (value == null || (typeof value === 'string' && value.trim() === '')) {
        return '—';
    }
    const numeric = typeof value === 'bigint' ? value : Number(value);
    if (typeof numeric === 'number' && !Number.isFinite(numeric)) {
        return '—';
    }
    return new Intl.NumberFormat(locale.replaceAll('_', '-'), options).format(numeric);
}

// Export module
export { numberFormat, formatNumber };
export type { NumberFormatMetadata, NumberValue };
