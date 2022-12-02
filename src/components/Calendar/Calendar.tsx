import React, { useState, useEffect } from 'react'
import { weekdays } from '../../configs/weekdays'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './Calendar.module.css'
import { months } from '../../configs/weekdays'

const Calendar = () => {
    const [days, setDays] = useState<number[]>([])
    const now = new Date(Date.now())
    const weekday = now.getDay()
    const month = now.getMonth()
    const date = now.getDate()
    // console.log('44', weekday);
    
    useEffect(() => {
        const d: number[] = new Array(weekday - 1).fill(0)
        for (let i = 1; i <= months[month].days; i++) {
            d.push(i)
        }
        setDays(d)
    },[])
    
    
    

    const {todos, completedTodos} = useTypedSelector(state => state.todos)    
  return (
    <div className={s.container}>
        <div className={s.days}>
            {weekdays.map(weekday => {
                return (
                    <div className={s.weekdayName} >{weekday}</div>
                )
            })}
            {days.map(day => {
                return (
                    <div className={day !== 0 ? s.day : ''}>{day !== 0 && day}</div>
                )
            })}
        </div>
    </div>
  )
}

export default Calendar