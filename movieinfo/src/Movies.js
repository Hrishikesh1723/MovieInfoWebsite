import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './context'

const Movies = () => {
  const {movie, isLoading} = useGlobalContext();

  if(isLoading) {
    return (
      <div>
        <div className='loading'>
          loading....
        </div>
      </div>
    )
  }

  return <>
  <section className="movie-page">
    <div className="gird grid-4-col">{movie.map((currMovie) => {
      const { imdbID, Title, Poster } =  currMovie;
      const movieTitle = Title.substring(0, 15);
      return(
        <NavLink to={`movies/${imdbID}`} key={imdbID}> 
          <div className="card">
            <div className="card-info">
              <h2>{Title.length > 15 ? `${movieTitle}...` : movieTitle}</h2>
              <img src={Poster} alt={imdbID} />
            </div>
          </div>
        </NavLink>
      )
    })}</div>
  </section>
  </>
}

export default Movies