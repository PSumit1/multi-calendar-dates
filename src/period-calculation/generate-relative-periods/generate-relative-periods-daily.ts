import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, RelativePeriod } from '../types'
import { getDaysPeriodType } from './constants'
import ZonedDateTime = Temporal.ZonedDateTime
import PlainDate = Temporal.PlainDate

type GenerateRelativePeriodsDaily = (options: {
    referenceDate: ZonedDateTime | PlainDate
    calendar: SupportedCalendar
    includeFixedPeriods: boolean
}) => Array<RelativePeriod>

const generateRelativePeriodsDaily: GenerateRelativePeriodsDaily = ({
    referenceDate,
    calendar,
    includeFixedPeriods = false,
}) => {
    if (!includeFixedPeriods) {
        return getDaysPeriodType().map(
            (periodTypeConfig) =>
                ({
                    name: periodTypeConfig.name,
                    id: periodTypeConfig.id,
                    periodType: 'DAILY' as const,
                    displayName: periodTypeConfig.name,
                } as RelativePeriod)
        )
    }
    return getDaysPeriodType().map((periodTypeConfig) => {
        const fixedPeriods: Array<FixedPeriod> = []
        if (periodTypeConfig.thisYear) {
            // We generate periods based on the type for the current year of the selected date
            const startDate = referenceDate.with({
                day: 1,
                month: 1,
            })
            for (let item = 0; item < startDate.daysInYear; item++) {
                const offsetDate = startDate
                    .add({ days: item })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString({
                        calendarName: 'never',
                    })
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'DAILY',
                        date: offsetDate,
                        calendar: calendar ?? 'gregory',
                    })
                )
            }
        } else {
            for (let item = 1; item <= periodTypeConfig.duration; item++) {
                const offsetDate = referenceDate
                    .add({
                        days: item * periodTypeConfig.offset,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString({
                        calendarName: 'never',
                    })
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'DAILY',
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
            periodType: 'DAILY' as const,
            displayName: periodTypeConfig.name,
            fixedPeriods,
        }
    })
}

export default generateRelativePeriodsDaily
