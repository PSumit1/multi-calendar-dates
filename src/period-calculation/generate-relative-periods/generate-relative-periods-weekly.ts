import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, RelativePeriod } from '../types'
import { getWeeksPeriodType } from './constants'
import ZonedDateTime = Temporal.ZonedDateTime
import PlainDate = Temporal.PlainDate

type GenerateRelativePeriodsWeekly = (options: {
    referenceDate: ZonedDateTime | PlainDate
    calendar: SupportedCalendar
    includeFixedPeriods: boolean
}) => Array<RelativePeriod>

const generateRelativePeriodsWeekly: GenerateRelativePeriodsWeekly = ({
    referenceDate,
    calendar,
    includeFixedPeriods = false,
}) => {
    if (!includeFixedPeriods) {
        return getWeeksPeriodType().map((periodTypeConfig) => ({
            name: periodTypeConfig.name,
            id: periodTypeConfig.id,
            periodType: 'WEEKLY' as const,
            displayName: periodTypeConfig.name,
        }))
    }

    return getWeeksPeriodType().map((periodTypeConfig) => {
        const fixedPeriods: Array<FixedPeriod> = []
        if (periodTypeConfig.thisYear) {
            // We generate periods based on the type for the current year of the selected date
            const startDate = referenceDate.with({
                day: 1,
                month: 1,
            })
            for (let offset = 0; offset < 52; offset++) {
                const offsetDate = startDate
                    .add({
                        weeks: offset,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString()

                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'WEEKLY',
                        date: offsetDate,
                        calendar: calendar ?? 'gregory',
                    })
                )
            }
        } else {
            for (let item = 1; item <= periodTypeConfig.duration; item++) {
                const dateOffset = referenceDate
                    .add({
                        weeks: item * periodTypeConfig.offset,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString({ calendarName: 'never' })
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'WEEKLY',
                        date: dateOffset,
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
            periodType: 'WEEKLY' as const,
            displayName: periodTypeConfig.name,
            fixedPeriods,
        }
    })
}

export default generateRelativePeriodsWeekly
