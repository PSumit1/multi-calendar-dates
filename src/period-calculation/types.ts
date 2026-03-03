import { periodTypes, relativePeriodTypes } from './period-types'

export type PeriodType = typeof periodTypes[number]
export type RelativePeriodType = typeof relativePeriodTypes[number]

export type FixedPeriod = {
    periodType: PeriodType
    id: string
    iso?: string
    name: string
    displayName: string
    startDate: string
    endDate: string
}

export type RelativePeriod = {
    periodType: RelativePeriodType
    name: string
    displayName: string
    id: string
    fixedPeriods?: FixedPeriod[]
}
