<template>
  <v-container>
    <v-row
      :align="'center'"
      :justify="'center'"
      class="mb-4"
    >
      <Categories />
    </v-row>
    <Facts />
  </v-container>

</template>

<script>
import Categories from '../components/Categories.vue';
import Facts from '../components/Facts.vue';

export default {
  components: {
    Categories,
    Facts,
  },
};
</script>
