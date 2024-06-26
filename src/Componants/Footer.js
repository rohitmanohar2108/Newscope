import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'; // Importing icons from react-icons

const Footer = ({ darkMode }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const formAnimation = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? 'translateY(0)' : 'translateY(-20px)',
    height: showForm ? 'auto' : 0,
    overflow: 'hidden',
  });

  return (
    <footer className={` ${darkMode ? 'bg-white text-white' : 'bg-black text-gray-800'} py-4`}>
      <div className="container mx-auto px-6 lg:px-4 flex flex-col items-center justify-center font-serif">
        <p className="text-sm">&copy; {new Date().getFullYear()} NewScope. All rights reserved.</p>

        <div className="flex flex-col items-center justify-center mt-6">
          <button
            className="text-2xl font-serif bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mb-4 transition duration-300 font-lato transform hover:scale-105 cursor-pointer"
            onClick={toggleForm}
          >
            Let's Connect 🚀🚀
          </button>

          <animated.div
            style={formAnimation}
            className="w-full max-w-md"
          >
            {showForm && (
              <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 font-serif">
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 text-black rounded"
                    id="message"
                    rows="4"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold font-serif py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 cursor-pointer"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </animated.div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-end  mt-4 mr-6">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 mx-2">
          <FaInstagram className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 mx-2">
          <FaFacebook className="w-6 h-6" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 mx-2">
          <FaTwitter className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
