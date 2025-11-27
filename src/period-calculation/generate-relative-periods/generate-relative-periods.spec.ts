import { Temporal } from '@js-temporal/polyfill'
import { getNowInCalendar } from '../../utils'
import generateRelativePeriods from './generate-relative-periods'
// Start with Gregorian
// Write tests for one period type at a time
// Implement with most naive implementation then refactor
// something very similar to: https://github.com/dhis2/analytics/blob/master/src/components/PeriodDimension/utils/relativePeriods.js#L328

/*
 * @nnkogift will work on DAILY,MONTHLY,WEEKLY,
 * @PSummit will work on QUARTERLY, YEARLY
 * */

beforeEach(() => {
    // 25 November 2025
    jest.fn(getNowInCalendar).mockReturnValue(
        Temporal.ZonedDateTime.from({
            year: 2025,
            month: 11,
            day: 25,
            timeZone: 'UTC',
        })
    )
})

const monthlyDates = [
    {
        id: 'THIS_MONTH',
        name: 'This month',
        startDate: Temporal.PlainDate.from({
            year: 2025,
            month: 11,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 11,
            day: 30,
        }).toString(),
    },
    {
        id: 'LAST_MONTH',
        name: 'Last month',
        startDate: Temporal.PlainDate.from({
            year: 2025,
            month: 10,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 10,
            day: 31,
        }).toString(),
    },
    {
        id: 'LAST_3_MONTHS',
        name: 'Last 3 months',
        startDate: Temporal.PlainDate.from({
            year: 2025,
            month: 8,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 10,
            day: 31,
        }).toString(),
    },
    {
        id: 'LAST_6_MONTHS',
        name: 'Last 6 months',
        startDate: Temporal.PlainDate.from({
            year: 2025,
            month: 5,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 10,
            day: 31,
        }).toString(),
    },
    {
        id: 'LAST_12_MONTHS',
        name: 'Last 12 months',
        startDate: Temporal.PlainDate.from({
            year: 2024,
            month: 11,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 10,
            day: 31,
        }).toString(),
    },
    {
        id: 'MONTHS_THIS_YEAR',
        name: 'Months this year',
        startDate: Temporal.PlainDate.from({
            year: 2025,
            month: 1,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 12,
            day: 31,
        }).toString(),
    },
]

describe('MONTHLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'MONTHLY',
    })
    it('should generate correct number of periods', () => {
        expect(periods.length).toEqual(monthlyDates.length)
    })
    for (const periodTest of monthlyDates) {
        it(`should generate correct period for the period ${periodTest.name}`, () => {
            const selectedPeriod = periods.find(
                (period) => period.id === periodTest.id
            )
            expect(selectedPeriod).toBeDefined()
            if (selectedPeriod) {
                expect(selectedPeriod.displayName).toEqual(periodTest.name)
                expect(selectedPeriod.startDate).toEqual(periodTest.startDate)
                expect(selectedPeriod.endDate).toEqual(periodTest.endDate)
            }
        })
    }
})

const dailyDates = []
