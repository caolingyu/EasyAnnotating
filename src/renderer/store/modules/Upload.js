const state = {
  file_names: [],
  files: []
}

const mutations = {
  APPEND_FILE_NAMES (state, fileNames) {
    state.file_names.push(fileNames)
  },
  APPEND_FILES (state, files) {
    state.files.push(files)
  }
}

const actions = {
  CHANGE_FILE_NAMES = ({commit}, value) => {
    commit('APPEND_FILE_NAMES', value)
  },
  CHANGE_FILES = (({commit}, value) => {
    commit('APPEND_FILES', value)
  })

}

export default {
  state,
  mutations,
  actions
}
  