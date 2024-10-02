import { AtSymbolIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import image from "../assets/360logo.png";

const features = [
  {
    name: "+961 70 268 245",
    icon: "PhoneIcon",
  },
  {
    name: "assaadchanelle@gmail.com",
    icon: "AtSymbolIcon",
  },
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "PhoneIcon":
      return <PhoneIcon className="h-5 w-5" />;
    case "AtSymbolIcon":
      return <AtSymbolIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

export default function ContactUs() {
  // form in order for the user to contact me
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div className="bg-gradient-to-b from-transparent to-white">
      <div className="flex border-section mx-auto grid  grid-cols-1 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none md:grid-cols-2">
        <div className="flex-1 lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Contact Us
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none display-center pl-2 p-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="flex justify-between font-semibold text-white">
                    {getIconComponent(feature.icon)}
                    {feature.name}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex justify-center">
            <img
              className="pt-10 h-15 hidden md:block"
              src={image}
              alt=""
            ></img>
          </div>
        </div>

        <form className="flex-1 mt-4 mx-auto max-w-xl bg-white p-6 rounded-md mb-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              onClick={handleReset}
              className="block w-full rounded-md bg-gray-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
