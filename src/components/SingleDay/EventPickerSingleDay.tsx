import React, { useState, useEffect } from 'react'
import { MdOutlineVerticalAlignBottom, MdOutlineVerticalAlignTop } from 'react-icons/md'
import { MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE, MINUTES_IN_DAY } from '../../configs/calendar'
import { handleZero } from '../../helpers/handleZero'
import { stringToTimestamp } from '../../helpers/stringToTimestamp'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './SingleDay.module.css'

interface Props {
  day: number
  setStartsAtTime: React.Dispatch<React.SetStateAction<string>>
  startsAtTime: string
  setEndsAtTime: React.Dispatch<React.SetStateAction<string>>
  endsAtTime: string
}

const EventPickerSingleDay: React.FC<Props> = ({day, setStartsAtTime, startsAtTime, setEndsAtTime, endsAtTime}) => {
  const { events, todos } = useTypedSelector(state => state)
  const [minutes, setMinutes] = useState<number[]>([])
  const [isPickStartsAt, setIsPickStartsAt] = useState(true)


  const pickTime = (minute: number) => {
    if (isPickStartsAt) {
      const ts = new Date(minute)
      const h = handleZero(String(ts.getHours())) 
      const m = Math.round(ts.getMinutes()/10) * 10 - 10 > 0 ? handleZero(String(Math.round(ts.getMinutes()/10) * 10 - 10 )): '00'
      setStartsAtTime(h + ':' + m)
      setIsPickStartsAt(false)
    } else {
      const ts = new Date(minute)
      const h = handleZero(String(ts.getHours())) 
      const m = Math.round(ts.getMinutes()/10) * 10 - 10 > 0 ? handleZero(String(Math.round(ts.getMinutes()/10) * 10 - 10 )): '00'
      setEndsAtTime(h + ':' + m)
      setIsPickStartsAt(true)
    }
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
                {events.events.map(event => {
                  if (minute === event.startsAt) {
                    return (
                      <div className={s.eventName}>{event.name}</div>
                    )
                  } else if (minute > event.startsAt && minute <= event.endsAt) {
                    return (
                      <div className={s.busyMinute}></div>
                    )
                  } else {
                    return (
                      <></>
                    )
                  }
                })}
                {minute >= stringToTimestamp(day, startsAtTime) && minute <=stringToTimestamp(day, endsAtTime) && <div className={s.selectedMinute}></div>}
                {minute === stringToTimestamp(day, startsAtTime) && <div className={isPickStartsAt ? `${s.activeMinute} ${s.eventBorderSignTop} ` : s.eventBorderSignTop}><MdOutlineVerticalAlignBottom/></div>}
                {minute === stringToTimestamp(day, endsAtTime) && <div className={!isPickStartsAt ? `${s.activeMinute} ${s.eventBorderSignBottom} ` : s.eventBorderSignBottom}><MdOutlineVerticalAlignTop/></div>}
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

export default EventPickerSingleDay