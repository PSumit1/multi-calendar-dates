import generateRelativePeriods from './generate-relative-periods'
import { Temporal } from '@js-temporal/polyfill'
// Start with Gregorian
// Write tests for one period type at a time
// Implement with most naive implementation then refactor
// something very similar to: https://github.com/dhis2/analytics/blob/master/src/components/PeriodDimension/utils/relativePeriods.js#L328

beforeEach(() => {
    // 25 November 2025
    jest.spyOn(Date, 'now').mockReturnValue(1764069336553)
})

const monthlyDates = [
    {
        id: "THIS_MONTH",
        name: "This month",
        startDate: Temporal.PlainDate.from({
            year: 2025,
            month: 2,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 2,
            day: 28,
        }).toString()
    },
    {
        id: "LAST_MONTH",
        name: "Last month",
        startDate: Temporal.PlainDate.from({
            year: 2025,
            month: 1,
            day: 1,
        }).toString(),
        endDate: Temporal.PlainDate.from({
            year: 2025,
            month: 1,
            day: 31,
        }).toString()
    },

]

describe('MONTHLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'MONTHLY',
        referenceDate: "2025-02-25"
    });
    for (const periodTest of monthlyDates) {
        it(`should generate correct period for the period ${periodTest.name}`, () => {
            const selectedPeriod = periods.find((period)=> period.id === periodTest.id);
            expect(selectedPeriod).toBeDefined();
            if(selectedPeriod) {
                expect(selectedPeriod.displayName).toEqual(periodTest.name);
                expect(selectedPeriod.startDate).toEqual(periodTest.startDate);
                expect(selectedPeriod.endDate).toEqual(periodTest.endDate);
            }
        })
    }

})
