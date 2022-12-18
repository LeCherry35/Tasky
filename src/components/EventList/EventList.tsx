import React from 'react'

import s from './EventList.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Event from '../SingleUnits/Event'

const EventList = () => {

  const { events } = useTypedSelector(state => state.events)

  return (
    <div className={s.container}>
        <div className={s.eventsContainer}>
            {events.map(event => (event.startsAt - Date.now() > 0) ? <Event key={event.createdAt} event={event}/> : <></> )}
        </div>
    </div>
  )
}

export default EventList