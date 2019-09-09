import http from '../api/http';

export const getJokesCategories = () => http.get('/categories');

export const getRandomJoke = () => http.get('/random');

export const getJokeByCategory = category => http.get('/random', {
  params: { category },
});
