import emoji from 'react-easy-emoji'

export default function Emoji(props: { char: string }) {
  return (
    <>
      {emoji(props.char, {
        baseUrl: 'https://twemoji.maxcdn.com/2/svg/',
        ext: '.svg',
        size: '',
        props: {
          className: 'inline-block'
        }
      })}
    </>
  )
}
