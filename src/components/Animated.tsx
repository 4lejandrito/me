import { CSSTransition, SwitchTransition } from 'react-transition-group'
import React, { ReactElement } from 'react'

export default function Animated(props: {
  state: boolean
  children: ReactElement
}) {
  return (
    <SwitchTransition>
      <CSSTransition
        key={`${props.state}`}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false)
        }}
        classNames="slide-right"
      >
        {props.children}
      </CSSTransition>
    </SwitchTransition>
  )
}
