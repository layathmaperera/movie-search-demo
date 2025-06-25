import React from 'react';
import Search from "./component/Search.jsx";
import {useEffect,useState} from "react";
import Spinners from "./component/Spinners.jsx";
import MovieCard from "./component/MovieCard.jsx";
import {useDebounce} from 'react-use';
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";


const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}


const  App= () => {

    //Debounce is the search term to prevent making too many API requests
    //by waiting for the user to stop typing for 500ms
    const [deBouncedSearchTerm, setDeBouncedSearchTerm] = React.useState("");
    const [searchText, setSearchText] = React.useState("");

    //set timer to loading-use state
    const [movieList, setMovieList] = React.useState([]);
    const [errorMessage, setErrorMessage] = useState("");


    const [isLoading, setIsLoading] = useState(false);

    //usestate for trending list
    const [trendingMovies, setTrendingMovies] = React.useState([]);
    useDebounce(()=>setDeBouncedSearchTerm(searchText), 500,[searchText]);

    const fetchMovies = async (query ='') => {

        setIsLoading(true);
        setErrorMessage("");


        try{

            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
                `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint,API_OPTIONS);
            // alert(response);

            if(!response.ok){
                throw new Error("Failed to fetch movie");
            }
            const data = await response.json();


            if(data.response==='False'){
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);
            if(query && data.results.length>0){
                await updateSearchCount(query,data.results[0]);
            }


        }catch(error){
            console.error(`Error fetching Movies: ${error}`);
           setErrorMessage('Error fetching Movies.Please try again later.');

        }
        finally{
            setIsLoading(false);
        }
    }

const loadTrendingMovies = async () => {
        try{

            const movies=await getTrendingMovies();

            setTrendingMovies(movies);
        }catch(error){
            console.error(`Error fetching Trending Movies`);
        }
}
useEffect(()=>{

        fetchMovies(deBouncedSearchTerm);


    },[deBouncedSearchTerm]);

   useEffect(()=>{
       loadTrendingMovies();
   },[]);

    return (
      <main>
        <div className="pattern"></div>

          <div className="wrapper">

            <header>
                <img src="./hero.png" alt="Hero Banner"/>
                <img src="/3hero.jpeg" alt="Heros"/>

              <h1>find <span className="text-gradient">Movies</span> you will enjoy
              without the hassle</h1>

                <Search searchText={searchText} setSearchText={setSearchText}/>

            </header>

              {trendingMovies.length > 0 && (
                  <section className="trending">
                      <h2>Trending Movies</h2>

                      <ul>
                          {trendingMovies.map((movie,index)=>(
                              <li key={movie.$id}>
                                  <p>{index+1}</p>
                                  <img src={movie.poster_url} alt={movie.title}/>
                              </li>
                          ))}
                      </ul>
                  </section>
              )}
              <section className="all-movies">
              <h2 >All movies</h2>

                  {isLoading ? (
                      //
                      <Spinners/>
                  ) : errorMessage ? (
                      <p className="text-red-500"> {errorMessage}</p>
                  ) : (
                      //neither loading then did not show error message
                      <ul>
                          {movieList.map((movie) => (
                             // <p key={movie.id} className="text-white">{movie.title}</p>
                                <MovieCard key={movie.id} movie={movie}/>
                          ))}
                      </ul>
                  )}

              </section>

          </div>



      </main>

  )

}

export default App





