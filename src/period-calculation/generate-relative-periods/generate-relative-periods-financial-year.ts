import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, RelativePeriod } from '../types'
import { getFinancialYearsPeriodType } from './constants'
import ZonedDateTime = Temporal.ZonedDateTime
import PlainDate = Temporal.PlainDate

type GenerateRelativePeriodsFinancialYear = (options: {
    referenceDate: ZonedDateTime | PlainDate
    calendar: SupportedCalendar
}) => Array<RelativePeriod>

const generateRelativePeriodsFinancialYear: GenerateRelativePeriodsFinancialYear =
    ({ referenceDate, calendar }) => {
        /*
         * The financial year is set to Financial year October as how the analytics API treats it.
         * */
        return getFinancialYearsPeriodType().map((periodTypeConfig) => {
            if (periodTypeConfig.thisYear) {
                return {
                    name: periodTypeConfig.name,
                    id: periodTypeConfig.id,
                    periodType: 'FINANCIAL' as const,
                    displayName: periodTypeConfig.name,
                    fixedPeriods: [
                        getFixedPeriodByDate({
                            periodType: 'FYOCT',
                            date: referenceDate
                                .toPlainDateTime()
                                .toPlainDate()
                                .toString(),
                            calendar: calendar ?? 'gregory',
                        }),
                    ],
                }
            }
            const fixedPeriods: Array<FixedPeriod> = []
            for (let item = 1; item <= periodTypeConfig.duration; item++) {
                const offsetDate = referenceDate
                    .add({
                        years: item * periodTypeConfig.offset,
                    })
                    .toPlainDateTime()
                    .toPlainDate()
                    .toString()
                fixedPeriods.push(
                    getFixedPeriodByDate({
                        periodType: 'FYOCT',
                        date: offsetDate,
                        calendar: calendar ?? 'gregory',
                    })
                )
            }
            // If the offset is negative, the order of the periods is reversed, we need to reverse the array again
            if (periodTypeConfig.offset) {
                fixedPeriods.reverse()
            }
            return {
                name: periodTypeConfig.name,
                id: periodTypeConfig.id,
                periodType: 'FINANCIAL' as const,
                displayName: periodTypeConfig.name,
                fixedPeriods,
            }
        })
    }

export default generateRelativePeriodsFinancialYear
