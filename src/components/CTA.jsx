import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, className, ...props }) => (
  <Link to={'/search'} 
    className={`px-4 py-2 rounded-md font-semibold transition-colors ${className}`}
    {...props}
  >
    {children}
  </Link>
)

const Card = ({ children, className, ...props }) => (
  <div
    className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
)

export default function MarketingAgency() {
  return (
    <div className="container bg-white mx-auto px-4  md:px-20 rounded-lg py-12">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            We're Strategic Digital Marketing Agency
          </h1>
          <p className="text-slate-600 mb-8">
            We've created a full-stack structure for our working workflow processe, were from the funny the century initial all made, have spare to negatives
          </p>
          <Button className="text-primary group inline-flex items-center">
            See More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <Card className="p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-6 h-6 bg-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Content Strategy</h2>
          <p className="text-slate-600">
            All our content marketing service packages include a custom content strategy
          </p>
        </Card>

        <Card className="p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-6 h-6 border-b-4 border-l-4 border-r-4 border-purple-500 rotate-45" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Content Development</h2>
          <p className="text-slate-600">
            We create some content calendar for your company's must-share content
          </p>
        </Card>

        <Card className="p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Content Creation</h2>
          <p className="text-slate-600">
            Experienced in copywriting and marketing team begins creating content
          </p>
        </Card>

        <Card className="p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
            <div className="w-6 h-6 bg-orange-500 transform rotate-45" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Content Optimization</h2>
          <p className="text-slate-600">
            Your content marketing management services also include SEO
          </p>
        </Card>
      </div>

      {/* Social Media Section */}
      <div className="bg-slate-800 rounded-xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="relative">
          <div className="text-white text-3xl font-bold mb-4">markethink</div>
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-500 rounded-full opacity-50" />
          <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-orange-500 rounded-full opacity-50" />
        </div>
        <div className="lg:max-w-xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Increase Business on Social Media Reach
          </h2>
          <p className="text-slate-300 mb-6">
            Using our network of industry influencers, we help promote your content
          </p>
          <Button className="bg-[#A7C957] hover:bg-[#8EAF4B] text-white text-lg px-6 py-3">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}