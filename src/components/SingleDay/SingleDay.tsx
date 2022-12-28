import React, { useState, useEffect } from 'react'
// import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE, MINUTES_IN_DAY } from '../../configs/calendar'
import { handleZero } from '../../helpers/handleZero'
import { stringToTimestamp } from '../../helpers/stringToTimestamp'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './SingleDay.module.css'

interface Props {
  day: number
  setStartsAtTime: React.Dispatch<React.SetStateAction<string>>
  startsAtTime: string
}

const SingleDay: React.FC<Props> = ({day, setStartsAtTime, startsAtTime}) => {
  const { events, todos } = useTypedSelector(state => state)
  const [minutes, setMinutes] = useState<number[]>([])

  const pickTime = (minute: number) => {
    const ts = new Date(minute)
    const h = handleZero(String(ts.getHours())) 
    const m = Math.round(ts.getMinutes()/10) * 10 - 10 > 0 ? handleZero(String(Math.round(ts.getMinutes()/10) * 10 - 10 )): '00'
    setStartsAtTime(h + ':' + m)
  }

  useEffect(() => {
    const m = []
    for(let i = 0; i < MINUTES_IN_DAY; i++) {
      day && m.push(Number(day) + i * MILISECONDS_IN_MINUTE)
    }
    
    setMinutes(m)
  },[day])

  return (
    <div className={s.container}>
      {/* <TimeInput setTime={setStartsAtTime} time={startsAtTime}/> */}
      <div className={s.minutesContainer}>
        {minutes.map(minute => {
          const classes = (minute - Number(day)) % MILISECONDS_IN_HOUR === 0 && (minute - Number(day) !== 0) ? `${s.minute} ${s.hourStart}` : `${s.minute}`
        
          return (
            <div className={classes} key={minute} onClick={() => pickTime(minute)}>
                {todos.todos.map(todo => {
                  if(minute === todo.deadline) {
                    return (
                      <div className={s.deadline}>
                        {todo.todo}
                      </div>
                    )
                  } else return <></>
                })}
                {minute === stringToTimestamp(day, startsAtTime) && <div className={s.deadline}> Selected time</div>}
                {(minute - Number(day)) % MILISECONDS_IN_HOUR === 0 && 
                <div className={s.time}>
                  {handleZero(String((minute - Number(day))/ MILISECONDS_IN_HOUR)) + ':00'}
                </div>}
                {/* {((minute + 2 * MILISECONDS_IN_HOUR) % MILISECONDS_IN_DAY === 0) && //need to add 2hrs because of timezone?????
                <div className={s.day}>
                  {new Date(minute).toDateString()}
                </div>} */}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default SingleDay