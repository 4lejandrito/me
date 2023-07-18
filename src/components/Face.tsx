import Creepyface from 'react-creepyface'
import { range } from 'lodash'
import classnames from 'classnames'
import useGlobalState from '../hooks/state'
import { FamilyMember } from './Family'
import { useState } from 'react'
import Loader from './Loader'

export default function Face(props: { member: FamilyMember }) {
  const { dancing } = useGlobalState()
  const { name, face } = props.member
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative rounded-full border shadow flex-shrink-0 m-4 sm:m-2 overflow-hidden">
      <Creepyface
        className={classnames(
          { 'w-40 h-40': !dancing },
          { 'w-20 h-20 sm:w-40 sm:h-40': dancing },
          'object-cover'
        )}
        alt={`Face of ${name} that looks at the mouse pointer`}
        src={`/img/${face}/serious.jpeg`}
        options={{
          points: dancing ? 'dance' : 'pointer',
          hover: `/img/${face}/hover.jpeg`,
          looks:
            face === 'theo'
              ? []
              : range(8)
                  .map((i) => i * 45)
                  .map((angle) => ({
                    angle,
                    src: `/img/${face}/${angle}.jpeg`,
                  })),
        }}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 text-gray-400">
          <Loader />
        </div>
      )}
    </div>
  )
}
