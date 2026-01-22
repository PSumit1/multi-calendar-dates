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
const referenceDate = Temporal.ZonedDateTime.from({
    year: 2025,
    month: 11,
    day: 25,
    timeZone: 'UTC',
})
beforeEach(() => {
    // November 25, 2025
    jest.fn(getNowInCalendar).mockReturnValue(referenceDate)
})

describe('MONTHLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'MONTHLY',
        referenceDate: referenceDate.toString(),
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
                name: 'This month',
                fixedPeriods: [
                    {
                        periodType: 'MONTHLY',
                        id: '202511',
                        name: 'November 2025',
                        displayName: 'November 2025',
                        startDate: '2025-11-01',
                        endDate: '2025-11-30',
                    },
                ],
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
                fixedPeriods: [
                    {
                        periodType: 'MONTHLY',
                        id: '202510',
                        name: 'October 2025',
                        displayName: 'October 2025',
                        startDate: '2025-10-01',
                        endDate: '2025-10-31',
                    },
                ],
            })
        }
    })
    describe('periods for the period last 3 months', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_3_MONTHS'
        )
        it(`should be defined`, () => expect(selectedPeriod).toBeDefined())
        it(`should generate 3 months`, () => {
            expect(selectedPeriod?.fixedPeriods?.length).toEqual(3)
        })
        it(`should generate correct period`, () => {
            expect(selectedPeriod).toBeDefined()
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    id: 'LAST_3_MONTHS',
                    name: 'Last 3 months',
                    fixedPeriods: [
                        {
                            periodType: 'MONTHLY',
                            id: '202508',
                            name: 'August 2025',
                            displayName: 'August 2025',
                            startDate: '2025-08-01',
                            endDate: '2025-08-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202509',
                            name: 'September 2025',
                            displayName: 'September 2025',
                            startDate: '2025-09-01',
                            endDate: '2025-09-30',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202510',
                            name: 'October 2025',
                            displayName: 'October 2025',
                            startDate: '2025-10-01',
                            endDate: '2025-10-31',
                        },
                    ],
                })
            }
        })
    })
    describe('periods for the period last 6 months', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_6_MONTHS'
        )
        it(`should be defined`, () => expect(selectedPeriod).toBeDefined())
        it(`should generate correct period for the period last 6 months`, () => {
            expect(selectedPeriod).toBeDefined()
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    id: 'LAST_6_MONTHS',
                    name: 'Last 6 months',
                    fixedPeriods: [
                        {
                            periodType: 'MONTHLY',
                            id: '202505',
                            name: 'May 2025',
                            displayName: 'May 2025',
                            startDate: '2025-05-01',
                            endDate: '2025-05-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202506',
                            name: 'June 2025',
                            displayName: 'June 2025',
                            startDate: '2025-06-01',
                            endDate: '2025-06-30',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202507',
                            name: 'July 2025',
                            displayName: 'July 2025',
                            startDate: '2025-07-01',
                            endDate: '2025-07-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202508',
                            name: 'August 2025',
                            displayName: 'August 2025',
                            startDate: '2025-08-01',
                            endDate: '2025-08-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202509',
                            name: 'September 2025',
                            displayName: 'September 2025',
                            startDate: '2025-09-01',
                            endDate: '2025-09-30',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202510',
                            name: 'October 2025',
                            displayName: 'October 2025',
                            startDate: '2025-10-01',
                            endDate: '2025-10-31',
                        },
                    ],
                })
            }
        })
        it(`should generate 6 months for the period last 6 months`, () => {
            expect(selectedPeriod?.fixedPeriods?.length).toEqual(6)
        })
    })
    describe('periods for the period last 12 months', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_12_MONTHS'
        )
        it(`should be defined`, () => expect(selectedPeriod).toBeDefined())
        it(`should generate 12 months`, () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(12)
        })
        it(`should generate correct period object`, () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    id: 'LAST_12_MONTHS',
                    name: 'Last 12 months',
                    displayName: 'Last 12 months',
                    fixedPeriods: [
                        {
                            periodType: 'MONTHLY',
                            id: '202411',
                            name: 'November 2024',
                            displayName: 'November 2024',
                            startDate: '2024-11-01',
                            endDate: '2024-11-30',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202412',
                            name: 'December 2024',
                            displayName: 'December 2024',
                            startDate: '2024-12-01',
                            endDate: '2024-12-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202501',
                            name: 'January 2025',
                            displayName: 'January 2025',
                            startDate: '2025-01-01',
                            endDate: '2025-01-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202502',
                            name: 'February 2025',
                            displayName: 'February 2025',
                            startDate: '2025-02-01',
                            endDate: '2025-02-28',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202503',
                            name: 'March 2025',
                            displayName: 'March 2025',
                            startDate: '2025-03-01',
                            endDate: '2025-03-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202504',
                            name: 'April 2025',
                            displayName: 'April 2025',
                            startDate: '2025-04-01',
                            endDate: '2025-04-30',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202505',
                            name: 'May 2025',
                            displayName: 'May 2025',
                            startDate: '2025-05-01',
                            endDate: '2025-05-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202506',
                            name: 'June 2025',
                            displayName: 'June 2025',
                            startDate: '2025-06-01',
                            endDate: '2025-06-30',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202507',
                            name: 'July 2025',
                            displayName: 'July 2025',
                            startDate: '2025-07-01',
                            endDate: '2025-07-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202508',
                            name: 'August 2025',
                            displayName: 'August 2025',
                            startDate: '2025-08-01',
                            endDate: '2025-08-31',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202509',
                            name: 'September 2025',
                            displayName: 'September 2025',
                            startDate: '2025-09-01',
                            endDate: '2025-09-30',
                        },
                        {
                            periodType: 'MONTHLY',
                            id: '202510',
                            name: 'October 2025',
                            displayName: 'October 2025',
                            startDate: '2025-10-01',
                            endDate: '2025-10-31',
                        },
                    ],
                })
            }
        })
    })
    describe('periods for the period months this year', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'MONTHS_THIS_YEAR'
        )
        it(`should be defined`, () => expect(selectedPeriod).toBeDefined())
        it(`should generate 12 months`, () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(12)
        })
        it(`should generate correct period for the period months this year`, () => {
            expect(selectedPeriod).toMatchObject({
                id: 'MONTHS_THIS_YEAR',
                name: 'Months this year',
                fixedPeriods: [
                    {
                        periodType: 'MONTHLY',
                        id: '202501',
                        name: 'January 2025',
                        displayName: 'January 2025',
                        startDate: '2025-01-01',
                        endDate: '2025-01-31',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202502',
                        name: 'February 2025',
                        displayName: 'February 2025',
                        startDate: '2025-02-01',
                        endDate: '2025-02-28',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202503',
                        name: 'March 2025',
                        displayName: 'March 2025',
                        startDate: '2025-03-01',
                        endDate: '2025-03-31',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202504',
                        name: 'April 2025',
                        displayName: 'April 2025',
                        startDate: '2025-04-01',
                        endDate: '2025-04-30',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202505',
                        name: 'May 2025',
                        displayName: 'May 2025',
                        startDate: '2025-05-01',
                        endDate: '2025-05-31',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202506',
                        name: 'June 2025',
                        displayName: 'June 2025',
                        startDate: '2025-06-01',
                        endDate: '2025-06-30',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202507',
                        name: 'July 2025',
                        displayName: 'July 2025',
                        startDate: '2025-07-01',
                        endDate: '2025-07-31',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202508',
                        name: 'August 2025',
                        displayName: 'August 2025',
                        startDate: '2025-08-01',
                        endDate: '2025-08-31',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202509',
                        name: 'September 2025',
                        displayName: 'September 2025',
                        startDate: '2025-09-01',
                        endDate: '2025-09-30',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202510',
                        name: 'October 2025',
                        displayName: 'October 2025',
                        startDate: '2025-10-01',
                        endDate: '2025-10-31',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202511',
                        name: 'November 2025',
                        displayName: 'November 2025',
                        startDate: '2025-11-01',
                        endDate: '2025-11-30',
                    },
                    {
                        periodType: 'MONTHLY',
                        id: '202512',
                        name: 'December 2025',
                        displayName: 'December 2025',
                        startDate: '2025-12-01',
                        endDate: '2025-12-31',
                    },
                ],
            })
        })
    })
})

