import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Admin/Footer/Footer';
import digitalbusiness from '../../../public/digital-business-organizer-for-time-management1@2x.png';
import planner from '../../../public/planner-calendar-for-time-management@2x.png';
import tastmanagement from '../../../public/task-management-system-for-productivity@2x.png';
import laptop from '../../../public/agile-management-system-on-laptop@2x.png';
import rectangle from '../../../public/rectangle-29.svg';
import businessAnalytics from '../../../public/business-analytics-on-tablet-screen@2x.png';
import womentplanning from '../../../public/woman-planning-on-a-calendar@2x.png';
import dashboard from '../../../public/dashboard@2x.png';
import Eclipse from '../../components/Eclipse'
import { motion } from 'framer-motion'
import { useInView } from "framer-motion"

import { Link } from 'react-router-dom';
import { duration } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../Context/Theme';
function Landing() {
  const theme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark' ? true : false);
  const [isTaginView, setIsTagInView] = useState(false);
  const [isCardinView, setIsCardInView] = useState(false);
  const [isfeautreinView, setIsFeatureInView] = useState(false);

  const tagRef = useRef(null);
  const cardRef = useRef(null);
  const featureRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTagInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(tagRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFeatureInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(featureRef.current);

    return () => observer.disconnect();
  }, []);
  const toggleDarkMode = () => {
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    setIsDarkMode(!isDarkMode);
  };


  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} dark:bg-black bg-white overflow-hidden mx-auto max-w-screen`}>
        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-4 mt-16 right-4 z-50 bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
        >
          {theme === 'ligth' ? '🌞' : '🌙'}
        </button>

        <div className='w-screen relative'>
          <div className='relative z-10 min-h-screen mx-auto max-w-[1000px] flex items-center justify-center'>
            <div className=''>
              <motion.img initial={{ translateX: '-100px', scale: 0.6, translateY: '-100px', opacity: 0 }} transition={{ duration: '0.6', ease: 'backInOut' }} animate={{ translateX: 0, scale: 1, translateY: 0, opacity: 1, }} src={digitalbusiness} className={`w-32 lg:w-44 absolute object-cover lg:top-24 lg:left-16 top-12 left-0 ${isDarkMode ? 'dark' : ''}`} />
              <motion.img initial={{ translateX: '-100px', scale: 0.6, translateY: '100px', opacity: 0 }} transition={{ duration: '0.6', ease: 'easeInOut' }} animate={{ translateX: 0, scale: 1, translateY: 0, opacity: 1, }} src={tastmanagement} className={`w-36 lg:w-44 absolute object-cover lg:bottom-24 lg:left-24 bottom-16 left-0 ${isDarkMode ? 'dark' : ''}`} />
              <motion.img initial={{ translateX: '100px', translateY: '-100px', scale: 0.6, opacity: 0 }} transition={{ duration: '0.6', ease: 'backInOut' }} animate={{ translateX: 0, translateY: 0, scale: 1, opacity: 1, }} src={planner} className={`w-32 lg:w-44 absolute object-cover lg:top-24 lg:right-24 top-12 right-0 ${isDarkMode ? 'dark' : ''}`} />
              <motion.img initial={{ translateX: '100px', translateY: '100px', scale: 0.6, opacity: 0 }} transition={{ duration: '0.6', ease: 'easeInOut' }} animate={{ translateX: 0, translateY: 0, scale: 1, opacity: 1, }} src={laptop} className={`w-32 lg:w-44 absolute lg:bottom-24 lg:right-24 object-cover bottom-12 right-0 ${isDarkMode ? 'dark' : ''}`} />
            </div>
            <div className={`flex ${isDarkMode ? 'dark' : ''} dark:text-white text-black flex-col gap-8 items-center justify-center`}>
              <motion.h1 initial={{ opacity: 0, scale: 0.6 }} transition={{ duration: '0.3', ease: 'easeInOut' }} animate={{ opacity: 1, scale: 1 }} className={`text-[48px] font-serif lg:text-6xl text-center ${isDarkMode ? 'dark' : ''} dark:text-white`}>Streamline Your Employee Management</motion.h1>
              <motion.p initial={{ opacity: 0, scale: 0.8 }} transition={{ delay: 0.3, duration: '0.3', ease: 'easeInOut' }} animate={{ opacity: 1, scale: 1 }} className={`text-xl lg:text-2xl w-96 text-center ${isDarkMode ? 'dark' : ''} dark:text-gray-300`}>Effortlessly manage your employees with our all-in-one platform.</motion.p>
            </div>
          </div>
          <div className='absolute overflow-hidden rounded-[100%] blur-2xl  flex w-screen bottom-0 rotate-45 -translate-y-44 '>
            <div>
              <div className='-z-[2] animate-pulse overflow-hidden h-[500px] w-[600px] blur-[90px] rounded-[100%] bg-gradient-to-bl from-violet-300 to-purple-200 dark:from-violet-900 dark:to-purple-800 dark:blur-[240px] dark:animate-none'></div>
              <div className='-z-[4] animate-pulse overflow-hidden h-[500px] w-[600px] blur-[90px] rounded-[100%] bg-gradient-to-bl from-orange-300 to-purple-200 dark:from-orange-900 dark:to-purple-900 dark:blur-[240px] dark:animate-none'></div>
            </div>
            <div>
              <div className='-z-[2] animate-pulse overflow-hidden h-[500px] w-[600px] blur-[90px] rounded-[100%] bg-gradient-to-bl from-violet-400 to-purple-200 dark:from-violet-900 dark:to-purple-900 dark:blur-[230px] dark:animate-none'></div>
              <div className='-z-[4] animate-pulse overflow-hidden h-[500px] w-[600px] blur-[90px] rounded-[100%] bg-gradient-to-bl from-orange-200 to-purple-200 dark:from-orange-900 dark:to-purple-900 dark:blur-[240px] dark:animate-none'></div>
            </div>
      
            
          </div>
        </div>

        <div className={`w-full mt-32 max-w-[1200px] mx-auto my-12 ${isDarkMode ? 'dark' : ''}`}>
          <motion.div
            style={{
              transform: isTaginView ? "none" : "translateY(200px)",
              opacity: isTaginView ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) "
            }}
            id='tag'
            ref={tagRef}
            className={`grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-6 gap-12 ${isDarkMode ? 'dark' : ''}`}
          >
            <h2 className={`grid row-span-3 mx-12 z-[100] lg:col-span-3 font-bold text-4xl ${isDarkMode ? 'dark' : ''} dark:text-white`}>Streamline your employee management with ease</h2>
            <p className={`grid row-span-3 z-[100] mx-12 lg:col-span-3 ${isDarkMode ? 'dark' : ''} dark:text-gray-300`}>Our employee management platform offers a range of powerful features designed to simplify your HR processes. From seamless onboarding to efficient time tracking and insightful performance reviews, we've got you covered.</p>
          </motion.div>

          <div
            style={{
              transform: isCardinView ? "none" : "translateY(200px)",
              opacity: isCardinView ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) "
            }}
            ref={cardRef}
            className={`my-44 flex gap-24 items-center   justify-center flex-wrap ${isDarkMode ? 'dark' : ''}`}
          >
            <div className={`flex justify-center items-center  flex-col ${isDarkMode ? 'dark' : ''}`}>
              <div className='flex items-start mt-6 justify-center'>
                <img className={`w-[239px] mb-14  translate-y-8 z-10 relative ${isDarkMode ? 'dark' : ''}`} src={planner} />
                <img src={rectangle} className={`w-[210px]  animate-pulse blur-lg -z-10 absolute ${isDarkMode ? 'dark' : ''}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-semibold ${isDarkMode ? 'dark' : ''} dark:text-white`}>Accurate Time Tracking</h3>
                <p className={`text-lg my-4 w-56 ${isDarkMode ? 'dark' : ''} dark:text-gray-300`}>Track employee hours and attendance with precision and ease.</p>
              </div>
            </div>
            <div className={`flex justify-center items-center  flex-col ${isDarkMode ? 'dark' : ''}`}>
              <div className='flex items-center justify-center'>
                <img className={`w-[239px] relative z-10 ${isDarkMode ? 'dark' : ''}`} src={businessAnalytics} />
                <img src={rectangle} className={`w-[180px] animate-pulse blur-xl -z-10 absolute ${isDarkMode ? 'dark' : ''}`} />
              </div>
              <div>
                <h3 className={`text-2xl font-semibold ${isDarkMode ? 'dark' : ''} dark:text-white`}>Insightful Performance Reviews</h3>
                <p className={`text-lg my-4 w-72 ${isDarkMode ? 'dark' : ''} dark:text-gray-300`}>Track employee hours and attendance with precision and ease.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            transform: isfeautreinView ? "none" : "translateY(200px)",
            opacity: isfeautreinView ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) "
          }}
          ref={featureRef}
          className={`${isDarkMode ? 'dark' : ''}`}
        >
          <div className={`w-full max-w-[1200px] mx-auto ${isDarkMode ? 'dark' : ''}`}>
            <h2 className={`text-center text-4xl my-32 ${isDarkMode ? 'dark' : ''} dark:text-white`}>FEATURES</h2>
            <div className={`grid grid-cols-1 mx-6 gap-0 grid-rows-6 lg:grid-cols-6 lg:grid-rows-1 ${isDarkMode ? 'dark' : ''}`}>
              <img className={`w-[300px] grid row-span-3 lg:col-span-2 ${isDarkMode ? 'dark' : ''}`} src={womentplanning} />
              <div className={`flex flex-col gap-6 row-span-3 lg:col-span-4 ${isDarkMode ? 'dark' : ''}`}>
                <h2 className={`text-2xl font-semibold ${isDarkMode ? 'dark' : ''} dark:text-white`}>How We Track Employee Progress</h2>
                <p className={`${isDarkMode ? 'dark' : ''} dark:text-gray-300`}>Our system provides detailed performance metrics and progress tracking tools to help employees stay on track with their goals. We utilize a variety of key performance indicators (KPIs) to measure productivity, task completion rates, and overall efficiency.</p>
              </div>
            </div>
          </div>
          <motion.div
            style={{
              transform: isfeautreinView ? "none" : "translateY(200px)",
              opacity: isfeautreinView ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) "
            }}
            className={`w-full max-w-[1200px] mx-auto my-12 ${isDarkMode ? 'dark' : ''}`}
          >
            <div className={`grid grid-cols-1 mx-6 items-center justify-center gap-0 grid-rows-6 lg:grid-cols-6 lg:grid-rows-1 ${isDarkMode ? 'dark' : ''}`}>
              <img className={`w-[300px] grid row-span-3 lg:col-span-2 ${isDarkMode ? 'dark' : ''}`} src={dashboard} />
              <div className={`flex flex-col gap-6 row-span-3 lg:col-span-4 ${isDarkMode ? 'dark' : ''}`}>
                <h2 className={`text-2xl font-semibold ${isDarkMode ? 'dark' : ''} dark:text-white`}>Admin Features</h2>
                <p className={`${isDarkMode ? 'dark' : ''} dark:text-gray-300`}>Admins have access to comprehensive tools for managing employee data, generating reports, and configuring system settings. With real-time data and analytics, admins can make informed decisions to optimize workforce performance.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { Landing };