import Creepyface from 'react-creepyface'
import { range } from 'lodash'
import { useRef, Fragment, useLayoutEffect } from 'react'
import classnames from 'classnames'
import Emoji from './Emoji'
import useGlobalState from '../hooks/state'
import family, { Member } from '../util/family'
import { makePointProvider, moves } from 'creepyface-dance'

export const FaceButton = (props: { member: Member }) => {
  const { dancing, member, setMember } = useGlobalState()
  return (
    <button
      className={classnames({
        'opacity-25': props.member !== member && member !== family[0]
      })}
      disabled={dancing || (props.member === family[0] && member === family[0])}
      title={props.member.name}
      onClick={() =>
        setMember(member === props.member ? family[0] : props.member)
      }
    >
      <Emoji char={props.member.emoji} />
    </button>
  )
}

export const Faces = (props: { faces: Member[] }) => (
  <span className="whitespace-no-wrap">
    {props.faces.map((member, i) => (
      <Fragment key={i}>
        <FaceButton member={member} />{' '}
      </Fragment>
    ))}
  </span>
)

export default function Face(props: { member: Member }) {
  const { dancing } = useGlobalState()
  const { name, face } = props.member
  return (
    <Creepyface
      className={classnames(
        { 'w-40 h-40': !dancing },
        { 'w-20 h-20 sm:w-40 sm:h-40': dancing },
        'm-2 rounded-full border shadow object-cover flex-shrink-0'
      )}
      alt={`Face of ${name} that looks at the mouse pointer`}
      src={`https://creepyface.io/img/${face}/serious`}
      options={{
        points: dancing ? 'dance' : 'pointer',
        hover: `https://creepyface.io/img/${face}/hover`,
        looks: range(8)
          .map(i => i * 45)
          .map(angle => ({
            angle,
            src: `https://creepyface.io/img/${face}/${angle}`
          }))
      }}
    />
  )
}

let audio: HTMLAudioElement | null = null
if (typeof window !== 'undefined') {
  audio = new Audio()
  audio.controls = true
  audio.src = '/we-are-family.mp3'
  makePointProvider({
    name: 'dance',
    audio,
    bpm: 114,
    firstBeat: 0.3,
    choreography: [
      ...moves.repeat(2)(['serious']),
      ...moves.repeat(3)([
        ...(['w', 'e', 'n', 's'] as const),
        ...moves.repeat(2)(['crazy', 'serious'])
      ]),
      ...moves.circle('n')
    ]
  })
}
export function Player() {
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
