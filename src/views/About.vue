<template>
  <div class="about">
    <div class="titleBox">
      {{title}}
    </div>
    <div class="leftArea">
      <div class="lotteryDraw">
        <div :class="selDrawName?'seldrawNameBox':'drawNameBox'">
          <el-button type="primary" @click="drawNameEvt">抽取姓名</el-button>
          <el-switch active-color="rgba(0, 127, 127, 0.37)" v-model="repeat">
          </el-switch>
        </div>
        <div :class="selDrawQuestion?'selDrawQuestionBox':'drawQuestionBox'">
          <el-button type="primary" @click="drawQuestionEvt">抽取题目</el-button>
        </div>
        <div :class="selDrawPrize?'selDrawPrizeBox':'drawPrizeBox'" class="">
          <el-button type="primary" @click="drawPrizeEvt">抽取奖品</el-button>
        </div>
      </div>
      <div class="uploadBox">
        <Xlsx v-show="showXlsx" @getResult="getMyExcelData" />
      </div>
      <div class="startEnd">
        <el-button type="primary" @click="startLotteryEvt" :disabled="startLotteryAbled">开始抽奖</el-button>
        <el-button type="primary" @click="endLotteryEvt" :disabled="endLotteryAbled">停止抽奖</el-button>
      </div>
    </div>
    <Threed ref="threed" :table="tableDataList" :selectedCardIndex="cardIndex" :problem="problems"
      @animateStop="animateStop" @showQuestionEvt="showQuestionEvt" />
    <el-dialog
      :visible.sync="showQuestion"
      width="50%"
      top="10%">
      <span>{{questionAnswerStr}}</span>
    </el-dialog>
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
      tableDataList: [],
      title:'',
      questionAnswer:[],
      showQuestion:false,
      questionAnswerStr:'',
      selDrawName: false,
      selDrawQuestion: false,
      selDrawPrize: false, 
      startLotteryAbled: true, // 开始抽奖按钮是否禁用
      endLotteryAbled: true, // 结束抽奖按钮是否禁用
      rotateAnimate: false, // 地球旋转动画标识
      nextlotteryDraw: false // 非第一次抽取标识
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
    this.title = JSON.parse(localStorage.getItem('title'))
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

      // 使用选中的样式，其他两项使用原样式
      this.selDrawName = true
      this.selDrawQuestion = false,
      this.selDrawPrize = false

      // 开始抽奖，结束抽奖按钮置灰，地球旋转动画标识还原，非第一次抽奖标识还原(初始化控制按钮数据)
      this.endLotteryAbled = true
      this.startLotteryAbled = true
      this.rotateAnimate = false
      this.nextlotteryDraw = false
    },
    // 抽取题目
    drawQuestionEvt() {
      this.cardIndex = []
      this.problems = true
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('questionData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('questionData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
      // 使用选中的样式，其他两项使用原样式
      this.selDrawName = false
      this.selDrawQuestion = true,
      this.selDrawPrize = false

      // 开始抽奖，结束抽奖按钮置灰，地球旋转动画标识还原，非第一次抽奖标识还原(初始化控制按钮数据)
      this.endLotteryAbled = true
      this.startLotteryAbled = true
      this.rotateAnimate = false
      this.nextlotteryDraw = false
    },
    // 抽取奖品
    drawPrizeEvt() {
      this.cardIndex = []
      this.problems = false
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('prizeData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('prizeData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
      // 使用选中的样式，其他两项使用原样式
      this.selDrawName = false
      this.selDrawQuestion = false,
      this.selDrawPrize = true

      // 开始抽奖，结束抽奖按钮置灰，地球旋转动画标识还原，非第一次抽奖标识还原(初始化控制按钮数据)
      this.endLotteryAbled = true
      this.startLotteryAbled = true
      this.rotateAnimate = false
      this.nextlotteryDraw = false
    },

    // 展示题目,答案
    showQuestionEvt(val) {
      console.log(val);
      // 展示题目弹框
      this.showQuestion = val.show
      // 当val里面的questionOrAnswer为0时，弹框展示问题，1代表弹框展示答案
      if(val.questionOrAnswer == 0) {
        this.questionAnswerStr = '题目题目题目,题目题目题目题目题目题目题目题目题目题目题目题目，题目题目题目题目题目题目，题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目，题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目，题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目'
      } else {
        this.questionAnswerStr = '答案答案答案，答案答案答案答案答案答案答案答案答案答案答案答案'
      }
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
      console.log(data);
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
        this.questionAnswer = data
        data.forEach(it => {
          newArr.push(it.question)
        });
        localStorage.setItem('questionData', JSON.stringify(newArr))
      } else if (keys == 'title') {
        data.forEach(it => {
          localStorage.setItem('title', JSON.stringify(it.title))
        });
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
      // 判断是否为第一次抽奖,如果不是第一次抽奖，就把开始按钮置灰，停止按钮开启。反之，就开始按钮置灰，启动地球旋转动画标识，并加延时，点太快会出问题
      if(this.nextlotteryDraw) {
        this.startLotteryAbled = true
        setTimeout(() => {
          this.endLotteryAbled = false
        }, 1000);
      } else {
        this.startLotteryAbled = true
        this.rotateAnimate = true
      }
      this.spheres()
    },
    // 停止抽取
    endLotteryEvt() {
      // 停止抽奖按钮置灰，开始抽奖按钮可点，开启第二次抽奖标识
      this.endLotteryAbled = true
      setTimeout(() => {
        this.startLotteryAbled = false
        this.nextlotteryDraw = true
      }, 1000);
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
      this.setHistory("name", "0", "周军")
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
        if (list.length < 100) {
          for (let i = 0; i < 100; i++) {
            if (xNum < 11) {
              if (this.problems) {
                data.push({
                  name: 'A' + (i + 1),
                  x: xNum,
                  y: yNum
                })
              } else {
                data.push({
                  name: list[i] || " ",
                  x: xNum,
                  y: yNum
                })
              }
            } else {
              yNum++
              xNum = 1
              if (this.problems) {
                data.push({
                  name: 'A' + (i + 1),
                  x: xNum,
                  y: yNum
                })
              } else {
                data.push({
                  name: list[i] || " ",
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
              if (this.problems) {
                data.push({
                  name: 'A' + (index + 1),
                  x: xNum,
                  y: yNum
                })
              } else {
                data.push({
                  name: value,
                  x: xNum,
                  y: yNum
                })
              }
            } else {
              yNum++
              xNum = 1
              if (this.problems) {
                data.push({
                  name: 'A' + (index + 1),
                  x: xNum,
                  y: yNum
                })
              } else {
                data.push({
                  name: value,
                  x: xNum,
                  y: yNum
                })
              }
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
      if(this.rotateAnimate) {
        this.endLotteryAbled = false
        this.startLotteryAbled = true
      } else {
        this.startLotteryAbled = false
        this.endLotteryAbled = true
      }
      console.log('abc');
    },
    // 历史记录
    setHistory(type, index, value) {
      let history = JSON.parse(localStorage.getItem('history')) || []
      let json = history[Number(index)] || {}
      json[type] = value
      history[Number(index)] = json
      localStorage.setItem('history', JSON.stringify(history))
    }
  }
}
</script>

<style lang="scss" scpoed>
.about {

  .titleBox {
    position: absolute;
    text-align: center;
    top: 6px;
    width: 100%;
    z-index: 20;
    color: #fff;
  }

  .leftArea {
    position: absolute;
    height: 100%;
    z-index: 20;
    left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    .lotteryDraw {

      .drawNameBox {
        display: flex;
        align-items: center;
        width: 220px;
        height: 80px;
        .el-switch {
          margin-left: 10px;
        }
      }

      .drawQuestionBox {
        display: flex;
        width: 220px;
        height: 80px;
        align-items: center;
      }

      .drawPrizeBox {
        display: flex;
        width: 220px;
        height: 80px;
        align-items: center;
      }

      .el-button--primary{
        padding: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        flex-wrap: nowrap;
        background-color: rgba(0, 127, 127, 0.37);
        border: 1px solid rgba(127, 255, 255, 0.25);
        color: rgba(127, 255, 255, 0.75);
        width: 120px;
        height: 50px;
        box-sizing: border-box;
      }

      .el-button.is-disabled {
        background-color: rgba(141, 153, 153, 0.37);
        border: 1px solid rgba(232, 242, 242, 0.25);
        color: rgba(170, 182, 182, 0.75);
      }

    }
    .uploadBox {
      .el-button--primary{
        padding: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        flex-wrap: nowrap;
        background-color: rgba(0, 127, 127, 0.37);
        border: 1px solid rgba(127, 255, 255, 0.25);
        color: rgba(127, 255, 255, 0.75);
        width: 120px;
        height: 50px;
        box-sizing: border-box;
      }
      .el-button.is-disabled {
        background-color: rgba(141, 153, 153, 0.37);
        border: 1px solid rgba(232, 242, 242, 0.25);
        color: rgba(170, 182, 182, 0.75);
      }
    }

    .startEnd {
      display: flex;
      .el-button--primary{
        padding: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        flex-wrap: nowrap;
        background-color: rgba(0, 127, 127, 0.37);
        border: 1px solid rgba(127, 255, 255, 0.25);
        color: rgba(127, 255, 255, 0.75);
        width: 120px;
        height: 50px;
        box-sizing: border-box;
        margin-right: 20px;
      }
      .el-button.is-disabled {
        background-color: rgba(141, 153, 153, 0.37);
        border: 1px solid rgba(232, 242, 242, 0.25);
        color: rgba(170, 182, 182, 0.75);
      }
    }
  }

  .seldrawNameBox {
    background-color: rgba(0, 127, 127, 0.37);
    box-shadow: 0 0 15px 0 rgba(0, 255, 255, 0.5);
    width: 220px;
    height: 80px;
    display: flex;
    align-items: center;
    .el-switch {
      margin-left: 10px;
    }
  }
  .selDrawQuestionBox {
    display: flex;
    align-items: center;
    background-color: rgba(0, 127, 127, 0.37);
    box-shadow: 0 0 15px 0 rgba(0, 255, 255, 0.5);
    width: 220px;
    height: 80px;
  }
  .selDrawPrizeBox {
    display: flex;
    align-items: center;
    background-color: rgba(0, 127, 127, 0.37);
    box-shadow: 0 0 15px 0 rgba(0, 255, 255, 0.5);
    width: 220px;
    height: 80px;
  }

  

  .el-dialog__headerbtn {
    top: 10px;
    right: -10px;
    background-color: unset;
  }
  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }
  .el-dialog__close:hover {
    color: #909399;
  }
}
</style>
