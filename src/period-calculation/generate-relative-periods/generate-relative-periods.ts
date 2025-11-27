import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill'
import { formatDate, getNowInCalendar } from '../../utils'
import { PeriodType, RelativePeriod } from '../types'
import { getMonthsPeriodType } from './constants'

type GenerateFixedPeriods = (options: {
    // year: number
    periodType: PeriodType
    referenceDate?: string
    // calendar: SupportedCalendar
    // locale?: string
    // startingDay?: number /** 1 is Monday */
    // yearsCount?: number | null
    // endsBefore?: string
}) => Array<RelativePeriod>

const generateRelativePeriods: GenerateFixedPeriods = ({
    periodType,
    referenceDate, // string or Temporal?
}) => {
    const date = referenceDate
        ? Temporal.PlainDate.from(referenceDate)
        : getNowInCalendar()

    if (periodType === 'MONTHLY') {
        const result = getMonthsPeriodType().map((periodTypeConfig) => {
            const endDate = date
                .add({ months: periodTypeConfig.offset })
                .with({ day: 31 })
            const startDate = date
                .add({ months: periodTypeConfig.offset })
                .with({ day: 1 })
            return {
                ...periodTypeConfig,
                periodType: 'MONTHLY' as const,
                displayName: periodTypeConfig.name,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
            }
        })
        return result
    }

    // do same for other period types

    throw 'not implemented'
}

export default generateRelativePeriods
