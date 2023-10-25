const sections = document.querySelectorAll('.section')
const marsImg = document.querySelector('#mars')
const lineBox = document.querySelector('.line_box')

let currentSection = 0
let isScrolling = false

/**
 * 스크롤 함수
 * @param {number} index
 */
const scrollToSection = (index) => {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' })
    currentSection = index

    if (currentSection !== 0) {
      marsImg.style.opacity = 0

      return
    }

    marsImg.style.opacity = 1
  }
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

lineBox.addEventListener('click', () => {
  scrollToSection(currentSection + 1)
})

window.addEventListener('wheel', (e) => {
  if (isScrolling) return

  if (e.deltaY > 0) {
    scrollToSection(currentSection + 1)
  }

  if (e.deltaY < 0) {
    scrollToSection(currentSection - 1)
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
