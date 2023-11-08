const movingTextLeft = document.querySelector('.moving-text-left')
const movingTextCenter = document.querySelector('.moving-text-center')
const movingTextRight = document.querySelector('.moving-text-right')
const movingTextTop = document.querySelector('.moving-text-top')
const movingTextMiddle = document.querySelector('.moving-text-middle')
const movingTextBottom = document.querySelector('.moving-text-bottom')
const titleText = document.querySelector('.title')
const marsImage = document.querySelector('#mars2')
const mobileMarsImage = document.querySelector('#mobile_mars')
const isMobile = window.innerWidth <= 767

const nodeDiv = document.querySelector('.node')
const nodeDivFour = document.querySelector('.node_two')
const nodeDivFive = document.querySelector('.node_three')

const targetElementOne = document.querySelector('.move_we')
const targetElementTwo = document.querySelector('.two-content')
const targetElementThree = document.querySelector('.move_what')
const targetElementMobile = document.querySelector('.animation-container-M')
const targetElementFour = document.querySelector('.move_where')

const lineBox = document.querySelector('.line_two')
const lineImage = document.querySelector('.line_two :first-child')

let isMoveSlider = true
let isMove = true
let isMobileMove = true

const observerOne = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.fromTo(
        targetElementOne,
        { x: '500%', y: 0, opacity: 1 },
        {
          x: '0',
          y: '-500%',
          opacity: 1,
          duration: 3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(targetElementOne, { color: 'white', duration: 1 })
            nodeDiv.style.display = 'block'
            nodeDiv.style.opacity = '0'
            isMoveSlider = false
            setTimeout(function () {
              nodeDiv.style.opacity = '1'
            }, 100)
          },
        },
      )
    }
  })
})

const observerTwo = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!isMove) {
        isMove = true
      }
      nodeDiv.style.display = 'none'
      nodeDiv.style.opacity = '0'
      nodeDivFive.style.display = 'none'
      nodeDivFive.style.opacity = '0'
      nodeDivFour.style.display = 'none'
      nodeDivFour.style.opacity = '0'

      gsap.fromTo(
        movingTextLeft,
        { x: '-500%', y: 0, opacity: 1 },
        { x: '-20%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' },
      )

      gsap.fromTo(
        movingTextCenter,
        { x: '30%', y: 300, opacity: 1 },
        { x: '30%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' },
      )

      gsap.fromTo(
        movingTextRight,
        { x: '400%', y: 40, opacity: 1 },
        {
          x: '40%',
          y: 0,
          opacity: 1,
          duration: 3,
          ease: 'power2.out',
          onComplete: () => {
            isMove = false
          },
        },
      )
    }
  })
})

const observerThree = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.fromTo(
        targetElementThree,
        { x: '100%', y: 0, opacity: 1 },
        {
          x: '0',
          y: '-500%',
          opacity: 1,
          duration: 3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(targetElementThree, { color: 'white', duration: 1 })
            nodeDivFive.style.display = 'block'
            nodeDivFive.style.opacity = '0'
            isMoveSlider = false
            setTimeout(function () {
              nodeDivFive.style.opacity = '1'
            }, 100)
          },
        },
      )
    }
  })
})

const observerFour = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.fromTo(
        targetElementFour,
        { x: '500%', y: 0, opacity: 1 },
        {
          x: '0',
          y: '-500%',
          opacity: 1,
          duration: 3,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(targetElementFour, { color: 'white', duration: 1 })
            nodeDivFour.style.display = 'block'
            nodeDivFour.style.opacity = '0'
            isMoveSlider = false
            setTimeout(function () {
              nodeDivFour.style.opacity = '1'
            }, 100)
          },
        },
      )
    }
  })
})

const observerMobile = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (!isMobileMove) return
      setTimeout(() => {
        gsap.to('.big-circle', {
          rotation: 360,
          duration: 180,
          repeat: -1,
          ease: 'linear',
        })

        gsap.to('.small-circle', {
          rotation: 360,
          duration: 100,
          repeat: -1,
          ease: 'linear',
        })

        //1번째 애니메이션 '우리는'
        gsap.to(movingTextTop, {
          x: '150%',
          y: '-20%',
          duration: 2,
          ease: 'power1.inOut',
        })

        // //1번째 애니메이션 '어디서'
        gsap.to(movingTextMiddle, {
          x: '50%',
          y: '185%',
          bezier: {
            type: 'soft',
            values: [
              { x: '-20%', y: '0%' },
              { x: '100%', y: '-25%' },
              { x: '150%', y: '-50%' },
            ],
          },
          duration: 2,
          ease: 'power1.inOut',
        })

        //2번째 애니메이션 '우리가'
        gsap.to(movingTextTop, {
          x: '150%',
          y: '-40%',
          duration: 2,
          ease: 'power1.inOut',
          delay: 2.5,
        })

        gsap.to(movingTextMiddle, {
          x: '50%',
          y: '30%',
          duration: 2,
          ease: 'power1.inOut',
          delay: 2.5,
        })

        gsap.to(movingTextBottom, {
          x: '-50%',
          y: '100%',
          bezier: {
            type: 'soft',
            values: [
              { x: '-20%', y: '0%' },
              { x: '100%', y: '-25%' },
              { x: '130%', y: '-50%' },
            ],
          },
          duration: 2,
          ease: 'power1.inOut',
          delay: 2.5,
          onComplete: () => {
            setTimeout(() => {
              isMobileMove = false
            }, 1000)
          },
        })

        gsap.to(mobileMarsImage, {
          y: '-50%',
          scale: 1,
          duration: 2.5,
          delay: 3,
          ease: 'power2.out',
        })
      }, 1000)
    }
  })
})

