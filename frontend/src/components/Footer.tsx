import { Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react';

export function Footer() {
  const links = [
    {
      title: 'About',
      titleHindi: 'के बारे में',
      href: '#about'
    },
    {
      title: 'Govt Health Schemes',
      titleHindi: 'सरकारी स्वास्थ्य योजनाएं',
      href: '#schemes'
    },
    {
      title: 'PHC Directory',
      titleHindi: 'PHC निर्देशिका',
      href: '#phc'
    },
    {
      title: 'Help',
      titleHindi: 'सहायता',
      href: '#help'
    },
    {
      title: 'Contact',
      titleHindi: 'संपर्क',
      href: '#contact'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#009688] rounded-full p-2">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h3 className="text-xl">SwasthyaSahayak</h3>
                <p className="text-gray-400">स्वास्थ्य सहायक</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Making healthcare accessible to every Indian through voice-first technology and multilingual support.
            </p>
            <p className="text-gray-300 text-sm max-w-md">
              वॉयस-फर्स्ट टेक्नोलॉजी और बहुभाषी समर्थन के माध्यम से हर भारतीय के लिए स्वास्थ्य सेवा को सुलभ बनाना।
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-6">Quick Links | त्वरित लिंक</h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-[#009688] transition-colors block"
                  >
                    {link.title}
                  </a>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#009688] transition-colors text-sm block"
                  >
                    {link.titleHindi}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h4 className="text-lg mb-6">Connect | जुड़ें</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#009688]" />
                <div>
                  <p className="text-sm">Helpline: 1075</p>
                  <p className="text-xs text-gray-400">हेल्पलाइन: १०७५</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#009688]" />
                <div>
                  <p className="text-sm">help@swasthyasahayak.gov.in</p>
                </div>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#009688] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#009688] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#009688] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 SwasthyaSahayak - Government of India Initiative
          </p>
          <p className="text-gray-500 text-sm">
            © २०२४ स्वास्थ्य सहायक - भारत सरकार की पहल
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#009688]">Privacy Policy</a>
            <a href="#" className="hover:text-[#009688]">Terms of Service</a>
            <a href="#" className="hover:text-[#009688]">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}