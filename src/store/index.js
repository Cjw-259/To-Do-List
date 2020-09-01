import Vue from 'vue'

import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputVal: '',
    nextId: 5,
    viewKey: '1'
  },
  mutations: {
    saveList (state, step) {
      state.list = step
    },
    setInputVal (state, val) {
      state.inputVal = val
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputVal,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputVal = ''
    },
    deleteItem (state, id) {
      const i = state.list.findIndex(item => item.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    c (state, params) {
      const i = state.list.findIndex(item => item.id === params.id)
      state.list[i].done = params.checked
    },
    deleteAll (state) {
      state.list = state.list.filter(i => i.done === false)
    },
    changeList (state, key) {
      this.state.viewKey = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/1.json').then(({ data }) => {
        context.commit('saveList', data)
      })
    }
  },
  getters: {
    unDone (state) {
      return state.list.filter(i => i.done === false).length
    },
    infoList (state) {
      if (state.viewKey === '1') {
        return state.list
      }
      if (state.viewKey === '2') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === '3') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})
