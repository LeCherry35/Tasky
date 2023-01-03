import React, { useState, useEffect } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { MILISECONDS_IN_DAY, MILISECONDS_IN_HOUR, MILISECONDS_IN_MINUTE, MINUTES_IN_DAY, MINUTES_IN_HOUR } from '../../configs/calendar'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import s from './SingleDay.module.css'



const SingleDay: React.FC = () => {
  const { events, todos } = useTypedSelector(state => state)
  const [minutes, setMinutes] = useState<number[]>([])
  const [showMinutesFrom, setShowMinutesFrom] = useState<number>(0)
  const {day} = useParams()
  const scrollGap = MINUTES_IN_HOUR * 4
  
  useEffect(() => {
    const m = []
    for(let i = 0; i < MINUTES_IN_DAY; i++) {
      day && m.push(Number(day) + i * MILISECONDS_IN_MINUTE)
    }
    
    setMinutes(m)
  },[day])

  const showPreviousMinutes = () => {
    
    if (showMinutesFrom === 0) {
        getPreviousMinutes()
    } else {            
        setShowMinutesFrom(() => showMinutesFrom - scrollGap)
    }
    console.log('ml', minutes.length)
    console.log('smf', showMinutesFrom)
    
  }
  const showNextMinutes = () => {
    
    console.log('ml', minutes.length)
    console.log('smf', showMinutesFrom)

    if (showMinutesFrom === minutes.length - MINUTES_IN_DAY) {
        getNextMinutes()  
    }
    setShowMinutesFrom(() => showMinutesFrom + scrollGap)
  }

const getPreviousMinutes = () => {
    const newMinutes = []
    for (let i = 0; i < scrollGap; i++ ) {
        newMinutes.push(minutes[0] - scrollGap * MILISECONDS_IN_MINUTE + i * MILISECONDS_IN_MINUTE)
    }
    setMinutes([...newMinutes,...minutes])
}
const getNextMinutes = () => {
  const newMinutes = []
  for (let i = 0; i < scrollGap; i++ ) {
      newMinutes.push(minutes[minutes.length - 1] + (i + 1) * MILISECONDS_IN_MINUTE)
  }
  setMinutes([...minutes, ...newMinutes])
  
}

  return (
    <div className={s.container}>
       <button className={s.showMoreButton} onClick={showPreviousMinutes}>
          <FaChevronUp/>
        </button>
      <div className={s.minutesContainer}>
        {minutes.map((minute, id) => {
          if (id >= showMinutesFrom && id <= showMinutesFrom + MINUTES_IN_DAY) {
            const classes = (minute - Number(day)) % MILISECONDS_IN_HOUR === 0 && (minute - Number(day) !== 0) ? `${s.minute} ${s.hourStart}` : `${s.minute}`         
            return (
              <div className={classes} key={minute}>
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
                  {(minute - Number(day)) % MILISECONDS_IN_HOUR === 0 && 
                  <div className={s.time}>
                    {new Date(minute).getHours() + ':00'}
                  </div>}
                  {((minute + 2 * MILISECONDS_IN_HOUR) % MILISECONDS_IN_DAY === 0) && //need to add 2hrs because of timezone?????
                  <div className={s.day}>
                    {new Date(minute).toDateString()}
                  </div>}
              </div>
            )
          } else return<></>
        })}
      </div>
      <button className={s.showMoreButton} onClick={showNextMinutes}>
        <FaChevronDown/>
      </button>
    </div>
  )
}

export default SingleDay