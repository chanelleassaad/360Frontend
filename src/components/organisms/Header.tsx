import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/360logo.png";

export default function Header() {
  const sections = [
    { id: "about", name: "About Us" },
    { id: "projects", name: "Our Projects" },
    { id: "contact", name: "Contact Us" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({ behavior: "smooth", top: offset });
      setMobileMenuOpen(false); // Close the mobile menu if it's open
    }
  };

  return (
    <header
      className={`bg-white inset-x-0 top-0 z-50 sticky ${
        mobileMenuOpen ? "hidden" : "block"
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-3 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1 p-1">
            <span className="sr-only">Your Company</span>
            <img alt="360 Logo" src={logo} className="h-12 w-auto lg:h-20" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.id)}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {section.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black opacity-30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-3  sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="360 Logo" src={logo} className="h-20 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-2 py-6">
            {sections.map((section) => (
              <button
                key={section.id}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => handleNavigation(section.id)}
              >
                {section.name}
              </button>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
