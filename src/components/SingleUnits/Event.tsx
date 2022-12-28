import React, { useState, useEffect } from 'react'
import s from './SingleUnit.module.css'
import { timestampToString } from '../../helpers/timestampToString'
import { IEvent } from '../../types/events'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { deleteEventAsync } from '../../asyncActions/events'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'

interface Props {
  event: IEvent
}

const Event: React.FC<Props> = ({ event }) => {
  
  const [timeLeftBeforeEvent, setTimeLeftBeforeEvent] = useState(event.startsAt - Date.now())
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if(timeLeftBeforeEvent > 1000) setTimeout(() => setTimeLeftBeforeEvent(timeLeftBeforeEvent - 1000), 1000)
  }, [timeLeftBeforeEvent])
  
  const removeEvent = () => {
    dispatch(deleteEventAsync(event._id))
  }
  return (
    <div className={s.container}>
      <div className={s.textarea}>
        <span className={s.textareaText}>{event.name}</span>
        <br/>
        <span className={s.timer}> {'starts in  '} <span className={s.timerDigits}>{timestampToString(timeLeftBeforeEvent)}</span></span>
      </div>
      <div className={s.iconContainer}>
        <button className={s.icon} onClick={() =>{
          removeEvent()}}>
          <AiFillDelete/>
        </button> 
      </div>
          
    </div>
  )
}

export default Event