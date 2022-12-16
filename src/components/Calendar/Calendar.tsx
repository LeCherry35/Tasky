import React, { useState } from 'react'
import s from './Calendar.module.css'
import DateInput from '../DateInput/DateInput'

const Calendar = () => {
    const [date, setDate] = useState(0)
    return (
        <div className={s.container}>
        <DateInput pickedDate={date} setPickedDate={setDate}/>
        </div>
    )
}

export default Calendar