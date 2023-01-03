import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDisplay = () => {
  const {id} = useParams(); 
  return (
    <>
    <div>Our single movie {id}</div>
    </>
  )
}

export default MovieDisplay