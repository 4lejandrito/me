import { Fragment } from 'react'
import classnames from 'classnames'
import Emoji from './Emoji'
import useGlobalState from '../hooks/state'

export type FamilyMember = {
  face: string | null
  name: string
  emoji: string
}

export const family: FamilyMember[] = [
  { face: 'alex', name: 'Alex', emoji: '👨🏼‍💻' },
  { face: 'noe', name: 'Noemí', emoji: '👩🏻‍🎨' },
  { face: 'theo', name: 'Theo', emoji: '👶🏼' },
  { face: 'navi', name: 'Navi', emoji: '😼' },
  { face: 'pepa', name: 'Pepa', emoji: '😺' },
  { face: 'nala', name: 'Nala', emoji: '😾' },
  { face: 'thor', name: 'Thor', emoji: '🙀' },
]

export const Member = (props: { member: FamilyMember }) => {
  const { dancing, member, setMember } = useGlobalState()
  const disabled =
    dancing || (props.member === family[0] && member === family[0])
  return (
    <button
      className={classnames({
        'opacity-25': props.member !== member && member !== family[0],
        'cursor-default': disabled,
      })}
      disabled={disabled}
      title={props.member.name}
      onClick={() =>
        setMember(member === props.member ? family[0] : props.member)
      }
    >
      <Emoji char={props.member.emoji} />
    </button>
  )
}

export default function Family() {
  const { dancing } = useGlobalState()
  return (
    <span className="whitespace-no-wrap">
      {(dancing ? family : family.slice(1)).map((member, i) => (
        <Fragment key={i}>
          <Member member={member} />{' '}
        </Fragment>
      ))}
    </span>
  )
}
