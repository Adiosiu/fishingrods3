export const state = () => ({
    fish: []
  })
  
  export const mutations = {
    addFish(state, fish) {
      state.fish.push(fish)
    }
  }
  
  export const actions = {
    addFish({ commit }, fish) {
      commit('addFish', fish)
    }
  }
  