describe('WEEKLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'WEEKLY',
        referenceDate: referenceDate.toString(),
    })
    it('should generate correct number of periods', () => {
        expect(periods.length).toEqual(6)
    })
    it('should generate correct period for the period this week', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_WEEK'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'WEEKLY',
                id: 'THIS_WEEK',
                displayName: 'This week',
                fixedPeriods: [
                    {
                        periodType: 'WEEKLY',
                        id: '2025W48',
                        iso: '2025W48',
                        name: 'Week 48 - 2025-11-24 - 2025-11-30',
                        displayName: 'Week 48 - 2025-11-24 - 2025-11-30',
                        startDate: '2025-11-24',
                        endDate: '2025-11-30',
                    },
                ],
            })
        }
    })
    it('should generate correct period for the period last week', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_WEEK'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'WEEKLY',
                id: 'LAST_WEEK',
                displayName: 'Last week',
                fixedPeriods: [
                    {
                        periodType: 'WEEKLY',
                        id: '2025W47',
                        iso: '2025W47',
                        name: 'Week 47 - 2025-11-17 - 2025-11-23',
                        displayName: 'Week 47 - 2025-11-17 - 2025-11-23',
                        startDate: '2025-11-17',
                        endDate: '2025-11-23',
                    },
                ],
            })
        }
    })
    describe('periods for the period last 4 weeks', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_4_WEEKS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 4 weeks', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(4)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'WEEKLY',
                    id: 'LAST_4_WEEKS',
                    displayName: 'Last 4 weeks',
                })
                const expected = [
                    {
                        periodType: 'WEEKLY',
                        id: '2025W44',
                        iso: '2025W44',
                        name: 'Week 44 - 2025-10-27 - 2025-11-02',
                        displayName: 'Week 44 - 2025-10-27 - 2025-11-02',
                        startDate: '2025-10-27',
                        endDate: '2025-11-02',
                    },
                    {
                        periodType: 'WEEKLY',
                        id: '2025W45',
                        iso: '2025W45',
                        name: 'Week 45 - 2025-11-03 - 2025-11-09',
                        displayName: 'Week 45 - 2025-11-03 - 2025-11-09',
                        startDate: '2025-11-03',
                        endDate: '2025-11-09',
                    },
                    {
                        periodType: 'WEEKLY',
                        id: '2025W46',
                        iso: '2025W46',
                        name: 'Week 46 - 2025-11-10 - 2025-11-16',
                        displayName: 'Week 46 - 2025-11-10 - 2025-11-16',
                        startDate: '2025-11-10',
                        endDate: '2025-11-16',
                    },
                    {
                        periodType: 'WEEKLY',
                        id: '2025W47',
                        iso: '2025W47',
                        name: 'Week 47 - 2025-11-17 - 2025-11-23',
                        displayName: 'Week 47 - 2025-11-17 - 2025-11-23',
                        startDate: '2025-11-17',
                        endDate: '2025-11-23',
                    },
                ]
                expect(selectedPeriod.fixedPeriods).toEqual(expected)
            }
        })
    })
    describe('periods for the period last 12 weeks', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_12_WEEKS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 12 weeks', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(12)
        })
        it('should generate correct period for the period last 12 weeks', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'WEEKLY',
                    id: 'LAST_12_WEEKS',
                    displayName: 'Last 12 weeks',
                })
                expect(selectedPeriod.fixedPeriods.length).toEqual(12)
                // Oldest (12 weeks ago) to most recent (last week)
                expect(selectedPeriod.fixedPeriods[0]).toEqual({
                    periodType: 'WEEKLY',
                    id: '2025W36',
                    iso: '2025W36',
                    name: 'Week 36 - 2025-09-01 - 2025-09-07',
                    displayName: 'Week 36 - 2025-09-01 - 2025-09-07',
                    startDate: '2025-09-01',
                    endDate: '2025-09-07',
                })
                expect(selectedPeriod.fixedPeriods[11]).toEqual({
                    periodType: 'WEEKLY',
                    id: '2025W47',
                    iso: '2025W47',
                    name: 'Week 47 - 2025-11-17 - 2025-11-23',
                    displayName: 'Week 47 - 2025-11-17 - 2025-11-23',
                    startDate: '2025-11-17',
                    endDate: '2025-11-23',
                })
            }
        })
    })
})

