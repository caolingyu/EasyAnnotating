var objDeepCopy = function (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

const state = {
  label_set: null,
  cur_idx: 0,
  selected_idx: [],
  file_names: [],
  files: [],
  annotated: []
}

const mutations = {
  CHANGE_LABEL_SET (state, labelSet) {
    state.label_set = labelSet
  },
  APPEND_FILE_NAMES (state, fileNames) {
    state.file_names.push(fileNames)
  },
  APPEND_FILES (state, files) {
    state.files.push(files)
    state.annotated = objDeepCopy(state.files)
  },
  CHANGE_CUR_IDX (state, idx) {
    state.cur_idx = idx
  },
  CHANGE_LABEL (state, obj) {
    state.annotated[state.cur_idx][obj.idx].label = obj.label
  },
  CHANGE_COLOR (state, obj) {
    state.annotated[state.cur_idx][obj.idx].color = obj.color
  },
  CHANGE_IS_START (state, obj) {
    state.annotated[state.cur_idx][obj.idx].isStart = obj.isStart
  },
  RESET_ANNOTATED (state) {
    state.annotated.splice(state.cur_idx, 1, objDeepCopy(state.files[state.cur_idx]))
  }
}

const actions = {
  changeLabelSet ({ commit }, labelSet) {
    commit('CHANGE_LABEL_SET', labelSet)
  },
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
      if (i === obj.startIdx) {
        commit('CHANGE_IS_START', {idx: i, isStart: true})
      }
      commit('CHANGE_LABEL', {idx: i, label: obj.label})
      commit('CHANGE_COLOR', {idx: i, color: obj.color})
    }
  },
  resetAnnotated ({ commit }) {
    commit('RESET_ANNOTATED')
  }
}

export default {
  state,
  mutations,
  actions
}
