import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js'
import {
  getFirestore,
  doc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyC_EpczWIqfPuPI3NEkZCZXSDbwpxO8Hu4',
  authDomain: 'recruiting-site-7dd38.firebaseapp.com',
  projectId: 'recruiting-site-7dd38',
  storageBucket: 'recruiting-site-7dd38.appspot.com',
  messagingSenderId: '131998017853',
  appId: '1:131998017853:web:dc5a5a95d5075147f9bd54',
  measurementId: 'G-SLCJEG0272',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const sectionOne = document.querySelector('.space_one')
const sectionTwo = document.querySelector('.space_two')
const sectionThree = document.querySelector('.space_three')
const sectionFour = document.querySelector('.space_four')
const sectionFive = document.querySelector('.space_five')
const sectionSix = document.querySelector('.space_six')
const sectionSeven = document.querySelector('.space_seven')

const animateRandomly = () => {
  gsap.to('#man', {
    x: () => Math.random() * (window.innerWidth - 100),
    y: () => Math.random() * (window.innerHeight - 100),
    duration: 7,
    onComplete: animateRandomly,
    ease: 'none',
  })
}

let currentSection = 0

document.addEventListener('DOMContentLoaded', function () {
  animateRandomly()
  const textareas = document.querySelectorAll('textarea')

  textareas.forEach(function (textarea) {
    textarea.addEventListener('input', function () {
      this.style.height = 'auto'
      this.style.height = this.scrollHeight + 'px'
    })
  })

  const sections = document.querySelectorAll('.section')
  const navListItems = document.querySelectorAll('.nav-list li')
  const dotListItems = document.querySelectorAll('.nav_dot li')

  navListItems[0].style.color = '#FFF500'
  navListItems[0].style.fontSize = '24px'
  navListItems[0].style.fontWeight = '700'

  dotListItems[0].querySelector('.front').style.backgroundImage =
    "url('../images/dot_yellow.png')"

  // 각 li 요소에 클릭 이벤트 핸들러 추가
  navListItems.forEach((item) => {
    item.addEventListener('click', handleNavItemClick)
  })

  // 각 li 요소에 클릭 이벤트 핸들러 추가
  dotListItems.forEach((item) => {
    item.addEventListener('click', handleNavItemClick)
  })

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return

    const section = sections[index]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }

    for (let i = 0; i < navListItems.length; i++) {
      navListItems[i].style.color = ''
      navListItems[i].style.fontSize = ''
      navListItems[i].style.fontWeight = ''
    }
    dotListItems.forEach((i) => {
      const dotFront = i.querySelector('.front')
      if (dotFront) {
        dotFront.style.backgroundImage = "url('../images/dot_white.png')"
      }
    })

    if (
      index == 0 ||
      index == 1 ||
      index == 2 ||
      index == 3 ||
      index == 4 ||
      index == 5 ||
      index == 6
    ) {
      changeStyle(index)
      changeDotStyle(index)
    }

    currentSection = index
  }

  function handleScroll(event) {
    event.preventDefault()
    const delta = event.deltaY
    if (delta > 0) {
      scrollToSection(currentSection + 1)
    } else if (delta < 0) {
      scrollToSection(currentSection - 1)
    }

    switch (currentSection) {
      case 0:
        sectionOne.style.animation = 'zoom 10s infinite'
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
        break

      case 1:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = 'zoom 10s infinite'
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
        break
      case 2:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = 'zoom 10s infinite'
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
        break
      case 3:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = 'zoom 10s infinite'
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
      case 4:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = 'zoom 10s infinite'
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
      case 5:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = 'zoom 10s infinite'
        sectionSeven.style.animation = ''
      case 6:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = 'zoom 10s infinite'
        break
    }
  }

  window.addEventListener('wheel', handleScroll, { passive: false })

  const changeStyle = (index) => {
    navListItems[index].style.color = '#FFF500'
    navListItems[index].style.fontSize = '24px'
    navListItems[index].style.fontWeight = '700'
  }

  const changeDotStyle = (index) => {
    dotListItems[index].querySelector('.front').style.backgroundImage =
      "url('../images/dot_yellow.png')"
  }

  const confirmButtons = document.querySelectorAll('input[type="button"]')
  if (confirmButtons) {
    confirmButtons.forEach((button) => {
      button.addEventListener('click', handleConfirmButtonClick)
    })
  }

  function handleConfirmButtonClick() {
    scrollToSection(currentSection + 1)
  }

  function handleNavItemClick(event) {
    const sectionId = event.currentTarget.getAttribute('data-section')
    const index = Array.from(navListItems).findIndex(
      (item) => item.getAttribute('data-section') === sectionId,
    )

    switch (index) {
      case 0:
        sectionOne.style.animation = 'zoom 10s infinite'
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
        break

      case 1:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = 'zoom 10s infinite'
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
        break
      case 2:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = 'zoom 10s infinite'
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
        break
      case 3:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = 'zoom 10s infinite'
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
      case 4:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = 'zoom 10s infinite'
        sectionSix.style.animation = ''
        sectionSeven.style.animation = ''
      case 5:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = 'zoom 10s infinite'
        sectionSeven.style.animation = ''
      case 6:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        sectionFive.style.animation = ''
        sectionSix.style.animation = ''
        sectionSeven.style.animation = 'zoom 10s infinite'
        break
    }

    scrollToSection(index)
  }
})

window.onload = () => {
  sectionOne.style.animation = 'zoom 10s infinite'
}

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} number
 * @property {string} generation
 * @property {string[]} type
 * @property {string} introduce
 * @property {string} reason
 * @property {string} comment
 */

/**
 *
 * @param {User} param0
 * @returns
 */
const save = async ({
  name,
  number,
  generation,
  type,
  introduce,
  reason,
  comment,
}) => {
  if (name === '') {
    alert('이름을 입력해주세요!')
    currentSection = -1
    return
  }

  if (number === '') {
    alert('전화번호를 입력해주세요!')
    currentSection = 0
    return
  }

  if (generation < 1) {
    alert('지원 분야를 1개 이상 선택해주세요!')
    currentSection = 2
    return
  }

  if (introduce === '') {
    alert('자기 소개를 적어주세요')
    currentSection = 2
    return
  }

  if (reason === '') {
    alert('지원 동기를 적어주세요')
    currentSection = 3
    return
  }

  try {
    await setDoc(doc(db, 'user', name), {
      name,
      number,
      generation,
      type,
      introduce,
      reason,
      comment,
    })

    alert('마스외전 5기 모집 지원에 성공했습니다!')
    window.location.href = '../index.html'
  } catch (error) {
    console.log('ERROR : ', error)
    alert('오류가 발생하였습니다. 관리자에게 문의해주세요.')
  }
}

document.querySelector('.sub').addEventListener('click', () => {
  const name = document.querySelector('.input_name').value
  const number = document.querySelector('.input_number').value
  const type = document.querySelector('.input_generation_member').checked
    ? 'MEMBER'
    : 'SIDE'

  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  const generation = []

  checkboxes.forEach((item) => {
    if (item.checked) {
      generation.push(item.id)
    }
  })

  const introduce = document.querySelector('.input_introduce').value
  const reason = document.querySelector('.input_reason').value
  const comment = document.querySelector('.input_comment').value
  const person = {
    name,
    number,
    type,
    generation,
    introduce,
    reason,
    comment,
  }

  save(person)
})

window.onload = () => {
  setTimeout(() => {
    window.scrollTo(0, 0)
    sectionOne.style.animation = 'zoom 10s infinite'
  }, 30)
}

document.documentElement.addEventListener(
  'touchstart',
  (event) => {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  },
  false,
)
