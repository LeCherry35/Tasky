import React from 'react'

import s from './NavButton.module.css'

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
    disabled?: boolean
    name: string

}
const NavButton: React.FC<Props> = ({ onClick, disabled = false, name}) => {
  return (
    <button className={s.navButton} onClick={onClick} disabled={disabled}>{name}</button>
  )
}

export default NavButton