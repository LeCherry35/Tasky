import React from 'react'
import s from './Calendar.module.css'
import CalendarView from '../DatePicker/CalendarView'

const Calendar = () => {
    return (
        <div className={s.container}>
        <CalendarView/>
        </div>
    )
}

export default Calendar