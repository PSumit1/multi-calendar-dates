import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getNowInCalendar } from '../../utils'
import { RelativePeriod, RelativePeriodType } from '../types'
import generateRelativePeriodsBiMonthly from './generate-relative-periods-bimonthly'
import generateRelativePeriodsBiWeekly from './generate-relative-periods-biweekly'
import generateRelativePeriodsDaily from './generate-relative-periods-daily'
import generateRelativePeriodsFinancialYear from './generate-relative-periods-financial-year'
import generateRelativePeriodsMonthly from './generate-relative-periods-monthly'
import generateRelativePeriodsQuarterly from './generate-relative-periods-quarterly'
import generateRelativePeriodsSixMonthly from './generate-relative-periods-six-monthly'
import generateRelativePeriodsWeekly from './generate-relative-periods-weekly'
import generateRelativePeriodsYear from './generate-relative-periods-year'

type GenerateRelativePeriods = (options: {
    periodType: RelativePeriodType
    referenceDate?: string
    calendar?: SupportedCalendar
    includeFixedPeriods?: boolean
}) => Array<RelativePeriod>

const generateRelativePeriods: GenerateRelativePeriods = ({
    periodType,
    referenceDate, // string or Temporal?
    calendar,
    includeFixedPeriods = false,
}) => {
    const date = referenceDate
        ? Temporal.PlainDate.from(referenceDate)
        : getNowInCalendar(calendar)

    if (periodType === 'MONTHLY') {
        return generateRelativePeriodsMonthly({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'BIMONTHLY') {
        return generateRelativePeriodsBiMonthly({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'WEEKLY') {
        return generateRelativePeriodsWeekly({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'BIWEEKLY') {
        return generateRelativePeriodsBiWeekly({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'DAILY') {
        return generateRelativePeriodsDaily({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'QUARTERLY') {
        return generateRelativePeriodsQuarterly({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'SIXMONTHLY') {
        return generateRelativePeriodsSixMonthly({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'YEARLY') {
        return generateRelativePeriodsYear({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }
    if (periodType === 'FINANCIAL') {
        return generateRelativePeriodsFinancialYear({
            referenceDate: date,
            calendar: calendar ?? 'iso8601',
            includeFixedPeriods,
        })
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default generateRelativePeriods
