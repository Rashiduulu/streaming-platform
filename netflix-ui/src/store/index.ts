import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { TMDB_BASE_URL, API_KEY } from "./../untils/constans";
import axios from "axios";

interface NetflixState {
  movies: any[];
  genresLoaded: boolean;
  genres: any[];
}

const initialState: NetflixState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
});

const createArrayFromRawData = (array: any, moviesArray: any, genres: any) => {
  array.forEach((movie: any) => {
    const movieGenres = <any>[];
    movie.genre_ids.forEach((genre: any) => {
      const name = genres.find(({ id }: any) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api: any, genres: any, paging = false) => {
  const moviesArray = <any>[];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenres",
  async ({ genre, type }: any, thunkAPI: any) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }: any, thunkAPI: any) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchMoviesView = createAsyncThunk(
  "movies/fetchMovies",
  async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`
      );
      console.log("response", response.data.results);

      return response.data.results;
    } catch (error) {
      throw error;
      console.log("error fetchMoviesView", error);
    }
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email: any) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);

export const RemoveLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ movieId, email }: any) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:5000/api/user/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state: any, action: any) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state: any, action: any) => {
      state.movies = action.payload;
    });

    builder.addCase(fetchMoviesView.fulfilled, (state: any, action: any) => {
      state.moviesView = action.payload;
    });

    builder.addCase(fetchDataByGenre.fulfilled, (state: any, action: any) => {
      state.movies = action.payload;
    });

    builder.addCase(
      getUsersLikedMovies.fulfilled,
      (state: any, action: any) => {
        state.movies = action.payload;
      }
    );
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const { setGenres, setMovies }: any = NetflixSlice.actions;
