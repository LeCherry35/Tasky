import { MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE } from './../configs/calendar';
export const stringToTimestamp = ( day: number,time: string ) => {
    const [ h, m ] = time.split(':')
    return day + MILISECONDS_IN_HOUR * Number(h) + MILISECONDS_IN_MINUTE * Number(m)
}