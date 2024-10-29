import logo from "../assets/360logo.png";
import background from "../assets/main-background.jpeg";

export default function MainView() {
  return (
    <div className="relative isolate overflow-hidden  bg-gray-900 py-5">
      {/* Background Image */}
      <img
        alt=""
        src={background}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 -z-10"></div>

      {/* Shadowings */}
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#F01632] to-[#F01632] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#F01632] to-[#F01632] opacity-20"
        />
      </div>

      {/* Data */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:w-1/2">
            <h2 className="font-bold tracking-tight text-white md:text-5xl text-4xl">
              360 Productions
            </h2>
            <h3 className="tracking-tight text-white md:text-3xl text-2xl">
              Saudi Arabia
            </h3>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our company is proud to be the first to host a groundbreaking
              concert in Saudi Arabia, paving the way for new cultural
              experiences in the region.
            </p>
          </div>
          {/* Logo section */}
          <div className="w-1/2 flex justify-center ">
            <img
              alt="360 Logo"
              src={logo}
              className="h-auto w-full lg:w-3/4 object-contain lg:h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
