<template>
  <div class="threeD">
    <div id="container"></div>
  </div>
</template>

<script>
import * as TWEEN from "@tweenjs/tween.js";
import prizePhoto from "../assets/images/prize.png";
export default {
  name: "threeD",
  data() {
    return {
      rotateOb: "",
      camera: "",
      scene: "",
      renderer: "",
      controls: "",
      objects: [],
      targets: {
        table: [],
        sphere: [],
      },
      Resolution: 1,
      rotate: false,
      anstop: false,
      createTime: 2000, //开始过场动画时间
      spheresTime: 1500, //球型动画时间
      tablesTime: 1500, //表格型动画时间
      showQuestionAnswer: { show: true, questionOrAnswer: "0" }, //展示题目,答案。0代表展示问题，1代表展示答案
      prizeShow: false
    };
  },
  props: {
    table: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedCardIndex: {
      type: Array,
      default() {
        return [];
      },
    },
    problem: {
      type: Boolean,
      default() {
        return false;
      },
    },
    prize: {
      type: Boolean,
      default() {
        return false;
      },
    },
    prizeName: {
      type: String,
      default() {
        return "";
      },
    }
  },
  watch: {
    selectedCardIndex(value) {
      if (value.length > 0) {
        this.stops();
      }
    },
    table(newv, oldV) {
      this.createdThree();
    },
  },
  created() {
  },
  mounted() { },
  methods: {
    createdThree() {
      this.rotateOb = "";
      this.camera = "";
      this.scene = "";
      this.renderer = "";
      this.controls = "";
      this.objects = [];
      this.targets = {
        table: [],
        sphere: [],
      };
      this.Resolution = 1;
      this.init();
      this.animate();
    },
    init() {
      this.camera = new this.$three.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.z = 3000;
      this.scene = new this.$three.Scene();
      // 创建元素
      this.createCard(this.table);
      // 生成table
      for (let i = 0; i < this.table.length; i++) {
        var objects = new this.$three.Object3D();
        // x轴位置
        objects.position.x = this.table[i].x * 240 - 1330;
        // y轴位置
        objects.position.y = -(this.table[i].y * 181) + 990;
        this.targets.table.push(objects);
      }
      // 生成sphere
      var vector = new this.$three.Vector3();
      for (var i = 0, l = this.objects.length; i < l; i++) {
        var phi = Math.acos(-1 + (2 * i) / l);
        var theta = Math.sqrt(l * Math.PI) * phi;
        var object = new this.$three.Object3D();
        object.position.x = 850 * Math.cos(theta) * Math.sin(phi);
        object.position.y = 850 * Math.sin(theta) * Math.sin(phi);
        object.position.z = 850 * Math.cos(phi);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        this.targets.sphere.push(object);
      }
      this.renderer = new this.$three.CSS3DRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
      this.renderer.domElement.style.position = "absolute";
      this.renderer.domElement.style.top = "3rem";
      document
        .getElementById("container")
        .appendChild(this.renderer.domElement);
      this.controls = new this.$three.TrackballControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.rotateSpeed = 0.5;
      this.controls.minDistance = 500;
      this.controls.maxDistance = 6000;
      this.controls.addEventListener("change", this.render);
      this.transform(this.targets.table, this.createTime);
    },
    // 创建元素函数
    createCard(cardList) {
      // 销毁 div 标签下的所有子节点
      document.getElementById("container").innerHTML = "";
      let num = cardList.length;
      let that = this;
      for (let i = 0; i < num; i++) {
        // 创建父元素
        var element = document.createElement("div");
        element.className = "element";
        element.style.backgroundColor =
          "rgba(250,65,45," + (Math.random() * 0.7 + 0.1) + ")";
        // 创建子元素
        var symbol;
        if (this.prize) {
          symbol = document.createElement("div");
          symbol.className = "prize";
          let img = document.createElement("img");
          img.src = prizePhoto;
          img.className="prizeImg"
          symbol.appendChild(img);
        } else {
          symbol = document.createElement("span");
          symbol.className = "symbol";
          symbol.textContent = cardList[i].name;
        }
        element.appendChild(symbol);
        if (this.problem) {
          let showPro = document.createElement("span");
          showPro.className = "problem";
          showPro.textContent = "题目";
          showPro.onclick = function () {
            that.showProblem();
          };
          element.appendChild(showPro);
          let answer = document.createElement("span");
          answer.className = "answer";
          answer.textContent = "答案";
          answer.onclick = function () {
            that.showAnswer();
          };
          element.appendChild(answer);
        }
        var object = new this.$three.CSS3DObject(element);
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        this.scene.add(object);
        this.objects.push(object);
      }
    },
    transform(targets, duration) {
      this.anstop = true;
      TWEEN.removeAll();
      for (var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i];
        var target = targets[i];
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
          .onComplete(() => { });
      }
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
        .onComplete(() => {
          if (this.rotate) {
            this.rotateBall();
          }
          this.anstop = false;
          this.$emit("animateStop");
        });
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.render.setSize(window.innerWidth, window.innerHeight);
      this.render();
    },
    animate() {
      requestAnimationFrame(this.animate);
      TWEEN.update();
      this.controls.update();
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    // 旋转函数
    rotateBall() {
      return new Promise((resolve) => {
        this.scene.rotation.y = 0;
        this.rotateObj = new TWEEN.Tween(this.scene.rotation);
        this.rotateObj
          .to(
            {
              y: Math.PI * 6 * 1000,
            },
            1200 * 1000
          )
          .onUpdate(this.render)
          // .easing(TWEEN.Easing.Linear)
          .start()
          .onStop(() => {
            this.scene.rotation.y = 0;
            resolve();
          })
          .onComplete(() => {
            resolve();
          });
      });
    },
    // 卡牌样式改变
    changeCard(cardIndex, color) {
      const card = this.objects[cardIndex].element;
      if (this.prize) {
        if (this.prizeShow) {
          card.innerHTML = `<div class="symbol">${this.prizeName}</div>`
        } else {
          card.innerHTML = `<div class="prize"><img class="prizeImg" src="${prizePhoto}"></img></div>`
        }
      }
      card.style.backgroundColor =
        color || "rgba(250,65,45," + (Math.random() * 0.7 + 0.1) + ")";
    },
    selectCard(duration = 600) {
      this.rotate = false;
      const width = 240;
      let tag = 0; //控制中将卡牌位置
      const locates = [];
      for (let i = this.selectedCardIndex.length; i > 0; i--) {
        locates.push({
          x: tag * width * this.Resolution,
          y: 0 * this.Resolution,
        });
        tag++;
      }
      this.selectedCardIndex.forEach((cardIndex, index) => {
        this.changeCard(cardIndex, "rgba(255,69,0, 0.95)");
        var object = this.objects[cardIndex];
        new TWEEN.Tween(object.position)
          .to(
            {
              x: locates[index].x,
              y: locates[index].y * this.Resolution,
              z: 2200,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: 0,
              y: 0,
              z: 0,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
        object.element.classList.add("prize");
        tag++;
      });
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
        .onComplete(() => {
          // 动画结束后可以操作
          if (this.rotate) {
            this.selectedCardIndex = [];
            this.rotateBall();
          }
        });
    },
    // 复位函数
    resetCard() {
      const duration = 600;
      this.prizeShow = false
      this.selectedCardIndex.forEach((index) => {
        this.changeCard(index);
        const object = this.objects[index];
        const target = this.targets.sphere[index];
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      });
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
        .onComplete(() => {
          this.selectedCardIndex.forEach((index) => {
            const object = this.objects[index];
            object.element.classList.remove("prize");
          });
          this.rotateBall();
        });
    },
    // 显示表单形状
    tables() {
      if (this.anstop) {
        this.$message({
          message: "请勿多次点击！",
          type: "warning",
        });
        return false;
      }
      this.rotate = false;
      this.transform(this.targets.table, this.tablesTime);
    },
    // 球型显示形状
    spheres() {
      if (this.anstop) {
        this.$message({
          message: "请勿多次点击！",
          type: "warning",
        });
        return false;
      }
      if (this.selectedCardIndex.length != 0) {
        this.resetCard();
      } else {
        this.rotate = true;
        this.transform(this.targets.sphere, this.spheresTime);
      }
    },
    // 停止转动
    stops() {
      this.prizeShow = true
      this.rotateObj.stop();
      this.selectCard();
    },
    // 显示题目
    showProblem() {
      console.log(this.showQuestionAnswer);
      this.showQuestionAnswer.questionOrAnswer = "0";
      this.$emit("showQuestionEvt", this.showQuestionAnswer);
    },
    // 显示答案
    showAnswer() {
      console.log(this.showQuestionAnswer);
      this.showQuestionAnswer.questionOrAnswer = "1";
      this.$emit("showQuestionEvt", this.showQuestionAnswer);
    },
  },
};
</script>

<style lang="scss">
#container {
  width: 100%;
  height: 100%;
}

.element {
  width: 220px;
  height: 160px;
  box-shadow: 0px 0px 15px rgba(255, 207, 16, 0.45);
  border: 2px solid rgba(255, 207, 16, 0.25);
  overflow: hidden;
  display: flex;
  // align-items: center;
  justify-content: center;

  .symbol {
    display: inline-block;
    line-height: 50px;
    height: 100px;
    font-weight: bold;
    font-size: 38px;
    color: rgb(255, 255, 255);
    padding-top: 50px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /*! autoprefixer: on */
    word-break: break-all;
  }

  .problem {
    color: rgba(255, 255, 255, 0.75);
    font-size: 32px;
    position: absolute;
    top: 110px;
    left: -5px;
    right: 0px;
    cursor: pointer;
    display: inline-block;
    width: 100px;
  }

  .answer {
    width: 100px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 32px;
    position: absolute;
    top: 110px;
    right: 0px;
    cursor: pointer;
    display: inline-block;
  }

  .prize {
    display: flex;
    justify-content: center;
    color: rgba(255, 255, 255, 0.75);
    font-size: 80px;
    position: absolute;
    top: 5px;
    left: 10px;
    cursor: pointer;
    display: inline-block;
    padding-left: 50px;
    padding-top: 30px;
  }
  .prizeImg{
    width: 100px;
    height: 100px;
  }
}

.num {
  position: fixed;
  z-index: 20;
}
</style>
