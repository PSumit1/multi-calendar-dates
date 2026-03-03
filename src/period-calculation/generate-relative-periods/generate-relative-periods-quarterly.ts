import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, RelativePeriod } from '../types'
import { getQuartersPeriodType } from './constants'
import ZonedDateTime = Temporal.ZonedDateTime
import PlainDate = Temporal.PlainDate

type GenerateRelativePeriodsQuarterly = (options: {
    referenceDate: ZonedDateTime | PlainDate
    calendar: SupportedCalendar
    includeFixedPeriods: boolean
}) => Array<RelativePeriod>

const generateRelativePeriodsQuarterly: GenerateRelativePeriodsQuarterly = ({
    referenceDate,
    calendar,
    includeFixedPeriods = false,
}) => {
    if (!includeFixedPeriods) {
        return getQuartersPeriodType().map(
            (periodTypeConfig) =>
                ({
                    name: periodTypeConfig.name,
                    id: periodTypeConfig.id,
                    periodType: 'QUARTERLY' as const,
                    displayName: periodTypeConfig.name,
                } as RelativePeriod)
        )
    }

    return getQuartersPeriodType().map((periodTypeConfig) => {
        const fixedPeriods: Array<FixedPeriod> = []
        if (periodTypeConfig.thisYear) {
            // We generate periods based on the type for the current year of the selected date
            const startDate = referenceDate.with({
                day: 1,
                month: 1,
            })
            for (let item = 0; item < 4; item++) {
                const offsetDate = startDate
                    .add({ months: item * 3 })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString()
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'QUARTERLY',
                        date: offsetDate,
                        calendar: calendar ?? 'gregory',
                    })
                )
            }
        } else {
            for (let item = 1; item <= periodTypeConfig.duration; item++) {
                const offsetDate = referenceDate
                    .add({
                        months: item * periodTypeConfig.offset * 3,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString()
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'QUARTERLY',
                        date: offsetDate,
                        calendar: calendar ?? 'gregory',
                    })
                )
            }
            // If the offset is negative, the order of the periods is reversed, we need to reverse the array again
            if (periodTypeConfig.offset) {
                fixedPeriods.reverse()
            }
        }
        return {
            name: periodTypeConfig.name,
            id: periodTypeConfig.id,
            periodType: 'QUARTERLY' as const,
            displayName: periodTypeConfig.name,
            fixedPeriods,
        }
    })
}

export default generateRelativePeriodsQuarterly
