<template>
  <v-container fluid tag="section">
    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="select.valueVariable"
            :items="select.itemsVariable"
            attach
            @change="chageVariacao"
            label="Variação"
            multiple
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="select.valueGroup"
            :items="select.itemsGroup"
            @change="chageGroup"
            label="Grupo"
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="selectedDatesInitial"
            :items="datesInitial"
            @change="chageInitialDate"
            class=""
            label="Data Inicial"
            append-icon="mdi-calendar"
          ></v-select>
        </v-col>
        <v-col class="d-flex" sm="3">
          <v-select
            v-model="selectedDatesFinal"
            :items="datesFinal"
            @change="chageFinalDate"
            label="Data Final"
            append-icon="mdi-calendar"
          ></v-select>
        </v-col>
      </v-row>
      <v-card>
        <apexchart
          height="550"
          type="line"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-card>
    </v-container>
  </v-container>
</template>



<script>
export default {
  data() {
    return {
      select: {
        itemsVariable: ["Mensal", "Anual", "12 meses", "Peso no mês"],
        valueVariable: [],
        itemsGroup: [],
        valueGroup: "",
      },
      selectedDatesInitial: [],
      selectedDatesFinal: [],
      rageDate: [],
      ipcaAll: [],
      datesAll: [],
      datesInitial: [],
      datesFinal: [],
      chart: {
        height: 550,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [],
    };
  },

  methods: {
    chageVariacao(selectObj) {
      this.$store.dispatch("addChartVar", selectObj);
      this.reChart();
    },
    chageGroup(selectObj) {
      this.$store.dispatch("addChartGroup", selectObj);
      this.reChart();
    },
    chageInitialDate(selectObj) {
      const indexFinal = this.datesAll.indexOf(selectObj);
      const indexInicial = this.datesAll.indexOf(this.selectedDatesInitial);

      if (indexInicial > indexFinal) {
        this.selectedDatesFinal = this.dates[indexFinal];
      }
      this.datesFinal = this.dates.filter(
        (item) => this.dates.indexOf(item) <= indexFinal
      );

      this.$store.dispatch("addChartDateInitial", selectObj);

      this.reChart();
    },
    chageFinalDate(selectObj) {
      const indexFinal = this.datesAll.indexOf(selectObj);
      const indexInicial = this.datesAll.indexOf(this.selectedDatesInitial);

      if (indexInicial < indexFinal) {
        this.selectedDatesInitial = this.dates[indexFinal];
      }
      this.datesInitial = this.dates.filter(
        (item) => this.dates.indexOf(item) >= indexFinal
      );

      this.$store.dispatch("addChartDateFinal", selectObj);

      this.reChart();
    },

    reChart() {
      const indexFinal = this.datesAll.indexOf(this.selectedDatesFinal);
      const indexInicial = this.datesAll.indexOf(this.selectedDatesInitial);
      this.rageDate = this.datesAll.filter(
        (item) =>
          this.dates.indexOf(item) >= indexFinal &&
          this.dates.indexOf(item) <= indexInicial
      );
      this.chartOptions = {
        xaxis: {
          categories: this.rageDate.reverse(),
        },
      };

      this.ipcaFilter = this.ipcaAll.filter(
        (item) => item.D4N === this.select.valueGroup
      );

      this.ipcaFilter = this.ipcaFilter.filter((item) =>
        this.rageDate.includes(item.D3N)
      );

      const ary = [];

      if (this.select.valueVariable.includes("Mensal")) {
        ary.push("IPCA - Variação mensal");
      }
      if (this.select.valueVariable.includes("Anual")) {
        ary.push("IPCA - Variação acumulada no ano");
      }
      if (this.select.valueVariable.includes("12 meses")) {
        ary.push("IPCA - Variação acumulada em 12 meses");
      }
      if (this.select.valueVariable.includes("Peso no mês")) {
        ary.push("IPCA - Peso mensal");
      }

      this.ipcaFilter = this.ipcaFilter.filter((item) =>
        ary.includes(item.D2N)
      );

      let seriesFill = [];
      let variable = "";
      let arr = [];
      this.series = [];

      ary.map((item) => {
        variable = item;
        arr = this.ipcaFilter.filter((key) => key.D2N === variable);
        arr = arr.sort((a, b) => parseFloat(a.D3C) - parseFloat(b.D3C));
        seriesFill = arr.map((item) => item.V);
        this.series = [
          ...this.series,
          {
            name: variable,
            data: seriesFill,
          },
        ];
      });
    },
  },

  computed: {
    lists() {
      return this.$store.getters.allLists;
    },
    dates() {
      return this.$store.getters.allDates;
    },
    sChartVariable() {
      return this.$store.getters.chartVar;
    },
    sChartGroup() {
      return this.$store.getters.chartGroup;
    },
    sChartDateInitial() {
      return this.$store.getters.chartDateInitial;
    },
    sChartDateFinal() {
      return this.$store.getters.chartDateFinal;
    },
  },
  async mounted() {
    if (this.lists.length === 0) {
      await this.$store.dispatch("getLists");
    }

    this.ipcaAll = this.lists;
    this.select.itemsGroup = this.ipcaAll.reduce((prev, current) => {
      const x = prev.find((item) => item.D4N === current.D4N);
      if (!x) {
        return prev.concat([current]);
      } else {
        return prev;
      }
    }, []);

    this.select.itemsGroup = this.select.itemsGroup.map((item) => item.D4N);

    this.datesAll = this.dates;
    this.datesInitial = this.dates;
    this.datesFinal = this.dates;

    if (this.sChartDateInitial == "") {
      this.selectedDatesInitial = this.dates[6];
    } else {
      this.selectedDatesInitial = this.sChartDateInitial;
    }

    if (this.sChartDateFinal == "") {
      this.selectedDatesFinal = this.dates[0];
    } else {
      this.selectedDatesFinal = this.sChartDateFinal;
    }

    if (this.sChartGroup == "") {
      this.select.valueGroup = "Índice geral";
    } else {
      this.select.valueGroup = this.sChartGroup;
    }

    if (this.sChartVariable.length === 0) {
      this.select.valueVariable = ["Mensal", "Anual", "12 meses"];
    } else {
      this.select.valueVariable = this.sChartVariable;
    }

    this.reChart();
  },
};
</script>
