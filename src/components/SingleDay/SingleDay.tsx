import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE, MINUTES_IN_DAY } from '../../configs/calendar'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import TimeInput from '../TimeInput/TimeInput'
import s from './SingleDay.module.css'

// interface Props {
//   day: number
// }

const SingleDay: React.FC = () => {
  const {day} = useParams()
  const { events, todos } = useTypedSelector(state => state)
  const [minutes, setMinutes] = useState<number[]>([])
  const [startsAtTime, setStartsAtTime] = useState('12:00')

  useEffect(() => {
    const m = []
    for(let i = 0; i < MINUTES_IN_DAY; i++) {
      day && m.push(Number(day) + i * MILISECONDS_IN_MINUTE)
    }
    
    setMinutes(m)
  },[day])

  return (
    <div className={s.container}>
      <TimeInput setTime={setStartsAtTime} time={startsAtTime}/>
      <div className={s.minutesContainer}>
        {minutes.map(minute => {
          const classes = (minute - Number(day)) % MILISECONDS_IN_HOUR === 0 && (minute - Number(day) !== 0) ? `${s.minute} ${s.hourStart}` : `${s.minute}`
          return (
            <div className={classes} onClick={() => setStartsAtTime(new Date(minute).toTimeString())}>
              
                {(minute - Number(day)) % MILISECONDS_IN_HOUR === 0 && 
                <div className={s.number}>
                  {(minute - Number(day))/ MILISECONDS_IN_HOUR}
                </div>}
              
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default SingleDay