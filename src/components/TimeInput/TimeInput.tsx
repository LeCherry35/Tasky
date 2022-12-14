import React, { useState, useEffect } from 'react'
import s from './TimeInput.module.css'

interface Props {
    setTime: React.Dispatch<React.SetStateAction<string>>
}

const TimeInput: React.FC<Props> = ({setTime}) => {
    const [hrs, setHrs] = useState(12)
    const [mins, setMins] = useState(0)

    useEffect(() => {
      setTime(addZero(hrs) + ':' + addZero(mins))
    }, [hrs, mins, setTime])
    
    const addZero = (num:number) => num < 10 ? '0' + String(num) : String(num)
    
    return (
        <div className={s.container}>
            <div className={s.inputContainer}>
                <div className={s.arrowTop} onClick={() => hrs < 24 && setHrs(hrs => hrs + 1)}></div>
                <input className={s.input} type='text' value={hrs} onChange={(e) => {
                    const inputToNum =Number(e.target.value)
                    if(Number.isNaN(inputToNum)) {
                        return
                    } else {
                        if (inputToNum >=0 && inputToNum <= 24) {
                            setHrs(inputToNum)
                        } else {
                            return
                        }
                    }
                    setHrs(Number(e.target.value))
                    }}/>
                <div className={s.arrowBottom} onClick={() => hrs > 1 && setHrs(hrs => hrs - 1)}></div>
            </div>
            <div>:</div>
            <div className={s.inputContainer}>
                <div className={s.arrowTop} onClick={() => mins < 60 && setMins(mins => mins + 1)}></div>
                <input className={s.input} type='text' value={mins} onChange={(e) => {
                    const inputToNum =Number(e.target.value)
                    if(Number.isNaN(inputToNum)) {
                        return
                    } else {
                        if (inputToNum >=0 && inputToNum <= 60) {
                            setMins(inputToNum)
                        } else {
                            return
                        }
                    }
                    setMins(Number(e.target.value))
                    }}/>
                <div className={s.arrowBottom} onClick={() => mins > 1 && setMins(mins => mins - 1)}></div>
            </div>
        </div>
    )
}

export default TimeInput