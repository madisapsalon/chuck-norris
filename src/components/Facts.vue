<template>
  <div>
    <div v-for="joke in categoryJokes" :key="joke.id" class="mb-2">
      <v-card
        width="400"
        class="mx-auto"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-2">{{ joke.categories.join(',') }}</div>
            <div class="mb-1">{{ joke.value }}</div>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions class="justify-end">
          <v-btn text icon large color="deep-orange" @click="toggleFavorite(joke)">
            <v-icon>{{ joke.favorite ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters(['categoryJokes']),
  },
  methods: {
    toggleFavorite(joke) {
      this.$store.dispatch('toggleFavorite', joke);
    },
  },
};
</script>