observerOne.observe(targetElementOne)
observerTwo.observe(targetElementTwo)
observerThree.observe(targetElementThree)
observerFour.observe(targetElementFour)
observerMobile.observe(targetElementMobile)

const slide = document.querySelector('.slide')
let slideWidth = slide.clientWidth

const slideItems = document.querySelectorAll('.slide_item')
const maxSlide = slideItems.length

let currSlide = 1

const nextMove = (slide) => {
  currSlide = slide
  if (currSlide <= maxSlide) {
    const offset = slideWidth * (currSlide - 1)
    slideItems.forEach((i) => {
      i.setAttribute('style', `left: ${-offset}px`)
    })

    return
  }
  currSlide--
}

const prevMove = () => {
  currSlide--
  if (currSlide > 0) {
    const offset = slideWidth * (currSlide - 1)
    slideItems.forEach((i) => {
      i.setAttribute('style', `left: ${-offset}px`)
    })

    return
  }

  currSlide++
}

const disabled = () => {
  titleText.style.display = 'none'
  movingTextRight.style.display = 'none'
  movingTextLeft.style.display = 'none'
}

const hideComponent = () => {
  nodeDiv.style.display = 'none'
  nodeDiv.style.opacity = '0'
  nodeDivFive.style.display = 'none'
  nodeDivFive.style.opacity = '0'
  nodeDivFour.style.display = 'none'
  nodeDivFour.style.opacity = '0'
  gsap.to(targetElementOne, {
    x: '500%',
    y: '500%',
    color: '#a2a2a2',
    duration: 1,
  })
  gsap.to(targetElementThree, {
    x: '-100%',
    y: '500%',
    color: '#a2a2a2',
    duration: 1,
  })
  gsap.to(targetElementFour, {
    x: '500%',
    y: '500%',
    color: '#a2a2a2',
    duration: 1,
  })
}

movingTextCenter.addEventListener('click', () => {
  if (isMove) return
  hideComponent()
  lineImage.src = './images/svg/left.svg'
  nextMove(3)
})

movingTextRight.addEventListener('click', () => {
  if (isMove) return
  hideComponent()
  lineImage.src = './images/svg/left.svg'
  nextMove(4)
})

movingTextLeft.addEventListener('click', () => {
  if (isMove) return
  hideComponent()
  lineImage.src = './images/svg/left.svg'
  nextMove(2)
})

/**
 * 화성 애니메이션
 */
const animateMobileMars = () => {
  gsap.to('#mobile_mars', {
    rotation: 360,
    duration: 180,
    repeat: -1,
    ease: 'linear',
  })
}

lineBox.addEventListener('click', () => {
  const lineTwoImage = document.querySelector('.line_two :first-child')
  const imageSrcArr = lineTwoImage.src.split('/')
  const imageSrc = imageSrcArr[imageSrcArr.length - 1]
  if (isMobile) {
    if (imageSrc === 'left.svg') {
      nextMoveMobile(1)
      lineImage.src = './images/svg/down.svg'
    }
  }
  if (isMoveSlider) return

  isMoveSlider = true
  if (imageSrc === 'left.svg') {
    hideComponent()
    nextMove(1)
    lineImage.src = './images/svg/down.svg'
  }
})

window.addEventListener('resize', () => {
  slideWidth = slide.clientWidth
})

// ** Mobile
const slideMobile = document.querySelector('.slide_m')
let slideWidthMobile = slideMobile.clientWidth

const slideItemsMobile = document.querySelectorAll('.slide_item_m')
const maxSlideMobile = slideItemsMobile.length

let currSlideMobile = 1

const nextMoveMobile = (slide) => {
  currSlideMobile = slide
  if (currSlideMobile <= maxSlideMobile) {
    const offset = slideWidthMobile * (currSlideMobile - 1)
    slideItemsMobile.forEach((i) => {
      i.setAttribute('style', `left: ${-offset}px`)
    })

    return
  }
  currSlideMobile--
}

const prevMoveMobile = () => {
  currSlideMobile--
  if (currSlideMobile > 0) {
    const offset = slideWidthMobile * (currSlideMobile - 1)
    slideItemsMobile.forEach((i) => {
      i.setAttribute('style', `left: ${-offset}px`)
    })

    return
  }

  currSlideMobile++
}

document.addEventListener('DOMContentLoaded', function () {
  animateMobileMars()
})

// 우리는 클릭 이벤트
movingTextTop.addEventListener('click', () => {
  lineImage.src = './images/svg/left.svg'
  nextMoveMobile(2)
})

// 어디서 클릭 이벤트
movingTextMiddle.addEventListener('click', () => {
  lineImage.src = './images/svg/left.svg'
  nextMoveMobile(3)
})

// 무엇을 클릭 이벤트
movingTextBottom.addEventListener('click', () => {
  lineImage.src = './images/svg/left.svg'
  nextMoveMobile(4)
})
