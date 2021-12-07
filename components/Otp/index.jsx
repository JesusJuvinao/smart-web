import React, { memo, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import usePrevious from '../hooks/useRef'
import { InputOtp } from './styled'

function SingleOTPInputComponent (props) {
  const { focus, autoFocus, ...rest } = props
  const inputRef = useRef(null)
  const prevFocus = usePrevious(!!focus)
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])

  return (<>
    <InputOtp placeholder='0' ref={inputRef} {...rest} />
  </>
  )
}

const SingleOTPInput = memo(SingleOTPInputComponent)
export default SingleOTPInput

SingleOTPInputComponent.propTypes = {
  autoFocus: PropTypes.func,
  focus: PropTypes.func
}