describe('BIMONTHLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'BIMONTHLY',
        referenceDate: referenceDate.toString(),
    })

    it('should generate correct number of periods', () => {
        // From constants: THIS_BIMONTH, LAST_BIMONTH, LAST_6_BIMONTHS, BIMONTHS_THIS_YEAR
        expect(periods.length).toEqual(4)
    })

    it('should generate correct period for the period this bi-month', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_BIMONTH'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'BIMONTHLY',
                id: 'THIS_BIMONTH',
                displayName: 'This bi-month',
                fixedPeriods: [
                    {
                        periodType: 'BIMONTHLY',
                        id: '202506B',
                        iso: '202506B',
                        name: 'November - December 2025',
                        displayName: 'November - December 2025',
                        startDate: '2025-11-01',
                        endDate: '2025-12-31',
                    },
                ],
            })
        }
    })

    it('should generate correct period for the period last bi-month', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_BIMONTH'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'BIMONTHLY',
                id: 'LAST_BIMONTH',
                displayName: 'Last bi-month',
                fixedPeriods: [
                    {
                        periodType: 'BIMONTHLY',
                        id: '202505B',
                        iso: '202505B',
                        name: 'September - October 2025',
                        displayName: 'September - October 2025',
                        startDate: '2025-09-01',
                        endDate: '2025-10-31',
                    },
                ],
            })
        }
    })

    describe('periods for the period last 6 bi-months', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_6_BIMONTHS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 6 bi-months', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(6)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'BIMONTHLY',
                    id: 'LAST_6_BIMONTHS',
                    displayName: 'Last 6 bi-months',
                })

                const expected = [
                    {
                        periodType: 'BIMONTHLY',
                        id: '202406B',
                        iso: '202406B',
                        name: 'November - December 2024',
                        displayName: 'November - December 2024',
                        startDate: '2024-11-01',
                        endDate: '2024-12-31',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202501B',
                        iso: '202501B',
                        name: 'January - February 2025',
                        displayName: 'January - February 2025',
                        startDate: '2025-01-01',
                        endDate: '2025-02-28',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202502B',
                        iso: '202502B',
                        name: 'March - April 2025',
                        displayName: 'March - April 2025',
                        startDate: '2025-03-01',
                        endDate: '2025-04-30',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202503B',
                        iso: '202503B',
                        name: 'May - June 2025',
                        displayName: 'May - June 2025',
                        startDate: '2025-05-01',
                        endDate: '2025-06-30',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202504B',
                        iso: '202504B',
                        name: 'July - August 2025',
                        displayName: 'July - August 2025',
                        startDate: '2025-07-01',
                        endDate: '2025-08-31',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202505B',
                        iso: '202505B',
                        name: 'September - October 2025',
                        displayName: 'September - October 2025',
                        startDate: '2025-09-01',
                        endDate: '2025-10-31',
                    },
                ]
                expect(selectedPeriod.fixedPeriods).toEqual(expected)
            }
        })
    })

    describe('periods for bi-months this year', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'BIMONTHS_THIS_YEAR'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 6 bi-months', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(6)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'BIMONTHLY',
                    id: 'BIMONTHS_THIS_YEAR',
                    displayName: 'Bi-months this year',
                })
                const expected = [
                    {
                        periodType: 'BIMONTHLY',
                        id: '202501B',
                        iso: '202501B',
                        name: 'January - February 2025',
                        displayName: 'January - February 2025',
                        startDate: '2025-01-01',
                        endDate: '2025-02-28',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202502B',
                        iso: '202502B',
                        name: 'March - April 2025',
                        displayName: 'March - April 2025',
                        startDate: '2025-03-01',
                        endDate: '2025-04-30',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202503B',
                        iso: '202503B',
                        name: 'May - June 2025',
                        displayName: 'May - June 2025',
                        startDate: '2025-05-01',
                        endDate: '2025-06-30',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202504B',
                        iso: '202504B',
                        name: 'July - August 2025',
                        displayName: 'July - August 2025',
                        startDate: '2025-07-01',
                        endDate: '2025-08-31',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202505B',
                        iso: '202505B',
                        name: 'September - October 2025',
                        displayName: 'September - October 2025',
                        startDate: '2025-09-01',
                        endDate: '2025-10-31',
                    },
                    {
                        periodType: 'BIMONTHLY',
                        id: '202506B',
                        iso: '202506B',
                        name: 'November - December 2025',
                        displayName: 'November - December 2025',
                        startDate: '2025-11-01',
                        endDate: '2025-12-31',
                    },
                ]
                expect(selectedPeriod.fixedPeriods).toEqual(expected)
            }
        })
    })
})

