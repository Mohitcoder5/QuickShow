import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import BlurCircle from '../components/BlurCircle';
import DateSelect from '../components/DateSelect';
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading';

const MovieDetails = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id);
    if(show){
    setShow({
      movie: show,
      dateTime: dummyDateTimeData,
    });
  }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className='px-6 md:px-16 lg:px-32 xl:px-48 py-20 text-white relative'>
      <BlurCircle top="-100px" left="-100px" />
      
      {/* Top section */}
      <div className='flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto'>
        {/* Left: Poster */}
        <div className='flex-shrink-0 self-center lg:self-start'>
          <img
            src={show.movie.poster_path || show.movie.poster?.path || '/fallback.jpg'}
            alt={show.movie.title}
            className='rounded-xl h-[480px] w-[320px] object-cover shadow-lg'
          />
        </div>

        {/* Right: Info */}
        <div className='flex flex-col justify-start gap-4'>
          <p className='text-sm uppercase text-gray-400'>English</p>

          <h1 className='text-3xl md:text-4xl font-bold leading-snug'>
            {show.movie.title}
          </h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 text-yellow-400 fill-yellow-400' />
            <span className='text-lg'>{show.movie.vote_average.toFixed(1)}</span>
            <span className='text-sm'>User Rating</span>
          </div>

          <p className='text-gray-400 text-base leading-relaxed'>
            {show.movie.overview}
          </p>

          <p className='text-sm text-gray-300'>
            {timeFormat(show.movie.runtime)} ·{' '}
            {show.movie.genres.map(genre => genre.name).join(', ')} ·{' '}
            {show.movie.release_date.split('-')[0]}
          </p>

          <div className='flex flex-wrap gap-4 mt-6'>
            <button className='flex items-center gap-2 px-6 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium active:scale-95'>
              <PlayCircleIcon className='w-5 h-5' />
              Watch Trailer
            </button>
            <a
              href='dataselect'
              className='px-8 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium active:scale-95'
            >
              Buy Ticket
            </a>
            <button className='bg-gray-700 p-2.5 rounded-full transition active:scale-95'>
              <Heart className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className='mt-16'>
        <p className='text-xl font-semibold mb-6'>Your Favorite Cast</p>
        <div className='overflow-x-auto no-scrollbar'>
          <div className='flex items-center gap-4 w-max px-2'>
            {Array.isArray(show.movie.casts) && show.movie.casts.length > 0 ? (
              show.movie.casts.slice(0, 12).map((cast, index) => (
                <div key={index} className='flex flex-col items-center text-center w-20 md:w-24'>
                  <img
                    src={cast.profile_path || '/fallback.jpg'}
                    alt={cast.name}
                    className='rounded-full h-20 w-20 md:h-24 md:w-24 object-cover'
                  />
                  <p className='font-medium text-xs mt-2'>{cast.name}</p>
                </div>
              ))
            ) : (
              <p className='text-sm text-gray-400'>No cast information available.</p>
            )}
          </div>
        </div>
        <DateSelect dateTime={show.dateTime} id={id} />

        <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>    
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {dummyShowsData.slice(0,4).map((movie, index)=>(
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
        <div className='flex justify-center mt-20'>
          <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
          

        </div>

      </div>
    </div>
  ) : <Loading />
};

export default MovieDetails;
