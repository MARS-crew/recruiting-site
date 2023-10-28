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

const content = document.querySelector('.content')
let scrollPosition = 0

// 스크롤 이벤트 리스너 추가
document.querySelector('.scroll-box').addEventListener('scroll', function () {
  const scrollTop = this.scrollTop
  const scrollHeight = this.scrollHeight - this.clientHeight

  // 스크롤 위치를 퍼센트로 계산
  const scrollPercentage = (scrollTop / scrollHeight) * 100

  // 서서히 스크롤 이벤트 처리
  content.style.transform = `translateY(-${scrollPercentage}%)`
})

const targetElement = document.querySelector('#four_content')
const scroll = document.querySelector('.scrolling-text')

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scroll.style.animation = 'scrollText 100s linear infinite;' // 애니메이션 시작
    }
  })
})

observer.observe(targetElement)