describe('BIWEEKLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'BIWEEKLY',
        referenceDate: referenceDate.toString(),
    })

    it('should generate correct number of periods', () => {
        // From constants: THIS_BIWEEK, LAST_BIWEEK, LAST_4_BIWEEKS
        expect(periods.length).toEqual(3)
    })

    it('should generate correct period for the period this bi-week', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_BIWEEK'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'BIWEEKLY',
                id: 'THIS_BIWEEK',
                displayName: 'This bi-week',
                fixedPeriods: [
                    {
                        periodType: 'BIWEEKLY',
                        id: '2025BiW24',
                        iso: '2025BiW24',
                        name: 'Bi-Week 24 - 2025-11-17 - 2025-11-30',
                        displayName: 'Bi-Week 24 - 2025-11-17 - 2025-11-30',
                        startDate: '2025-11-17',
                        endDate: '2025-11-30',
                    },
                ],
            })
        }
    })

    it('should generate correct period for the period last bi-week', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_BIWEEK'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'BIWEEKLY',
                id: 'LAST_BIWEEK',
                displayName: 'Last bi-week',
                fixedPeriods: [
                    {
                        periodType: 'BIWEEKLY',
                        id: '2025BiW23',
                        iso: '2025BiW23',
                        name: 'Bi-Week 23 - 2025-11-03 - 2025-11-16',
                        displayName: 'Bi-Week 23 - 2025-11-03 - 2025-11-16',
                        startDate: '2025-11-03',
                        endDate: '2025-11-16',
                    },
                ],
            })
        }
    })

    describe('periods for the period last 4 bi-weeks', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_4_BIWEEKS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 4 bi-weeks', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(4)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'BIWEEKLY',
                    id: 'LAST_4_BIWEEKS',
                    displayName: 'Last 4 bi-weeks',
                })
                const expected = [
                    {
                        periodType: 'BIWEEKLY',
                        id: '2025BiW20',
                        iso: '2025BiW20',
                        name: 'Bi-Week 20 - 2025-09-22 - 2025-10-05',
                        displayName: 'Bi-Week 20 - 2025-09-22 - 2025-10-05',
                        startDate: '2025-09-22',
                        endDate: '2025-10-05',
                    },
                    {
                        periodType: 'BIWEEKLY',
                        id: '2025BiW21',
                        iso: '2025BiW21',
                        name: 'Bi-Week 21 - 2025-10-06 - 2025-10-19',
                        displayName: 'Bi-Week 21 - 2025-10-06 - 2025-10-19',
                        startDate: '2025-10-06',
                        endDate: '2025-10-19',
                    },
                    {
                        periodType: 'BIWEEKLY',
                        id: '2025BiW22',
                        iso: '2025BiW22',
                        name: 'Bi-Week 22 - 2025-10-20 - 2025-11-02',
                        displayName: 'Bi-Week 22 - 2025-10-20 - 2025-11-02',
                        startDate: '2025-10-20',
                        endDate: '2025-11-02',
                    },
                    {
                        periodType: 'BIWEEKLY',
                        id: '2025BiW23',
                        iso: '2025BiW23',
                        name: 'Bi-Week 23 - 2025-11-03 - 2025-11-16',
                        displayName: 'Bi-Week 23 - 2025-11-03 - 2025-11-16',
                        startDate: '2025-11-03',
                        endDate: '2025-11-16',
                    },
                ]
                expect(selectedPeriod.fixedPeriods).toEqual(expected)
            }
        })
    })
})

