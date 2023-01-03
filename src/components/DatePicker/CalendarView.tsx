import React, { useState, useEffect, useMemo } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { DAYS_IN_WEEK, MILISECONDS_IN_DAY, weekdays } from '../../configs/calendar'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './DatePicker.module.css'
import { months } from '../../configs/calendar'
import { countWeekdaysBeforeMonth } from '../../helpers/countWeekDaysBeforeMonth'
import { useNavigate } from 'react-router-dom'


const CalendarView: React.FC = () => {
    const { todos } = useTypedSelector(state => state.todos)
    const { events } = useTypedSelector(state => state.events)

    const [days, setDays] = useState<number[]>([])
    const [showDaysFrom, setShowDaysFrom] = useState<number>(0)
    
    const weeksShown = 6
    const now = useMemo(() => new Date(),[]) 
    const weekdayToday = now.getDay()
    const monthToday = now.getMonth()
    const dateToday = now.getDate()
    const timestampToday = new Date(now.getFullYear(), monthToday, dateToday).valueOf()
    const emptyWeekdaysNumber = countWeekdaysBeforeMonth(weekdayToday,dateToday)

const navigate = useNavigate()

    useEffect(() => {
        const d: number[] = []
        for (let i = 1; i <= emptyWeekdaysNumber; i++) {
            const date = new Date(now.getFullYear(), monthToday, i - emptyWeekdaysNumber).valueOf()
            d.push(date)
        }
        for (let i = 1; i <= months[monthToday].days; i++) {
            const date = new Date(now.getFullYear(), monthToday, i).valueOf()
            d.push(date)
        }
        while ((d.length) < weeksShown * DAYS_IN_WEEK) {
            d.push(d[d.length - 1] + MILISECONDS_IN_DAY)
        }
        setDays(d)
    },[emptyWeekdaysNumber, now, monthToday])
    const showPreviousWeek = () => {
        if (showDaysFrom === 0) {
            getPreviousWeek()
        } else {            
            setShowDaysFrom(() => showDaysFrom - DAYS_IN_WEEK)
        }
    }
    const showNextWeek = () => {
        if (showDaysFrom === 0) {
            getNextWeek()
            setShowDaysFrom(() => showDaysFrom + DAYS_IN_WEEK)
        } else {
            getNextWeek()
            setShowDaysFrom(() => showDaysFrom + DAYS_IN_WEEK)
        }
    }
    const getPreviousWeek = () => {
        const newDays = []
        for (let i = 0; i < DAYS_IN_WEEK; i++ ) {
            newDays.push(days[0] - (DAYS_IN_WEEK - i) * MILISECONDS_IN_DAY)
        }
        setDays([...newDays,...days])
    }
    const getNextWeek = () => {
        const newDays = []
        for (let i = 0; i < DAYS_IN_WEEK; i++ ) {
            newDays.push(days[days.length - 1] + (i + 1) * MILISECONDS_IN_DAY)
        }
        
        setDays([...days, ...newDays])
    }
    

    return (
        <>
        <div className={s.container}>
            <button className={s.showMoreButton} onClick={showPreviousWeek}>
                <FaChevronUp/>
            </button>
            <div className={s.days}>
                {weekdays.map(weekday => {
                    return (
                        <div key={weekday} className={s.weekdayName} >{weekday}</div>
                    )
                })}
                {days.map((day, id) => {
                    if(id >= showDaysFrom && id < showDaysFrom + DAYS_IN_WEEK * weeksShown) {
                        const dayDate = new Date(day)
                        const dayM = dayDate.getMonth()
                        // const daysInM = months[dayM].days
                        // const dayD = dayDate.getDate()
                        let classes 
                        switch(day) {
                            case timestampToday:
                                classes = `${s.today} ${s.day}`
                                break
                            default:
                                classes = s.day
                        }

                     
                                
                        const deadlineTodos = todos.filter(todo => {
                            if (todo.deadline !== undefined) {
                                return todo.deadline >= day && todo.deadline <= day + MILISECONDS_IN_DAY
                            } else {
                                return false
                            }
                        })
                        const eventsStart = events.filter(event => {
                            return event.startsAt >= day && event.startsAt <= day + MILISECONDS_IN_DAY
                        })
                        return (
                            <div 
                                className={classes} 
                                key={day}
                                onClick={(e) => navigate(`/day/${day}`)}
                            >
                                {/* {(dayDate.getDay() === 1 && dayD + 7 > daysInM) &&
                                <div className={s.monthName}>
                                    {months[dayM + 1].name}
                                </div>} */}
                                <span className={s.dateNumber}>{dayDate.getDate()}</span> 
                                {(dayDate.getDate() === 1  || dayDate.getDay() === 1) &&
                                <div className={s.monthName}>
                                    {months[dayM].name.substring(0,3)}
                                </div>}
                                {/* <span>{ months[dayDate.getMonth()].name.substring(0,3)}</span> */}
                                <br/>
                                <span className={s.mark}>{deadlineTodos.map((todo, id) => '!')}</span>
                                <span className={s.mark}>{eventsStart.map((event, id) => 'E')}</span>
                            </div>
                        )
                    } else return <></>
                    
                })}
            </div>
            <button className={s.showMoreButton} onClick={showNextWeek}>
                <FaChevronDown/>
            </button>
        </div>
        </>
    )
}

export default CalendarView