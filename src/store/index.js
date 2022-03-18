import api from "../service/api";
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
    lists: [],
    dates: [],
    selectedDateTable: [],
    chartVar:[],
    chartGroup:"",
    chartDateInitial:"",
    chartDateFinal:"",
    chartVarGroup:"",
    chartDateInitialGroup:"",
    chartDateFinalGroup:""
}

const actions = {
    async getLists({ commit }) {
        await api.get('').then(res => { commit('setList', res.data) })
    },
    addSelectedDateTable(context, value) {
        context.commit("addSelectedDateTable", value);
    },
    addChartVar(context, value) {
        context.commit("addChartVar", value);
    },
    addChartGroup(context, value) {
        context.commit("addChartGroup", value);
    },
    addChartDateInitial(context, value) {
        context.commit("addChartDateInitial", value);
    },
    addChartDateFinal(context, value) {
        context.commit("addChartDateFinal", value);
    },
    addChartVarGroup(context, value) {
        context.commit("addChartVarGroup", value);
    },
    addChartDateInitialGroup(context, value) {
        context.commit("addChartDateInitialGroup", value);
    },
    addChartDateFinalGroup(context, value) {
        context.commit("addChartDateFinalGroup", value);
    },

}

const mutations = {
    setList(state, lists) {
        lists = lists.filter((item) => item.D3C !== "Mês (Código)");
        let i = 0;
        lists = lists.map((obj) => ({ ...obj, subId: i++ }));
        state.lists = lists
        let date = lists.reduce((prev, current) => {
            const x = prev.find((item) => item.D3C === current.D3C);
            if (!x) {
                return prev.concat([current]);
            } else {
                return prev;
            }
        }, []);
        date = date.sort((a, b) => parseFloat(b.D3C) - parseFloat(a.D3C));
        date = date.map((item) => item.D3N);
        state.dates = date
    },
    addSelectedDateTable(state, value) {
        state.selectedDateTable = value;
    },
    addChartVar(state, value) {
        state.chartVar = value;
    },
    addChartGroup(state, value) {
        state.chartGroup = value;
    },
    addChartDateInitial(state, value) {
        state.chartDateInitial = value;
    },
    addChartDateFinal(state, value) {
        state.chartDateFinal = value;
    },
    addChartVarGroup(state, value) {
        state.chartVarGroup = value;
    },
    addChartDateInitialGroup(state, value) {
        state.chartDateInitialGroup = value;
    },
    addChartDateFinalGroup(state, value) {
        state.chartDateFinalGroup = value;
    },
}

const getters = {
    allLists: (state) => state.lists,
    allDates: (state) => state.dates,
    selectedDateTable: (state) => state.selectedDateTable,
    chartVar: (state) => state.chartVar,
    chartGroup: (state) => state.chartGroup,
    chartDateInitial: (state) => state.chartDateInitial,
    chartDateFinal: (state) => state.chartDateFinal,
    chartVarGroup: (state) => state.chartVarGroup,
    chartDateInitialGroup: (state) => state.chartDateInitialGroup,
    chartDateFinalGroup: (state) => state.chartDateFinalGroup,
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})
