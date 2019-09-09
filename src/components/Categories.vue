<template>
  <v-card
    width="500"
    class="mx-auto"
  >
    <v-card-title class="justify-center">Select Chuck Norris joke category</v-card-title>
    <v-card-text>
      <v-chip-group
        column
        active-class="primary--text"
      >
        <v-chip
          v-for="category in categories"
          :key="category.id"
          :disabled="loading"
          @click="selectCategory(category)"
        >
          {{ category.name }}
          <span class="favorite-number">
            {{ category.favorites }}
          </span>
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    selectedCategory: {},
  }),
  computed: {
    ...mapGetters(['categories', 'loading']),
  },
  async created() {
    await this.$store.dispatch('getJokesCategories');
  },
  methods: {
    async selectCategory(category) {
      this.selectedCategory = category;
      await this.$store.dispatch('setLoading', true);
      await this.$store.dispatch('getJokesListByCategory', { ...category });
    },
  },
};
</script>

<style>
  .favorite-number {
    background-color: #fe5722;
    color: #fff;
    min-width: 32px;
    text-align: center;
    margin: .1rem .1rem .1rem .4rem;
    padding: .1rem .5rem;
    border-radius: 50px;
  }
</style>
