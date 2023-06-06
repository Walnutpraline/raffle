<!-- eslint-disable camelcase -->
<template>
  <div class="home">
    <xlsx @getResult="getMyExcelData">导入参数</xlsx>
  </div>
</template>

<script>
// @ is an alias to /src
import xlsx from '@/components/xlsx'
export default {
  name: 'Home',
  components: {
    xlsx
  },
  methods: {
    getMyExcelData (data) {
      // 上传表格
      console.log(data)
    }
  }
}
</script>
