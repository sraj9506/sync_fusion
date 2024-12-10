import React,{useState,useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const logout =()=>{
    
  };

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setNavbarOpen(false); // Close navbar in desktop view
    };

    window.addEventListener('scroll', handleStickyNavbar);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleStickyNavbar);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getLinkClass = (path) =>
    location.pathname === path
      ? 'font-bold text-primary dark:text-white'
      : 'font-normal text-dark hover:text-primary dark:text-white/70 dark:hover:text-white';

  const toggleProfileDropdown = () => {
    if (!isMobile) setProfileDropdownOpen(!profileDropdownOpen);
  };

    return (
      <header
      className={`header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? 'dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition'
          : 'absolute bg-transparent'
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <a href="/" className={`header-logo block w-full ${sticky ? 'py-5 lg:py-2' : 'py-8'}`}>
              <img src="/images/logo/logo-2.svg" alt="logo" width={140} height={30} className="w-full dark:hidden" />
              <img src="/images/logo/logo.svg" alt="logo" width={140} height={30} className="hidden w-full dark:block" />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? ' top-[7px] rotate-45' : ''
                  }`}
                />
                <span className="relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white opacity-0" />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? ' top-[-8px] -rotate-45' : ''
                  }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen ? 'visibility top-full opacity-100' : 'invisible top-[120%] opacity-0'
                }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                {isMobile && user && (
                  <li className="group relative">
                    <Link to="/welcome" className="flex py-2 text-base text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">
                      Dashboard
                    </Link>
                  </li>
                
                )}
                  <li className="group relative">
                    <Link to="/" className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${getLinkClass('/')}`}>
                      Home
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link to="/About" className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${getLinkClass('/About')}`}>
                      About
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link to="/Services" className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${getLinkClass('/Services')}`}>
                      Services
                    </Link>
                  </li>
                  <li className="group relative">
                    <Link to="/ContactUs" className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${getLinkClass('/ContactUs')}`}>
                      Contact Us
                    </Link>
                  </li>
                  {isMobile && user && (
                  <li className="group relative">
                    <div className="py-1">
                        <button
                          onClick={logout}
                          className="block w-full px-0 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </div>
                  </li>
                )}
                </ul>
              </nav>
            </div>
            <div className="flex items-center justify-end pr-16 lg:pr-0">
              {user && !isMobile ? (
                <div className="relative">
                  <img
                    id="avatarButton"
                    onClick={toggleProfileDropdown}
                    src="/images/boy.png"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                  {profileDropdownOpen && (
                    <div
                      id="userDropdown"
                      className="absolute right-0 z-10 mt-2 w-44 bg-white rounded-lg shadow dark:bg-gray-dark"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{user?.name}</div>
                        <div className="font-medium truncate">{user?.email}</div>
                      </div>
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <Link to="/welcome" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Settings
                          </Link>
                        </li>
                      </ul>
                      <div className="py-1">
                        <button
                          onClick={logout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                !user && (
                  <>
                    <Link to="/Login" className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block">
                      Sign In
                    </Link>
                    <Link to="/SignUp" className="shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9">
                      Sign Up
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
    );
  }; 
export default Navbar;
