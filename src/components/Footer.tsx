import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 px-8 md:px-16 lg:px-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/6048cdd38eac65234887e5fb/1615924069832-H7LY1AONNDW07LXVOZ12/First+Line+Fire+Extinguisher.png?format=1500w" 
              alt="First-Line Fire Extinguisher" 
              className="h-12"
            />
          </Link>
          <p className="text-gray-400 text-sm">1333 N 8th Street, Paducah KY 42001</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 text-sm text-gray-400">
          <a href="tel:2702791865" className="hover:text-white transition-colors">(270) 279-1865</a>
          <a href="mailto:sales@firstlinefire.com" className="hover:text-white transition-colors">sales@firstlinefire.com</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} First-Line Fire Extinguisher Co. All rights reserved.</p>
      </div>
    </footer>
  );
}