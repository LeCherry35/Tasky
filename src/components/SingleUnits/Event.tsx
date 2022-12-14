import React, { useState, useEffect } from 'react'
import { timestampToString } from '../../helpers/timestampToString'
import { IEvent } from '../../types/events'

import s from './Todo.module.css'

interface Props {
  event: IEvent
}

const Event: React.FC<Props> = ({ event }) => {
  const [timeLeftBeforeEvent, setTimeLeftBeforeEvent] = useState(event.startsAt - Date.now())
  useEffect(() => {
    if(timeLeftBeforeEvent > 1000) setTimeout(() => setTimeLeftBeforeEvent(timeLeftBeforeEvent - 1000), 1000)
  }, [timeLeftBeforeEvent])
  
  return (
    <div className={s.todo}>
      <div className={s.todo__textarea}>
        <span className={s.todo__textarea__text}>{event.name}</span>
        <br/>
        <span className={s.todo__textarea__text}> {'starts in  ' + timestampToString(timeLeftBeforeEvent)}</span>
      </div>
          
    </div>
  )
}

export default Event