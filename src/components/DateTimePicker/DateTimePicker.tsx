import React, { useState, useEffect } from 'react'
import DateInput from '../DateInput/DateInput'
import TimeInput from '../TimeInput/TimeInput'
import s from './DateTimePicker.module.css'

interface Props {
    date: number,
    setDate: React.Dispatch<React.SetStateAction<number>>,
    setTime: React.Dispatch<React.SetStateAction<string>>
}

const DateTimePicker:React.FC<Props> = ({ date, setDate, setTime}) => {
    const [isDatePickerDisplayed, setIsDatePickerDisplayed] = useState(false)
    const [isTimePickerDisplayed, setIsTimePickerDisplayed] = useState(false)
    // const [date,setDate] = useState(0)
    // const [time, setTime] = useState('')

    

    return (
        <div className={s.container}> 
            <div className={s.text}>{date === 0 ? 'Select ' : ''}
                <span className={date === 0 ? s.clickWord : s.pointer} onClick={() => setIsDatePickerDisplayed(b => !b)}> 
                    {date === 0 ? ' date ' : new Date(date).toDateString() + ' ,'}
                </span>
                {isTimePickerDisplayed ? '' : 'Select '}
                <span className={s.clickWord} onClick={() => setIsTimePickerDisplayed(true)}>
                    {isTimePickerDisplayed 
                        ? <div className={s.timeContainer}><TimeInput setTime={setTime}/></div> 
                        : 'time '}
                </span>
                {isTimePickerDisplayed ? '' : 'of new event'}
            </div> 
            
            {isDatePickerDisplayed && <div className={s.inputContainer}>
                <div className={date === 0 ? s.exit : `${s.exit} ${s.exitWhenPicked}`} onClick={() => setIsDatePickerDisplayed(false)}>x</div>
                <DateInput pickedDate={date} setPickedDate={setDate}/>
            </div>}
        </div>
    )
}

export default DateTimePicker