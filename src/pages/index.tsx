import Head from 'next/head'
import { NextSeo } from 'next-seo'
import Face from '../components/Face'
import Player from '../components/Player'
import Link from '../components/Link'
import React from 'react'
import useGlobalState, { Provider } from '../hooks/state'
import Family, { Member, family } from '../components/Family'
import classnames from 'classnames'
import Animated from '../components/Animated'
import PlausibleProvider from 'next-plausible'
import 'tailwindcss/tailwind.css'

function Home() {
  const title = 'Alex'
  const description = 'Welcome to my humble site'
  const { member, dancing, toggleDancing } = useGlobalState()
  return (
    <main className="text-gray-800 font-sans text-lg sm:text-2xl min-h-screen flex flex-col items-center justify-center m-auto p-6 slide-up">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href={'/manifest.json'} />
      </Head>

      <style jsx global>{`
        .slide-up {
          opacity: 0;
          animation: slide-up 600ms;
          transition: opacity 600ms;
          animation: slide-up 0.75s cubic-bezier(0.785, 0.135, 0.15, 0.86)
            forwards;
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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
              alt: `${title} - ${description}`,
            },
          ],
          site_name: '4lejandrito.dev',
        }}
        twitter={{
          handle: '@4lejandrito',
          cardType: 'summary_large_image',
        }}
      />

      <Animated state={dancing}>
        <header className="text-4xl sm:text-5xl text-center">
          {dancing ? (
            <>
              We're <strong>family</strong> <Family />
            </>
          ) : (
            <>
              I'm <strong>{family[0].name}</strong>{' '}
              <Member member={family[0]} />
            </>
          )}
        </header>
      </Animated>

      <Animated state={dancing}>
        <section
          className={classnames(
            { 'sm:divide-x': !dancing },
            'flex flex-col sm:flex-row items-center justify-center my-6 sm:my-16'
          )}
        >
          <div className="flex flex-wrap items-center justify-center">
            {dancing ? (
              family.map((member, i) => <Face key={i} member={member} />)
            ) : (
              <Face member={member} />
            )}
          </div>
          {!dancing && (
            <ol className="leading-relaxed sm:pl-8 sm:ml-6">
              <li>
                I <strong>live</strong> in{' '}
                <Link href="https://www.google.com/maps/place/Madrid">
                  Madrid
                </Link>{' '}
                with <Family />
                <small className="text-base">
                  (and we{' '}
                  <button
                    className="hover:underline text-blue-500"
                    onClick={toggleDancing}
                  >
                    dance
                  </button>
                  !)
                </small>
                .
              </li>
              <li>
                I <strong>work</strong> as a <strong>Software Engineer</strong>{' '}
                at <Link href="https://twitter.com/Liferay">@Liferay</Link>.
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
          )}
        </section>
      </Animated>

      <footer className="slide-up animation-delay">
        <Animated state={dancing}>
          {dancing ? (
            <Player />
          ) : (
            <span>
              <Link href="mailto:alejandro@tardin.com">Get in touch</Link> and{' '}
              <strong>follow</strong> me on{' '}
              <Link href="https://github.com/4lejandrito">GitHub</Link> or{' '}
              <Link href="https://twitter.com/4lejandrito">Twitter</Link>.
            </span>
          )}
        </Animated>
      </footer>
    </main>
  )
}

export default function HomeWithState() {
  return (
    <PlausibleProvider domain="4lejandrito.dev">
      <Provider>
        <Home />
      </Provider>
    </PlausibleProvider>
  )
}
