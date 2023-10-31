const content = document.querySelector('.content')
const targetElement = document.querySelector('.start_point')
const scroll = document.querySelector('.scrolling-text')
const end = document.querySelector('.stop_point')

let scrollPosition = 0

// window.addEventListener('DOMContentLoaded', function () {
//   const sections = Array.from(document.querySelectorAll('.hidden'))
//   const animationDuration = 10000 // 각 섹션의 애니메이션 지속 시간 (밀리초)
//   let currentIndex = 0 // 현재 활성화된 섹션의 인덱스

//   function scrollToNextSection() {
//     if (currentIndex >= sections.length) {
//       return // 모든 섹션을 이미 처리한 경우 종료
//     }

//     const currentSection = sections[currentIndex]
//     currentSection.classList.add('active') // 섹션을 활성화 (보이도록)합니다.

//     // 이전 섹션을 비활성화 (숨김)합니다.
//     if (currentIndex > 0) {
//       sections[currentIndex - 1].classList.remove('active')
//     }

//     // 다음 섹션으로 스크롤 애니메이션을 적용합니다.
//     const sectionOffsetTop = currentSection.offsetTop
//     const scrollDistance = sectionOffsetTop - window.scrollY
//     const framesPerSecond = 60
//     const totalFrames = (animationDuration / 1000) * framesPerSecond
//     const scrollStep = scrollDistance / totalFrames

//     let currentFrame = 0
//     const scrollInterval = setInterval(function () {
//       if (currentFrame >= totalFrames) {
//         // 애니메이션 종료 후 다음 섹션으로 이동
//         currentIndex++
//         scrollToNextSection()
//         clearInterval(scrollInterval)
//       } else {
//         window.scrollBy(0, scrollStep)
//         currentFrame++
//       }
//     }, 1000 / framesPerSecond)
//   }

//   // 첫 번째 섹션을 활성화하고 애니메이션을 시작합니다.
//   sections[0].classList.add('active')
//   scrollToNextSection()
// })

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
      }, 1500)
    }
  })
})

observer.observe(targetElement)
observerEnd.observe(end)
