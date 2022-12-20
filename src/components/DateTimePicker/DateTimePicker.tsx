import React, { useState, useEffect } from 'react'
import { MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE } from '../../configs/calendar'
import DateInput from '../DateInput/DateInput'
import TimeInput from '../TimeInput/TimeInput'
import s from './DateTimePicker.module.css'

interface Props {
    setDateAndTime: React.Dispatch<React.SetStateAction<number | null>>
}

const DateTimePicker:React.FC<Props> = ({ setDateAndTime}) => {
    const [isDatePickerDisplayed, setIsDatePickerDisplayed] = useState(false)
    const [isTimePickerDisplayed, setIsTimePickerDisplayed] = useState(false)
    const [date,setDate] = useState(0)
    const [time, setTime] = useState('00:00')

    useEffect(() => {
            setDateAndTime(date + +time.split(':')[0] * MILISECONDS_IN_HOUR + +time.split(':')[1] * MILISECONDS_IN_MINUTE)

    },[date, time, setDateAndTime])
    

    return (
        <div className={s.container}> 
            <div className={s.text}>{date === 0 ? 'Select ' : ''}
                <span className={date === 0 ? s.clickWord : s.pointer} onClick={() => setIsDatePickerDisplayed(b => !b)}> 
                    {date === 0 ? ' date' : new Date(date).toDateString()}
                </span>
                {isTimePickerDisplayed ? ',' : ', Select '}
                <span onClick={() => setIsTimePickerDisplayed(true)}>
                    {isTimePickerDisplayed 
                        ? <div className={s.timeContainer}><TimeInput setTime={setTime}/></div> 
                        : <span className={s.clickWord}>time </span>}
                </span>
            </div> 
            
            {isDatePickerDisplayed && <div className={s.inputContainer}>
                <div className={date === 0 ? s.exit : `${s.exit} ${s.exitWhenPicked}`} onClick={() => setIsDatePickerDisplayed(false)}>x</div>
                <DateInput pickedDate={date} setPickedDate={setDate}/>
            </div>}
        </div>
    )
}

export default DateTimePicker