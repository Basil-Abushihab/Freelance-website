"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-24 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Platform</h3>
            <ul className="space-y-2">
              {["How it works", "Pricing", "Features", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About us", "Careers", "Blog", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Support", "Documentation", "Terms of Service", "Privacy"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Get the latest updates and news straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border rounded-lg"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="font-bold text-xl">Freebird</span>
          </div>
          <div className="text-gray-600 text-center md:text-left">
            © 2024 Freebird. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
