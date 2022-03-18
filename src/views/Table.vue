<template>
  <v-container fluid tag="section">
    <section class="text-center">
      <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
    </section>
    <v-card class="mx-auto my-12" max-width="1000">
        <Table />
   </v-card>
  </v-container>
</template>

<script>
import Table from "../components/Table";
export default {
   components: {
    Table,
  },  
};
</script>