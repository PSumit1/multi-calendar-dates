import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getNowInCalendar } from '../../utils'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, PeriodType, RelativePeriod } from '../types'
import { getMonthsPeriodType } from './constants'

type GenerateRelativePeriods = (options: {
    periodType: PeriodType
    referenceDate?: string
    calendar?: SupportedCalendar
}) => Array<RelativePeriod>

const generateRelativePeriods: GenerateRelativePeriods = ({
    periodType,
    referenceDate, // string or Temporal?
    calendar,
}) => {
    const date = referenceDate
        ? Temporal.PlainDate.from(referenceDate)
        : getNowInCalendar(calendar)

    if (periodType === 'MONTHLY') {
        return getMonthsPeriodType().map((periodTypeConfig) => {
            const fixedPeriods: Array<FixedPeriod> = []
            if (periodTypeConfig.thisYear) {
                // We generate periods based on the type for the current year of the selected date
                const startDate = date.with({
                    day: 1,
                    month: 1,
                })
                for (let offset = 0; offset < 12; offset++) {
                    fixedPeriods.push(
                        getFixedPeriodByDate({
                            periodType: 'MONTHLY',
                            date: startDate
                                .add({
                                    months: offset,
                                })
                                .toString(),
                            calendar: calendar ?? 'gregory',
                        })
                    )
                }
            } else {
                for (let item = 1; item <= periodTypeConfig.duration; item++) {
                    fixedPeriods.push(
                        getFixedPeriodByDate({
                            periodType: 'MONTHLY',
                            date: date
                                .add({
                                    months: item * periodTypeConfig.offset,
                                })
                                .toString(),
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
                periodType: 'MONTHLY' as const,
                displayName: periodTypeConfig.name,
                fixedPeriods,
            }
        })
    }

    if (periodType === 'DAILY') {
        return []
    }

    if (periodType === 'WEEKLY') {
        return []
    }

    if (periodType === 'BIWEEKLY') {
        return []
    }

    if (periodType === 'BIMONTHLY') {
        return []
    }

    return []
}

export default generateRelativePeriods
