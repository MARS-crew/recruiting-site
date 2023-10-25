const sections = document.querySelectorAll('.section')
let currentSection = 0
let isScrolling = false

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: 'smooth' })
    currentSection = index
  }
}

window.addEventListener('wheel', (e) => {
  if (!isScrolling) {
    if (e.deltaY > 0) {
      scrollToSection(currentSection + 1)
    } else if (e.deltaY < 0) {
      scrollToSection(currentSection - 1)
    }
    isScrolling = true
    setTimeout(() => {
      isScrolling = false
    }, 1000)
  }
})

function animateRandomly() {
  gsap.to('#man', {
    x: () => Math.random() * (window.innerWidth - 100),
    y: () => Math.random() * (window.innerHeight - 100),
    duration: 7,
    onComplete: animateRandomly,
    ease: 'none',
  })
}

document.addEventListener('DOMContentLoaded', function () {
  animateRandomly()
})
