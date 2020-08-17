import { Fragment } from 'react'
import classnames from 'classnames'
import Emoji from './Emoji'
import useGlobalState from '../hooks/state'

export type FamilyMember = {
  face: number
  name: string
  emoji: string
}

export const family: FamilyMember[] = [
  { face: 1, name: 'Alex', emoji: '👨🏼‍💻' },
  { face: 170, name: 'Noemí', emoji: '👩🏻‍🎨' },
  { face: 12, name: 'Navi', emoji: '😼' },
  { face: 19, name: 'Pepa', emoji: '😺' },
  { face: 0, name: 'Nala', emoji: '😾' },
  { face: 171, name: 'Thor', emoji: '🙀' }
]

export const Member = (props: { member: FamilyMember }) => {
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
