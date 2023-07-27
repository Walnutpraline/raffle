<template>
  <div class="about">
    <div class="titleBox">
      <div class="title">{{ title }}</div>
      <div class="titleImg"></div>
    </div>
    <div class="leftArea">
      <div class="lotteryDraw">
        <div class="switchBox">
          <div class="switchTitle">是否重复抽取姓名</div>
          <el-switch active-color="rgba(255,103,0, 0.62)" inactive-color="rgba(141, 153, 153, 0.37)" v-model="repeat">
          </el-switch>
        </div>
        <div :class="selDrawName ? 'seldrawNameBox' : 'drawNameBox'">
          <el-button type="primary" @click="drawNameEvt" :disabled="drawNameAbled">抽取姓名</el-button>
        </div>
        <div :class="selDrawQuestion ? 'selDrawQuestionBox' : 'drawQuestionBox'">
          <el-button type="primary" @click="drawQuestionEvt" :disabled="drawQuestionAbled">抽取题目</el-button>
        </div>
        <div :class="selDrawPrize ? 'selDrawPrizeBox' : 'drawPrizeBox'" class="">
          <el-button type="primary" @click="drawPrizeEvt" :disabled="drawPrizeAbled">抽取奖品</el-button>
        </div>
      </div>
      <div class="uploadBox">
        <el-button type="primary" @click="clearHistoryEvt" :disabled="uploadAbled">清空历史记录</el-button>
        <Xlsx v-show="showXlsx" @getResult="getMyExcelData" :uploadAbled="uploadAbled" />
      </div>
      <div class="startEnd">
        <el-button type="primary" @click="startLotteryEvt" :disabled="startLotteryAbled">开始</el-button>
        <el-button type="primary" @click="endLotteryEvt" :disabled="endLotteryAbled">停止</el-button>
      </div>
    </div>
    <div class="rightArea">
      <div class="topAreaText">历史记录:</div>
      <div class="bottomArea">
        <div class="historyBox" v-for="(it, index) in historyData" :key="index">
          <span>{{ it.category }}</span>
          <span>{{ it.content }}</span>
        </div>
      </div>
    </div>
    <Threed ref="threed" :table="tableDataList" :selectedCardIndex="cardIndex" :problem="problems"
      @animateStop="animateStop" @showQuestionEvt="showQuestionEvt" :prize="prizes" :prizeName="prizeName" />
    <el-dialog :visible.sync="showQuestion" width="50%" top="9%">
      <span slot="footer" class="dialog-footer">
        <div class="questionBox" id="questionBox"></div>
        <div v-show="showAnser" class="answerBox" id="answerBox"></div>
      </span>
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
      cardIndexNum: '',
      showXlsx: true,
      repeat: true,
      lotteryDrawData: [],
      problems: false,
      tableDataList: [],
      title: '',
      questionAnswer: [],
      showQuestion: false,
      questionStr: '',
      answerStr: '',
      showAnser: false,
      selDrawName: false,
      selDrawQuestion: false,
      selDrawPrize: false,
      startLotteryAbled: true, // 开始抽奖按钮是否禁用
      endLotteryAbled: true, // 结束抽奖按钮是否禁用
      rotateAnimate: false, // 地球旋转动画标识
      nextlotteryDraw: false, // 非第一次抽取标识
      drawName: false,
      drawQuestion: false,
      drawPrize: false,
      prizeList: [], // 完整的奖品数据包括数量
      newPrizeList: [], //以奖品数量为个数的新数组
      historyData: [], // 历史数据
      drawNameAbled: false,
      drawQuestionAbled: false,
      drawPrizeAbled: false,
      uploadAbled: false,
      prizes: false,
      prizeName: ""
    }
  },
  created() {
    // this.tableData = this.fromdata(JSON.parse(localStorage.getItem('nameData')))
    this.title = JSON.parse(localStorage.getItem('title'))
    this.questionAnswer = JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('questionAnswer'))))
    this.newPrizeListEvt()
    this.historyData = JSON.parse(localStorage.getItem('history')) || []
  },

  watch: {
  },
  mounted() {
    this.drawNameEvt()
  },
  methods: {
    // 抽取姓名
    drawNameEvt() {
      if (JSON.parse(localStorage.getItem('nameData')) == null) {
        this.$message({
          message: '请上传姓名数据！',
          type: 'warning'
        });
        return
      }
      this.cardIndex = [] //清空中奖
      this.problems = false //是否抽取题目
      this.prizes = false
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('nameData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('nameData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
      // 使用选中的样式，其他两项使用原样式
      this.selDrawName = true
      this.selDrawQuestion = false
      this.selDrawPrize = false
      // 开始抽奖，结束抽奖按钮置灰，地球旋转动画标识还原，非第一次抽奖标识还原(初始化控制按钮数据)
      this.endLotteryAbled = true
      this.startLotteryAbled = true
      this.rotateAnimate = false
      this.nextlotteryDraw = false
      // 进入随机抽姓名随机函数
      this.drawName = true
      this.drawQuestion = false
      this.drawPrize = false
    },
    // 抽取题目
    drawQuestionEvt() {
      if (JSON.parse(localStorage.getItem('questionData')) == null) {
        this.$message({
          message: '请上传题目数据！',
          type: 'warning'
        });
        return
      }
      this.cardIndex = []
      this.problems = true
      this.prizes = false
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('questionData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('questionData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
      this.questionAnswer = JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('questionAnswer'))))
      // 使用选中的样式，其他两项使用原样式
      this.selDrawName = false
      this.selDrawQuestion = true
      this.selDrawPrize = false
      // 开始抽奖，结束抽奖按钮置灰，地球旋转动画标识还原，非第一次抽奖标识还原(初始化控制按钮数据)
      this.endLotteryAbled = true
      this.startLotteryAbled = true
      this.rotateAnimate = false
      this.nextlotteryDraw = false
      // 进入随机抽题目随机函数
      this.drawName = false
      this.drawQuestion = true
      this.drawPrize = false
    },
    // 抽取奖品
    drawPrizeEvt() {
      if (JSON.parse(localStorage.getItem('prizeList')) == null) {
        this.$message({
          message: '请上传奖品数据！',
          type: 'warning'
        });
        return
      }
      this.cardIndex = []
      this.problems = false
      this.prizes = true
      this.tableData = this.fromdata(JSON.parse(localStorage.getItem('prizeData')))
      this.tableDataList = this.fromdataList(JSON.parse(localStorage.getItem('prizeData')))
      this.lotteryDrawData = JSON.parse(JSON.stringify(this.tableData))
      this.prizeList = JSON.parse(localStorage.getItem('prizeList'))
      // 使用选中的样式，其他两项使用原样式
      this.selDrawName = false
      this.selDrawQuestion = false,
        this.selDrawPrize = true
      // 开始抽奖，结束抽奖按钮置灰，地球旋转动画标识还原，非第一次抽奖标识还原(初始化控制按钮数据)
      this.endLotteryAbled = true
      this.startLotteryAbled = true
      this.rotateAnimate = false
      this.nextlotteryDraw = false
      // 进入随机抽奖品随机函数
      this.drawName = false
      this.drawQuestion = false
      this.drawPrize = true
      this.newPrizeListEvt()
    },
    // 获取对应的dom，实现换行显示题目
    wrapEvt(idName,str) {
      document.getElementById(idName).innerHTML = str
    },
    // 展示题目,答案
    showQuestionEvt(val) {
      // 展示题目弹框
      this.showQuestion = val.show
      // 当val里面的questionOrAnswer为0时，弹框展示问题，1代表弹框展示答案
      if (val.questionOrAnswer == 0) {
        // 获取存在localStorage的questionAnswer，利用获取到的下标进行匹配展示的题目及答案
        this.questionStr = JSON.parse(localStorage.getItem('questionAnswer'))[this.cardIndexNum].question
        this.wrapEvt("questionBox",this.questionStr)
        this.answerStr = JSON.parse(localStorage.getItem('questionAnswer'))[this.cardIndexNum].answer
        this.wrapEvt("answerBox", this.answerStr)
        this.showAnser = false
      } else {
        this.questionStr = JSON.parse(localStorage.getItem('questionAnswer'))[this.cardIndexNum].question
        this.answerStr = JSON.parse(localStorage.getItem('questionAnswer'))[this.cardIndexNum].answer
        this.showAnser = true
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
      // 名字数据存入localStorage
      let nameNewArr = []
      data.name.forEach(it=>{
        nameNewArr.push(it.name)
      })
      localStorage.setItem('nameData', JSON.stringify(nameNewArr))
      // 礼物数据存入localStorage
      localStorage.setItem('prizeList', JSON.stringify(data.prize))
      let prizeNewArr = []
      data.prize.forEach(it=>{
        prizeNewArr.push(it.prize)
      })
      localStorage.setItem('prizeData', JSON.stringify(prizeNewArr))
      // 问题数据存入localStorage
      localStorage.setItem('questionAnswer', JSON.stringify(data.question))
      let questionNewArr = []
      data.question.forEach(it=>{
        questionNewArr.push(it.question)
      })
      localStorage.setItem('questionData', JSON.stringify(questionNewArr))
      // 名字数据存入localStorage
      // 赋值标题
      data.title.forEach(it=>{
        localStorage.setItem('title', JSON.stringify(it.title))
        this.title = JSON.parse(localStorage.getItem('title'))
      })
    },

    // 开始抽奖
    startLotteryEvt() {
      // 抽姓名判断奖池还有姓名吗，题目，奖品同理
      if (this.drawName) {
        if (this.lotteryDrawData.length == 0) {
          this.$message({
            message: '没有更多数据，请重新上传',
            type: 'warning'
          });
          this.drawNameAbled = false
          this.drawQuestionAbled = false
          this.drawPrizeAbled = false
          this.uploadAbled = false
          this.startLotteryAbled = true
          localStorage.removeItem('nameData')
          return
        } else {
          // 判断是否为第一次抽奖,如果不是第一次抽奖，就把开始按钮置灰，停止按钮开启。反之，就开始按钮置灰，启动地球旋转动画标识，并加延时，点太快会出问题
          if (this.nextlotteryDraw) {
            this.startLotteryAbled = true
            setTimeout(() => {
              this.endLotteryAbled = false
            }, 1000);
          } else {
            this.startLotteryAbled = true
            this.rotateAnimate = true
          }
          // 开始抽奖，置灰抽姓名题目奖品,上传表格按钮
          this.drawNameAbled = true
          this.drawQuestionAbled = true
          this.drawPrizeAbled = true
          this.uploadAbled = true
        }
      } else if (this.drawQuestion) {
        if (this.questionAnswer.length == 0) {
          this.$message({
            message: '没有更多数据，请重新上传',
            type: 'warning'
          });
          this.drawNameAbled = false
          this.drawQuestionAbled = false
          this.drawPrizeAbled = false
          this.uploadAbled = false
          this.startLotteryAbled = true
          localStorage.removeItem('questionData')
          return
        } else {
          // 判断是否为第一次抽奖,如果不是第一次抽奖，就把开始按钮置灰，停止按钮开启。反之，就开始按钮置灰，启动地球旋转动画标识，并加延时，点太快会出问题
          if (this.nextlotteryDraw) {
            this.startLotteryAbled = true
            setTimeout(() => {
              this.endLotteryAbled = false
            }, 1000);
          } else {
            this.startLotteryAbled = true
            this.rotateAnimate = true
          }
          // 开始抽奖，置灰抽姓名题目奖品,上传表格按钮
          this.drawNameAbled = true
          this.drawQuestionAbled = true
          this.drawPrizeAbled = true
          this.uploadAbled = true
        }
      } else if (this.drawPrize) {
        if (this.newPrizeList.length == 0) {
          this.$message({
            message: '没有更多数据，请重新上传',
            type: 'warning'
          });
          this.drawNameAbled = false
          this.drawQuestionAbled = false
          this.drawPrizeAbled = false
          this.uploadAbled = false
          this.startLotteryAbled = true
          localStorage.removeItem('prizeList')
          return
        } else {
          // 判断是否为第一次抽奖,如果不是第一次抽奖，就把开始按钮置灰，停止按钮开启。反之，就开始按钮置灰，启动地球旋转动画标识，并加延时，点太快会出问题
          if (this.nextlotteryDraw) {
            this.startLotteryAbled = true
            setTimeout(() => {
              this.endLotteryAbled = false
            }, 1000);
          } else {
            this.startLotteryAbled = true
            this.rotateAnimate = true
          }
          // 开始抽奖，置灰抽姓名题目奖品,上传表格按钮
          this.drawNameAbled = true
          this.drawQuestionAbled = true
          this.drawPrizeAbled = true
          this.uploadAbled = true
        }
      }
      this.spheres()
    },
    // 停止抽取
    endLotteryEvt() {
      // 停止抽奖，抽姓名题目奖品，上传表格按钮可点
      this.drawNameAbled = false
      this.drawQuestionAbled = false
      this.drawPrizeAbled = false
      this.uploadAbled = false
      // 停止抽奖按钮置灰，开始抽奖按钮可点，开启第二次抽奖标识
      this.endLotteryAbled = true
      setTimeout(() => {
        this.startLotteryAbled = false
        this.nextlotteryDraw = true
      }, 1000);

      // 抽姓名
      if (this.drawName) {
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
          this.lotteryDrawData = JSON.parse(JSON.stringify(this.lotteryDrawData.filter(item => {
            return item.name != this.lotteryDrawData[cardNum].name
          })))
        }

        // 存数据进历史数据
        this.cardIndex.forEach(it => {
          this.historyData.push({ category: '姓名：', content: this.tableData[it].name })
        })
        localStorage.setItem('history', JSON.stringify(this.historyData))
        this.historyData = JSON.parse(localStorage.getItem('history'))
        // 抽题目
      } else if (this.drawQuestion) {
        // 抽取随机数
        var cardNum = Math.round((Math.random() * (this.questionAnswer.length - 1)))
        // 通过题目池里的题目去tabData数组里面，匹配下标
        var tableDataIndex = this.tableData.findIndex(it => {
          return it.name == this.questionAnswer[cardNum].question
        })
        // 通过下标，展示抽中卡片
        this.cardIndex = [tableDataIndex]
        // 点击展示对应题目及答案
        this.cardIndexNum = tableDataIndex
        // 删除题目答案池选中的题目
        this.questionAnswer = JSON.parse(JSON.stringify(this.questionAnswer.filter(item => {
          return item.question != this.questionAnswer[cardNum].question
        })))

        // 存数据进历史数据
        this.historyData.push({ category: '题目：', content: JSON.parse(localStorage.getItem('questionAnswer'))[this.cardIndexNum].question })
        localStorage.setItem('history', JSON.stringify(this.historyData))
        this.historyData = JSON.parse(localStorage.getItem('history'))

        // 抽奖品
      } else if (this.drawPrize) {
        // 抽取随机数
        var cardNum = Math.round((Math.random() * (this.newPrizeList.length - 1)))
        // 通过奖品池里的奖品去tabData数组里面，匹配下标
        var tableDataIndex = this.tableData.findIndex(it => {
          return it.name == this.newPrizeList[cardNum]
        })
        // 通过下标，展示抽中卡片
        this.cardIndex = [tableDataIndex]

        // 删除题目答案池选中的奖品
        this.newPrizeList.splice(cardNum, 1)
        this.prizeName = this.tableData[tableDataIndex].name
        // 存数据进历史数据
        this.historyData.push({ category: '奖品：', content: this.tableData[tableDataIndex].name })
        localStorage.setItem('history', JSON.stringify(this.historyData))
        this.historyData = JSON.parse(localStorage.getItem('history'))
      }

    },
    // 生成以奖品数量为个数的新数组
    newPrizeListEvt() {
      this.newPrizeList = []
      this.prizeList = JSON.parse(localStorage.getItem('prizeList'))
      this.prizeList && this.prizeList.forEach((it) => {
        this.newPrizeList = this.newPrizeList.concat(Array(it.num).fill(it.prize));
      });
    },

    // 清空历史记录
    clearHistoryEvt() {
      localStorage.removeItem('history')
      this.historyData = []
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
        // this.$message({
        //   message: '请导入数组类型数据',
        //   type: 'warning'
        // });
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
                name: list[i],
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
                name: list[i],
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
        // this.$message({
        //   message: '请导入数组类型数据',
        //   type: 'warning'
        // });
      }
    },
    animateStop() {
      if (this.rotateAnimate) {
        this.endLotteryAbled = false
        this.startLotteryAbled = true
      } else {
        this.startLotteryAbled = false
        this.endLotteryAbled = true
      }
    },
  }
}
</script>

