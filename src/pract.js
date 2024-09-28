'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, ChevronRight, Mail, Phone, MapPin, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ... (keep the existing imports for images)

const products = [
  // ... (keep the existing products array)
]

const categories = [
  // ... (keep the existing categories array)
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [users, setUsers] = useState([])
  const [loginError, setLoginError] = useState('')
  const [signupError, setSignupError] = useState('')

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }])
  }

  const removeFromCart = (cartId) => {
    const index = cart.findIndex(item => item.cartId === cartId)
    if (index !== -1) {
      const newCart = [...cart]
      newCart.splice(index, 1)
      setCart(newCart)
    }
  }

  const placeOrder = () => {
    alert('Order placed successfully!')
    setCart([])
    setIsCartOpen(false)
  }

  const openLogin = () => {
    setIsLoginOpen(true)
    setIsSignupOpen(false)
    setIsForgotPasswordOpen(false)
    setLoginError('')
  }

  const openSignup = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(true)
    setIsForgotPasswordOpen(false)
    setSignupError('')
  }

  const openForgotPassword = () => {
    setIsLoginOpen(false)
    setIsSignupOpen(false)
    setIsForgotPasswordOpen(true)
  }

  const closeAllPopups = () => {
    setIsCartOpen(false)
    setIsLoginOpen(false)
    setIsSignupOpen(false)
    setIsForgotPasswordOpen(false)
    setSelectedCategory(null)
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      setIsLoggedIn(true)
      setUserEmail(email)
      setIsLoginOpen(false)
      setLoginError('')
    } else {
      setLoginError('Invalid email or password')
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const address = e.target.address.value

    if (users.some(u => u.email === email)) {
      setSignupError('Email already exists')
      return
    }

    const newUser = { name, email, password, address }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    setIsLoggedIn(true)
    setUserEmail(email)
    setIsSignupOpen(false)
    setSignupError('')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
  }

  const topSearchProducts = products.slice(0, 4)
  const recommendedProducts = products.slice(2, 6)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gray-900 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">SISANWear</h1>
          <nav className="hidden md:flex space-x-4">
            <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('shop')} className="text-gray-300 hover:text-white transition-colors">Shop</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
          </nav>
          <div className="flex items-center">
            <button
              className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors mr-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-6 w-6 inline-block mr-2" />
              <span>{cart.length}</span>
            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors mr-2 flex items-center"
                  onClick={() => setIsLoginOpen(true)}
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xl font-bold">{userEmail[0].toUpperCase()}</span>
                  </div>
                  <span className="hidden md:inline">{userEmail.split('@')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors mr-2"
                onClick={openLogin}
              >
                Login
              </button>
            )}
            <button
              className="md:hidden text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-800 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => scrollToSection('home')} className="block w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors text-left">Home</button>
                <button onClick={() => scrollToSection('shop')} className="block w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors text-left">Shop</button>
                <button onClick={() => scrollToSection('about')} className="block w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors text-left">About</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors text-left">Contact</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Home Section */}
          <div id="home" className="relative mb-12">
            <img
              src={home}
              alt="Angst Redefined"
              className="w-full h-auto rounded-lg"
              width={1200}
              height={600}
              layout="responsive"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-8 bg-black bg-opacity-50 rounded-lg">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-white">Sisan Redefined:</h2>
              <p className="text-lg sm:text-xl mb-2 sm:mb-4 text-gray-200">Shop Fashion that Screams Rebellion, Number 1 in Attitude</p>
              <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">Shop now</button>
            </div>
          </div>

          {/* Shop Section */}
          <section id="shop" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Categories</h2>
            {categories.map((category, index) => (
              <div key={category.name} className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <img src={category.img} alt={category.name} className="w-full h-64 object-cover rounded-lg" width={600} height={400} />
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">{category.name}</h3>
                  <p className="mb-4 text-gray-600">{category.description}</p>
                  <button
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    Shop {category.name}
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Top Search Products Section */}
          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">Top Search Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topSearchProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-48 object-cover" width={300} height={200} />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-sm mb-2 text-gray-600">{product.description}</p>
                    <p className="font-bold mb-2 text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
                    <button
                      className="w-full bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Highly Recommended Section */}
          <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">Highly Recommended</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-48 object-cover" width={300} height={200} />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-sm mb-2 text-gray-600">{product.description}</p>
                    <p className="font-bold mb-2 text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
                    <button
                      className="w-full bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-12 bg-white rounded-lg shadow-md p-6 sm:p-20">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">About Us</h2>
            <p className="mb-4 text-gray-700">
              At SISANWear, we're passionate about providing edgy, high-quality clothing for the modern rebel. Our curated collection of jackets, tops, bottoms, footwear, and accessories is designed to help you express your inner angst and stand out from the crowd.
            </p>
            <p className="text-gray-700">
              With years of experience in alternative fashion, our team of experts carefully selects each item in our inventory to ensure that we're offering the latest underground trends and timeless punk classics that will fuel your rebellion for years to come.
            </p>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-6 sm:p-20">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Why Choose Us</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Curated selection of high-quality alternative fashion</li>
              <li>Expert style advice for the perfect rebellious look</li>
              <li>Competitive prices on top underground brands</li>
              <li>Easy returns and exchanges</li>
              <li>Fast and reliable shipping</li>
              <li>Regular promotions and discounts for our loyal misfits</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-12 rounded-lg shadow-md p-6 sm:p-20">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="flex items-center text-gray-700">
                    <Mail className="mr-2" /> sisanwear@gmail.com
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Phone className="mr-2" /> 9844354444
                  </p>
                  <p className="flex items-center text-gray-700">
                    <MapPin className="mr-2" />  Salakpur, Morang
                  </p>
                </div>
                <form className="space-y-4">
                  <input type="text" placeholder="Name" className="w-full p-2 rounded-md border border-gray-300" />
                  <input type="email" placeholder="Email" className="w-full p-2 rounded-md border border-gray-300" />
                  <textarea placeholder="Message" rows={4} className="w-full p-2 rounded-md border border-gray-300"></textarea>
                  <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Send Message</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 mt-12 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm text-gray-300">We provide high-quality alternative fashion for all your rebellious needs.</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-300">Email: sisanwear@gmail.com</p>
              <p className="text-sm text-gray-300">Phone: 9845367677</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">© 2024 SISANWear. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Category Products Popup */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-gray-900 p-6 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCategory} Products</h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.category === selectedCategory).map((product) => (
                  <div key={product.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                    <img src={product.img} alt={product.name} className="w-full h-64 object-cover" width={300} height={200} />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                      <p className="text-sm mb-2 text-gray-600">{product.description}</p>
                      <p className="font-bold mb-2 text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
                      <button
                        className="w-full bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Popup */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeAllPopups}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-gray-900 p-6 rounded-lg max-w-md w-full max-h-[80vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow mb-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-600">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartId} className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold mb-4 text-gray-900">Total: ₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}</p>
                <button
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors mb-2"
                  onClick={placeOrder}
                  disabled={cart.length === 0}
                >
                  Place Order
                </button>
                <button
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setIsCartOpen(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Popup */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeAllPopups}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-gray-900 p-6 rounded-lg max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Login</h2>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-200 focus:ring-opacity-50" required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-200 focus:ring-opacity-50" required />
                </div>
                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                <button type="submit" className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Login</button>
              </form>
              <div className="mt-4 text-center">
                <button onClick={openForgotPassword} className="text-gray-600 hover:text-gray-900 transition-colors">Forgot password?</button>
              </div>
              <div className="mt-4 text-center">
                <p>Don't have an account? <button onClick={openSignup} className="text-gray-600 hover:text-gray-900 transition-colors">Sign up</button></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signup Popup */}
      <AnimatePresence>
        {isSignupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeAllPopups}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-gray-900 p-6 rounded-lg max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                <button
                  onClick={() => setIsSignupOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleSignup}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-200 focus:ring-opacity-50" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-200 focus:ring-opacity-50" required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-200 focus:ring-opacity-50" required />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" id="address" name="address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-200 focus:ring-opacity-50" required />
                </div>
                {signupError && <p className="text-red-500 text-sm">{signupError}</p>}
                <button type="submit" className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Sign Up</button>
              </form>
              <div className="mt-4 text-center">
                <p>Already have an account? <button onClick={openLogin} className="text-gray-600 hover:text-gray-900 transition-colors">Login</button></p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot Password Popup */}
      <AnimatePresence>
        {isForgotPasswordOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeAllPopups}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-gray-900 p-6 rounded-lg max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
                <button
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring focus:ring-gray-200 focus:ring-opacity-50" required />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">Reset Password</button>
              </form>
              <div className="mt-4 text-center">
                <button onClick={openLogin} className="text-gray-600 hover:text-gray-900 transition-colors">Back to Login</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}