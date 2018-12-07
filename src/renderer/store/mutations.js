export const mutationsInputData = (state, payload) => {
    state.inputData.push(payload.inputData);
  };

export const mutationsUploadData = (state, payload) => {
    state.uploadData.push(payload.uploadData);
  };

export const mutationsTableLoading = (state, payload) => {
    state.tableLoading = payload.tableLoading;
  }

export const mutationsTableData = (state, payload) => {
    state.tableData.push(payload.tableData);
  }

export const mutationsTableData2 = (state, payload) => {
    state.tableData2.push(payload.tableData);
  }

export const mutationsAddNER = (state, payload) => {
    for (var i=0;i<state.tableData[payload.index].length;i++){
      state.tableData[payload.index][i].ner = payload.data;
    }
}

export const mutationsAddNER2 = (state, payload) => {
    for (var i=0;i<state.tableData2[payload.index].length;i++){
      state.tableData2[payload.index][i].ner = payload.data;
    }
}

export const mutationsAddInfo = (state, payload) => {
    state.infoData.push(payload.data);
}

export const mutationsAddInfo2 = (state, payload) => {
    state.infoData2.push(payload.data);
}

export const mutationsInputList = (state, payload) => {
    state.inputList.push(payload.data);
  }

export const mutationsUploadList = (state, payload) => {
    state.uploadList.push(payload.data);
  }

export const mutationsCurrentIndex = (state, payload) => {
    state.currentIndex = payload.data;
  }

export const mutationsCurrentIndex2 = (state, payload) => {
    state.currentIndex2 = payload.data;
  }

export const mutationsCurrentRow = (state, payload) => {
    state.currentRow = payload.data;
  }

export const mutationsSwitch1 = (state, payload) => {
    state.switch1 = payload.data;
  }

export const mutationsSwitch2 = (state, payload) => {
    state.switch2 = payload.data;
  }

export const mutationsIfUpload = (state, payload) => {
    state.ifUpload = payload.data;
  }

export const mutationsIfDone = (state, payload) => {
    state.ifDone = payload.data;
  }