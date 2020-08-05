import { ReactNode } from 'react'

export default function Link(props: {
  href: string
  children: ReactNode | ReactNode[]
}) {
  return (
    <a
      className="hover:underline text-blue-500"
      href={props.href}
      target="__blank"
    >
      {props.children}
    </a>
  )
}
