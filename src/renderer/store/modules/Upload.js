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
  file_raw: [],
  files: [],
  annotated: [],
  pre_ann: {} // 预标注
}

const mutations = {
  CHANGE_LABEL_SET (state, labelSet) {
    state.label_set = labelSet
  },
  APPEND_FILE_NAMES (state, fileNames) {
    state.file_names.push(fileNames)
  },
  APPEND_FILE_RAW (state, files) {
    state.file_raw.push(files)
    state.files.push({usePreAnn: false})
  },
  APPEND_FILES (state, files) {
    state.files[state.cur_idx].content = objDeepCopy(files)
    state.files[state.cur_idx].isUploaded = true
    state.annotated = objDeepCopy(state.files)
  },
  APPEND_PRE_ANN (state, obj) {
    state.pre_ann[obj.fileName] = obj.file
  },
  ADD_PRE_ANN (state, obj) {
    for (let i = obj.startIdx; i <= obj.endIdx; i++) {
      if (i === obj.startIdx) {
        state.annotated[state.cur_idx].content[i].isStart = true
      }
      state.annotated[state.cur_idx].content[i].label = obj.category
      Object.keys(state.label_set).forEach(element => {
        if (state.label_set[element].name === obj.category) {
          state.annotated[state.cur_idx].content[i].color = state.label_set[element].color
        }
      })
      state.annotated[state.cur_idx].content[i].linkedEntStart = obj.startIdx
      state.annotated[state.cur_idx].content[i].linkedEntEnd = obj.endIdx
    }
  },
  FINISH_LOAD_PRE_ANN (state, value) {
    state.annotated[state.cur_idx].usePreAnn = true
  },
  CHANGE_CUR_IDX (state, idx) {
    state.cur_idx = idx
  },
  CHANGE_LABEL (state, obj) {
    state.annotated[state.cur_idx].content[obj.idx].label = obj.label
  },
  CHANGE_COLOR (state, obj) {
    state.annotated[state.cur_idx].content[obj.idx].color = obj.color
  },
  CHANGE_IS_START (state, obj) {
    state.annotated[state.cur_idx].content[obj.idx].isStart = obj.isStart
  },
  CHANGE_LINKED_ENT (state, obj) {
    state.annotated[state.cur_idx].content[obj.idx].linkedEntStart = obj.startIdx
    state.annotated[state.cur_idx].content[obj.idx].linkedEntEnd = obj.endIdx
  },
  RESET_ANNOTATED (state) {
    state.annotated.splice(state.cur_idx, 1, objDeepCopy(state.files[state.cur_idx]))
  },
  DELETE_FILE (state, idx) {
    state.file_names.splice(idx, 1)
    state.files.splice(idx, 1)
    state.annotated.splice(idx, 1)
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
  appendFileRaw ({ commit }, files) {
    commit('APPEND_FILE_RAW', files)
  },
  appendPreAnn ({ commit }, obj) {
    commit('APPEND_PRE_ANN', obj)
  },
  addPreAnn ({ commit }, obj) {
    commit('ADD_PRE_ANN', obj)
  },
  finishLoadPreAnn ({ commit }, value) {
    commit('FINISH_LOAD_PRE_ANN', value)
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
      commit('CHANGE_LINKED_ENT', {idx: i, startIdx: obj.startIdx, endIdx: obj.endIdx})
    }
  },
  removeEnt ({ commit }, obj) {
    for (let i = obj.startIdx; i <= obj.endIdx; i++) {
      if (i === obj.startIdx) {
        commit('CHANGE_IS_START', {idx: i, isStart: false})
      }
      commit('CHANGE_LABEL', {idx: i, label: 'None'})
      commit('CHANGE_COLOR', {idx: i, color: null})
      commit('CHANGE_LINKED_ENT', {idx: i, startIdx: null, endIdx: null})
    }
  },
  resetAnnotated ({ commit }) {
    commit('RESET_ANNOTATED')
  },
  deleteFile ({ commit }, idx) {
    commit('DELETE_FILE', idx)
  }
}

export default {
  state,
  mutations,
  actions
}
