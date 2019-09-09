import Vue from 'vue';
import Vuex from 'vuex';
import { getJokesCategories, getRandomJoke, getJokeByCategory } from './services/chucknorris';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    categories: [],
    randomJoke: {},
    categoryJokes: [],
    favorites: [],
  },
  getters: {
    loading: state => state.loading,
    categories: state => state.categories,
    randomJoke: state => state.randomJoke,
    categoryJokes: state => state.categoryJokes,
    favorites: state => state.favorites,
  },
  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },
    setCategories(state, data) {
      state.categories = data;
    },
    setRandomJoke(state, data) {
      state.randomJoke = data;
    },
    addCategoryJoke(state, joke) {
      state.categoryJokes.push(joke);
    },
    clearCategoryJokes(state) {
      state.categoryJokes = [];
    },
    changeJokesList(state, joke) {
      const jokeIndex = state.categoryJokes.findIndex(el => el.id === joke.id);
      if (jokeIndex !== -1) {
        state.categoryJokes.splice(jokeIndex, 1, joke);
      }
    },
    addFavorite(state, joke) {
      state.favorites.push(joke);
    },
    removeFavorite(state, jokeIndex) {
      state.favorites.splice(jokeIndex, 1);
    },
    increaseFavorite(state, categoryIndex) {
      state.categories[categoryIndex].favorites += 1;
    },
    decreaseFavorite(state, categoryIndex) {
      state.categories[categoryIndex].favorites -= 1;
    },
  },
  actions: {
    setLoading({ commit }, status) {
      commit('setLoading', status);
    },
    async getJokesCategories({ commit }) {
      const { data } = await getJokesCategories();
      const categories = data.map((el, index) => ({
        name: el,
        id: index,
        favorites: 0,
      }));
      commit('setCategories', categories);
    },
    async getRandomJoke({ commit }) {
      const { data } = await getRandomJoke();
      commit('setRandomJoke', data);
    },
    async getJokeByCategory({ commit }, category) {
      const { data: joke } = await getJokeByCategory(category.name);
      commit('setRandomJoke', joke);
    },
    async getJokesListByCategory({ commit, state, dispatch }, category) {
      commit('clearCategoryJokes');
      const listMaxLength = 3;
      const maxFetchAttempts = 12;
      let attempts = 0;
      let listLength = 0;
      while (attempts !== maxFetchAttempts && listLength !== listMaxLength) {
        // eslint-disable-next-line no-await-in-loop
        await dispatch('getJokeByCategory', category);
        const addedJoke = { ...state.randomJoke };
        const addedJokeIndex = state.categoryJokes.findIndex(el => el.id === addedJoke.id);
        if (addedJokeIndex === -1) {
          const isJokeFavorite = state.favorites.findIndex(el => el.id === addedJoke.id);
          addedJoke.favorite = isJokeFavorite !== -1;
          commit('addCategoryJoke', addedJoke);
        }
        listLength = state.categoryJokes.length;
        attempts += 1;
      }
      dispatch('setLoading', false);
    },
    toggleFavorite({ commit, state }, joke) {
      const newJoke = { ...joke };
      const newJokeCategory = newJoke.categories[0];
      const categoryIndex = state.categories.findIndex(el => el.name === newJokeCategory);
      const jokeIndex = state.favorites.findIndex(el => el.id === newJoke.id);
      if (jokeIndex === -1) {
        commit('increaseFavorite', categoryIndex);
        newJoke.favorite = true;
        commit('addFavorite', newJoke);
      } else {
        commit('decreaseFavorite', categoryIndex);
        newJoke.favorite = false;
        commit('removeFavorite', jokeIndex);
      }
      commit('changeJokesList', newJoke);
    },
  },
});
