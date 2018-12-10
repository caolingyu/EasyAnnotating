const state = {
  label_set: {
    disease: {name: '疾病和诊断', color: '#409EFF'},
    symptom: {name: '症状和体征', color: '#F56C6C'},
    labtest: {name: '检查和检验', color: '#E6A23C'}
  },
  cur_idx: 0,
  selected_idx: [],
  file_names: [],
  files: [],
  annotated: []
}

const mutations = {
  APPEND_FILE_NAMES (state, fileNames) {
    state.file_names.push(fileNames)
  },
  APPEND_FILES (state, files) {
    state.files.push(files)
  },
  CHANGE_CUR_IDX (state, idx) {
    state.cur_idx = idx
  },
  CHANGE_LABEL (state, obj) {
    state.files[state.cur_idx][obj.idx].label = obj.label
  },
  CHANGE_COLOR (state, obj) {
    state.files[state.cur_idx][obj.idx].color = obj.color
  }
}

const actions = {
  appendFileNames ({ commit }, fileNames) {
    commit('APPEND_FILE_NAMES', fileNames)
  },
  appendFiles ({ commit }, files) {
    commit('APPEND_FILES', files)
  },
  changeCurIdx ({ commit }, idx) {
    commit('CHANGE_CUR_IDX', idx)
  },
  changeLabelAndColor ({ commit }, obj) {
    for (let i = obj.startIdx; i <= obj.endIdx; i++) {
      commit('CHANGE_LABEL', {idx: i, label: obj.label})
      commit('CHANGE_COLOR', {idx: i, color: obj.color})
    }
  }
}

export default {
  state,
  mutations,
  actions
}
