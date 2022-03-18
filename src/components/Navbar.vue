<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      :width="238"
      dark
      app
      permanent
      class="indigo darken-2"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title"> IPCA </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://conteudo.imguol.com.br/c/noticias/9e/2018/11/12/dinheiro-moeda-juros-divida-cartao-de-credito-investimentos-bolsa-de-valores-financas-pessoais-precos-inflacao-riqueza-patrimonio-1542057700956_v2_450x450.jpg"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-subtitle
              >Índice Nacional de Preços <br />ao Consumidor
              Amplo</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item route to="/">
          <v-list-item-icon>
            <v-icon>mdi-dock-window</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item route to="/tabela/">
          <v-list-item-icon>
            <v-icon>mdi-table-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Tabela</v-list-item-title>
        </v-list-item>
        <v-list-item route to="/grafico">
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Gráfico</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
    };
  },
};
</script>
