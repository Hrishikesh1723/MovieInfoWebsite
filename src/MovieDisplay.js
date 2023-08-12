import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const API_URL = "http://www.omdbapi.com/?apikey=533c3dc9"

const MovieDisplay = () => {
  const {id} = useParams(); 
  const [isLoading, setIsloading] = useState(true);
  const [movie, setMovie] = useState("");
  const [isError, setIsError] = useState({ show: "false", msg: ""});
  console.log(isError);

  const getMovies = async (url) =>{
    setIsloading(true);
    try{
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True") {
        setIsloading(false);
        setMovie(data);
      } else {
        setIsError({
          show: true,
          msg: data.error,
        });
      }
    }catch(error){
      console.log(error)
    }

  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      getMovies(`${API_URL}&i=${id}`);
    }, 800)

    return () =>  clearTimeout(timeout); 
  }, [id]);

  if(isLoading) {
    return (
      <div className='movie-section'>
        <div className='loading'>
          loading....
        </div>
      </div>
    )
  }

  return (
    
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default MovieDisplay