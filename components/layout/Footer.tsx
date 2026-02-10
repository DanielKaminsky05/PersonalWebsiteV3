export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 text-center mx-4">
          {/* Copyright */}
          {/* Copyright */}
          <p className="text-gray-400 text-xs md:text-sm">
            © Daniel Kaminsky all rights reserved
          </p>
          
          {/* Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/DanielKaminsky05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-xs md:text-sm hover:text-white transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/danielkaminsky-/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-xs md:text-sm hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
