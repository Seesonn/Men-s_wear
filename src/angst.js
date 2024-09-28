import React, { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag, ChevronRight, Mail, Phone, MapPin, User, Star, Heart, Search, Home, ShoppingCart, Info, Contact } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'




import c1 from "./assets/c1.png"
import c2 from "./assets/c2.png"
import c3 from "./assets/c3.png"
import c4 from "./assets/c4.png"
import c5 from "./assets/c5.png"
import p1 from "./assets/p1.png"
import p2 from "./assets/p2.png"
import p3 from "./assets/p3.png"
import p4 from "./assets/p4.png"
import p5 from "./assets/p5.png"
import p6 from "./assets/p6.png"
import p7 from "./assets/p7.png"
import p8 from "./assets/p8.png"
import p10 from "./assets/p10.png"
import p11 from "./assets/p11.png"
import home from "./assets/home.png"

const products = [
  { id: 1, name: 'Distressed Denim Jacket', category: 'Outerwear', price: 15999, img: p6, description: 'Edgy denim jacket with intentional distressing' },
  { id: 2, name: ' Black Cotton Jeans', category: 'Bottoms', price: 7999, img: p2, description: 'Sleek black jeans and  dusty pant graded angst ' },
  { id: 3, name: 'Spiked Leather Choker', category: 'Accessories', price: 2499, img: p3, description: 'Bold leather choker with metal spikes and tond' },
  { id: 4, name: 'Studded Combat Boots', category: 'Footwear', price: 12999, img: p4, description: 'Heavy-duty boots with silver studs and duty' },
  { id: 5, name: 'Vintage Shirt', category: 'Tops', price: 3999, img: p5, description: 'Vintage-style t-shirt with punk rock graphics sisan printed' },
  { id: 6, name: 'Leather Biker Jacket', category: 'Outerwear', price: 24999, img: p1, description: 'Classic biker jacket in genuine leather and thst' },
  { id: 7, name: 'Sisan Sweetshirt', category: 'Tops', price: 1200, img: p7, description: 'Made from a blend of breathable cotton and polyester ' },
  { id: 8, name: ' Sisan Sweetshirt', category: 'Tops', price: 1200, img: p8, description: 'Made from a blend of breathable cotton and polyester ' },
  { id: 9, name: 'Sisan Vest', category: 'Tops', price: 1200, img: p5, description: 'Made from lightweight, breathable fabric and polyester' },
  { id: 10, name: 'The Mojito ', category: 'Accessories', price: 600, img: p10, description: 'Red Guitar String Wood Men Wedding Bands ' },
  { id: 11, name: 'Gold Platted Ring', category: 'Accessories', price: 100, img: p11, description: 'Smooth  gold Platted Ring of German halfaty' }
]

const categories = [
  { name: 'Outerwear', img: c1, description: 'Elevate your style with our collection of edgy jackets and coats, designed to make a bold statement wherever you go, from sleek leather bombers to oversized denim jackets, each piece combines attitude and artistry for a truly unique look.' },
  { name: 'Tops', img: c2, description: 'Unleash your inner rebel with our collection of shirts and tops that defy conventionExplore a variety of styles that effortlessly blend comfort with attitude, perfect for everything from casual outings to nightlife adventures. With bold prints, unexpected details, and a mix of textures, our rebellious shirts and tops empower you to express your unique style for any occasion.' },
  { name: 'Bottoms', img: c3, description: 'Explore our curated selection of men’s bottoms designed to offer style, comfort, and versatility for every occasion. Whether you’re dressing up for a night out or keeping it casual on the weekend, our collection has something for everyone.Whatever your style, our men’s bottoms are designed to fit seamlessly into your lifestyle. Mix and match with our top collections to create looks that reflect your unique personality and taste!' },
  { name: 'Footwear', img: c4, description: 'Step into the spotlight with our collection of bold boots and shoes, designed for those who dare to make a statement. Whether you’re looking for something edgy for a night out or versatile pieces for everyday wear, our footwear range combines style, comfort, and attitude.No matter the occasion, our bold boots and shoes are crafted to empower your style. Pair them with your favorite outfits and let your footwear do the talking!' },
  { name: 'Accessories', img: c5, description: 'Elevate your look with our collection of edgy accessories designed for the modern man who isn’t afraid to express his individuality. From statement pieces to subtle details, these accessories add a touch of attitude and flair to any outfit.'} 
  ]

