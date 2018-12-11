// 在 js 中定义 files 读写文件
// import path from 'path'
import fs from 'fs-extra'
// import { app, remote } from 'electron' // 引入remote模块

// const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块
// const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录
// if (!fs.existsSync(STORE_PATH)) {
//   // 如果不存在路径
//   fs.mkdirpSync(STORE_PATH) // 就创建
// }

export const files = {
//   read: function (filesName) {
//     const path_ = path.join(STORE_PATH, filesName)
//     let filesData = fs.readFileSync(path_, 'utf-8', function (e, data) {
//       if (e) throw e
//       return data
//     })
//     return filesData
//   },
  write: function (filesName, writeStr) {
    fs.open(filesName, 'w+', function (e, fd) {
      if (e) throw e
      fs.write(fd, writeStr, 0, 'utf8', function (e) {
        if (e) throw e
        fs.closeSync(fd)
      })
    })
  }
}
