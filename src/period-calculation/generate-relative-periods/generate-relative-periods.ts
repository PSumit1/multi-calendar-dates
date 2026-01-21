import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { getNowInCalendar } from '../../utils'
import { getFixedPeriodByDate } from '../get-fixed-period-by-date'
import { FixedPeriod, PeriodType, RelativePeriod } from '../types'
import {
    getBiMonthsPeriodType,
    getBiWeeksPeriodType,
    getDaysPeriodType,
    getMonthsPeriodType,
    getWeeksPeriodType,
} from './constants'

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
                for (let item = 0; item < 12; item++) {
                    const offsetDate = startDate
                        .add({ months: item })
                        .toPlainDateTime()
                        .toPlainDate()
                        .toString()
                    fixedPeriods.push(
                        getFixedPeriodByDate({
                            periodType: 'MONTHLY',
                            date: offsetDate,
                            calendar: calendar ?? 'gregory',
                        })
                    )
                }
            } else {
                for (let item = 1; item <= periodTypeConfig.duration; item++) {
                    const offsetDate = date
                        .add({
                            months: item * periodTypeConfig.offset,
                        })
                        .toPlainDateTime()
                        .toPlainDate()
                        .toString()
                    fixedPeriods.push(
                        getFixedPeriodByDate({
                            periodType: 'MONTHLY',
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
                periodType: 'MONTHLY' as const,
                displayName: periodTypeConfig.name,
                fixedPeriods,
            }
        })
    }
    if (periodType === 'BIMONTHLY') {
        return getBiMonthsPeriodType().map((periodTypeConfig) => {
            const fixedPeriods: Array<FixedPeriod> = []
            if (periodTypeConfig.thisYear) {
                // We generate periods based on the type for the current year of the selected date
                const startDate = date.with({
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
                    const offsetDate = date
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
            }
        })
    }
    if (periodType === 'WEEKLY') {
        return getWeeksPeriodType().map((periodTypeConfig) => {
            const fixedPeriods: Array<FixedPeriod> = []
            if (periodTypeConfig.thisYear) {
                // We generate periods based on the type for the current year of the selected date
                const startDate = date.with({
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
                    const dateOffset = date
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
    if (periodType === 'BIWEEKLY') {
        return getBiWeeksPeriodType().map((periodTypeConfig) => {
            const fixedPeriods: Array<FixedPeriod> = []
            if (periodTypeConfig.thisYear) {
                // We generate periods based on the type for the current year of the selected date
                const startDate = date.with({
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
                    const dateOffset = date
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
    if (periodType === 'DAILY') {
        return getDaysPeriodType().map((periodTypeConfig) => {
            const fixedPeriods: Array<FixedPeriod> = []
            if (periodTypeConfig.thisYear) {
                // We generate periods based on the type for the current year of the selected date
                const startDate = date.with({
                    day: 1,
                    month: 1,
                })
                for (let item = 0; item < startDate.daysInYear; item++) {
                    const offsetDate = startDate
                        .add({ days: item })
                        .toPlainDateTime()
                        .toPlainDate()
                        .toString()
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
                    const offsetDate = date
                        .add({
                            days: item * periodTypeConfig.offset,
                        })
                        .toPlainDateTime()
                        .toPlainDate()
                        .toString()
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
    return []
}

export default generateRelativePeriods