export default function Component() {
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const topSearchProducts = products.slice(0, 4)
  const recommendedProducts = products.slice(2, 6)

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      const { email } = JSON.parse(storedUser)
      setIsLoggedIn(true)
      setUserEmail(email)
    }
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const addToCart = (product) => {
    const newCart = [...cart, { ...product, cartId: Date.now() }]
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeFromCart = (cartId) => {
    const newCart = cart.filter(item => item.cartId !== cartId)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const placeOrder = () => {
    if (!isLoggedIn) {
      alert('Please log in to place an order.')
      openLogin()
      return
    }
    alert('Order placed successfully!')
    setCart([])
    localStorage.removeItem('cart')
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
    setIsUserMenuOpen(false)
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
      localStorage.setItem('currentUser', JSON.stringify({ email }))
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
    localStorage.setItem('currentUser', JSON.stringify({ email }))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
    setIsUserMenuOpen(false)
    localStorage.removeItem('currentUser')
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

// ... (state declarations remain the same)

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (query.trim() === '') {
      setIsSearchOpen(false)
      setSearchResults([])
    } else {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
      setIsSearchOpen(true)
    }
  }

  // ... (other functions remain the same)
  useEffect(() => {
    if (searchQuery === '') {
      setIsSearchOpen(false)
    }
  }, [searchQuery])
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
       
          <h1 className="text-2xl font-bold text-white">MortalMen</h1>
          <nav className="hidden md:flex space-x-4">
            <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('shop')} className="text-gray-300 hover:text-white transition-colors">Shop</button>
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
          </nav>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white w-full md:w-auto"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors mr-2 flex items-center"
                  onClick={toggleUserMenu}
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xl font-bold">{userEmail[0].toUpperCase()}</span>
                  </div>
                  <span className="hidden md:inline">{userEmail.split('@')[0]}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <User className="inline-block mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
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
                <button onClick={() => scrollToSection('home')} className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors">
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </button>
                <button onClick={() => scrollToSection('shop')} className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Shop
                </button>
                <button onClick={() => scrollToSection('about')} className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors">
                  <Info className="h-5 w-5 mr-2" />
                  About
                </button>
                <button onClick={() => scrollToSection('contact')} className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors">
                  <Contact className="h-5 w-5 mr-2" />
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
        
         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
        <div className="px-4 py-6 sm:px-0">
          {/* Home Section */}
          <div id="home" className="relative mb-12">
            <img
              src={home}
              alt=" Redefined"
              className="w-full h-auto rounded-lg"
              width={1200}
              height={600}
              layout="responsive"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-8 bg-black bg-opacity-50 rounded-lg">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-white">  MortalMen Redefined:</h2>
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
                    <MapPin className="mr-2" /> Salakpur, Morang
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
            <p className="text-sm text-gray-400">© 2024 SISAN. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Cart */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag className="h-6 w-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </button>
      </div>


      {/* Popups */}
      {/* Cart Popup */}
      {isCartOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsCartOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.cartId} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center">
                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" width={64} height={64} />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeFromCart(item.cartId)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-bold">Total: ₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}</p>
            <button
              className="mt-2 w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}


     

      {/* Login Popup */}
      {isLoginOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsLoginOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
        <button
          type="submit"
          className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Login
        </button>
      </form>
      <button onClick={openSignup} className="mt-4 text-sm text-gray-600 hover:text-gray-900">
        Don't have an account? Sign up
      </button>
      <button onClick={openForgotPassword} className="mt-2 text-sm text-gray-600 hover:text-gray-900">
        Forgot password?
      </button>
    </div>
  </div>
)}

{isSignupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsSignupOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            name="address"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        {signupError && <p className="text-red-500 mb-4">{signupError}</p>}
        <button
          type="submit"
          className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign Up
        </button>
      </form>
      <button onClick={openLogin} className="mt-4 text-sm text-gray-600 hover:text-gray-900">
        Already have an account? Log in
      </button>
    </div>
  </div>
)}

      {/* Forgot Password Popup */}
      {isForgotPasswordOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsForgotPasswordOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Reset Password
        </button>
      </form>
      <button onClick={openLogin} className="mt-4 text-sm text-gray-600 hover:text-gray-900">
        Back to Login
      </button>
    </div>
  </div>
)}


      {/* Category Products Popup */}
      {selectedCategory && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{selectedCategory} Products</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setSelectedCategory(null)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products
          .filter(product => product.category === selectedCategory)
          .map(product => (
            <div key={product.id} className="border p-4 rounded-lg">
              <img src={product.img} alt={product.name} width={300} height={200} className="w-full h-48 object-cover mb-2 rounded" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold mb-2">₹{product.price.toLocaleString('en-IN')}</p>
              <button
                className="w-full bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  </div>
)}

      {/* Search Results Popup */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20"
          >
            <div className="bg-white p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Search Results</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map(product => (
                    <div key={product.id} className="border p-4 rounded-lg">
                      <img src={product.img} alt={product.name} width={300} height={200} className="w-full h-48 object-cover mb-2 rounded" />
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <p className="font-bold mb-2">₹{product.price.toLocaleString('en-IN')}</p>
                      <button
                        className="w-full bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No results found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
