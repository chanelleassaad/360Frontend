import PartnerCard from "../components/organisms/PartnerCard";
import profile1 from '../components/images/profile1.png';

function AboutUs() {
  const partners = [
    {
      name: "Joseph Hannouch",
      imageUrl: profile1, // Replace with actual image URL
      description: "Don't Deliver a Product, Deliver Experience.",
      details:"HelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHHelloI am Lebnese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHelloI am Lebanese\nHello",
    },
    {
      name: "Joseph Hannouch",
      imageUrl: profile1, // Replace with actual image URL
      description: "Don't Deliver a Product, Deliver Experience.",
      details:"",
    },
  ];

  return (
    <div>
      <div className="p-6">
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg ">
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
          </p>
        </div>
      </div>
      <h1 className="text-xl font-semibold mb-4 text-white">MEET THE PARTNERS</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-4 md:space-y-0">
        {partners.map((partner, index) => (
          <div key={index} className="max-w-sm">
          <PartnerCard
            name={partner.name}
            imageUrl={partner.imageUrl}
            description={partner.description}
            details={partner.details}
          />
        </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
