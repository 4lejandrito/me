import Creepyface from 'react-creepyface'
import { range } from 'lodash'
import classnames from 'classnames'
import useGlobalState from '../hooks/state'
import { FamilyMember } from './Family'

export default function Face(props: { member: FamilyMember }) {
  const { dancing } = useGlobalState()
  const { name, face } = props.member

  return (
    <div className="relative rounded-full border shadow flex-shrink-0 m-4 sm:m-2 overflow-hidden">
      <Creepyface
        className={classnames(
          { 'w-40 h-40': !dancing },
          { 'w-20 h-20 sm:w-40 sm:h-40': dancing },
          'object-cover'
        )}
        alt={`Face of ${name} that looks at the mouse pointer`}
        src={`https://creepyface.io/img/${face}/serious`}
        options={{
          points: dancing ? 'dance' : 'pointer',
          hover: `https://creepyface.io/img/${face}/hover`,
          looks: range(8)
            .map((i) => i * 45)
            .map((angle) => ({
              angle,
              src: `https://creepyface.io/img/${face}/${angle}`,
            })),
        }}
      />
    </div>
  )
}
