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

describe('MONTHLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'MONTHLY',
    })
    it('should generate correct number of periods', () => {
        expect(periods.length).toEqual(6)
    })
    it(`should generate correct period for the period this month`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_MONTH'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'MONTHLY',
                id: 'THIS_MONTH',
                displayName: 'This month',
                startDate: '2025-11-01',
                endDate: '2025-11-30',
            })
        }
    })
    it(`should generate correct period for the period last month`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_MONTH'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                id: 'LAST_MONTH',
                displayName: 'Last month',
                startDate: '2025-10-01',
                endDate: '2025-10-31',
            })
        }
    })
    it(`should generate correct period for the period last 3 months`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_3_MONTHS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                id: 'LAST_3_MONTHS',
                name: 'Last 3 months',
                startDate: '2025-08-01',
                endDate: '2025-10-31',
            })
        }
    })
    it(`should generate correct period for the period last 6 months`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_6_MONTHS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                id: 'LAST_6_MONTHS',
                name: 'Last 6 months',
                startDate: '2025-05-01',
                endDate: '2025-10-31',
            })
        }
    })
    it(`should generate correct period for the period last 12 months`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_12_MONTHS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                id: 'LAST_12_MONTHS',
                name: 'Last 12 months',
                startDate: '2024-11-01',
                endDate: '2025-10-31',
            })
        }
    })
    it(`should generate correct period for the period months this year`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_12_MONTHS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                id: 'MONTHS_THIS_YEAR',
                name: 'Months this year',
                startDate: '2025-01-01',
                endDate: '2025-12-31',
            })
        }
    })
})

describe('DAILY  relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'DAILY',
    })

    it('should generate correct number of periods', () => {
        expect(periods.length).toEqual(7)
    })
    it(`should generate correct period for the period today`, () => {
        const selectedPeriod = periods.find((period) => period.id === 'TODAY')
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'TODAY',
                displayName: 'Today',
                startDate: '2025-11-25',
                endDate: '2025-11-25',
            })
        }
    })
    it(`should generate correct period for the period yesterday`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'YESTERDAY'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'YESTERDAY',
                displayName: 'Yesterday',
                startDate: '2025-11-24',
                endDate: '2025-11-24',
            })
        }
    })
    it(`should generate correct period for the period last 3 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_3_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'LAST_3_DAYS',
                displayName: 'Last 3 Days',
                startDate: '2025-11-22',
                endDate: '2025-11-24',
            })
        }
    })
    it(`should generate 3 days period for the period last 3 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_3_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 3 }))
        }
    })
    it(`should generate correct period for the period last 7 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_7_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'LAST_7_DAYS',
                displayName: 'Last 7 days',
                startDate: '2025-11-18',
                endDate: '2025-11-24',
            })
        }
    })
    it(`should generate 7 days period for the period last 7 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_7_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 7 }))
        }
    })
    it(`should generate correct period for the period last 14 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_14_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'LAST_14_DAYS',
                displayName: 'Last 14 days',
                startDate: '2025-11-11',
                endDate: '2025-11-24',
            })
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 14 }))
        }
    })
    it(`should generate 14 days period for the period last 14 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_14_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 14 }))
        }
    })
    it(`should generate correct period for the period last 30 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_30_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'LAST_30_DAYS',
                displayName: 'Last 30 days',
                startDate: '2025-10-27',
                endDate: '2025-11-24',
            })
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 30 }))
        }
    })
    it(`should generate 30 days period for the period last 30 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_30_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 30 }))
        }
    })
    it(`should generate correct period for the period last 60 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_60_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'LAST_60_DAYS',
                displayName: 'Last 60 days',
                startDate: '2025-09-26',
                endDate: '2025-11-24',
            })
        }
    })
    it(`should generate 60 days period for the period last 60 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_60_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 60 }))
        }
    })
    it(`should generate correct period for the period last 90 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_90_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'LAST_90_DAYS',
                displayName: 'Last 90 days',
                startDate: '2025-08-26',
                endDate: '2025-11-24',
            })
        }
    })
    it(`should generate 90 days period for the period last 90 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_90_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 90 }))
        }
    })
    it(`should generate correct period for the period last 180 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_180_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'LAST_180_DAYS',
                displayName: 'Last 180 days',
                startDate: '2025-05-28',
                endDate: '2025-11-24',
            })
        }
    })
    it(`should generate 180 days period for the period last 180 days`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_180_DAYS'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(
                Temporal.PlainDate.from(selectedPeriod.startDate).since(
                    Temporal.PlainDate.from(selectedPeriod.endDate)
                )
            ).toEqual(Temporal.Duration.from({ days: 180 }))
        }
    })
})
