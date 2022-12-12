import React, { useState } from 'react'
import s from './Calendar.module.css'
import InputField from '../InputField/InputField'
import DateInput from '../DateInput/DateInput'

const Calendar = () => {
    const [date, setDate] = useState(0)
    return (
        <div className={s.container}>
        <InputField />
        <DateInput pickedDate={date} setPickedDate={setDate}/>
        </div>
    )
}

export default Calendar