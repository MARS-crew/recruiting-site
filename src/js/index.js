const sections = document.querySelectorAll('.section')
const marsImg = document.querySelector('#mars')
const lineOne = document.querySelector('.line_one')
const lineTwo = document.querySelector('.line_two')
const lineThree = document.querySelector('.line_three')
const sectionOne = document.querySelector('.space_one')
const sectionTwo = document.querySelector('.space_two')
const sectionThree = document.querySelector('.space_three')
const lineTopOne = document.querySelector('.line_top_one')
const lineTopTwo = document.querySelector('.line_top_two')
const lineTopThree = document.querySelector('.line_top_three')
const sectionFour = document.querySelector('.space_four')
const sectionOneMobile = document.querySelector('.space_one_m_img')
const sectionTwoMobile = document.querySelector('.space_two_m_img')
const sectionThreeMobile = document.querySelector('.space_three_m_img')
const sectionFourMobile = document.querySelector('.space_four_m_img')

const isPc = window.innerWidth > 767

let currentSection = 0
let isScrolling = false

/**
 * 스크롤 함수
 * @param {number} index
 */
const scrollToSection = (index) => {
  sections[index].scrollIntoView({ behavior: 'smooth' })
  currentSection = index

  if (currentSection !== 0) {
    if (isPc) {
      marsImg.style.opacity = 0
    }

    return
  }

  marsImg.style.opacity = 1
}

/**
 * 우주인 애니메이션 함수
 */
const animateRandomly = () => {
  gsap.to('#man', {
    x: () => Math.random() * (window.innerWidth - 100),
    y: () => Math.random() * (window.innerHeight - 100),
    duration: 7,
    onComplete: animateRandomly,
    ease: 'none',
  })
}

/**
 * 화성 애니메이션
 */
const animateMars = () => {
  gsap.to('#mars', {
    rotation: 360,
    duration: 180,
    repeat: -1,
    ease: 'linear',
  })
}

lineOne.addEventListener('click', () => {
  if (isPc) {
    sectionOne.style.animation = ''
    sectionTwo.style.animation = 'zoom 10s infinite'
    sectionThree.style.animation = ''
    sectionFour.style.animation = ''
  } else {
    sectionOneMobile.style.animation = ''
    sectionTwoMobile.style.animation = 'zoom 10s infinite'
    sectionThreeMobile.style.animation = ''
    sectionFourMobile.style.animation = ''
  }

  scrollToSection(1)
})

lineTwo.addEventListener('click', () => {
  const lineTwoImage = document.querySelector('.line_two :first-child')
  const imageSrcArr = lineTwoImage.src.split('/')
  const imageSrc = imageSrcArr[imageSrcArr.length - 1]
  if (imageSrc === 'down.svg') {
    if (isPc) {
      sectionOne.style.animation = ''
      sectionTwo.style.animation = ''
      sectionThree.style.animation = 'zoom 10s infinite'
      sectionFour.style.animation = ''
    } else {
      sectionOneMobile.style.animation = ''
      sectionTwoMobile.style.animation = ''
      sectionThreeMobile.style.animation = 'zoom 10s infinite'
      sectionFourMobile.style.animation = ''
    }
    scrollToSection(2)
  }
})

lineThree.addEventListener('click', () => {
  if (isPc) {
    sectionOne.style.animation = ''
    sectionTwo.style.animation = ''
    sectionThree.style.animation = ''
    sectionFour.style.animation = 'zoom 10s infinite'
  } else {
    sectionOneMobile.style.animation = ''
    sectionTwoMobile.style.animation = ''
    sectionThreeMobile.style.animation = ''
    sectionFourMobile.style.animation = 'zoom 10s infinite'
  }

  scrollToSection(3)
})
lineTopOne.addEventListener('click', () => {
  scrollToSection(0)
})

lineTopTwo.addEventListener('click', () => {
  scrollToSection(1)
})

lineTopThree.addEventListener('click', () => {
  scrollToSection(2)
})

window.addEventListener('wheel', (e) => {
  if (isScrolling) return

  if (e.deltaY > 0) {
    scrollToSection(currentSection + 1)
  }

  if (e.deltaY < 0) {
    scrollToSection(currentSection - 1)
  }

  if (isPc) {
    switch (currentSection) {
      case 0:
        sectionOne.style.animation = 'zoom 10s infinite'
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        break

      case 1:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = 'zoom 10s infinite'
        sectionThree.style.animation = ''
        sectionFour.style.animation = ''
        break
      case 2:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = 'zoom 10s infinite'
        sectionFour.style.animation = ''
        break
      case 3:
        sectionOne.style.animation = ''
        sectionTwo.style.animation = ''
        sectionThree.style.animation = ''
        sectionFour.style.animation = 'zoom 10s infinite'
        break
    }
  } else {
    switch (currentSection) {
      case 0:
        sectionOneMobile.style.animation = 'zoom 10s infinite'
        sectionTwoMobile.style.animation = ''
        sectionThreeMobile.style.animation = ''
        sectionFourMobile.style.animation = ''
        break

      case 1:
        sectionOneMobile.style.animation = ''
        sectionTwoMobile.style.animation = 'zoom 10s infinite'
        sectionThreeMobile.style.animation = ''
        sectionFourMobile.style.animation = ''
        break
      case 2:
        sectionOneMobile.style.animation = ''
        sectionTwoMobile.style.animation = ''
        sectionThreeMobile.style.animation = 'zoom 10s infinite'
        sectionFourMobile.style.animation = ''
        break
      case 3:
        sectionOneMobile.style.animation = ''
        sectionTwoMobile.style.animation = ''
        sectionThreeMobile.style.animation = ''
        sectionFourMobile.style.animation = 'zoom 10s infinite'
        break
    }
  }

  isScrolling = true
  setTimeout(() => {
    isScrolling = false
  }, 1000)
})

document.addEventListener('DOMContentLoaded', function () {
  animateRandomly()
  animateMars()
})

window.onload = () => {
  setTimeout(() => {
    window.scrollTo(0, 0)
    sectionOne.style.animatione = 'zoom 10s infinite'
    sectionOneMobile.style.animation = 'zoom 10s infinite'
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
