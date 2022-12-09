import { getFebDays } from '../helpers/getFebDays';
import { IMonth } from '../types/calendar';

export const MILISECONDS_IN_DAY = 24 * 60 * 60 * 1000
export const DAYS_IN_WEEK = 7
export const weekdays: string [] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const months: IMonth [] = [
    {
        name: 'January',
        days: 31
    },
    {
        name: 'February',
        days: getFebDays()
    },
    {
        name: 'March',
        days: 31
    },
    {
        name: 'April',
        days: 30
    },
    {
        name: 'May',
        days: 31
    },
    {
        name: 'June',
        days: 30
    },
    {
        name: 'July',
        days: 31
    },
    {
        name: 'August',
        days: 31
    },
    {
        name: 'September',
        days: 30
    },
    {
        name: 'October',
        days: 31
    },
    {
        name: 'November',
        days: 30
    },
    {
        name: 'December',
        days: 31
    },
]
