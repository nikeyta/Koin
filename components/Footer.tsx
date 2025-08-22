import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 '>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Logo and Tagline */}
          <div>
            <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-2'>
              ExpenseTracker AI
            </h2>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>
              Intelligent financial management powered by AI. Track your expenses,
              manage your budget, and gain insights.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Quick Links
            </h3>
            <div className='flex flex-col space-y-2'>
              <Link
                href='/'
                className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors'
              >
                Home
              </Link>
              <Link
                href='/about'
                className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors'
              >
                About
              </Link>
              <Link
                href='/contact'
                className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors'
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Features
            </h3>
            <div className='space-y-2 text-gray-600 dark:text-gray-400'>
              <p>AI-Powered Insights</p>
              <p>Smart Categorization</p>
              <p>Analytics Dashboard</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Credit */}
        <div className='border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-gray-500 dark:text-gray-400 text-sm mb-4 sm:mb-0'>
            © {new Date().getFullYear()} ExpenseTracker AI. All rights reserved.
          </p>
          <p className='text-gray-500 dark:text-gray-400 text-sm'>
            Made by Sahand
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;