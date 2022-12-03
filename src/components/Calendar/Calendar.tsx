import React, { useState, useEffect } from 'react'
import { weekdays } from '../../configs/weekdays'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './Calendar.module.css'
import { months } from '../../configs/weekdays'
import { IDate } from '../../types/calendar'
import { countWeekdaysBeforeMonth } from '../../helpers/countWeekDaysBeforeMonth'

const Calendar = () => {
    const {todos, completedTodos} = useTypedSelector(state => state.todos)    
    const [days, setDays] = useState<IDate[]>([])
    const now = new Date(Date.now())
    const weekday = now.getDay()
    const month = now.getMonth()
    const date = now.getDate()
    
    useEffect(() => {
        
        const d: IDate[] = new Array(countWeekdaysBeforeMonth(weekday,date)).fill({date: 0})
        for (let i = 1; i <= months[month].days; i++) {
            d.push({date: i})
        }
        todos.map(todo => {
            if (todo.deadline) {
                const todoD = new Date(todo.deadline)
                const todoMonth = todoD.getMonth()
                const todoDate = todoD.getDate()
                if(todoMonth === month) {
                    const dayId: number = weekday - 1 + todoDate // fix this
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    d[dayId].todos = []
                    d[dayId].todos?.push(todo)
                }
            }
        }
        )
        setDays(d)
    },[])
    
    
    

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
                    <div className={day.date === 0 ? '' : (day.date === date ? s.today : s.day)}>
                        {day.date !== 0 && day.date}
                        {/* {day.todos } */}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Calendar