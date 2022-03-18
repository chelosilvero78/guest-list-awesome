<template>
  <v-container fluid tag="section">
    <section class="text-center">
      <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
    </section>
    <v-card class="mx-auto my-12" max-width="1000">
      <Chart />
    </v-card>
   
    <v-card class="mx-auto my-12" max-width="1000">
      <ChartGroup />
    </v-card>
  </v-container>
</template>



<script>
import Chart from "../components/Chart";
import ChartGroup from "../components/ChartGroup";
export default {
  components: {
    Chart,
    ChartGroup,
  },
};
</script>
