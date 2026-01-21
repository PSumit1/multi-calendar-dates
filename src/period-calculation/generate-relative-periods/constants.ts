import i18n from '@dhis2/d2-i18n'

interface BaseRelativePeriodTypeConfig {
    id: string
    name: string
}

export interface ThisYearRelativePeriodTypeConfig
    extends BaseRelativePeriodTypeConfig {
    thisYear: true
}

export interface DurationRelativePeriodTypeConfig
    extends BaseRelativePeriodTypeConfig {
    thisYear?: false
    offset: number
    duration: number
}

export type RelativePeriodTypeConfig =
    | ThisYearRelativePeriodTypeConfig
    | DurationRelativePeriodTypeConfig

export const getMonthsPeriodType = (): Array<RelativePeriodTypeConfig> => [
    { id: 'THIS_MONTH', name: i18n.t('This month'), offset: 0, duration: 1 },
    { id: 'LAST_MONTH', name: i18n.t('Last month'), offset: -1, duration: 1 },
    {
        id: 'LAST_3_MONTHS',
        name: i18n.t('Last 3 months'),
        offset: -1,
        duration: 3,
    },
    {
        id: 'LAST_6_MONTHS',
        name: i18n.t('Last 6 months'),
        offset: -1,
        duration: 6,
    },
    {
        id: 'LAST_12_MONTHS',
        name: i18n.t('Last 12 months'),
        offset: -1,
        duration: 12,
    },
    {
        id: 'MONTHS_THIS_YEAR',
        name: i18n.t('Months this year'),
        thisYear: true,
    },
]

export const getDaysPeriodType = (): Array<RelativePeriodTypeConfig> => [
    { id: 'TODAY', name: i18n.t('Today'), offset: 0, duration: 1 },
    { id: 'YESTERDAY', name: i18n.t('Yesterday'), offset: -1, duration: 1 },
    { id: 'LAST_3_DAYS', name: i18n.t('Last 3 days'), offset: -1, duration: 3 },
    { id: 'LAST_7_DAYS', name: i18n.t('Last 7 days'), offset: -1, duration: 7 },
    {
        id: 'LAST_14_DAYS',
        name: i18n.t('Last 14 days'),
        offset: -1,
        duration: 14,
    },
    {
        id: 'LAST_30_DAYS',
        name: i18n.t('Last 30 days'),
        offset: -1,
        duration: 30,
    },
    {
        id: 'LAST_60_DAYS',
        name: i18n.t('Last 60 days'),
        offset: -1,
        duration: 60,
    },
    {
        id: 'LAST_90_DAYS',
        name: i18n.t('Last 90 days'),
        offset: -1,
        duration: 90,
    },
    {
        id: 'LAST_180_DAYS',
        name: i18n.t('Last 180 days'),
        offset: -1,
        duration: 180,
    },
]

export const getWeeksPeriodType = (): Array<RelativePeriodTypeConfig> => [
    { id: 'THIS_WEEK', name: i18n.t('This week'), offset: 0, duration: 1 },
    { id: 'LAST_WEEK', name: i18n.t('Last week'), offset: -1, duration: 1 },
    {
        id: 'LAST_4_WEEKS',
        name: i18n.t('Last 4 weeks'),
        offset: -1,
        duration: 4,
    },
    {
        id: 'LAST_12_WEEKS',
        name: i18n.t('Last 12 weeks'),
        offset: -1,
        duration: 12,
    },
    {
        id: 'LAST_52_WEEKS',
        name: i18n.t('Last 52 weeks'),
        offset: -1,
        duration: 52,
    },
    {
        id: 'WEEKS_THIS_YEAR',
        name: i18n.t('Weeks this year'),
        offset: 51,
        duration: 52,
    },
]

export const getBiWeeksPeriodType = (): Array<RelativePeriodTypeConfig> => [
    { id: 'THIS_BIWEEK', name: i18n.t('This bi-week'), offset: 0, duration: 1 },
    {
        id: 'LAST_BIWEEK',
        name: i18n.t('Last bi-week'),
        offset: -1,
        duration: 1,
    },
    {
        id: 'LAST_4_BIWEEKS',
        name: i18n.t('Last 4 bi-weeks'),
        offset: -1,
        duration: 4,
    },
]

export const getBiMonthsPeriodType = (): Array<RelativePeriodTypeConfig> => [
    {
        id: 'THIS_BIMONTH',
        name: i18n.t('This bi-month'),
        offset: 0,
        duration: 1,
    },
    {
        id: 'LAST_BIMONTH',
        name: i18n.t('Last bi-month'),
        offset: -1,
        duration: 1,
    },
    {
        id: 'LAST_6_BIMONTHS',
        name: i18n.t('Last 6 bi-months'),
        offset: -1,
        duration: 6,
    },
    {
        id: 'BIMONTHS_THIS_YEAR',
        name: i18n.t('Bi-months this year'),
        thisYear: true,
    },
]

export const getQuartersPeriodType = (): Array<RelativePeriodTypeConfig> => [
    {
        id: 'THIS_QUARTER',
        name: i18n.t('This quarter'),
        offset: 0,
        duration: 1,
    },
    {
        id: 'LAST_QUARTER',
        name: i18n.t('Last quarter'),
        offset: -1,
        duration: 1,
    },
    {
        id: 'LAST_4_QUARTERS',
        name: i18n.t('Last 4 quarters'),
        offset: -1,
        duration: 4,
    },
    {
        id: 'QUARTERS_THIS_YEAR',
        name: i18n.t('Quarters this year'),
        offset: 3,
        duration: 4,
    },
]

export const getSixMonthsPeriodType = (): Array<RelativePeriodTypeConfig> => [
    {
        id: 'THIS_SIX_MONTH',
        name: i18n.t('This six-month'),
        offset: 0,
        duration: 1,
    },
    {
        id: 'LAST_SIX_MONTH',
        name: i18n.t('Last six-month'),
        offset: -1,
        duration: 1,
    },
    {
        id: 'LAST_2_SIXMONTHS',
        name: i18n.t('Last 2 six-month'),
        offset: -1,
        duration: 2,
    },
]

export const getFinancialYearsPeriodType =
    (): Array<RelativePeriodTypeConfig> => [
        {
            id: 'THIS_FINANCIAL_YEAR',
            name: i18n.t('This financial year'),
            offset: 0,
            duration: 1,
        },
        {
            id: 'LAST_FINANCIAL_YEAR',
            name: i18n.t('Last financial year'),
            offset: -1,
            duration: 1,
        },
        {
            id: 'LAST_5_FINANCIAL_YEARS',
            name: i18n.t('Last 5 financial years'),
            offset: -1,
            duration: 5,
        },
    ]

export const getYearsPeriodType = (): Array<RelativePeriodTypeConfig> => [
    { id: 'THIS_YEAR', name: i18n.t('This year'), offset: 0, duration: 1 },
    { id: 'LAST_YEAR', name: i18n.t('Last year'), offset: -1, duration: 1 },
    {
        id: 'LAST_5_YEARS',
        name: i18n.t('Last 5 years'),
        offset: -1,
        duration: 5,
    },
    {
        id: 'LAST_10_YEARS',
        name: i18n.t('Last 10 years'),
        offset: -1,
        duration: 10,
    },
]
