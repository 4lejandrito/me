import { CSSTransition, SwitchTransition } from 'react-transition-group'
import React, { ReactElement } from 'react'

export default function Animated(props: {
  state: boolean
  children: ReactElement
}) {
  return (
    <>
      <style jsx global>{`
        .slide-right-enter {
          opacity: 0;
          transform: translateX(-100%);
        }
        .slide-right-enter-active {
          opacity: 1;
          transform: translateX(0%);
        }
        .slide-right-exit {
          opacity: 1;
          transform: translateX(0%);
        }
        .slide-right-exit-active {
          opacity: 0;
          transform: translateX(100%);
        }
        .slide-right-enter-active,
        .slide-right-exit-active {
          transition: opacity 100ms, transform 100ms;
        }
      `}</style>
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
    </>
  )
}
