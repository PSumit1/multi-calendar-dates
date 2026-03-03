import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, RelativePeriod } from '../types'
import { getBiWeeksPeriodType } from './constants'
import ZonedDateTime = Temporal.ZonedDateTime
import PlainDate = Temporal.PlainDate

type GenerateRelativePeriodsBiWeekly = (options: {
    referenceDate: ZonedDateTime | PlainDate
    calendar: SupportedCalendar
    includeFixedPeriods: boolean
}) => Array<RelativePeriod>

const generateRelativePeriodsBiWeekly: GenerateRelativePeriodsBiWeekly = ({
    referenceDate,
    calendar,
    includeFixedPeriods = false,
}) => {
    if (!includeFixedPeriods) {
        return getBiWeeksPeriodType().map(
            (periodTypeConfig) =>
                ({
                    name: periodTypeConfig.name,
                    id: periodTypeConfig.id,
                    periodType: 'BIWEEKLY' as const,
                    displayName: periodTypeConfig.name,
                } as RelativePeriod)
        )
    }
    return getBiWeeksPeriodType().map((periodTypeConfig) => {
        const fixedPeriods: Array<FixedPeriod> = []
        if (periodTypeConfig.thisYear) {
            // We generate periods based on the type for the current year of the selected date
            const startDate = referenceDate.with({
                day: 1,
                month: 1,
            })
            for (let offset = 0; offset < 26; offset += 2) {
                const offsetDate = startDate
                    .add({
                        weeks: offset,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString()

                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'BIWEEKLY',
                        date: offsetDate,
                        calendar: calendar ?? 'gregory',
                    })
                )
            }
        } else {
            for (
                let item = 2;
                item <= periodTypeConfig.duration * 2;
                item += 2
            ) {
                const dateOffset = referenceDate
                    .add({
                        weeks: item * periodTypeConfig.offset,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString({ calendarName: 'never' })
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'BIWEEKLY',
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
            periodType: 'BIWEEKLY' as const,
            displayName: periodTypeConfig.name,
            fixedPeriods,
        }
    })
}

export default generateRelativePeriodsBiWeekly
