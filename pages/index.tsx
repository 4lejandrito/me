import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Face, { Faces } from '../components/Face'
import { useState } from 'react'
import Link from '../components/Link'
import Emoji from '../components/Emoji'

export default function Home() {
  const title = 'Alex'
  const description = 'Welcome to my humble site'
  const [face, setFace] = useState(1)
  return (
    <main className="text-gray-800 font-sans text-lg sm:text-2xl min-h-screen flex flex-col items-center justify-center m-auto p-6">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href={'/manifest.json'} />
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain="4lejandrito.dev"
            src="https://plausible.io/js/plausible.js"
          />
        )}
      </Head>

      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: process.env.NEXT_PUBLIC_URL,
          title,
          description,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/social.png`,
              alt: `${title} - ${description}`
            }
          ],
          site_name: 'alex.creepyace.io'
        }}
        twitter={{
          handle: '@4lejandrito',
          cardType: 'summary_large_image'
        }}
      />

      <header className="text-4xl sm:text-5xl slide-up">
        I'm <strong>Alex</strong> <Emoji char="👨🏼‍💻" />
      </header>

      <section className="flex flex-col sm:flex-row items-center justify-center my-10 sm:my-16 sm:divide-x slide-up animation-delay">
        <Face number={face} />
        <ol className="leading-relaxed sm:pl-8 sm:ml-8">
          <li>
            I <strong>live</strong> in{' '}
            <Link href="https://www.google.com/maps/place/Madrid">Madrid</Link>{' '}
            with <Faces face={face} onChange={setFace} />.
          </li>
          <li>
            I <strong>work</strong> as a <strong>Software Engineer</strong> at{' '}
            <Link href="https://twitter.com/Liferay">@Liferay</Link>.
          </li>
          <li>
            I <strong>made</strong>{' '}
            <Link href="https://react-guitar.com">react-guitar</Link> and{' '}
            <Link href="https://creepyface.io">creepyface</Link>.
          </li>
          <li>
            I <strong>learn</strong>{' '}
            <Link href="https://photos.app.goo.gl/AgoSrMMVWsaN7jrV8">
              Spanish guitar
            </Link>
            .
          </li>
        </ol>
      </section>

      <footer className="slide-up animation-delay">
        <Link href="mailto:alejandro@tardin.com">Get in touch</Link> and{' '}
        <strong>follow</strong> me on{' '}
        <Link href="https://github.com/4lejandrito">GitHub</Link> or{' '}
        <Link href="https://twitter.com/4lejandrito">Twitter</Link>.
      </footer>
    </main>
  )
}
