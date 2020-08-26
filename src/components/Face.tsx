import Creepyface from 'react-creepyface'
import { range } from 'lodash'
import classnames from 'classnames'
import useGlobalState from '../hooks/state'
import { FamilyMember, Member } from './Family'
import { useState } from 'react'

export default function Face(props: { member: FamilyMember }) {
  const { dancing } = useGlobalState()
  const { name, face } = props.member
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative rounded-full border shadow flex-shrink-0 m-2 overflow-hidden">
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
            .map(i => i * 45)
            .map(angle => ({
              angle,
              src: `https://creepyface.io/img/${face}/${angle}`
            }))
        }}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="text-4xl sm:text-6xl absolute inset-0 flex flex-col items-center justify-center bg-gray-200">
          <Member {...props} />
        </div>
      )}
    </div>
  )
}
