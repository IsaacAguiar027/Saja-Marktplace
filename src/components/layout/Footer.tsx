import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About LocalMarket</h3>
            <p className="text-gray-300 mb-4">
              Your local marketplace for buying and selling items and services in our community. Connect with neighbors and find great deals nearby.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/vehicles" className="text-gray-300 hover:text-teal-400 transition-colors">Vehicles</Link></li>
              <li><Link to="/category/real-estate" className="text-gray-300 hover:text-teal-400 transition-colors">Real Estate</Link></li>
              <li><Link to="/category/electronics" className="text-gray-300 hover:text-teal-400 transition-colors">Electronics</Link></li>
              <li><Link to="/category/furniture" className="text-gray-300 hover:text-teal-400 transition-colors">Furniture</Link></li>
              <li><Link to="/category/services" className="text-gray-300 hover:text-teal-400 transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/create-listing" className="text-gray-300 hover:text-teal-400 transition-colors">Post an Ad</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-teal-400 transition-colors">Register</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-teal-400 transition-colors">Login</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">Help & Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">Safety Tips</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-2" />
                <span>123 Main Street, Your City</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2" />
                <span>contact@localmarket.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} LocalMarket. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;