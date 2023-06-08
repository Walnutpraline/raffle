<template>
  <div class="about">
    <div class="num">
      <button @click="tables">TABLE</button>
      <button @click="spheres">SPHERE</button>
      <button @click="lotterys">转动</button>
      <button @click="resets">复位</button>
    </div>
    <div class="upload">
      <el-switch v-model="showXlsx">
      </el-switch>
      <Xlsx v-show="showXlsx" @getResult="getMyExcelData" />
    </div>
    <div class="lotteryDraw">
      <div class="repeatBox">
        <div>抽取是否可重复</div>
        <el-switch v-model="repeat">
        </el-switch>
      </div>
      <el-button type="primary" @click="drawNameEvt">抽取姓名</el-button>
      <el-button type="primary" @click="drawQuestionEvt">抽取题目</el-button>
      <el-button type="primary" @click="drawPrizeEvt">抽取奖品</el-button>
    </div>
    <div class="startEnd">
      <el-button type="primary" @click="startLotteryEvt">开始抽奖</el-button>
      <el-button type="primary" @click="endLotteryEvt">停止</el-button>
    </div>
    <Threed ref="threed" :table="tableData" :selectedCardIndex="cardIndex" />
  </div>
</template>

<script>
import Threed from '../components/threeD.vue'
import Xlsx from '@/components/xlsx'
export default {
  name: 'About',
  components: {
    Threed,
    Xlsx
  },
  data() {
    return {
      tableData: [],
      cardIndex: [30],
      showXlsx: true,
      repeat: true,
      lotteryDrawData:[]
    }
  },
  created() {
    // if (JSON.parse(localStorage.getItem('nameData')) == null) {
    //   this.$message({
    //     message: '请先上传表格数据！',
    //     type: 'warning'
    //   });
    //   return
    // }
    // this.tableData = this.fromdata(JSON.parse(localStorage.getItem('nameData')))
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    // 抽取姓名
    drawNameEvt() {
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('nameData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
    },
    // 抽取题目
    drawQuestionEvt() {
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('questionData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
    },
    // 抽取奖品
    drawPrizeEvt() {
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('prizeData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
    },
    tables() {
      this.$refs.threed.tables()
    },
    spheres() {
      this.$refs.threed.spheres()
    },
    lotterys() {
      this.$refs.threed.lotterys()
    },
    // stops() {
    //   this.$refs.threed.stops()
    // },
    resets() {
      this.$refs.threed.resets()
    },

    getMyExcelData(data) {
      // 上传表格
      let newArr = []
      var keys = Object.keys(data[0])[0];
      if(keys == 'name') {
        data.forEach(it => {
          newArr.push(it.name)
        });
        localStorage.setItem('nameData', JSON.stringify(newArr))
      }else if(keys == 'prize') {
        data.forEach(it => {
          newArr.push(it.prize)
        });
        localStorage.setItem('prizeData', JSON.stringify(newArr))
      }else if(keys == 'question') {
        data.forEach(it => {
          newArr.push(it.question)
        });
        localStorage.setItem('questionData', JSON.stringify(newArr))
      }
    },

    // 开始抽奖
    startLotteryEvt() {
      this.spheres()
    },

    // 停止抽取
    endLotteryEvt() {
      // repeat是否可重复抽取
      if (this.repeat) {
        this.cardIndex = [Math.round((Math.random() * (this.lotteryDrawData.length - 1)))]
      } else {
        var cardNum = Math.round((Math.random() * (this.lotteryDrawData.length - 1)))
        this.cardIndex = [cardNum]
        console.log(cardNum);
        console.log(this.lotteryDrawData[cardNum]);
        this.lotteryDrawData.splice(cardNum,1)
        console.log(this.lotteryDrawData);
      }
      // this.stops()
    },

    // 数据格式化
    fromdata(list) {
      if (arguments.length == 0) {
        return false
      }
      let data = []
      let xNum = 1
      let yNum = 1
      if (list instanceof Array) {
        list.map((value, index) => {
          if (xNum < 11) {
            data.push({
              name: value,
              x: xNum,
              y: yNum
            })
          } else {
            yNum++
            xNum = 1
            data.push({
              name: value,
              x: xNum,
              y: yNum
            })
          }
          xNum++
        })
        return data
      } else {
        this.$message({
          message: '请导入数组类型数据',
          type: 'warning'
        });
      }
    }
  }
}
</script>

<style lang="scss">
.about {
  .num {
    position: fixed;
    z-index: 20;
  }

  .upload {
    position: absolute;
    z-index: 20;
    right: 0;
    width: 188px;
    height: 66px;
  }

  .lotteryDraw {
    position: absolute;
    z-index: 20;
    left: 32px;
    top: 80px;

    .repeatBox {
      color: #fff;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
    }
  }

  .startEnd {
    position: absolute;
    z-index: 20;
    left: 32px;
    bottom: 80px;
  }
}
</style>
