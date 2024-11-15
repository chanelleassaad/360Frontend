import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Importing close icon
import logo from "../../assets/360logo.png";
import { useAuth } from "../../store/authentication/AuthContext";
import { useSelector } from "react-redux";

export default function Header() {
  const { signOut } = useAuth();
  const { userToken } = useSelector((state: any) => state.auth);

  const sections = [
    { id: "about", name: "About Us" },
    { id: "projects", name: "Our Projects" },
    { id: "contact", name: "Contact Us" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 50;
      window.scrollTo({ behavior: "smooth", top: offset });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white inset-x-0 top-0 z-50 sticky">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-8xl items-center justify-between px-3 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <img alt="360 Logo" src={logo} className="h-12 w-auto lg:h-20" />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          {/* Logout Button */}
          {userToken && (
            <button
              onClick={signOut}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black opacity-50" />
        <DialogPanel className="fixed top-7 right-0 z-20 w-1/2 max-w-md bg-white shadow-lg transform transition-transform duration-300 ease-in-out">

          <div className="space-y-2 py-6">
            {sections.map((section) => (
              <button
                key={section.id}
                className="block w-full rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => handleNavigation(section.id)}
              >
                {section.name}
              </button>
            ))}
            {/* Mobile Logout Button */}
            {userToken && (
              <button
                onClick={signOut}
                className="block w-full rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Logout
              </button>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
