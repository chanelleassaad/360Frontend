import React from "react";
import { FaPhone, FaInstagram, FaYoutube, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const media_style = "mx-4 text-xl cursor-pointer sm:text-3xl" 
  const contact_style = "mx-2 text-xl cursor-pointer sm:text-2xl"

  return (
  <div className="flex flex-col items-center p-5 bg-white">
    <div className="flex justify-center">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className={media_style} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube className={media_style} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className={media_style} />
      </a>
    </div>
  
    <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
      <FaEnvelope className={contact_style} />
      360Company@gmail.com
      <div className="m-[10px]"></div>
      <FaPhone className={contact_style} />
      +961-78800900
    </div>
  </div>


  );
};

export default Footer;

