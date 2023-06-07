<template>
  <div class="about">
    <div id="container"></div>
    <div class="num">
        <button @click="tables">TABLE</button>
        <button @click="spheres">SPHERE</button>
        <button @click="lotterys">转动</button>
        <button @click="stops">停止</button>
        <button @click="resets">复位</button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import '../utils/CSS3DRenderer'
import '../utils/TrackballControls'
export default {
  name: 'About',
  data () {
    return {
      rotateOb: '',
      table: [
        'H',
        'Hydrogen',
        '1.00794',
        1,
        1,
        'He',
        'Helium',
        '4.002602',
        18,
        1,
        'Li',
        'Lithium',
        '6.941',
        1,
        2,
        'Be',
        'Beryllium',
        '9.012182',
        2,
        2,
        'B',
        'Boron',
        '10.811',
        13,
        2,
        'C',
        'Carbon',
        '12.0107',
        14,
        2,
        'N',
        'Nitrogen',
        '14.0067',
        15,
        2,
        'O',
        'Oxygen',
        '15.9994',
        16,
        2,
        'F',
        'Fluorine',
        '18.9984032',
        17,
        2,
        'Ne',
        'Neon',
        '20.1797',
        18,
        2,
        'Na',
        'Sodium',
        '22.98976...',
        1,
        3,
        'Mg',
        'Magnesium',
        '24.305',
        2,
        3,
        'Al',
        'Aluminium',
        '26.9815386',
        13,
        3,
        'Si',
        'Silicon',
        '28.0855',
        14,
        3,
        'P',
        'Phosphorus',
        '30.973762',
        15,
        3,
        'S',
        'Sulfur',
        '32.065',
        16,
        3,
        'Cl',
        'Chlorine',
        '35.453',
        17,
        3,
        'Ar',
        'Argon',
        '39.948',
        18,
        3,
        'K',
        'Potassium',
        '39.948',
        1,
        4,
        'Ca',
        'Calcium',
        '40.078',
        2,
        4,
        'Sc',
        'Scandium',
        '44.955912',
        3,
        4,
        'Ti',
        'Titanium',
        '47.867',
        4,
        4,
        'V',
        'Vanadium',
        '50.9415',
        5,
        4,
        'Cr',
        'Chromium',
        '51.9961',
        6,
        4,
        'Mn',
        'Manganese',
        '54.938045',
        7,
        4,
        'Fe',
        'Iron',
        '55.845',
        8,
        4,
        'Co',
        'Cobalt',
        '58.933195',
        9,
        4,
        'Ni',
        'Nickel',
        '58.6934',
        10,
        4,
        'Cu',
        'Copper',
        '63.546',
        11,
        4,
        'Zn',
        'Zinc',
        '65.38',
        12,
        4,
        'Ga',
        'Gallium',
        '69.723',
        13,
        4,
        'Ge',
        'Germanium',
        '72.63',
        14,
        4,
        'As',
        'Arsenic',
        '74.9216',
        15,
        4,
        'Se',
        'Selenium',
        '78.96',
        16,
        4,
        'Br',
        'Bromine',
        '79.904',
        17,
        4,
        'Kr',
        'Krypton',
        '83.798',
        18,
        4,
        'Rb',
        'Rubidium',
        '85.4678',
        1,
        5,
        'Sr',
        'Strontium',
        '87.62',
        2,
        5,
        'Y',
        'Yttrium',
        '88.90585',
        3,
        5,
        'Zr',
        'Zirconium',
        '91.224',
        4,
        5,
        'Nb',
        'Niobium',
        '92.90628',
        5,
        5,
        'Mo',
        'Molybdenum',
        '95.96',
        6,
        5,
        'Tc',
        'Technetium',
        '(98)',
        7,
        5,
        'Ru',
        'Ruthenium',
        '101.07',
        8,
        5,
        'Rh',
        'Rhodium',
        '102.9055',
        9,
        5,
        'Pd',
        'Palladium',
        '106.42',
        10,
        5,
        'Ag',
        'Silver',
        '107.8682',
        11,
        5,
        'Cd',
        'Cadmium',
        '112.411',
        12,
        5,
        'In',
        'Indium',
        '114.818',
        13,
        5,
        'Sn',
        'Tin',
        '118.71',
        14,
        5,
        'Sb',
        'Antimony',
        '121.76',
        15,
        5,
        'Te',
        'Tellurium',
        '127.6',
        16,
        5,
        'I',
        'Iodine',
        '126.90447',
        17,
        5,
        'Xe',
        'Xenon',
        '131.293',
        18,
        5,
        'Cs',
        'Caesium',
        '132.9054',
        1,
        6,
        'Ba',
        'Barium',
        '132.9054',
        2,
        6,
        'La',
        'Lanthanum',
        '138.90547',
        4,
        9,
        'Ce',
        'Cerium',
        '140.116',
        5,
        9,
        'Pr',
        'Praseodymium',
        '140.90765',
        6,
        9,
        'Nd',
        'Neodymium',
        '144.242',
        7,
        9,
        'Pm',
        'Promethium',
        '(145)',
        8,
        9,
        'Sm',
        'Samarium',
        '150.36',
        9,
        9,
        'Eu',
        'Europium',
        '151.964',
        10,
        9,
        'Gd',
        'Gadolinium',
        '157.25',
        11,
        9,
        'Tb',
        'Terbium',
        '158.92535',
        12,
        9,
        'Dy',
        'Dysprosium',
        '162.5',
        13,
        9,
        'Ho',
        'Holmium',
        '164.93032',
        14,
        9,
        'Er',
        'Erbium',
        '167.259',
        15,
        9,
        'Tm',
        'Thulium',
        '168.93421',
        16,
        9,
        'Yb',
        'Ytterbium',
        '173.054',
        17,
        9,
        'Lu',
        'Lutetium',
        '174.9668',
        18,
        9,
        'Hf',
        'Hafnium',
        '178.49',
        4,
        6,
        'Ta',
        'Tantalum',
        '180.94788',
        5,
        6,
        'W',
        'Tungsten',
        '183.84',
        6,
        6,
        'Re',
        'Rhenium',
        '186.207',
        7,
        6,
        'Os',
        'Osmium',
        '190.23',
        8,
        6,
        'Ir',
        'Iridium',
        '192.217',
        9,
        6,
        'Pt',
        'Platinum',
        '195.084',
        10,
        6,
        'Au',
        'Gold',
        '196.966569',
        11,
        6,
        'Hg',
        'Mercury',
        '200.59',
        12,
        6,
        'Tl',
        'Thallium',
        '204.3833',
        13,
        6,
        'Pb',
        'Lead',
        '207.2',
        14,
        6,
        'Bi',
        'Bismuth',
        '208.9804',
        15,
        6,
        'Po',
        'Polonium',
        '(209)',
        16,
        6,
        'At',
        'Astatine',
        '(210)',
        17,
        6,
        'Rn',
        'Radon',
        '(222)',
        18,
        6,
        'Fr',
        'Francium',
        '(223)',
        1,
        7,
        'Ra',
        'Radium',
        '(226)',
        2,
        7,
        'Ac',
        'Actinium',
        '(227)',
        4,
        10,
        'Th',
        'Thorium',
        '232.03806',
        5,
        10,
        'Pa',
        'Protactinium',
        '231.0588',
        6,
        10,
        'U',
        'Uranium',
        '238.02891',
        7,
        10,
        'Np',
        'Neptunium',
        '(237)',
        8,
        10,
        'Pu',
        'Plutonium',
        '(244)',
        9,
        10,
        'Am',
        'Americium',
        '(243)',
        10,
        10,
        'Cm',
        'Curium',
        '(247)',
        11,
        10,
        'Bk',
        'Berkelium',
        '(247)',
        12,
        10,
        'Cf',
        'Californium',
        '(251)',
        13,
        10,
        'Es',
        'Einstenium',
        '(252)',
        14,
        10,
        'Fm',
        'Fermium',
        '(257)',
        15,
        10,
        'Md',
        'Mendelevium',
        '(258)',
        16,
        10,
        'No',
        'Nobelium',
        '(259)',
        17,
        10,
        'Lr',
        'Lawrencium',
        '(262)',
        18,
        10,
        'Rf',
        'Rutherfordium',
        '(267)',
        4,
        7,
        'Db',
        'Dubnium',
        '(268)',
        5,
        7,
        'Sg',
        'Seaborgium',
        '(271)',
        6,
        7,
        'Bh',
        'Bohrium',
        '(272)',
        7,
        7,
        'Hs',
        'Hassium',
        '(270)',
        8,
        7,
        'Mt',
        'Meitnerium',
        '(276)',
        9,
        7,
        'Ds',
        'Darmstadium',
        '(281)',
        10,
        7,
        'Rg',
        'Roentgenium',
        '(280)',
        11,
        7,
        'Cn',
        'Copernicium',
        '(285)',
        12,
        7,
        'Uut',
        'Unutrium',
        '(284)',
        13,
        7,
        'Fl',
        'Flerovium',
        '(289)',
        14,
        7,
        'Uup',
        'Ununpentium',
        '(288)',
        15,
        7,
        'Lv',
        'Livermorium',
        '(293)',
        16,
        7,
        'Uus',
        'Ununseptium',
        '(294)',
        17,
        7,
        'Uuo',
        'Ununoctium',
        '(294)',
        18,
        7
      ],
      camera: '',
      scene: '',
      renderer: '',
      controls: '',
      objects: [],
      targets: {
        table: [],
        sphere: [],
        helix: [],
        grid: []
      },
      Resolution: 1,
      selectedCardIndex: [],
      currentLuckys: [['H', 'Hydrogen', 'Hydrogen']]
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  methods: {
    init () {
      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      )
      this.camera.position.z = 3000
      this.scene = new THREE.Scene()
      // 创建元素
      this.createCard(this.table)
      // table
      for (let i = 0; i < this.table.length; i += 5) {
        var objects = new THREE.Object3D()
        objects.position.x = this.table[i + 3] * 140 - 1330
        objects.position.y = -(this.table[i + 4] * 180) + 990
        this.targets.table.push(objects)
      }
      // sphere
      var vector = new THREE.Vector3()
      for (var i = 0, l = this.objects.length; i < l; i++) {
        var phi = Math.acos(-1 + (2 * i) / l)
        var theta = Math.sqrt(l * Math.PI) * phi
        var object = new THREE.Object3D()
        object.position.x = 800 * Math.cos(theta) * Math.sin(phi)
        object.position.y = 800 * Math.sin(theta) * Math.sin(phi)
        object.position.z = 800 * Math.cos(phi)
        vector.copy(object.position).multiplyScalar(2)
        object.lookAt(vector)
        this.targets.sphere.push(object)
      }
      this.renderer = new THREE.CSS3DRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.domElement.style.position = 'absolute'
      document
        .getElementById('container')
        .appendChild(this.renderer.domElement)
      this.controls = new THREE.TrackballControls(
        this.camera,
        this.renderer.domElement
      )
      this.controls.rotateSpeed = 0.5
      this.controls.minDistance = 500
      this.controls.maxDistance = 6000
      this.controls.addEventListener('change', this.render)
      this.transform(this.targets.table, 5000)
    },
    createCard (cardList) {
      for (let i = 0; i < cardList.length; i += 5) {
        // 创建父元素
        var element = document.createElement('div')
        element.className = 'element'
        element.style.backgroundColor =
        'rgba(0,127,127,' + (Math.random() * 0.7 + 0.25) + ')'
        // 创建子元素
        var symbol = document.createElement('div')
        symbol.className = 'symbol'
        symbol.textContent = cardList[i]
        element.appendChild(symbol)
        var object = new THREE.CSS3DObject(element)
        object.position.x = Math.random() * 4000 - 2000
        object.position.y = Math.random() * 4000 - 2000
        object.position.z = Math.random() * 4000 - 2000
        this.scene.add(object)
        this.objects.push(object)
      }
    },
    transform (targets, duration) {
      TWEEN.removeAll()
      for (var i = 0; i < this.objects.length; i++) {
        var object = this.objects[i]
        var target = targets[i]
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
      }
      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
    },
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.render.setSize(window.innerWidth, window.innerHeight)
      this.render()
    },
    animate () {
      requestAnimationFrame(this.animate)
      TWEEN.update()
      this.controls.update()
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    },
    rotateBall () {
      return new Promise((resolve) => {
        this.scene.rotation.y = 0
        this.rotateObj = new TWEEN.Tween(this.scene.rotation)
        this.rotateObj
          .to(
            {
              y: Math.PI * 6 * 1000
            },
            3000 * 1000
          )
          .onUpdate(this.render)
          // .easing(TWEEN.Easing.Linear)
          .start()
          .onStop(() => {
            this.scene.rotation.y = 0
            resolve()
          })
          .onComplete(() => {
            resolve()
          })
      })
    },
    shine (cardIndex) {
      const card = this.objects[cardIndex].element
      card.style.backgroundColor = 'red'
    },
    changeCard (cardIndex) {
      this.shine(cardIndex)
    },
    selectCard (duration = 600) {
      this.rotate = false
      const width = 140
      let tag = -(this.currentLuckys.length - 1) / 2
      const locates = []
      // 计算位置信息, 大于5个分两排显示
      if (this.currentLuckys.length > 5) {
        const yPosition = [-87, 87]
        const l = this.selectedCardIndex.length
        const mid = Math.ceil(l / 2)
        tag = -(mid - 1) / 2
        for (let i = 0; i < mid; i++) {
          locates.push({
            x: tag * width * this.Resolution,
            y: yPosition[0] * this.Resolution
          })
          tag++
        }
        tag = -(l - mid - 1) / 2
        for (let i = mid; i < l; i++) {
          locates.push({
            x: tag * width * this.Resolution,
            y: yPosition[1] * this.Resolution
          })
          tag++
        }
      } else {
        for (let i = this.selectedCardIndex.length; i > 0; i--) {
          locates.push({
            x: tag * width * this.Resolution,
            y: 0 * this.Resolution
          })
          tag++
        }
      }
      this.selectedCardIndex.forEach((cardIndex, index) => {
        this.changeCard(cardIndex, this.currentLuckys[index])
        var object = this.objects[cardIndex]
        new TWEEN.Tween(object.position)
          .to(
            {
              x: locates[index].x,
              y: locates[index].y * this.Resolution,
              z: 2200
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()

        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: 0,
              y: 0,
              z: 0
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()

        object.element.classList.add('prize')
        tag++
      })

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start()
        .onComplete(() => {
          // 动画结束后可以操作
        })
    },
    resetCard (duration = 500) {
      this.selectedCardIndex.forEach((index) => {
        const object = this.objects[index]
        const target = this.targets.sphere[index]
        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()

        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start()
      })

      return new Promise((resolve) => {
        new TWEEN.Tween(this)
          .to({}, duration * 2)
          .onUpdate(this.render)
          .start()
          .onComplete(() => {
            this.selectedCardIndex.forEach((index) => {
              const object = this.objects[index]
              object.element.classList.remove('prize')
            })
            resolve()
          })
      })
    },
    tables () {
      this.transform(this.targets.table, 2000)
    },
    spheres () {
      this.transform(this.targets.sphere, 2000)
    },
    lotterys () {
      this.rotateBall()
    },
    stops () {
      this.selectedCardIndex = [40]
      this.rotateObj.stop()
      this.selectCard()
    },
    resets () {
      this.resetCard()
    }
  }
}
</script>

<style lang="scss">
button {
    color: rgba(127, 255, 255, 0.75);
    background: transparent;
    outline: 1px solid rgba(127, 255, 255, 0.75);
    border: 0px;
    padding: 5px 10px;
    cursor: pointer;
}

button:hover {
    background-color: rgba(0, 255, 255, 0.5);
}

button:active {
    color: #000000;
    background-color: rgba(0, 255, 255, 0.75);
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  text-align: center;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}
.num{
  position: fixed;
  z-index: 20;
}
</style>
