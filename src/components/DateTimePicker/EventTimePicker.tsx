import React, { useState, useEffect } from 'react'
import DateInput from '../DatePicker/DatePicker'
import TimeInput from '../TimeInput/TimeInput'
import { stringToTimestamp } from '../../helpers/stringToTimestamp'
import s from './DateTimePicker.module.css'
import EventPickerSingleDay from '../SingleDay/EventPickerSingleDay'

interface Props {
    setStartsAt: React.Dispatch<React.SetStateAction<number>>
    setEndsAt: React.Dispatch<React.SetStateAction<number>>
}

const EventTimePicker:React.FC<Props> = ({ setEndsAt, setStartsAt }) => {
    const [isDatePickerDisplayed, setIsDatePickerDisplayed] = useState(false)
    const [isPickerDisplayed, setIsPickerDisplayed] = useState(false)
    const [isDayViewDisplayed, setIsDayViewDisplayed] = useState(false)
    const [startsAtDate,setStartsAtDate] = useState(Date.now())
    const [startsAtTime, setStartsAtTime] = useState('12:00')
    const [endsAtTime, setEndsAtTime] = useState('12:00')

    useEffect(() => {
            setStartsAt(stringToTimestamp(startsAtDate,startsAtTime))
            setEndsAt(stringToTimestamp(startsAtDate,endsAtTime))
    },[startsAtDate,startsAtTime, setStartsAt, endsAtTime, setEndsAt])
    
    const datePickHandler = (date: number) => {
        setIsDayViewDisplayed(true)
        setIsDatePickerDisplayed(false)
        setStartsAtDate(date)
    }
    // const setPickedDate = (date: number) => {
    //     setDate(date)
    //     setIsDatePickerDisplayed(false)
    //     setIsDayViewDisplayed(true)
    //     setIsTimePickerDisplayed(true)
    // }

    // const dateClickHandler = () => {
    //     setIsDatePickerDisplayed(b => !b)
    //     setIsDayViewDisplayed(false)
    // }
    return (
        <div className={s.container}> 
            <div className={s.text}>{isPickerDisplayed  
                ? <div> 
                    <div className={s.timeContainer} onClick={() => setIsDatePickerDisplayed(b => !b)}>{new Date(startsAtDate).toDateString()}
                </div>
                <div className={s.timeContainer}><TimeInput time={startsAtTime} setTime={setStartsAtTime} /></div>
                -
                <div className={s.timeContainer}><TimeInput time={endsAtTime} setTime={setEndsAtTime} /></div>
                </div>

                : <span className={s.clickWord} onClick={() => setIsPickerDisplayed(true)}>Select time of upcoming event</span>}
            </div> 
            
            {isDayViewDisplayed && <div className={s.inputContainer}>
                <div className={s.exit} onClick={() => setIsDayViewDisplayed(false)}>x</div>
                <EventPickerSingleDay day={startsAtDate} setStartsAtTime={setStartsAtTime} startsAtTime={startsAtTime} setEndsAtTime={setEndsAtTime} endsAtTime={endsAtTime}/>
            </div>}
            {isDatePickerDisplayed && <div className={s.inputContainer}>
                <div className={startsAtDate === 0 ? s.exit : `${s.exit} ${s.exitWhenPicked}`} onClick={() => setIsDatePickerDisplayed(false)}>x</div>
                <DateInput pickedDate={startsAtDate} setPickedDate={datePickHandler}/>
            </div>}
        </div>
    )
}

export default EventTimePicker