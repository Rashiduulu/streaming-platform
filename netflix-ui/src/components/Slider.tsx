import React from "react";
import CardSlider from "./CardSlider";

interface SliderProps {
  movies: any;
}

const Slider: React.FC<SliderProps> = ({ movies }) => {
  const getMoviesFromRange = (from: any, to: any) => {
    return movies.slice(from, to);
  };

  return (
    <section className="mt-[50px] md:mt-[80px] flex flex-col">
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />

      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />

      <CardSlider
        title="Blockbuster Movies"
        data={getMoviesFromRange(20, 30)}
      />

      <CardSlider
        title="Popular On Netflix"
        data={getMoviesFromRange(30, 40)}
      />

      <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />

      <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
    </section>
  );
};

export default Slider;
