import {useEffect, useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {toast, Toaster} from "react-hot-toast";

import {fetchMovies} from "../../services/movieService.ts";
import type {Movie} from "../../types/movie.ts";

import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import Loader from "../Loader/Loader.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import Pagination from "../Pagination/Pagination.tsx";

import css from "./App.module.css";

function App() {
  const [query, setQuery] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);

  const {data, isError, isFetching, isLoading, isSuccess} = useQuery({
    queryKey: ['query', query, page],
    queryFn: () => fetchMovies(query!, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!isFetching && data && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, isFetching]);

  const closeModal = (): void => {
    setMovieDetails(null);
  };

  function showDetails(movie: Movie): void {
    setMovieDetails(movie);
  }

  function handleSearch(newQuery: string): void {
    setPage(1);
    setQuery(newQuery);
  }

  return (
    <>
      <Toaster/>
      <SearchBar onSubmit={handleSearch}/>
      {isError && (<ErrorMessage/>)}
      {isSuccess && data.total_pages > 1 && <Pagination
        pageCount={data.total_pages}
        onPageChange={({selected}) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
      />}
      {(isLoading || isFetching) && <Loader/>}
      {isSuccess && data.results.length > 0 &&
        <MovieGrid
          movies={data.results}
          onSelect={showDetails}
        />
      }
      {movieDetails && <MovieModal movie={movieDetails} onClose={closeModal}/>}
    </>
  );
}

export default App;
