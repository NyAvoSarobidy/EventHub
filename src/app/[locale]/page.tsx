'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Apropos from './apropos'
import Event from './event'
import  AddEvent from './add_event'
export default function Page() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const slides = [
        { src: "/pub/pub-.jpg", alt: "image 1" },
        { src: "/pub/pub-2.jpg", alt: "image 2" },
        { src: "/pub/pub-3.jpg", alt: "image 3" },
        { src: "/pub/pub-4.jpg", alt: "image 4" },
        { src: "/pub/pub-5.jpg", alt: "image 5" },
        { src: "/pub/pub-6.jpg", alt: "image 6" },
        { src: "/pub/pub-7.jpg", alt: "image 7" },
        { src: "/pub/pub-8.jpg", alt: "image 8" },
        { src: "/pub/pub-9.jpg", alt: "image 9" },
        { src: "/pub/pub-10.jpg", alt: "image 10"},
        { src: "/pub/pub-11.jpg", alt: "image 11"}
  ]

  const nextSlide = (): void => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 3))
  }

  const prevSlide = (): void => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide < slides.length - 3) {
        nextSlide()
      } else {
        setCurrentSlide(0)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, slides.length])

  return (
    <div className="relative w-full">
      {/* Section Hero - Plein écran */}
      <div className="relative w-full h-screen">
        {/* Image de fond */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/fonds-1.jpg"
            alt="image de fond"
            fill
            className="object-cover blur-sm"
            priority
          />
        </div>

        {/* Carrousel */}
        <div className="absolute inset-0 flex items-center justify-center px-4 -mt-16 sm:-mt-20 md:-mt-24">
          <div className="relative w-full max-w-6xl">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2"
                  >
                    <div className="relative h-50 sm:h-72 md:h-80 lg:h-96 bg-white rounded-lg shadow-lg overflow-hidden">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bouton Précédent */}
            <button
              type="button"
              className="absolute top-1/2 -left-2 sm:left-4 transform -translate-y-1/2 z-30"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 disabled:opacity-50">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
              </span>
            </button>

            {/* Bouton Suivant */}
            <button
              type="button"
              className="absolute top-1/2 -right-2 sm:right-4 transform -translate-y-1/2 z-30"
              onClick={nextSlide}
              disabled={currentSlide >= slides.length - 3}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 disabled:opacity-50">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <Event />
      <Apropos />
      <AddEvent />

    </div>
  )
}