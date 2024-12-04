import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'
import { CheckCircle2 } from 'lucide-react'

function Search() {
  const [domain, setDomain] = useState('')
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [averageRating, setAverageRating] = useState(0)
  const [domainRegDate, setDomainRegDate] = useState('')
  const [timeAgoFromReg, setTimeAgoFromReg] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [shareLink, setShareLink] = useState('')

  const reviewsPerPage = 3

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const linkParam = urlParams.get('link')
    if (linkParam) {
      setDomain(linkParam)
      handleSearch(linkParam)
    }
  }, [])

  const handleSearch = async (searchDomain = domain) => {
    // Regular expression to check if the domain is valid (excluding http://, https://, and www.)
    const domainRegex = /^(?!www\.)(?:[a-z0-9-]+\.)+[a-z]{2,6}$/i;
    // Clean the domain by removing http://, https://, and www.
    const cleanedDomain = searchDomain.replace(/^(https?:\/\/)?(www\.)?/i, '');

    // Update the state with the cleaned domain
    setDomain(cleanedDomain);

    // Check if the domain is valid
    if (!cleanedDomain || !domainRegex.test(cleanedDomain)) {
      setError('Please enter a valid domain.');
      return;
    }


    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`https://api.horizontrade.online/index.php?q=${cleanedDomain}`)
      console.log(response.data)
      setReviews(response.data.responses)
      setAverageRating(response.data.averagerating)
      setDomainRegDate(response.data.domain_reg_date)
      setTimeAgoFromReg(response.data.timeagofrfomreg)
      setCurrentPage(1)
      setShareLink(`${window.location.origin}${window.location.pathname}?link=${cleanedDomain}`)
    } catch (err) {
      setError('Failed to fetch reviews. Please try again later.')
    } finally {
      setLoading(false)
    }
  }


  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  // Filter out empty reviews and then paginate
  const currentReviews = reviews
    .filter(review => review.response && review.response.trim() !== '')
    .slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShare = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy link. Please try again.'))
  }

  const handleFetchMore = () => {
    window.location.href = `${window.location.pathname}?link=${domain}`;
  }

  return (
    <div className="bg-[#000] min-h-screen">
      <Header />
      <div className="py-8 bg-emerald-100 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-2">{domain || 'Domain Name'}</h1>
            <p className="text-gray-600 mb-4">Fetched {reviews.length} Most Recent Reviews</p>
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-6 w-6 ${i < averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15l-3.546 2.029 1.356-4.227L3 8.83l4.378-.362L10 4l2.622 4.468 4.378.362-3.81 4.972 1.356 4.227L10 15z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">{averageRating.toFixed(1)}</span>
            </div>
            <div className="relative w-full max-w-md">
              <input
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter domain name"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <button
                onClick={() => handleSearch()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-1 px-4 rounded-full text-sm"
              >
                Search
              </button>
            </div>
            {loading && <p className="mt-4 text-gray-500">Loading reviews...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-white">Reviews</h2>
            {currentReviews.length > 0 ? (
              <div className="space-y-6">
                {currentReviews.map((review, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-800 font-medium">
                      {review.response.split('.').slice(1).join('.').trim().replace(/^"|"$/g, '')}
                    </p>                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <>
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15l-3.546 2.029 1.356-4.227L3 8.83l4.378-.362L10 4l2.622 4.468 4.378.362-3.81 4.972 1.356 4.227L10 15z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      ))}
                      <p>{review.rating}</p>
                    </div>
                    <p className="mt-2 text-gray-600">Reviewed by: {review.email.charAt(0)}***@{review.email.split('@')[1].charAt(0)}{review.email.split('@')[1].slice(1)} on {review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-gray-600 mb-4">No reviews</p>
                <p className="text-gray-600">This company hasn't received any reviews yet.</p>
              </div>
            )}
            {reviews.length > reviewsPerPage && (
              <div className="mt-6 flex justify-center">
                {Array.from({ length: Math.min(Math.ceil(reviews.length / reviewsPerPage), 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleFetchMore}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Fetch More
                </button>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl text-white font-semibold mb-4">Company Info</h2>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-gray-400">Registered 1k+ Days Ago</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 color='#fff' size={20} />
                <span className="text-gray-400">Verified Domain</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="text-gray-400">People review on their own initiative</span>
              </li>
            </ul>
            <div className="bg-[#1e3932] text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Is this your company?</h3>
              <p className="mb-4">Claim your profile to access Trustpilot's free business tools and connect with customers.</p>
              <button className="bg-white text-[#1e3932] py-2 px-4 rounded-full font-semibold">
                Get free account
              </button>
            </div>
            {shareLink && (
              <div className="mt-6 bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Share this page</h3>
                <div className="flex items-center">
                  <input
                    type="search"
                    value={shareLink}
                    readOnly
                    className="flex-grow mr-2 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={handleShare}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Search

