import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://linkedin.com' },
    { name: 'Pinterest', icon: <FaPinterest />, url: 'https://pinterest.com' },
  ];

  return (
    <footer
      className="bg-gradient-to-r from-[#1A3C61] to-[#6B46C1] text-white py-10 px-10"
      style={{ backgroundImage: 'linear-gradient(to right, #1A3C61, #6B46C1)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div>
          <div className="text-2xl font-bold mb-4">
          <img src="https://campustocareer.tech/uploads/setting/1737912027-57XbFeEPxz.png" alt="Logo" />
          </div>
          <p className="text-sm mb-4">
            Mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#FF6F61] transition-colors duration-300"
                aria-label={link.name}
              >
                <span className="text-xl">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
                FQA
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
                Blogs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
                Courses
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Info</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span>📍</span>
              <span className="text-sm">Bangalore, Karnataka.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📞</span>
              <span className="text-sm">9100466729</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📧</span>
              <span className="text-sm">demo@email.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2025 PBR. ALL Rights Reserved.</p>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
            Instructor
          </a>
          <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
            Become Instructor
          </a>
          <a href="#" className="text-sm hover:text-[#FF6F61] transition-colors duration-300">
            Verify Certificate
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;