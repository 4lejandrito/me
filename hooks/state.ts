import { createContainer } from 'unstated-next'
import { useState } from 'react'
import family from '../util/family'

const State = createContainer(() => {
  let [member, setMember] = useState(family[0])
  let [dancing, setDancing] = useState(false)
  let toggleDancing = () => setDancing(!dancing)
  return {
    member: dancing ? family[0] : member,
    dancing,
    toggleDancing,
    setMember
  }
})

export const Provider = State.Provider
export default State.useContainer
