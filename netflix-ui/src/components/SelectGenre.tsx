import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchDataByGenre } from "../store/index";

interface SelectGenreProps {
  genres: any;
  type: any;
}

const SelectGenre: React.FC<SelectGenreProps> = ({ genres, type }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="custom-select">
      <select
        onChange={(e) => {
          dispatch(fetchDataByGenre({ genres, genre: e.target.value, type }));
        }}
        className="cursor-pointer outline-none py-2 px-4 rounded-full text-white border-[1px] border-red-700 bg-white/10 backdrop-blur-sm"
      >
        <option className="bg-black">Choose genre</option>

        {genres.map((genre: any) => {
          return (
            <option className="bg-black" value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectGenre;
