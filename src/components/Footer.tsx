import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Found a bug? Want a feature?
            </span>
            <a 
              href="mailto:semiloreawoniyi@gmail.com"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              semiloreawoniyi@gmail.com
            </a>
          </div>
          
          <nav className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/about" className="hover:text-primary-600 transition-colors">About</Link>
            <Link to="/partnership" className="hover:text-primary-600 transition-colors">Partnership</Link>
            <Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link>
            <Link to="/terms" className="hover:text-primary-600 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary-600 transition-colors">Privacy</Link>
          </nav>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} MediNova. All rights reserved.
        </div>
      </div>
    </footer>
  );
}