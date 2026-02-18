import React, { useState } from 'react'

const App = () => {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovies = async (e) => {
    if (e && e.preventDefault) e.preventDefault()

    const q = search.trim()
    if (!q) {
      setError('Please enter a search term')
      setMovies([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=63bba5fe`
      )
      const data = await res.json()

      if (data.Response === 'False') {
        throw new Error(data.Error || 'No results found')
      }

      setMovies(data.Search || [])
    } catch (err) {
      setError(err.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Movie Search App</h1>

      <form className="search-box" onSubmit={fetchMovies} aria-label="Search movies">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Movie title"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-container" aria-live="polite">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.imdbID}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.Title}
              loading="lazy"
            />
            <div className="movie-info">
              <h3 title={movie.Title}>{movie.Title}</h3>
              <p className="meta">
                <span className="year">{movie.Year}</span>
                <span className="type">{movie.Type}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default App