import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, DropdownItem } from './styled'

export const DropdownMenu = ({ options, show, position, onClickOutside = () => undefined }) => {
  useEffect(() => {
    show && document.body.addEventListener('click', () => onClickOutside())
    return () => {
      document.body.removeEventListener('click', () => { })
    }
  }, [show])

  if (!show) return <></>
  return (<div style={{ position: 'relative' }}>
    <Container position={position}>
      {options?.map((x, i) => <DropdownItem key={'context_menu_option_' + i} onClick={x?.action || (() => undefined)}>
        {x?.optionName}
      </DropdownItem>)}
    </Container>
  </div>
  )
}

DropdownMenu.propTypes = {
  options: PropTypes.array,
  show: PropTypes.bool,
  position: PropTypes.object,
  onClickOutside: PropTypes.func
}
