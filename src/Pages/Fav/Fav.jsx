import React, { useState, useEffect } from "react";
import "../Favourites/Favourite.scss";
import toast from "react-hot-toast";

function Favourite() {
  const [Fav_Mov, setFav_Mov] = useState([]);

  useEffect(() => {
    const watchlistData = JSON.parse(localStorage.getItem("watchlist")) || [];

    setFav_Mov(watchlistData);
  }, []);
  const handle_Del = (imdbID) => {
    const updatedWatchlist = Fav_Mov.filter(
      (movie) => movie.imdbID !== imdbID
    );

    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    setFav_Mov(updatedWatchlist);
    toast.success("Movie Deleted")
  };
  return (
    <div className="fav" id="fav">
      <h1>Favourite</h1>
      {Fav_Mov.length > 0 ? (
        <ul className="moviedata">
          {Fav_Mov.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt="" />
              <h3>{movie.Title}</h3>
              <div className="btn">
                <i  onClick={() => handle_Del(movie.imdbID)}class="fa-solid fa-trash"></i>
                <i class="fa-solid fa-eye"></i>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favourite movies yet.</p>
      )}
    </div>
  );
}

export default Favourite;