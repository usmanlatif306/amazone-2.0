import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <div className="relative max-w-[1200px] mx-auto">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-500 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div className="">
          <img
            loading="lazy"
            src="https://links.papareact.com/gi1"
            alt="Banner Slider"
          />
        </div>
        <div className="">
          <img
            loading="lazy"
            src="https://links.papareact.com/6ff"
            alt="Banner Slider"
          />
        </div>
        <div className="">
          <img
            loading="lazy"
            src="https://links.papareact.com/7ma"
            alt="Banner Slider"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
