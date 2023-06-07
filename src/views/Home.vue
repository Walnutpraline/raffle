<!-- eslint-disable camelcase -->
<template>
  <div class="home">
    <el-switch
      v-model="showXlsx"
    >
    </el-switch>
    <xlsx v-show="showXlsx" @getResult="getMyExcelData">
      
    </xlsx>
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
  data() {
    return {
      showXlsx:true
    }
  },
  methods: {
    getMyExcelData (data) {
      // 上传表格
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: absolute;
    z-index: 2;
    right: 0;
  }
</style>
