<template>
    <div>
      <input
        class="input-file"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        @change="exportData"
      />
      <button @click="btnClick">上传表格</button>
    </div>
  </template>

<script>
import XLSX from 'xlsx' // 引入插件

export default {
  name: 'InputExcel',
  props: {
    accept: {
      type: String,
      default: '选择excel文件'
    }
  },
  methods: {
    btnClick () {
      document.querySelector('.input-file').click()
    },
    exportData (event) {
      if (!event.currentTarget.files.length) {
        this.$message({
          message: '请上传excel文件！',
          type: 'warning'
        });
        return
      }
      const that = this
      // 拿取文件对象
      var f = event.currentTarget.files[0]
      var fileName = event.currentTarget.files[0].name.substring(
        event.currentTarget.files[0].name.lastIndexOf('.') + 1
      )
      if(fileName !== 'xls' && fileName !== 'xlsm' && fileName !== 'xlt' && fileName !== 'xlsx') {
        that.$message.error('请上传xls，xlsm，xlt，xlsx格式文件');
        return
      }
      // 用FileReader来读取
      var reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var wb // 读取完成的数据
        var outdata // 你需要的数据
        var reader = new FileReader()
        reader.onload = function (e) {          
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: 'binary'
          })
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          if(outdata.length !== 0) {
            that.$message({
              message: '文件上传成功！',
              type: 'success'
            });
          } else {
            that.$message({
              message: '文件内容不能为空！',
              type: 'warning'
            });
          }
          // 自定义方法向父组件传递数据
          that.$emit('getResult', outdata)
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    }
  }
}
</script>

  <style scoped>
  .input-file {
    display: none;
  }
  </style>