describe('DAILY  relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'DAILY',
        referenceDate: referenceDate.toString(),
    })
    it('should generate correct number of periods', () => {
        expect(periods.length).toEqual(9)
    })
    it(`should generate correct period for the period today`, () => {
        const selectedPeriod = periods.find((period) => period.id === 'TODAY')
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'DAILY',
                id: 'TODAY',
                displayName: 'Today',
                fixedPeriods: [
                    {
                        periodType: 'DAILY',
                        id: '20251125',
                        displayName: 'November 25, 2025',
                        startDate: '2025-11-25',
                        endDate: '2025-11-25',
                    },
                ],
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
                fixedPeriods: [
                    {
                        periodType: 'DAILY',
                        id: '20251124',
                        displayName: 'November 24, 2025',
                        startDate: '2025-11-24',
                        endDate: '2025-11-24',
                    },
                ],
            })
        }
    })
    describe('periods for the period last 3 days', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_3_DAYS'
        )
        it(`should be defined`, () => expect(selectedPeriod).toBeDefined())
        it(`should generate 3 days period`, () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(3)
        })
        it(`should generate correct period`, () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'DAILY',
                    id: 'LAST_3_DAYS',
                    displayName: 'Last 3 days',
                    fixedPeriods: [
                        {
                            periodType: 'DAILY',
                            id: '20251122',
                            displayName: 'November 22, 2025',
                            startDate: '2025-11-22',
                            endDate: '2025-11-22',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251123',
                            displayName: 'November 23, 2025',
                            startDate: '2025-11-23',
                            endDate: '2025-11-23',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251124',
                            displayName: 'November 24, 2025',
                            startDate: '2025-11-24',
                            endDate: '2025-11-24',
                        },
                    ],
                })
            }
        })
    })
    describe('periods for the period last 7 days', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_7_DAYS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 7 days', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(7)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'DAILY',
                    id: 'LAST_7_DAYS',
                    displayName: 'Last 7 days',
                    fixedPeriods: [
                        {
                            periodType: 'DAILY',
                            id: '20251118',
                            displayName: 'November 18, 2025',
                            startDate: '2025-11-18',
                            endDate: '2025-11-18',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251119',
                            displayName: 'November 19, 2025',
                            startDate: '2025-11-19',
                            endDate: '2025-11-19',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251120',
                            displayName: 'November 20, 2025',
                            startDate: '2025-11-20',
                            endDate: '2025-11-20',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251121',
                            displayName: 'November 21, 2025',
                            startDate: '2025-11-21',
                            endDate: '2025-11-21',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251122',
                            displayName: 'November 22, 2025',
                            startDate: '2025-11-22',
                            endDate: '2025-11-22',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251123',
                            displayName: 'November 23, 2025',
                            startDate: '2025-11-23',
                            endDate: '2025-11-23',
                        },
                        {
                            periodType: 'DAILY',
                            id: '20251124',
                            displayName: 'November 24, 2025',
                            startDate: '2025-11-24',
                            endDate: '2025-11-24',
                        },
                    ],
                })
            }
        })
    })
    describe('periods for the period last 14 days', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_14_DAYS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 14 days', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(14)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'DAILY',
                    id: 'LAST_14_DAYS',
                    displayName: 'Last 14 days',
                })
                expect(selectedPeriod.fixedPeriods[0]).toEqual({
                    periodType: 'DAILY',
                    id: '20251111',
                    iso: '20251111',
                    name: '2025-11-11',
                    displayName: 'November 11, 2025',
                    startDate: '2025-11-11',
                    endDate: '2025-11-11',
                })
                expect(selectedPeriod.fixedPeriods[13]).toEqual({
                    periodType: 'DAILY',
                    id: '20251124',
                    displayName: 'November 24, 2025',
                    iso: '20251124',
                    name: '2025-11-24',
                    startDate: '2025-11-24',
                    endDate: '2025-11-24',
                })
            }
        })
    })
    describe('periods for the period last 30 days', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_30_DAYS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 30 days', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(30)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'DAILY',
                    id: 'LAST_30_DAYS',
                    displayName: 'Last 30 days',
                })
                expect(selectedPeriod.fixedPeriods[0]).toEqual({
                    periodType: 'DAILY',
                    id: '20251026',
                    iso: '20251026',
                    name: '2025-10-26',
                    displayName: 'October 26, 2025',
                    startDate: '2025-10-26',
                    endDate: '2025-10-26',
                })
                expect(selectedPeriod.fixedPeriods[29]).toEqual({
                    periodType: 'DAILY',
                    id: '20251124',
                    iso: '20251124',
                    name: '2025-11-24',
                    displayName: 'November 24, 2025',
                    startDate: '2025-11-24',
                    endDate: '2025-11-24',
                })
            }
        })
    })
    describe('periods for the period last 60 days', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_60_DAYS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 60 days', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(60)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'DAILY',
                    id: 'LAST_60_DAYS',
                    displayName: 'Last 60 days',
                })
                expect(selectedPeriod.fixedPeriods[0]).toEqual({
                    periodType: 'DAILY',
                    id: '20250926',
                    displayName: 'September 26, 2025',
                    iso: '20250926',
                    name: '2025-09-26',
                    startDate: '2025-09-26',
                    endDate: '2025-09-26',
                })
                expect(selectedPeriod.fixedPeriods[59]).toEqual({
                    periodType: 'DAILY',
                    id: '20251124',
                    iso: '20251124',
                    name: '2025-11-24',
                    displayName: 'November 24, 2025',
                    startDate: '2025-11-24',
                    endDate: '2025-11-24',
                })
            }
        })
    })
    describe('periods for the period last 90 days', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_90_DAYS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 90 days', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(90)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'DAILY',
                    id: 'LAST_90_DAYS',
                    displayName: 'Last 90 days',
                })
                expect(selectedPeriod.fixedPeriods[0]).toEqual({
                    periodType: 'DAILY',
                    id: '20250827',
                    iso: '20250827',
                    name: '2025-08-27',
                    displayName: 'August 27, 2025',
                    startDate: '2025-08-27',
                    endDate: '2025-08-27',
                })
                expect(selectedPeriod.fixedPeriods[89]).toEqual({
                    periodType: 'DAILY',
                    id: '20251124',
                    iso: '20251124',
                    name: '2025-11-24',
                    displayName: 'November 24, 2025',
                    startDate: '2025-11-24',
                    endDate: '2025-11-24',
                })
            }
        })
    })
    describe('periods for the period last 180 days', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_180_DAYS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 180 days', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(180)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'DAILY',
                    id: 'LAST_180_DAYS',
                    displayName: 'Last 180 days',
                })
                expect(selectedPeriod.fixedPeriods[0]).toEqual({
                    periodType: 'DAILY',
                    id: '20250529',
                    iso: '20250529',
                    name: '2025-05-29',
                    displayName: 'May 29, 2025',
                    startDate: '2025-05-29',
                    endDate: '2025-05-29',
                })
                expect(selectedPeriod.fixedPeriods[179]).toEqual({
                    periodType: 'DAILY',
                    id: '20251124',
                    iso: '20251124',
                    name: '2025-11-24',
                    displayName: 'November 24, 2025',
                    startDate: '2025-11-24',
                    endDate: '2025-11-24',
                })
            }
        })
    })
})

