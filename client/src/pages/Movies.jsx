import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative min-h-[80vh] py-20 px-6 md:px-16 lg:px-32 xl:px-48 overflow-hidden">
      {/* Background Effects */}
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-10 text-white">Now Showing</h2>

      {/* Movie Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-black">
      <h1 className="text-3xl font-bold text-white">No movies available</h1>
    </div>
  );
};

export default Movies;
