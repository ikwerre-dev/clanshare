import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Building2,
  Plane,
  Car,
  Sofa,
  Diamond,
  Shirt,
  Laptop,
  Dumbbell,
} from "lucide-react"
import { Link } from 'react-router-dom'

export default function About() {
  const categories = [
    { icon: Building2, label: "Bank" },
    { icon: Plane, label: "Travel Insurance Company" },
    { icon: Car, label: "Car Dealer" },
    { icon: Sofa, label: "Furniture Store" },
    { icon: Diamond, label: "Jewelry Store" },
    { icon: Shirt, label: "Clothing Store" },
    { icon: Laptop, label: "Electronics & Technology" },
    { icon: Dumbbell, label: "Fitness and Nutrition Service" },
  ]

  const sliderRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        setShowRightArrow(
          sliderRef.current.scrollWidth > sliderRef.current.clientWidth
        )
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      const scrollAmount = clientWidth * 0.8
      const newScrollLeft = direction === 'left'
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount

      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })

      setTimeout(() => {
        if (sliderRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
          setShowLeftArrow(scrollLeft > 0)
          setShowRightArrow(scrollLeft + clientWidth < scrollWidth)
        }
      }, 300)
    }
  }

  return (
    <div className="w-full bg-[#EAE8FF]" id='about'>
      {/* Top Navigation */}
      <div className="flex justify-end p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm">Bought something recently?</span>
          <Link to={'/search'}className="text-blue-600 text-sm hover:underline">
            Write a review
          </Link>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-6 py-8">
        <h2 className="text-2xl text-center font-bold mb-6">What are you looking for?</h2>
        <div className="relative flex justify-center">
          <div 
            ref={sliderRef}
            className="flex items-center justify-center gap-4 overflow-x-auto pb-4 scrollbar-hide max-w-6xl"
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 min-w-[120px] cursor-pointer"
              >
                <div className="p-4 rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                  <category.icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-center font-medium">{category.label}</span>
              </div>
            ))}
          </div>
          {showLeftArrow && (
            <Link to={'/search'}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}
          {showRightArrow && (
            <Link to={'/search'}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#FFF4E7] px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-[2rem]">
            <h1 className="text-4xl font-bold">Help millions make the right choice</h1>
            <p className="text-gray-600">
              Share your experience on Trustpilot, where real reviews make a difference.
            </p>
            <div className="space-y-4">
              <Link to={'/search'} className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded">
                Search
              </Link>
              
              <div className="flex gap-2">
                <Link to={'/search'} className="p-2 border rounded-full hover:bg-gray-50">
                  <img
                    src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
                    alt="Google"
                    className="w-6 h-6"
                  />
                </Link>
                <Link to={'/search'} className="p-2 border rounded-full hover:bg-gray-50">
                  <img
                    src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </Link>
                <Link to={'/search'} className="p-2 border rounded-full hover:bg-gray-50">
                  <img
                    src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
                    alt="Apple"
                    className="w-6 h-6"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="overflow-hidden rounded-lg shadow">
              <img
                src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
                alt="Review image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow">
              <img
                src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
                alt="Review image 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow">
              <img
                src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
                alt="Review image 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}