describe('QUARTERLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'QUARTERLY',
        referenceDate: referenceDate.toString(),
    })

    it('should generate correct number of periods', () => {
        // From constants: THIS_QUARTER, LAST_QUARTER, LAST_4_QUARTERS, QUARTERS_THIS_YEAR
        expect(periods.length).toEqual(4)
    })

    it('should generate correct period for the period this quarter', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_QUARTER'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'QUARTERLY',
                id: 'THIS_QUARTER',
                displayName: 'This quarter',
                fixedPeriods: [
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q4',
                        iso: '2025Q4',
                        name: 'October - December 2025',
                        displayName: 'October - December 2025',
                        startDate: '2025-10-01',
                        endDate: '2025-12-31',
                    },
                ],
            })
        }
    })

    it('should generate correct period for the period last quarter', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_QUARTER'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'QUARTERLY',
                id: 'LAST_QUARTER',
                displayName: 'Last quarter',
                fixedPeriods: [
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q3',
                        iso: '2025Q3',
                        name: 'July - September 2025',
                        displayName: 'July - September 2025',
                        startDate: '2025-07-01',
                        endDate: '2025-09-30',
                    },
                ],
            })
        }
    })

    describe('periods for the period last 4 quarters', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_4_QUARTERS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 4 quarters', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(4)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'QUARTERLY',
                    id: 'LAST_4_QUARTERS',
                    displayName: 'Last 4 quarters',
                })
                const expected = [
                    {
                        periodType: 'QUARTERLY',
                        id: '2024Q4',
                        iso: '2024Q4',
                        name: 'October - December 2024',
                        displayName: 'October - December 2024',
                        startDate: '2024-10-01',
                        endDate: '2024-12-31',
                    },
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q1',
                        iso: '2025Q1',
                        name: 'January - March 2025',
                        displayName: 'January - March 2025',
                        startDate: '2025-01-01',
                        endDate: '2025-03-31',
                    },
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q2',
                        iso: '2025Q2',
                        name: 'April - June 2025',
                        displayName: 'April - June 2025',
                        startDate: '2025-04-01',
                        endDate: '2025-06-30',
                    },
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q3',
                        iso: '2025Q3',
                        name: 'July - September 2025',
                        displayName: 'July - September 2025',
                        startDate: '2025-07-01',
                        endDate: '2025-09-30',
                    },
                ]
                expect(selectedPeriod.fixedPeriods).toEqual(expected)
            }
        })
    })

    describe('periods for quarters this year', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'QUARTERS_THIS_YEAR'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 4 quarters', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(4)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'QUARTERLY',
                    id: 'QUARTERS_THIS_YEAR',
                    displayName: 'Quarters this year',
                })
                const expected = [
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q1',
                        iso: '2025Q1',
                        name: 'January - March 2025',
                        displayName: 'January - March 2025',
                        startDate: '2025-01-01',
                        endDate: '2025-03-31',
                    },
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q2',
                        iso: '2025Q2',
                        name: 'April - June 2025',
                        displayName: 'April - June 2025',
                        startDate: '2025-04-01',
                        endDate: '2025-06-30',
                    },
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q3',
                        iso: '2025Q3',
                        name: 'July - September 2025',
                        displayName: 'July - September 2025',
                        startDate: '2025-07-01',
                        endDate: '2025-09-30',
                    },
                    {
                        periodType: 'QUARTERLY',
                        id: '2025Q4',
                        iso: '2025Q4',
                        name: 'October - December 2025',
                        displayName: 'October - December 2025',
                        startDate: '2025-10-01',
                        endDate: '2025-12-31',
                    },
                ]
                expect(selectedPeriod.fixedPeriods).toEqual(expected)
            }
        })
    })
})

