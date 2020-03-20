import apiUtils from '../utils/apiUtils';

const api_key = '2d9c3edb9ea726f911d26a0b87045e81';
const language = 'en-US'

export async function fetchConfiguration() {
    const url = `/configuration?api_key=${api_key}`;
    return await apiUtils.get(url)
}

export async function fetchMoviesByType(
    type,
    page
) {
    // popular / now_playing/ top_rated / upcoming
    const url = `/movie/${type}?api_key=${api_key}&language=${language}&page=${page}`;
    return await apiUtils.get(url)
}

export async function fetchGenres() {
    const url = `/genre/movie/list?api_key=${api_key}&language=${language}`;
    return await apiUtils.get(url)
}

export async function discoverMovies(
    sortBy,
    genre,
    page,
    personId
) {
    const url = `/discover/movie?api_key=${api_key}&language=${language}&sort_by=${sortBy}&with_genres=${genre}&page=${page}&with_cast=${personId}`;
    return await apiUtils.get(url);
}

export async function getMovieDetails(
    movieId
) {
    const url = `movie/${movieId}?api_key=${api_key}&language=${language}&append_to_response=videos`
    return await apiUtils.get(url);
}

export async function getRecommendedMovies(
    movieId,
    page
) {
    const url = `movie/${movieId}/recommendations?api_key=${api_key}&language=${language}&page=${page}`;
    return await apiUtils.get(url);
}

export async function getVideos(
    movieId
) {
    const url = `movie/${movieId}/videos?api_key=${api_key}&language=${language}`
    return await apiUtils.get(url);
}

export async function getCast(
    movieId
) {
    const url = `movie/${movieId}/credits?api_key=${api_key}`;
    return await apiUtils.get(url);
}

export async function getPersonData(
    personId
) {
    const url = `/person/${personId}?api_key=${api_key}&language=${language}&append_to_response=images`;
    return await apiUtils.get(url);
}

export async function searchKeyWord(
    term,
    page
) {
    const url = `search/movie?api_key=${api_key}&query=${term}&page=${page}`
    return await apiUtils.get(url)
}