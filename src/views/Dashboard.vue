<template>
  <v-container fluid tag="section">
    <section class="text-center">
      <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
    </section>
    <v-flex align-center justify-center>
      <v-card class="mx-auto my-12" max-width="1200">
        <Table />
      </v-card>
    </v-flex> 
    <v-layout align-center justify-center>
      <v-card max-width="1200">
        <Chart />
      </v-card>
    </v-layout>
    <br /> <br />
    <v-layout align-center justify-center>
      <v-card max-width="1200">
        <Chart />
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import Table from "../components/Table";
import Chart from "../components/Chart";
export default {
  computed: {
    lists() {
      return this.$store.getters.allLists;
    },
  },
  components: {
    Table,
    Chart,
  },
  async mounted() {
    if (this.lists.length === 0) {
      await this.$store.dispatch("getLists");
    }
  },
};
</script>


