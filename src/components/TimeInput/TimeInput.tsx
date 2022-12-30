import React, { useState, useEffect } from 'react'
import { handleZero } from '../../helpers/handleZero'
import s from './TimeInput.module.css'

interface Props {
    setTime: React.Dispatch<React.SetStateAction<string>>
    time: string 
}

const TimeInput: React.FC<Props> = ({setTime, time}) => {
    const [hrs, setHrs] = useState(time.split(':')[0])
    const [mins, setMins] = useState(time.split(':')[1])

    useEffect(() => {
      setTime(hrs + ':' + mins)
    }, [hrs, mins, setTime])
    useEffect(() => {
        console.log(time);
        
        setHrs(handleZero(time.split(':')[0]))
        setMins(handleZero(time.split(':')[1]))
    },[time])
    

    
    return (
        <div className={s.container}>
            <div className={s.inputContainer}>
                <div className={s.arrowTop} onClick={() => Number(hrs) < 23 ? setHrs(hrs => handleZero(String(Number(hrs) + 1))) : setHrs('00')}></div>
                <input className={s.input} type='text' value={hrs} onChange={(e) => {
                    const inputToNum =Number(e.target.value)
                    if(Number.isNaN(inputToNum)) {
                        return
                    } else {
                        if (inputToNum >=0 && inputToNum <= 24) {
                            setHrs(handleZero(e.target.value))
                        } else {
                            return
                        }
                    }
                    }}/>
                <div className={s.arrowBottom} onClick={() => Number(hrs) > 0 && setHrs(hrs => handleZero(String(Number(hrs) - 1)))}></div>
            </div>
            <div>:</div>
            <div className={s.inputContainer}>
                <div className={s.arrowTop} onClick={() => {
                    if(Number(mins) < 59) setMins(mins => handleZero(String(Number(mins) + 1)))
                    else {
                        setMins('00')
                        setHrs(hrs => handleZero(String(Number(hrs) + 1)))
                    }
                    }}></div>
                <input className={s.input} type='text' value={mins} onChange={(e) => {
                    const inputToNum =Number(e.target.value)
                    if(Number.isNaN(inputToNum)) {
                        return
                    } else {
                        if (inputToNum >=0 && inputToNum <= 60) {
                            setMins(handleZero(e.target.value)) 
                        } else {
                            return
                        }
                    }
                    setMins(handleZero(e.target.value))
                    }}/>
                <div className={s.arrowBottom} onClick={() => {
                    if(Number(mins) > 0) setMins(mins => handleZero(String(Number(mins) - 1)))
                    else if(Number(hrs) > 0 ) {
                        setMins('59')
                        setHrs(hrs => handleZero(String(Number(hrs) - 1)))
                    }
                    }}></div>
            </div>
        </div>
    )
}

export default TimeInput