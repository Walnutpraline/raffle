<template>
  <div class="about">
    <div class="title">
      <div>随机抽奖</div>
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
    <Threed ref="threed" :table="tableDataList" :selectedCardIndex="cardIndex" :problem="problems"
      @animateStop="animateStop" />
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
      tableData: [{
        name: "A1",
        x: 1,
        y: 1
      }, {
        name: "A2",
        x: 1,
        y: 2
      }, {
        name: "A3",
        x: 1,
        y: 3
      }, {
        name: "A4",
        x: 1,
        y: 4
      }, {
        name: "A5",
        x: 1,
        y: 5
      }],
      cardIndex: [],
      showXlsx: true,
      repeat: true,
      lotteryDrawData: [],
      problems: false,
      tableDataList: []
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
      this.cardIndex = [] //清空中奖
      this.problems = false //是否抽取题目
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('nameData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('nameData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
    },
    // 抽取题目
    drawQuestionEvt() {
      this.cardIndex = []
      this.problems = true
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('questionData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('questionData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
    },
    // 抽取奖品
    drawPrizeEvt() {
      this.cardIndex = []
      this.problems = false
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('prizeData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('prizeData')))
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
    resets() {
      this.$refs.threed.resets()
    },

    getMyExcelData(data) {
      // 上传表格
      let newArr = []
      var keys = Object.keys(data[0])[0];
      if (keys == 'name') {
        data.forEach(it => {
          newArr.push(it.name)
        });
        localStorage.setItem('nameData', JSON.stringify(newArr))
      } else if (keys == 'prize') {
        data.forEach(it => {
          newArr.push(it.prize)
        });
        localStorage.setItem('prizeData', JSON.stringify(newArr))
      } else if (keys == 'question') {
        data.forEach(it => {
          newArr.push(it.question)
        });
        localStorage.setItem('questionData', JSON.stringify(newArr))
      }
    },

    // 开始抽奖
    startLotteryEvt() {
      if (this.lotteryDrawData.length == 0) {
        this.$message({
          message: '没有更多数据',
          type: 'warning'
        });
        return
      }
      this.spheres()
    },
    // 停止抽取
    endLotteryEvt() {
      // repeat是否可重复抽取
      if (this.repeat) {
        this.cardIndex = [Math.round((Math.random() * (this.tableData.length - 1)))]
      } else {
        // 抽取随机数
        var cardNum = Math.round((Math.random() * (this.lotteryDrawData.length - 1)))
        // 通过名字池里的名字去tabData数组里面，匹配下标
        var tableDataIndex = this.tableData.findIndex(it => {
          return it.name == this.lotteryDrawData[cardNum].name
        })
        // 通过下标，展示抽中卡片
        this.cardIndex = [tableDataIndex]
        // 删除名字池选中的名字
        this.lotteryDrawData = JSON.parse(JSON.stringify(this.lotteryDrawData.filter((item) => item != this.lotteryDrawData[cardNum])))
      }
      // this.stops()
    },
    // 数据格式化
    fromdataList(list) {
      if (arguments.length == 0) {
        return false
      }
      let data = []
      let xNum = 1
      let yNum = 1
      if (list instanceof Array) {
        if (list.length < 200) {
          for (let i = 0; i < 200; i++) {
            if (xNum < 11) {
              if (this.problems) {
                data.push({
                  name: 'A' + i,
                  x: xNum,
                  y: yNum
                })
              } else {
                data.push({
                  name: list[i] || "?",
                  x: xNum,
                  y: yNum
                })
              }
            } else {
              yNum++
              xNum = 1
              if (this.problems) {
                data.push({
                  name: 'A' + i,
                  x: xNum,
                  y: yNum
                })
              } else {
                data.push({
                  name: list[i] || "?",
                  x: xNum,
                  y: yNum
                })
              }
            }
            xNum++
          }
        } else {
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
        }
        return data
      } else {
        this.$message({
          message: '请导入数组类型数据',
          type: 'warning'
        });
      }
    },
    fromdata(list) {
      if (arguments.length == 0) {
        return false
      }
      let data = []
      let xNum = 1
      let yNum = 1
      if (list instanceof Array) {
        for (let i = 0; i < list.length; i++) {
          if (xNum < 11) {
            if (this.problems) {
              data.push({
                name: 'A' + i,
                x: xNum,
                y: yNum
              })
            } else {
              data.push({
                name: list[i] || "?",
                x: xNum,
                y: yNum
              })
            }
          } else {
            yNum++
            xNum = 1
            if (this.problems) {
              data.push({
                name: 'A' + i,
                x: xNum,
                y: yNum
              })
            } else {
              data.push({
                name: list[i] || "?",
                x: xNum,
                y: yNum
              })
            }
          }
          xNum++
        }
        return data
      } else {
        this.$message({
          message: '请导入数组类型数据',
          type: 'warning'
        });
      }
    },
    animateStop() {
      console.log("animateStop")
    }
  }
}
</script>

<style lang="scss">
.about {
  position: relative;
  .title {
    position: absolute;
    top: 0;
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
