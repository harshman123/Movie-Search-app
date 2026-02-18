import React from 'react'
import { useState } from 'react'

const App = () => {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  console.log(search);
  async function fetchMovies() {
   try{
    setLoading(true)
    setError(null)
    const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=63bba5fe`)

    const data = await response.json()

    if(data.response === 'False') {
      throw new Error(data.error);
    }
    setMovies(data.Search)
   
   }catch(err){
    setError(err.message)
    setMovies([])

   }finally{
    setLoading(false)
   }
  } 




  return (
    <div className='app'>
      <h1>Movie Search App</h1>
    <div className="search-box">
      <input type="text" 
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchMovies} >Search</button>
    </div>

      {loading && <p className='loading' >Loading...</p>}

      {error && <p className='error' style={{ color: "red" }}>{error}</p>}

      <div>
    <div className="movies-container">
      {movies.map((movie) => (
      <div className='movie-card' key={movie.imdbID}>
        <img src={movie.Poster} alt={movie.Title} width="100" />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <p>{movie.Genre}</p>
        <p>{movie.Director}</p>
      </div>
    ))}
    </div>
</div>

    </div>
  )
}

export default App