import Vue from "vue";
import Vuetify from "vuetify";
import JsonCSV from "vue-json-csv";
import VueApexCharts from "vue-apexcharts";
import TreeDataTable from "v-tree-data-table";

import "vuetify/dist/vuetify.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import pt from "../locale/pt";

Vue.use(Vuetify);

Vue.use(VueApexCharts);
Vue.component("downloadCsv", JsonCSV);
Vue.component("apexchart", VueApexCharts);

Vue.component("v-tree-data-table", TreeDataTable);

Vue.component("v-tree-data-table", {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "pt";
    }
  }
});

export default new Vuetify({
  icons: {
    iconfont: "mdi" || "mdiSvg" || "md" || "fa" || "fa4" || "faSvg"
  },
  lang: {
    locales: { pt },
    current: "pt"
  }
});
