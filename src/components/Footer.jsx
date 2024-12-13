import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black mt-[4rem] text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
     

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} Clan Share - By Robinson Honour</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/ikwerre-dev" className="hover:text-white transition-colors">Github</a>
              <a href="https://robinsonhonour.me" className="hover:text-white transition-colors">PortFolio</a>
              <a href="https://help.robinsonhonour.me" className="hover:text-white transition-colors">Donate</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;