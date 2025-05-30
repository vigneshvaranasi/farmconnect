import { Link, useNavigate } from 'react-router-dom'
import farmconnectLogo from '../assets/logo.svg'
import { motion } from 'framer-motion'
import signupArrow from '../assets/signupArrow.svg'
import { useAuth } from '../contexts/AuthContext'

const MotionLink = motion(Link)

function Navbar () {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate() // ✅ Fix: useNavigate added

  const commonNavItems = [
    // { name: 'Home', path: '/' },
  ]

  const roleBasedNavItems = {
    farmer: [
      { name: 'Products', path: '/products' },
      { name: 'Bidding', path: '/bidding' },
      { name: 'Profile', path: '/profile' }
    ],
    customer: [
      { name: 'Products', path: '/products' },
      { name: 'Bidding', path: '/bidding' },
      { name: 'Profile', path: '/profile' }
    ],
    trader: [
      { name: 'Products', path: '/products' },
      { name: 'Bidding', path: '/bidding' },
      { name: 'Profile', path: '/profile' }
    ]
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const authNavItems = isAuthenticated
    ? [
        ...(roleBasedNavItems[user?.userType] || []),
        { name: 'Logout', path: '/', onClick: handleLogout, isButton: true }
      ]
    : [{ name: 'Sign Up', path: '/login', isSignup: true }]

  return (
    <div className='flex p-6 justify-between items-center league-spartan bg-[#ececec]'>
      <Link to='/'>
        <motion.img
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeInOut' }}
          src={farmconnectLogo}
          alt='FarmConnect Logo'
        />
      </Link>

      <div className='flex items-center'>
        {[...commonNavItems, ...authNavItems].map((item, idx) => {
          const content = item.isSignup ? (
            <span className='flex items-center gap-2'>
              {item.name}
              <img src={signupArrow} alt='arrow' className='w-10' />
            </span>
          ) : (
            item.name
          )

          return item.isButton ? (
            <button
              key={idx}
              onClick={item.onClick}
              className='mx-2 text-white py-3 px-6 bg-red-600 rounded-full font-semibold'
            >
              {item.name}
            </button>
          ) : (
            <MotionLink
              key={idx}
              to={item.path}
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.5,
                ease: 'easeInOut'
              }}
              className={`${
                item.isSignup
                  ? 'mx-2 text-black font-semibold py-3 px-6 border border-black rounded-full inline-block'
                  : 'mx-2 text-white py-3 px-6 bg-black rounded-full inline-block'
              }`}
            >
              {content}
            </MotionLink>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar
