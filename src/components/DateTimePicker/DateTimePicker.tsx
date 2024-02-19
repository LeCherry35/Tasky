import React, { useState, useEffect } from 'react'
import { MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE } from '../../configs/calendar'
import DateInput from '../DatePicker/DatePicker'
import DeadlinePickerSingleDay from '../SingleDay/DeadlinePickerSingleDay'
import TimeInput from '../TimeInput/TimeInput'
import s from './DateTimePicker.module.css'

interface Props {
    setDateAndTime: React.Dispatch<React.SetStateAction<number | null>>
}

const DateTimePicker:React.FC<Props> = ({ setDateAndTime}) => {
    const [isDatePickerDisplayed, setIsDatePickerDisplayed] = useState(false)
    const [isTimePickerDisplayed, setIsTimePickerDisplayed] = useState(false)
    const [isDayViewDisplayed, setIsDayViewDisplayed] = useState(false)
    const [date,setDate] = useState(0)
    const [time, setTime] = useState('12:00')

    useEffect(() => {
            setDateAndTime(date + +time.split(':')[0] * MILISECONDS_IN_HOUR + +time.split(':')[1] * MILISECONDS_IN_MINUTE)
            
    },[date, time, setDateAndTime])
    
    const setPickedDate = (date: number) => {
        setDate(date)
        setIsDatePickerDisplayed(false)
        setIsDayViewDisplayed(true)
        setIsTimePickerDisplayed(true)
    }

    const dateClickHandler = () => {
        setIsDatePickerDisplayed(b => !b)
        setIsDayViewDisplayed(false)
    }
    return (
        <div className={s.container}> 
            <div className={s.text}>{date === 0 ? 'select ' : ''}
                <span className={date === 0 ? s.clickWord : s.pointer} onClick={dateClickHandler}> 
                    {date === 0 ? ' date' : new Date(date).toDateString()}
                </span>
                {isTimePickerDisplayed ? ',' : ', select '}
                <span onClick={() => setIsTimePickerDisplayed(true)}>
                    {isTimePickerDisplayed 
                        ? <div className={s.timeContainer}><TimeInput setTime={setTime} time={time}/></div> 
                        : <span className={s.clickWord}>time </span>}
                </span>
            </div> 
            
            {isDayViewDisplayed && <div className={s.inputContainer}>
                <div className={date === 0 ? s.exit : `${s.exit} ${s.exitWhenPicked}`} onClick={() => setIsDayViewDisplayed(false)}>x</div>
                <DeadlinePickerSingleDay day={date} setStartsAtTime={setTime} startsAtTime={time}/>
            </div>}
            {isDatePickerDisplayed && <div className={s.inputContainer}>
                <div className={date === 0 ? s.exit : `${s.exit} ${s.exitWhenPicked}`} onClick={() => setIsDatePickerDisplayed(false)}>x</div>
                <DateInput pickedDate={date} setPickedDate={setPickedDate}/>
            </div>}
        </div>
    )
}

export default DateTimePicker