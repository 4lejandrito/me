import { createContainer } from 'unstated-next'
import { useState } from 'react'
import { family, FamilyMember } from '../components/Family'
import { usePlausible } from 'next-plausible'

const State = createContainer(() => {
  let [member, setMember] = useState(family[0])
  let [dancing, setDancing] = useState(false)
  const plausible = usePlausible()
  let toggleDancing = () => {
    if (!dancing) plausible('dance')
    setDancing(!dancing)
  }
  return {
    member: dancing ? family[0] : member,
    dancing,
    toggleDancing,
    setMember: (member: FamilyMember) => {
      plausible(member.name)
      setMember(member)
    },
  }
})

export const Provider = State.Provider
export default State.useContainer
