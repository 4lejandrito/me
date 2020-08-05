import Creepyface from 'react-creepyface'
import { range } from 'lodash'
import { createContext, useContext } from 'react'
import classnames from 'classnames'
import Emoji from './Emoji'

const FaceContext = createContext({ face: 1, setFace: (face: number) => {} })

const FaceButton = (props: { face: number; emoji: string; title: string }) => {
  const { face, setFace } = useContext(FaceContext)
  return (
    <button
      className={classnames({
        'opacity-25': props.face !== face && face !== 1
      })}
      title={props.title}
      onClick={() => setFace(face === props.face ? 1 : props.face)}
    >
      <Emoji char={props.emoji} />
    </button>
  )
}

export const Faces = (props: {
  face: number
  onChange: (face: number) => void
}) => (
  <FaceContext.Provider value={{ face: props.face, setFace: props.onChange }}>
    <FaceButton face={11} title="Noemí" emoji="👩🏻‍🎨" />{' '}
    <FaceButton face={16} title="Navi" emoji="😼" />{' '}
    <FaceButton face={19} title="Pepa" emoji="😺" />{' '}
    <FaceButton face={0} title="Nala" emoji="😾" />{' '}
    <FaceButton face={170} title="Thor" emoji="🙀" />
  </FaceContext.Provider>
)

export default function Face(props: { number: number }) {
  return (
    <Creepyface
      className="w-40 h-40 rounded-full border shadow object-cover mb-8 sm:mb-0 flex-shrink-0"
      alt={`Face that looks at the mouse pointer`}
      src={`https://creepyface.io/img/${props.number}/serious`}
      options={{
        hover: `https://creepyface.io/img/${props.number}/hover`,
        looks: range(8)
          .map(i => i * 45)
          .map(angle => ({
            angle,
            src: `https://creepyface.io/img/${props.number}/${angle}`
          }))
      }}
    />
  )
}
