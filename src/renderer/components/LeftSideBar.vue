<template>
  <el-scrollbar style="height: 100%" ref="scrollbar" class="el-scrollbar">
    <div class="file-list">
      <div class="file-list-panel" v-for="(item, index) in getFileList"
        :key=index
        @click="changeIndex(index)"
        :class="{active: index === getCurIdx}" >
        <div class="file-list-item">
          <h4 class="file-title">{{ item }}</h4>
          <a class="file-delete-btn" @click="deleteFile(index)">
            <i class="el-icon-delete"></i>
          </a>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import uploader from './UploadFile'

  export default {
    components: {
      uploader
    },

    data () {
      return {
        scrollWrap: null // 滚动条容器
      }
    },

    mounted () {
      this.scrollWrap = this.$refs.scrollbar.$refs.wrap // 滚动条容器，详见：el-scrollbar组件源码
      this.onscroll()
      this.setScrollLocation()
    },

    computed: {
      getFileList () {
        return this.$store.state.Upload.file_names
      },

      getCurIdx () {
        return this.$store.state.Upload.cur_idx
      }
    },

    methods: {
      changeIndex (index) {
        this.$store.dispatch('changeCurIdx', index)
        this.loadFromRaw()
      },

      loadFromRaw () {
        let isUploaded = this.$store.state.Upload.annotated[this.$store.state.Upload.cur_idx].isUploaded
        if (!isUploaded) {
          let f = this.$store.state.Upload.file_raw[this.$store.state.Upload.cur_idx]
          let reader = new FileReader()
          reader.readAsText(f.raw)
          reader.onload = e => {
            let fileLoaded = e.target.result
            let fileToSave = []
            for (let i = 0; i < fileLoaded.length; i++) {
              fileToSave.push({
                char: fileLoaded[i],
                index: i,
                label: 'None',
                color: null,
                isStart: false,
                linkedEntStart: null,
                linkedEntEnd: null
              })
            }
            this.$store.dispatch('appendFiles', fileToSave)
          }
        }
        let usePreAnn = this.$store.state.Upload.annotated[this.$store.state.Upload.cur_idx].usePreAnn
        if (!usePreAnn) {
          this.loadFromAnn()
        }
      },

      loadFromAnn () {
        let fileName = this.$store.state.Upload.file_names[this.$store.state.Upload.cur_idx]
        if (fileName in this.$store.state.Upload.pre_ann) {
          let f = this.$store.state.Upload.pre_ann[fileName]
          let reader = new FileReader()
          reader.readAsText(f.raw)
          reader.onload = e => {
            let fileLoaded = e.target.result
            if (fileLoaded) {
              let line = fileLoaded.split('\n')
              line.forEach(item => {
                let spl = item.split('\t')
                let startIdx = spl[1]
                let endIdx = spl[2]
                let category = spl[3]
                let toAdd = {
                  startIdx: Number(startIdx),
                  endIdx: Number(endIdx),
                  category: category
                }
                this.$store.dispatch('addPreAnn', toAdd)
              })
              this.$store.dispatch('finishLoadPreAnn', true)
            }
          }
        }
      },

      async deleteFile (idx) {
        if (confirm('是否确认删除该文件？')) {
          await this.$store.dispatch('deleteFile', idx)
          this.$notify({title: '成功', message: '删除成功', type: 'success'})
        }
      },

      // 监听滚动状态，并存储滚动位置
      onscroll (e) {
        var me = this
        me.scrollWrap.addEventListener('scroll', function (e) {
          me.$store.dispatch('UiStatus/onscroll', {
            scrollTop: e.srcElement.scrollTop,
            scrollLeft: e.srcElement.scrollLeft
          })
        })
      },

      // 设置滚动位置
      setScrollLocation () {
        let scrollTop = this.$store.state.UiStatus.postListScrollTop || 0
        let scrollLeft = this.$store.state.UiStatus.postListScrollLeft || 0
        if (scrollTop > 0 || scrollLeft > 0) {
          this.scrollWrap.scrollTop = scrollTop
          this.scrollWrap.scrollLeft = scrollLeft
        }
      }
    }
  }
</script>

<style>
  .el-scrollbar {
    min-width: 194px;
    width: 194px;
    border-right: 1px solid #E9E9E9;
  }
  .file-list {
    background-color: #333;
    margin-top: 10px;
  }
  .file-list-panel.active {
    background-color: #EEEEEE;
  }
  .file-list-item {
    color: #727272;
    font-size: 13px;
    padding: 8px;
    position: relative;
    cursor: pointer;
    /*border-bottom: 1px solid rgba(235, 238, 245, 0.8);*/
  }
  .file-list-item .file-title {
    color: #66b1ff;
    margin: 0px 0px 5px;
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
  }
  .file-delete-btn {
    top: 5px;
    right: 10px;
    opacity: 0;
    position: absolute;
    padding: 5px 6px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    transition: opacity 0.3s ease, background-color 0.1s ease;
    background-color: #d5d5d5;
  }
  .file-edit-btn:hover, .file-delete-btn:hover {
    background-color: #c0c0c0;
  }
  .file-list-panel:hover .file-delete-btn {
    opacity: 1;
  }
</style>