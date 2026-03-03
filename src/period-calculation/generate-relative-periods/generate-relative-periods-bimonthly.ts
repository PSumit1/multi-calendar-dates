import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, RelativePeriod } from '../types'
import { getBiMonthsPeriodType } from './constants'
import ZonedDateTime = Temporal.ZonedDateTime
import PlainDate = Temporal.PlainDate

type GenerateRelativePeriodsBiMonthly = (options: {
    referenceDate: ZonedDateTime | PlainDate
    calendar: SupportedCalendar
    includeFixedPeriods: boolean
}) => Array<RelativePeriod>

const generateRelativePeriodsBiMonthly: GenerateRelativePeriodsBiMonthly = ({
    referenceDate,
    calendar,
    includeFixedPeriods = false,
}) => {
    if (!includeFixedPeriods) {
        return getBiMonthsPeriodType().map(
            (periodTypeConfig) =>
                ({
                    name: periodTypeConfig.name,
                    id: periodTypeConfig.id,
                    periodType: 'BIMONTHLY' as const,
                    displayName: periodTypeConfig.name,
                } as RelativePeriod)
        )
    }

    return getBiMonthsPeriodType().map((periodTypeConfig) => {
        const fixedPeriods: Array<FixedPeriod> = []
        if (periodTypeConfig.thisYear) {
            // We generate periods based on the type for the current year of the selected date
            const startDate = referenceDate.with({
                day: 1,
                month: 1,
            })
            for (let item = 0; item < 12; item += 2) {
                const offsetDate = startDate
                    .add({ months: item })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString()
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'BIMONTHLY',
                        date: offsetDate,
                        calendar: calendar ?? 'gregory',
                    })
                )
            }
        } else {
            for (
                let item = 2;
                item <= periodTypeConfig.duration * 2; //To compensate for the step
                item += 2 //Bi step
            ) {
                const offsetDate = referenceDate
                    .add({
                        months: item * periodTypeConfig.offset,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString()
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'BIMONTHLY',
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
            periodType: 'BIMONTHLY' as const,
            displayName: periodTypeConfig.name,
            fixedPeriods,
        } as RelativePeriod
    })
}

export default generateRelativePeriodsBiMonthly
