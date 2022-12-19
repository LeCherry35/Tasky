import React, { useState } from 'react'

import s from './EventList.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Event from '../SingleUnits/Event'

const EventList = () => {

  // const [pastIsHidden,setPastIsHidden] = useState<boolean>(true)
  const { events } = useTypedSelector(state => state.events)

  return (
    <div className={s.eventsContainer}>
        <div className={`${s.events} ${s.shown}`}>
          <span className={s.heading}>Upcoming events</span>
          {events.map(event => (event.startsAt - Date.now() > 0) ? <Event key={event.createdAt} event={event}/> : <></> )}
        </div>
        {/* <div className={`${s.events} ${s.shown}`}>
          <span className={s.heading}>History</span>
          {events.map(event => (event.startsAt - Date.now() < 0) ? <Event key={event.createdAt} event={event}/> : <></> )}
        </div> */}
    </div>
  )
}

export default EventList