<style lang="scss" scpoed>
::-webkit-scrollbar {
  display: none;
}

.about {

  .titleBox {
    position: absolute;
    text-align: center;
    width: 100%;
    z-index: 20;
    color: #FCD206;

    .title {
      margin-top: 8px;
      font-size: 42px;
    }

    .titleImg {
      background: url('../assets/images/title.png') no-repeat center center;
      background-size: 100% 100%;
      height: 40px;
      margin: 0px 20px;
    }
  }


  .leftArea {
    position: absolute;
    height: 460px;
    width: 218px;
    z-index: 20;
    left: 30px;
    top: 124px;
    padding: 20px 16px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background-color: rgba(255, 171, 117, .2);

    .lotteryDraw {
      .switchBox {
        display: flex;
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        .switchTitle {
          margin-right: 28px;
        }
      }

      .drawNameBox {
        display: flex;
        align-items: center;
        width: 220px;
        margin-bottom: 20px;

        .el-switch {
          margin-left: 10px;
        }
      }

      .drawQuestionBox {
        display: flex;
        width: 220px;
        margin-bottom: 20px;
        align-items: center;
      }

      .drawPrizeBox {
        display: flex;
        width: 220px;
        margin-bottom: 20px;
        align-items: center;
      }

      .el-button--primary {
        padding: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        flex-wrap: nowrap;
        background-color: rgba(255, 103, 0, 0.62);
        border: 1px solid rgba(255, 103, 0, 0.62);
        color: #fff;
        width: 130px;
        height: 40px;
        box-sizing: border-box;
      }

      .el-button.is-disabled {
        background-color: rgba(141, 153, 153, 0.37);
        border: 1px solid rgba(232, 242, 242, 0.25);
        color: rgba(170, 182, 182, 0.75);
      }

    }

    .uploadBox {
      .el-button--primary {
        padding: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        flex-wrap: nowrap;
        background-color: rgba(255, 103, 0, 0.62);
        border: 1px solid rgba(255, 103, 0, 0.62);
        color: #fff;
        width: 130px;
        height: 40px;
        box-sizing: border-box;
        margin-bottom: 20px;
      }

      .el-button.is-disabled {
        background-color: rgba(141, 153, 153, 0.37);
        border: 1px solid rgba(232, 242, 242, 0.25);
        color: rgba(170, 182, 182, 0.75);
      }
    }

    .startEnd {
      display: flex;

      .el-button--primary {
        padding: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        flex-wrap: nowrap;
        background-color: rgba(255, 103, 0, 0.62);
        border: 1px solid rgba(255, 103, 0, 0.62);
        color: #fff;
        width: 90px;
        height: 40px;
        box-sizing: border-box;
        margin-right: 20px;
      }

      .el-button.is-disabled {
        background-color: rgba(141, 153, 153, 0.37);
        border: 1px solid rgba(232, 242, 242, 0.25);
        color: rgba(170, 182, 182, 0.75);
        width: 90px;
        height: 40px;
      }
    }
  }

  .rightArea {
    position: absolute;
    width: 218px;
    z-index: 20;
    right: 30px;
    top: 124px;
    padding: 20px 16px;
    border-radius: 6px;
    background-color: rgba(255, 171, 117, .2);
    font-size: 14px;
    text-align: left;
    color: rgb(253, 181, 2);

    .topAreaText {
      height: 26px;
      position: sticky;
      top: 0;
    }

    .bottomArea {
      height: 434px;
      overflow: auto;

      .historyBox {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 10px;
        color: #fff;
      }
    }

  }

  .seldrawNameBox {
    width: 220px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .el-button--primary {
      border: 1px solid rgba(243, 74, 40, 0.662) !important;
      background-color: rgba(252, 210, 6) !important;
      color: rgba(237, 28, 36) !important;
    }

    .el-switch {
      margin-left: 10px;
    }

  }

  .selDrawQuestionBox {
    display: flex;
    align-items: center;
    width: 220px;
    margin-bottom: 20px;

    .el-button--primary {
      border: 1px solid rgba(252, 210, 6) !important;
      background-color: rgba(252, 210, 6) !important;
      color: rgba(237, 28, 36) !important;
    }
  }

  .selDrawPrizeBox {
    display: flex;
    align-items: center;
    width: 220px;
    margin-bottom: 20px;

    .el-button--primary {
      border: 1px solid rgba(252, 210, 6) !important;
      background-color: rgba(252, 210, 6) !important;
      color: rgba(237, 28, 36) !important;
    }
  }

  .el-dialog {
    background-color: rgba(255, 103, 0, 0.8);
    border: 1px solid rgba(255, 103, 0, 0.8);
    color: #fff;
    min-height: 350px;
  }

  .el-dialog__headerbtn {
    top: 10px;
    background-color: unset;
  }

  .el-dialog__body {
    padding: 0px 30px;
    color: unset;
    font-size: 24px;
    text-align: left;
  }

  .el-dialog__footer {
    text-align: left;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }

  .el-dialog__close:hover {
    color: #fff;
  }
  .questionBox{
    border-bottom: 1px solid #fff;
    margin-bottom: 30px;
  }
  .answerBox {
    line-height: 10px;
  }



}
</style>
