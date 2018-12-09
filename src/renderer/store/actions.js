export const changeInputData = ({commit}, value) => {
  commit({
    type: 'mutationsInputData',
    inputData: value
  })
}

export const changeUploadData = ({commit}, value) => {
  commit({
    type: 'mutationsUploadData',
    uploadData: value
  })
}

export const changeTableLoading = ({commit}, value) => {
  commit({
    type: 'mutationsTableLoading',
    tableLoading: value
  })
}

export const changeTableData = ({commit}, response) => {
  var _tableData = []
  var _results = response.data.results
  var _prob = response.data.prob
  var _desc = response.data.desc
  var _textRaw = response.data.text
  var _alpha = response.data.alpha
  for (var i = 0; i < _results.length; i++) {
    _tableData.push({code: _results[i],
      prob: _prob[i].toFixed(2),
      desc: _desc[i],
      textRaw: _textRaw,
      alpha: _alpha[i]})
  }
  commit({
    type: 'mutationsTableData',
    tableData: _tableData
  })
}

export const changeTableData2 = ({commit}, response) => {
  var _tableData = []
  var _results = response.data.results
  var _prob = response.data.prob
  var _desc = response.data.desc
  var _textRaw = response.data.text
  var _alpha = response.data.alpha
  for (var i = 0; i < _results.length; i++) {
    _tableData.push({code: _results[i],
      prob: _prob[i].toFixed(2),
      desc: _desc[i],
      textRaw: _textRaw,
      alpha: _alpha[i]})
  }
  commit({
    type: 'mutationsTableData2',
    tableData: _tableData
  })
}

export const addNER = ({commit}, response) => {
  var _ind = response.state.tableData.length - 1
  var nerData = []
  var entName = []
  var entCate = []
  console.log(response)
  for (var i = 0; i < response.data.length; i++) {
    entName.push(response.data[i].ent_name)
    if (response.data[i].ent_category == '症状和体征' && response.data[i].ent_category_pos == '+') {
      entCate.push('症状和体征(+)')
    } else if (response.data[i].ent_category == '症状和体征' && response.data[i].ent_category_pos == '-') {
      entCate.push('症状和体征(-)')
    } else {
      entCate.push(response.data[i].ent_category)
    }
  }

  for (var i = 0; i < response.state.tableData[_ind][0].textRaw.length; i++) {
    if (entName.indexOf(response.state.tableData[_ind][0].textRaw[i]) != -1) {
      nerData.push(entCate[entName.indexOf(response.state.tableData[_ind][0].textRaw[i])])
    } else {
      nerData.push('none')
    }
  }

  commit({
    type: 'mutationsAddNER',
    index: _ind,
    data: nerData
  })
}

export const addNER2 = ({commit}, response) => {
  var _ind = response.state.tableData2.length - 1
  var nerData = []
  var entName = []
  var entCate = []
  console.log(response)
  for (var i = 0; i < response.data.length; i++) {
    entName.push(response.data[i].ent_name)
    if (response.data[i].ent_category == '症状和体征' && response.data[i].ent_category_pos == '+') {
      entCate.push('症状和体征(+)')
    } else if (response.data[i].ent_category == '症状和体征' && response.data[i].ent_category_pos == '-') {
      entCate.push('症状和体征(-)')
    } else {
      entCate.push(response.data[i].ent_category)
    }
  }

  for (var i = 0; i < response.state.tableData2[_ind][0].textRaw.length; i++) {
    if (entName.indexOf(response.state.tableData2[_ind][0].textRaw[i]) != -1) {
      nerData.push(entCate[entName.indexOf(response.state.tableData2[_ind][0].textRaw[i])])
    } else {
      nerData.push('none')
    }
  }

  commit({
    type: 'mutationsAddNER2',
    index: _ind,
    data: nerData
  })
}

export const addInfo = ({commit}, response) => {
  var infoData = []
  for (var i = 0; i < response.data.length; i++) {
    if (response.data[i].ent_category == '检查和检验' && response.data[i].hasOwnProperty('labtest_value')) {
      infoData.push({name: response.data[i].ent_name, type: '检查和检验', value: response.data[i].labtest_value})
    }
  }
  commit({
    type: 'mutationsAddInfo',
    data: infoData
  })
}

export const addInfo2 = ({commit}, response) => {
  var infoData2 = []
  for (var i = 0; i < response.data.length; i++) {
    if (response.data[i].ent_category == '检查和检验' && response.data[i].hasOwnProperty('labtest_value')) {
      infoData2.push({name: response.data[i].ent_name, type: '检查和检验', value: response.data[i].labtest_value})
    }
  }
  commit({
    type: 'mutationsAddInfo2',
    data: infoData2
  })
}

// export const resetTableData = ({commit}) => {
//     commit({
//         type: 'mutationsTableData',
//         tableData: []
//     })
// };

export const changeInputList = ({commit}, newValue) => {
  commit({
    type: 'mutationsInputList',
    data: newValue
  })
}

export const changeUploadList = ({commit}, newValue) => {
  commit({
    type: 'mutationsUploadList',
    data: newValue
  })
}

export const changeCurrentIndex = ({commit}, newValue) => {
  commit({
    type: 'mutationsCurrentIndex',
    data: newValue
  })
}

export const changeCurrentIndex2 = ({commit}, newValue) => {
  commit({
    type: 'mutationsCurrentIndex2',
    data: newValue
  })
}

export const changeCurrentRow = ({commit}, newValue) => {
  commit({
    type: 'mutationsCurrentRow',
    data: newValue
  })
}

export const changeSwitch1 = ({commit}, newValue) => {
  commit({
    type: 'mutationsSwitch1',
    data: newValue
  })
}

export const changeSwitch2 = ({commit}, newValue) => {
  commit({
    type: 'mutationsSwitch2',
    data: newValue
  })
}

export const changeIfUpload = ({commit}, newValue) => {
  commit({
    type: 'mutationsIfUpload',
    data: newValue
  })
}

export const changeIfDone = ({commit}, newValue) => {
  commit({
    type: 'mutationsIfDone',
    data: newValue
  })
}
