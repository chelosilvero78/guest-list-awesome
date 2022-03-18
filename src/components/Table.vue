<template>
  <v-container fluid>
    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="input.lastDate"
            :items="selectedDate"
            @change="changeDate"
            label="Selecione o período"
            append-icon="mdi-calendar"
          ></v-select>
        </v-col>
        <v-col class="d-flex justify-end" cols="12" sm="8">
          <download-csv :data="ipcaAll">
            <v-btn color="success" class="mr-6">
              CSV
              <i class="mdi mdi-export-variant" aria-hidden="true"></i>
            </v-btn>
          </download-csv>
        </v-col>
      </v-row>
    </v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Localizar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="ipca"
        :search="search"
        :expanded.sync="expanded"
        :single-expand="singleExpand"
        item-key="subId"
        show-expand
        @item-expanded="loadDetails"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.V`]="{ item }">
          <span>{{
            parseFloat(item.V).toFixed(2).replace("NaN", "-").replace(".", ",")
          }}</span>
        </template>
        <template v-slot:top> </template>
        <template v-slot:expanded-item="{}">
          <td :colspan="5">
            <v-data-table
              class="blue-grey lighten-5"
              :headers="headers"
              :items="ipcaChildrens"
              :hide-default-footer="true"
            >
              <template v-slot:[`item.V`]="{ item }">
                <span>{{
                  parseFloat(item.V)
                    .toFixed(2)
                    .replace("NaN", "-")
                    .replace(".", ",")
                }}</span>
              </template>
            </v-data-table>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ipcaAll: [],
      ipca: [],
      ipcaChildrens: [],
      search: "",
      expanded: [],
      singleExpand: true,
      headers: [
        { text: "Variável", value: "D2N" },
        { text: "Grupo", value: "D4N" },
        { text: "Período", value: "D3N" },
        { text: "Variação %", value: "V" },
      ],
      input: {
        lastDate: "",
      },
      selectedDate: [],
    };
  },
  methods: {
    changeDate(selectObj) {
      this.ipca = this.ipcaAll.filter((item) => item.D4N === "Índice geral");

      this.ipca = this.ipca.filter((item) => item.D3N === selectObj);

      this.$store.dispatch("addSelectedDateTable", selectObj);
    },

    loadDetails({ item }) {
      let ary = [];
      ary = this.ipcaAll.filter((itemMap) => itemMap.D2N === item.D2N);
      ary = ary.filter((item) => item.D4N !== "Índice geral");
      this.ipcaChildrens = ary.filter((itemMap) => itemMap.D3N === item.D3N);
    },
  },

  computed: {
    lists() {
      return this.$store.getters.allLists;
    },
    dates() {
      return this.$store.getters.allDates;
    },
    selectedDateTable() {
      return this.$store.getters.selectedDateTable;
    },
  },

  async mounted() {
    if (this.lists.length === 0) {
      await this.$store.dispatch("getLists");
    }

    this.ipcaAll = this.lists;
    this.ipca = this.ipcaAll.filter((item) => item.D4N === "Índice geral");

    if (this.selectedDateTable == "") {
      const lastDate = this.ipcaAll.reduce((prev, current) =>
        prev.D3C > current.D3C ? prev.D3N : current.D3N
      );
      this.input.lastDate = lastDate;
    } else {
      this.input.lastDate = this.selectedDateTable;
    }

    this.selectedDate = this.dates;

    this.ipca = this.ipca.filter((item) => item.D3N === this.input.lastDate);
  },
};
</script>