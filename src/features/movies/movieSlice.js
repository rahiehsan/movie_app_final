import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import {APIKey} from "../../common/apis/movieApiKey";


// three params for createAsyncThunk - string for our async creater, payload creater callback function, object(optional).
export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',
    async() => {
        const movieText = 'Harry';
        const response = await movieApi
      .get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
        // s = search and type both are parameter for check omdb api key.
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows',
    async() => {
        const seriesText = 'Friends';
        const response = await movieApi
      .get(`?apiKey=${APIKey}&s=${seriesText}&type=series`)
        // s = search and type both are parameter for check omdb api key.
        return response.data;
    }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail',
    async(id) => {
        const response = await movieApi
      .get(`?apiKey=${APIKey}&i=${id}&Plot=full`
      );
        // s = search and type both are parameter for check omdb api key.
        // console.log(response.data)
        return response.data;
    }
);


const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow : {}
}

// four params of createSlice - name, initialState, reducers, extra reducers
const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // addMovies:(state, {payload}) => {
        //     state.movies = payload; 
        //     //looks like direct mutation. but check about "Immer".
        //     // {...state, payload} :- we used to do like this.
        // },
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        },
        // we can add other reducer functions here.
    },
    extraReducers: (builder) => {
        // extraReducers section is used for handling actions dispatched by createAsyncThunk.(middleware).

        // it will have some addtional action creaters that will define the life cycle of async request.
        builder
        .addCase(fetchAsyncMovies.pending, () => {
            console.log("pending");
        })
        .addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
            console.log("Fetched successfully")
            return {...state, movies: payload}
        })
        .addCase(fetchAsyncMovies.rejected, () => {
            console.log("rejected")
        })
        .addCase(fetchAsyncShows.fulfilled, (state, {payload}) => {
            console.log("Fetched successfully")
            return {...state, shows: payload}
        })
        .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, {payload}) => {
            console.log("Fetched successfully")
            state.selectedMovieOrShow = payload;
            //Immer
            console.log(state)
        })
    }
});

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
// state.(name of our slice).(property which we want to add)
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;





