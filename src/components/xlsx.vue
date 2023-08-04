<template>
  <div>
    <input class="input-file" type="file"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      @change="exportData"/>
    <el-button type="primary" @click="btnClick" :disabled="uploadAbled">上传表格</el-button>
    <el-button type="primary" @click="downloadExl" :disabled="uploadAbled">下载</el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx' // 引入插件

export default {
  name: 'InputExcel',
  data() {
    return {
      wopts:{ bookType: 'xlsx', bookSST: false, type: 'binary' },
    }
  },
  props: {
    accept: {
      type: String,
      default: '选择excel文件'
    },
    uploadAbled: {
      type: Boolean,
      default: false
    },
    historyList:{
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default:[]
    }
  },
  methods: {
    btnClick() {
      document.querySelector('.input-file').click()
    },
    exportData(event) {
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
      if (fileName !== 'xls' && fileName !== 'xlsm' && fileName !== 'xlt' && fileName !== 'xlsx') {
        that.$message.error('请上传xls，xlsm，xlt，xlsx格式文件');
        return
      }
      // 用FileReader来读取
      var reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var wb // 读取完成的数据
        var outdata={
          prize:[],
          name:[],
          question:[],
          title:[],
        } // 你需要的数据
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
          outdata.prize = XLSX.utils.sheet_to_json(wb.Sheets["奖品配置"])
          outdata.name = XLSX.utils.sheet_to_json(wb.Sheets["人员配置"])
          outdata.question = XLSX.utils.sheet_to_json(wb.Sheets["题目配置"])
          outdata.title = XLSX.utils.sheet_to_json(wb.Sheets["活动标题配置"])
          if (outdata.length !== 0) {
            that.$message({
              message: '文件上传成功，请选择抽取类型。',
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
      event.target.value = ''
    },
    downloadExl() {
        const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(this.historyList);//通过json_to_sheet转成单页(Sheet)数据
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, this.wopts))], { type: "application/octet-stream" }), "历史记录" + '.' + (this.wopts.bookType=="biff2"?"xls":this.wopts.bookType));
    },
    saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式 
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "下载";
        tmpa.href = URL.createObjectURL(obj); //绑定a标签
        tmpa.click(); //模拟点击实现下载
        setTimeout(function () { //延时释放
            URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    },
    s2ab(valu) {
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(valu.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != valu.length; ++i) view[i] = valu.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            var buf = new Array(valu.length);
            for (var i = 0; i != valu.length; ++i) buf[i] = valu.charCodeAt(i) & 0xFF;
            return buf;
        }
    }
  }
}
</script>

<style scoped>
.input-file {
  display: none;
}
</style>
