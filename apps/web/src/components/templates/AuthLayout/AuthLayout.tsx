import type { ReactNode } from 'react'

type AuthLayoutProps = {
  bannerAlt: string
  bannerSrc: string
  children: ReactNode
}

function ChainDecoration({ className }: { className: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute hidden opacity-55 lg:block ${className}`}>
      <div className="h-60 w-28 rounded-[3.75rem] border-[2.6rem] border-[#082027]" />
      <div className="absolute left-[-4.5rem] top-24 h-60 w-28 rotate-90 rounded-[3.75rem] border-[2.6rem] border-[#082027]" />
    </div>
  )
}

export function AuthLayout({ bannerAlt, bannerSrc, children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#000d12] px-4 py-8 sm:px-6">
      <ChainDecoration className="left-[11%] top-[9%]" />
      <ChainDecoration className="bottom-[-8%] right-[8%]" />

      <section className="relative z-10 grid w-full max-w-[62rem] overflow-hidden rounded-[1.8rem] bg-[#1a2022] shadow-2xl shadow-black/30 md:grid-cols-[minmax(20rem,25.5rem)_minmax(22rem,1fr)]">
        <div className="hidden md:block">
          <img alt={bannerAlt} className="h-full min-h-[39.75rem] w-full object-cover" src={bannerSrc} />
        </div>
        <div className="flex min-h-[39.75rem] items-center px-7 py-10 sm:px-12 md:px-14">
          <div className="mx-auto w-full max-w-[20rem]">{children}</div>
        </div>
      </section>
    </main>
  )
}
