import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { family, FamilyMember } from '../components/Family'
import analytics from '../util/analytics'

const State = createContainer(() => {
  let [member, setMember] = useState(family[0])
  let [dancing, setDancing] = useState(false)
  let toggleDancing = () => {
    if (!dancing) analytics('dance')
    setDancing(!dancing)
  }
  return {
    member: dancing ? family[0] : member,
    dancing,
    toggleDancing,
    setMember: (member: FamilyMember) => {
      analytics(member.name)
      setMember(member)
    }
  }
})

export const Provider = State.Provider
export default State.useContainer
