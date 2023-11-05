const content = document.querySelector('.content')
const targetElement = document.querySelector('.start_point')
const scroll = document.querySelector('.scrolling-text')
const end = document.querySelector('.stop_point')
const lineLastImage = document.querySelector('.line_four :first-child')
let animationPaused

window.document.addEventListener('DOMContentLoaded', () => {
  scroll.style.animationPlayState = 'paused'
  animationPaused = true
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        scroll.style.animationPlayState = 'running'
        animationPaused = false
      }, 1000)
    }
  })
})

const observerEnd = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        scroll.style.animationPlayState = 'paused'
        animationPaused = true
        lineLastImage.src = './images/svg/top.svg'
      }, 1500)
    }
  })
})

observer.observe(targetElement)
observerEnd.observe(end)

lineLastImage.addEventListener('click', () => {
  const imageSrcArr = lineLastImage.src.split('/')
  const imageSrc = imageSrcArr[imageSrcArr.length - 1]

  if (imageSrc === 'down.svg') return

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })

  lineLastImage.src = './images/svg/down.svg'
})
