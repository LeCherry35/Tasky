import React, { useState, useEffect } from 'react'
import s from './TimeInput.module.css'

interface Props {
    setTime: React.Dispatch<React.SetStateAction<string>>
}

const TimeInput: React.FC<Props> = ({setTime}) => {
    const [hrs, setHrs] = useState('12')
    const [mins, setMins] = useState('00')

    useEffect(() => {
      setTime(hrs + ':' + mins)
    }, [hrs, mins, setTime])
    
    const handleZero = (num:string) => {
        if (num.length === 1) return '0' + num
        if (num.length === 2) return num
        
        while (num[0] === '0' && num.length > 2) num = num.substring(1)  
        return num
    }
    
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