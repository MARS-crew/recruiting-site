document.addEventListener('DOMContentLoaded', function () {
  // #man을 랜덤한 위치로 이동시키는 함수
  function animateRandomly() {
    gsap.to('#man', {
      x: () => Math.random() * (window.innerWidth - 100),
      y: () => Math.random() * (window.innerHeight - 100),
      duration: 7,
      onComplete: animateRandomly,
      ease: 'none',
    })
  }

  animateRandomly()
})

document.addEventListener('DOMContentLoaded', function () {
  let currentSection = 0
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

    scrollToSection(index)
  }

  const manImage = document.querySelector('#man')
  function showManImage() {
    if (manImage) {
      manImage.style.display = 'block'
    }
  }

  function hideManImage() {
    if (manImage) {
      manImage.style.display = 'none'
    }
  }
})

document.addEventListener('DOMContentLoaded', function () {
  const DEFAULT_HEIGHT = 1 // textarea 기본 height
  const textareas = document.querySelectorAll('textarea')

  textareas.forEach(function (textarea) {
    textarea.addEventListener('input', function () {
      this.style.height = 'auto'
      this.style.height = this.scrollHeight + 'px'
    })
  })
})

/**
 * A + B를 리턴하는 함수
 * @param {number} a
 * @param {number} b
 * @returns number
 */
const add = (a, b) => {
  return a + b
}
