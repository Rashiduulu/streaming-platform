import React from "react";
import Card from "./Card";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CardSliderProps {
  title: string;
  data: any;
}

const CardSlider: React.FC<CardSliderProps> = ({ data, title }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    // adaptiveWidth: true,
    slidesToScroll: 2,
    arrows: true,
    // draggable: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div>
      <h1 className="text-[26px] md:text-[44px] font-semibold text-white mb-[30px] container m-auto px-[15px] lg:px-[50px] 2xl:px-[150px]">
        {title}
      </h1>

      <SlickSlider {...settings}>
        {data.map((movie: any, index: any) => {
          return <Card movieData={movie} index={index} key={movie.id} />;
        })}
      </SlickSlider>
    </div>
  );
};

export default CardSlider;
