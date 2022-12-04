import React, { useState, useEffect } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { weekdays } from '../../configs/weekdays'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './Calendar.module.css'
import { months } from '../../configs/weekdays'
import { countWeekdaysBeforeMonth } from '../../helpers/countWeekDaysBeforeMonth'

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
        while ((d.length) % 7 !==0) {
            d.push(d[d.length - 1] + 24 * 60 * 60 * 1000)
        }
        setDays(d)
    },[])
    useEffect(() => {
        console.log('d',showDaysFrom);
        
    },[showDaysFrom])
    const showPreviousWeek = () => {
        if (showDaysFrom === 0) {
            getPreviousWeek()
        } else {            
            setShowDaysFrom(() => showDaysFrom - 7)
        }
    }
    const showNextWeek = () => {
        if (showDaysFrom === 0) {
            getNextWeek()
            if (days.length > 7 * 5){
                setShowDaysFrom(() => showDaysFrom + 7)
        console.log('dkkkk',showDaysFrom);

            }
        } else {
            getNextWeek()
            setShowDaysFrom(() => showDaysFrom + 7)
            
        }
    }
    const getPreviousWeek = () => {
        const newDays = []
        for (let i = 0; i < 7; i++ ) {
            newDays.push(days[0] - (7 - i) * 24 * 60 * 60 * 1000)
        }
        setDays([...newDays,...days])
    }
    const getNextWeek = () => {
        const newDays = []
        for (let i = 0; i < 7; i++ ) {
            newDays.push(days[days.length - 1] + (i + 1) * 24 * 60 * 60 * 1000)
        }
        
        setDays([...days, ...newDays])
    }
    

    return (
        <div className={s.container}>
            {/* <div className={s.month}>{months[month].name}</div> */}
            <button className={s.showMoreButton} onClick={showPreviousWeek}>
                <FaChevronUp/>
                {/* {months[monthToday === 0 ? 11 : monthToday - 1].name} */}
            </button>
            <div className={s.days}>
                {weekdays.map(weekday => {
                    return (
                        <div className={s.weekdayName} >{weekday}</div>
                    )
                })}
                {days.map((day, id) => {
                    if(id >= showDaysFrom && id < showDaysFrom + 42) {
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
                                className={day === timestampToday ? s.today : s.day} 
                                key={day}
                            >
                                <span>{dayDate.getDate()}</span> 
                                <span>{ months[dayDate.getMonth()].name.substring(0,3)}</span>
                                <br/>
                                <span>{deadlineTodos.map(todo => '!')}</span>
                            </div>
                        )
                    }
                })}
            </div>
            <button className={s.showMoreButton} onClick={showNextWeek}>
                <FaChevronDown/>
                {/* {months[monthToday === 11 ? 0 : monthToday + 1].name} */}
                </button>
        </div>
    )
}

export default Calendar