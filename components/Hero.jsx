import Image from 'next/image'
import { Button } from '@/components/custom/Button'
import { HeroSVG } from '@/components/custom/HeroSVG'

export default function Hero() {
  return (
    <section className="pl-56 min-h-screen flex items-center overflow-hidden relative">
      <div className="flex items-center justify-between pl-20 py-20">
        {/* Left Content */}
        <div className="left relative z-20 flex-1">
          <h1 className="text-7xl font-bold text-[var(--black)] mb-2 tracking-wide font-amarante relative text-nowrap">
            <span className='w-full absolute left-0 right-0 border-t-8 border-[var(--black)] -my-2'></span>
            HS CRAFTERS
          </h1>
          <p className="text-xl text-[var(--dark-grey)] mb-6 max-w-md leading-relaxed tracking-wide font-roboto">
            Turning Life into Art, One Craft at a Time.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6">
            <Button label={"SHOP"} variant='outlined' />
            <Button label={"HAVE A TOUR"} variant='filled' />
          </div>
        </div>
        {/* Right Content */}
        <div className="right">
          <div className="circle h-[140vmin] bg-[var(--light-secondary-bg)] aspect-square absolute right-0 translate-x-[60%] top-1/2 -translate-y-1/2 rounded-full z-10 flex items-center justify-center">
            <HeroSVG />
          </div>
          <div className="lamp absolute top-0 right-0 z-10">
            <img src="/hero-lamps.png" className='w-[56vmin]' alt="Lamps" />
          </div>
        </div>
      </div>
    </section>
  )
}