describe('SIXMONTHLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'SIXMONTHLY',
        referenceDate: referenceDate.toString(),
    })

    it('should generate correct number of periods', () => {
        // From constants: THIS_SIX_MONTH, LAST_SIX_MONTH, LAST_2_SIXMONTHS
        expect(periods.length).toEqual(3)
    })

    it('should generate correct period for the period this six-month', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_SIX_MONTH'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'SIXMONTHLY',
                id: 'THIS_SIX_MONTH',
                displayName: 'This six-month',
                fixedPeriods: [
                    {
                        periodType: 'SIXMONTHLY',
                        id: '2025S2',
                        iso: '2025S2',
                        name: 'July - December 2025',
                        displayName: 'July - December 2025',
                        startDate: '2025-07-01',
                        endDate: '2025-12-31',
                    },
                ],
            })
        }
    })

    it('should generate correct period for the period last six-month', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_SIX_MONTH'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'SIXMONTHLY',
                id: 'LAST_SIX_MONTH',
                displayName: 'Last six-month',
                fixedPeriods: [
                    {
                        periodType: 'SIXMONTHLY',
                        id: '2025S1',
                        iso: '2025S1',
                        name: 'January - June 2025',
                        displayName: 'January - June 2025',
                        startDate: '2025-01-01',
                        endDate: '2025-06-30',
                    },
                ],
            })
        }
    })

    describe('periods for the period last 2 six-month', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_2_SIXMONTHS'
        )
        it('should be defined', () => {
            expect(selectedPeriod).toBeDefined()
        })
        it('should generate 2 six-months', () => {
            expect(selectedPeriod?.fixedPeriods.length).toEqual(2)
        })
        it('should generate correct period', () => {
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    periodType: 'SIXMONTHLY',
                    id: 'LAST_2_SIXMONTHS',
                    displayName: 'Last 2 six-month',
                })
                const expected = [
                    {
                        periodType: 'SIXMONTHLY',
                        id: '2024S2',
                        iso: '2024S2',
                        name: 'July - December 2024',
                        displayName: 'July - December 2024',
                        startDate: '2024-07-01',
                        endDate: '2024-12-31',
                    },
                    {
                        periodType: 'SIXMONTHLY',
                        id: '2025S1',
                        iso: '2025S1',
                        name: 'January - June 2025',
                        displayName: 'January - June 2025',
                        startDate: '2025-01-01',
                        endDate: '2025-06-30',
                    },
                ]
                expect(selectedPeriod.fixedPeriods).toEqual(expected)
            }
        })
    })
})

