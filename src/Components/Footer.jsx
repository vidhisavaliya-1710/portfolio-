import React from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
            <FiGithub className="text-xl hover:text-[#C78665]" />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
            <FiLinkedin className="text-xl hover:text-[#C78665]" />
          </a>
          <a href="mailto:your@email.com">
            <FiMail className="text-xl hover:text-[#C78665]" />
          </a>
        </div>
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Vidhi Savaliya. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
