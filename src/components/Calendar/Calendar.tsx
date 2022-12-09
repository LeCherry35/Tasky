import React, { useState, useEffect } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { DAYS_IN_WEEK, MILISECONDS_IN_DAY, weekdays } from '../../configs/calendar'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './Calendar.module.css'
import { months } from '../../configs/calendar'
import { countWeekdaysBeforeMonth } from '../../helpers/countWeekDaysBeforeMonth'
import InputField from '../InputField/InputField'

const Calendar = () => {
    const {todos, completedTodos} = useTypedSelector(state => state.todos)    
    const [days, setDays] = useState<number[]>([])
    const now = new Date()
    const weekdayToday = now.getDay()
    const monthToday = now.getMonth()
    const [showDaysFrom, setShowDaysFrom] = useState<number>(0)
    const dateToday = now.getDate()
    const timestampToday = new Date(now.getFullYear(), monthToday, dateToday).valueOf()
    const emptyWeekdaysNumber = countWeekdaysBeforeMonth(weekdayToday,dateToday)
    const weeksShown = 6
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
    },[])
    useEffect(() => {
        
    },[showDaysFrom])
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
        <InputField />
        <div className={s.container}>
            <button className={s.showMoreButton} onClick={showPreviousWeek}>
                <FaChevronUp/>
            </button>
            <div className={s.days}>
                {weekdays.map(weekday => {
                    return (
                        <div className={s.weekdayName} >{weekday}</div>
                    )
                })}
                {days.map((day, id) => {
                    if(id >= showDaysFrom && id < showDaysFrom + DAYS_IN_WEEK * weeksShown) {
                        let dayDate
                        dayDate = new Date(day)
                        const deadlineTodos = todos.filter(todo => {
                            if (todo.deadline !== undefined) {
                                return todo.deadline >= day && todo.deadline <= day + 24* 60 *60 *1000
                            } else {
                                return false
                            }
                        })
                        return (
                            <div 
                                className={day === timestampToday ?`${s.today} ${s.day}` : s.day} 
                                key={day}
                            >
                                <span>{dayDate.getDate()}</span> 
                                <span>{ months[dayDate.getMonth()].name.substring(0,3)}</span>
                                <br/>
                                <span>{deadlineTodos.map((todo, id) => '!')}</span>
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

export default Calendar