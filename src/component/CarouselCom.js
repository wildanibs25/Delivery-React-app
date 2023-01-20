import { Button, Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import {
  ayam,
  ayamKrispi,
  resepAyam,
} from "../storage/carousel/Carousel";

const CarouselCom = () => {
  
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  const scrollToDown = () => {
    if (matches) {
      window.scrollTo({
        top: 550,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 900,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <section className="text-gray-600 body-font bg-transparent">
      <div className="container mx-auto flex px-5 pt-2 pb-16 md:flex-row flex-col items-center">
        <div className="md:order-2 lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 h-56 xl:h-96">
          <Carousel>
            <img className="object-cover" src={ayam} alt="..." />
            <img className="object-cover" src={ayamKrispi} alt="..." />
            <img className="object-cover" src={resepAyam} alt="..." />
          </Carousel>
        </div>

        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex items-center justify-center">
            <Button
              gradientDuoTone="pinkToOrange"
              className="inline-flex text-white py-2 px-4 focus:outline-none text-lg"
              onClick={scrollToDown}
            >
              <FaAngleDoubleRight className="animate-pulse mr-4 h-5 w-5" />
              Ayo Segera Pesan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselCom;
