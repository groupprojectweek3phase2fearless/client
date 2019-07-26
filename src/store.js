import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arrayQuestion: []
  },
  mutations: {
    getQuestion (state, payload) {
      state.arrayQuestion = payload
    }
  },
  actions: {
    getQuestion ({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `https://opentdb.com/api.php?amount=23&category=9&difficulty=easy&type=boolean&encode=url3986`,
          responseType: 'json'
        })
          .then(({ data }) => {
            let datas = data.results
            let arrayQuestion = []
            for (let i = 0; i < datas.length; i++) {
              let obj = { question: datas[i].question, answer: datas[i].correct_answer }
              arrayQuestion.push(obj)
            }
            commit('getQuestion', arrayQuestion)
            resolve(true)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
})
