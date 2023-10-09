import React,{useEffect} from "react";
import MovieListing from "../MovieListing/MovieListing";
import {useDispatch} from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/movieSlice";


const Home = () => {

    //whatever values we get from fetch api, we will pass it to the dispatch as an action.
    // so, that the reducers will update the state. It will reflect in the UI.
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
