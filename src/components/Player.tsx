import { useRef, useLayoutEffect } from 'react'
import useGlobalState from '../hooks/state'
import { makePointProvider, moves } from 'creepyface-dance'

let audio: HTMLAudioElement | null = null

if (typeof window !== 'undefined') {
  audio = new Audio()
  audio.controls = true
  audio.src = '/we-are-family.mp3'
  makePointProvider({
    name: 'dance',
    audio,
    bpm: 114,
    firstBeat: 0.164,
    choreography: [
      ...moves.repeat(2)(['serious']),
      ...moves.repeat(3)([
        ...(['w', 'e', 'n', 's'] as const),
        ...moves.repeat(2)(['crazy', 'serious']),
      ]),
      ...moves.circle('n'),
    ],
  })
}

export default function Player() {
  const ref = useRef<HTMLDivElement>(null)
  const { toggleDancing } = useGlobalState()

  useLayoutEffect(() => {
    if (ref.current && audio) {
      ref.current.appendChild(audio)
      audio.play()
      return () => {
        if (audio) {
          audio.pause()
          audio.currentTime = 0
          ref.current?.removeChild(audio)
        }
      }
    }
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center">
      <span>
        Enough,{' '}
        <button
          className="hover:underline text-blue-500"
          onClick={toggleDancing}
        >
          take me back
        </button>
        .
      </span>
      <div ref={ref} className="rounded-full overflow-hidden absolute mt-20" />
    </div>
  )
}