describe('YEARLY relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'YEARLY',
        referenceDate: referenceDate.toString(),
    })
    it('should generate correct number of periods', () => {
        expect(periods.length).toEqual(4)
    })
    it(`should generate correct period for the period this year`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_YEAR'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'YEARLY',
                id: 'THIS_YEAR',
                displayName: 'This year',
                name: 'This year',
                fixedPeriods: [
                    {
                        periodType: 'YEARLY',
                        id: '2025',
                        name: '2025',
                        displayName: '2025',
                        startDate: '2025-01-01',
                        endDate: '2025-12-31',
                    },
                ],
            })
        }
    })
    it(`should generate correct period for the period last year`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_YEAR'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                id: 'LAST_YEAR',
                displayName: 'Last year',
                fixedPeriods: [
                    {
                        periodType: 'YEARLY',
                        id: '2024',
                        name: '2024',
                        displayName: '2024',
                        startDate: '2024-01-01',
                        endDate: '2024-12-31',
                    },
                ],
            })
        }
    })
    describe('periods for the period last 5 years', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_5_YEARS'
        )
        it(`should be defined`, () => expect(selectedPeriod).toBeDefined())
        it(`should generate 5 years`, () => {
            expect(selectedPeriod?.fixedPeriods?.length).toEqual(5)
        })
        it(`should generate correct period`, () => {
            expect(selectedPeriod).toBeDefined()
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    id: 'LAST_5_YEARS',
                    name: 'Last 5 years',
                })
                expect(selectedPeriod.fixedPeriods[0]).toMatchObject({
                    id: '2020',
                    startDate: '2020-01-01',
                    endDate: '2020-12-31',
                })
                expect(selectedPeriod.fixedPeriods[4]).toMatchObject({
                    id: '2024',
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                })
            }
        })
    })
})

describe('FINANCIAL YEAR relative periods', () => {
    const periods = generateRelativePeriods({
        periodType: 'FINANCIAL',
        referenceDate: referenceDate.toString(),
    })
    it('should generate correct number of periods', () => {
        expect(periods.length).toEqual(3)
    })
    it(`should generate correct period for the period this financial year`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'THIS_FINANCIAL_YEAR'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'FINANCIAL',
                id: 'THIS_FINANCIAL_YEAR',
                displayName: 'This financial year',
                name: 'This financial year',
                fixedPeriods: [
                    {
                        periodType: 'FYOCT',
                        id: '2025Oct',
                        name: 'October 2025 - September 2026',
                        displayName: 'October 2025 - September 2026',
                        startDate: '2025-10-01',
                        endDate: '2026-09-30',
                    },
                ],
            })
        }
    })

    it(`should generate correct period for the period last financial year`, () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_FINANCIAL_YEAR'
        )
        expect(selectedPeriod).toBeDefined()
        if (selectedPeriod) {
            expect(selectedPeriod).toMatchObject({
                periodType: 'FINANCIAL',
                id: 'LAST_FINANCIAL_YEAR',
                displayName: 'Last financial year',
                fixedPeriods: [
                    {
                        periodType: 'FYOCT',
                        id: '2024Oct',
                        name: 'October 2024 - September 2025',
                        displayName: 'October 2024 - September 2025',
                        startDate: '2024-10-01',
                        endDate: '2025-09-30',
                    },
                ],
            })
        }
    })

    describe('periods for the period last 5 financial years', () => {
        const selectedPeriod = periods.find(
            (period) => period.id === 'LAST_5_FINANCIAL_YEARS'
        )
        it(`should be defined`, () => expect(selectedPeriod).toBeDefined())
        it(`should generate 5 financial years`, () => {
            expect(selectedPeriod?.fixedPeriods?.length).toEqual(5)
        })
        it(`should generate correct period`, () => {
            expect(selectedPeriod).toBeDefined()
            if (selectedPeriod) {
                expect(selectedPeriod).toMatchObject({
                    id: 'LAST_5_FINANCIAL_YEARS',
                    name: 'Last 5 financial years',
                })
                expect(selectedPeriod.fixedPeriods[0]).toMatchObject({
                    id: '2020Oct',
                    startDate: '2020-10-01',
                    endDate: '2021-09-30',
                })
                expect(selectedPeriod.fixedPeriods[4]).toMatchObject({
                    id: '2024Oct',
                    startDate: '2024-10-01',
                    endDate: '2025-09-30',
                })
            }
        })
    })
})
