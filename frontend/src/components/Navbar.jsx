import { Link } from 'react-router-dom'
import farmconnectLogo from '../assets/logo.svg'
import { motion } from 'framer-motion'
import signupArrow from '../assets/signupArrow.svg'

const MotionLink = motion(Link)

function Navbar () {
  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    // { name: 'Sign Up', path: '/login', isSignup: true }
  ]
  return (
    <div className='flex p-6 justify-between items-center league-spartan bg-[#ececec]'>
      <Link to='/'>
        <motion.img
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: 'easeInOut'
          }}
          src={farmconnectLogo}
          alt=''
        />
      </Link>
      <div>
        {navItems.map((item, idx) => {
          return (
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
              {item.isSignup ? (
                <span className='flex items-center gap-2'>
                  {item.name}
                  <img src={signupArrow} alt='arrow' className='w-10' />
                </span>
              ) : (
                item.name
              )}
            </MotionLink>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar
