<template>
  <div class="about">
    <div class="num">
      <button @click="tables">TABLE</button>
      <button @click="spheres">SPHERE</button>
      <button @click="lotterys">转动</button>
      <button @click="resets">复位</button>
    </div>
    <div class="upload">
      <el-switch
        v-model="showXlsx"
      >
      </el-switch>
      <Xlsx v-show="showXlsx" @getResult="getMyExcelData" /> 
    </div>
    <div class="lotteryDraw">
      <div class="repeatBox">
        <div>抽取是否可重复</div>
        <el-switch
        v-model="repeat"
      >
      </el-switch>
      </div>
      <el-button type="primary" @click="lotteryNameEvt">随机抽取名字</el-button>
      <el-button type="primary" @click="lotteryNameStopEvt">停止</el-button>
    </div>
    <Threed ref="threed" :table="tableData" :selectedCardIndex="cardIndex"/>
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
        name: 'Hydrogen', // 名称
        x: 1, // x轴位置
        y: 1 //  y轴位置
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 1,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 2,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 3,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 4,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 5,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 6,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 7,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 8,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 8
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 9,
        y: 10
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 1
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 2
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 3
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 4
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 5
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 6
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 7
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 8
      }, {
        name: '王二蛋子',
        x: 10,
        y: 9
      }, {
        name: 'Hydrogen',
        x: 10,
        y: 10
      }],
      cardIndex:[30],
      showXlsx:true,
      repeat:true
    }
  },
  created() {
    if(JSON.parse(localStorage.getItem('nameData')) == null) {
      this.$message({
        message: '请先上传表格数据！',
        type: 'warning'
      });
      return
    }
    this.tableData = this.fromdata(JSON.parse(localStorage.getItem('nameData')))
    
  },
  mounted() {
  },
  methods: {
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

    getMyExcelData (data) {
      // 上传表格
      let newArr = []
      data.forEach(it => {
        newArr.push(it.name)
      });
      localStorage.setItem('nameData',JSON.stringify(newArr))
    },

    // 随机抽取姓名
    lotteryNameEvt() {
      this.spheres()
      this.lotterys()
    },

    // 停止抽取
    lotteryNameStopEvt() {
      // repeat是否可重复抽取
      if(this.repeat) {
        this.cardIndex = [Math.round((Math.random()*this.tableData.length))]
      } else {
        if(this.tableData.length === 0) {
          that.$message({
            message: '没有更多数据',
            type: 'warning'
          });
        } else {
          this.cardIndex = [Math.round((Math.random()*this.tableData.length))]
          this.tableData.splice(this.cardIndex - 1,1)
        }
      }
      // this.stops()
    },
    
    // 数据格式化
    fromdata(list) {
      if(arguments.length==0){
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
}
</style>
