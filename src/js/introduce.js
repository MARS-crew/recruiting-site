const movingTextLeft = document.querySelector('.moving-text-left')
const movingTextCenter = document.querySelector('.moving-text-center')
const movingTextRight = document.querySelector('.moving-text-right')
const movingTextTop = document.querySelector('.moving-text-top')
const movingTextMiddle = document.querySelector('.moving-text-middle')
const movingTextBottom = document.querySelector('.moving-text-bottom')
const titleText = document.querySelector('.title')
const marsImage = document.getElementById('mars')
const isMobile = window.innerWidth <= 767

if (!isMobile) {
  // 타이틀 텍스트 변환 함수
  function changeTitleText(a) {
    if (a == 0) {
      titleText.innerText = '마스외전으로 놀러와!'
    } else if (a == 1) {
      titleText.innerText = '우리는'
    } else if (a == 2) {
      titleText.innerText = '어디서'
    } else if (a == 3) {
      titleText.innerText = '무엇을 할까'
    }
  }

  function clickDisplay() {
    movingTextLeft.style.display = 'none'
    movingTextCenter.style.display = 'none'
    movingTextRight.style.display = 'none'
  }

  // 우리는
  gsap.fromTo(
    movingTextLeft,
    { x: '-500%', y: 0, opacity: 1 },
    { x: '-20%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' },
  )

  // 우리는 클릭 이벤트
  movingTextLeft.addEventListener('click', () => {
    changeTitleText(1)
    clickDisplay()
  })

  // 어디서
  gsap.fromTo(
    movingTextCenter,
    { x: '30%', y: 300, opacity: 1 },
    { x: '30%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' },
  )

  // 어디서 클릭 이벤트
  movingTextCenter.addEventListener('click', () => {
    changeTitleText(2)
    clickDisplay()
  })

  // 무엇을 할까
  gsap.fromTo(
    movingTextRight,
    { x: '400%', y: 40, opacity: 1 },
    { x: '40%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' },
  )

  // 무엇을 할까 클릭 이벤트
  movingTextRight.addEventListener('click', () => {
    changeTitleText(3)
    clickDisplay()
  })

  //화성 이동 애니메이션
  gsap.to(marsImage, {
    y: '200px',
    duration: 2,
    delay: 2,
  })

  //뒤로 가기
  function goBack() {
    changeTitleText(0)
    movingTextLeft.style.display = 'block'
    movingTextCenter.style.display = 'block'
    movingTextRight.style.display = 'block'
  }
}

if (isMobile) {
  //1번째 애니메이션 '우리는'
  gsap.to(movingTextTop, {
    x: '130%', // x축으로 이동할 거리
    y: '-50%', // y축으로 이동할 거리
    duration: 2, // 애니메이션 기간 (초)
    ease: 'power1.inOut', // 이징 함수
  })

  //1번째 애니메이션 '어디서'
  gsap.to(movingTextMiddle, {
    x: '35%', // x축으로 이동할 거리
    y: '185%', // y축으로 이동할 거리
    bezier: {
      type: 'soft', // 곡선 타입 선택 (soft, rough, etc.)
      values: [
        { x: '-20%', y: '0%' }, // 시작 지점
        { x: '100%', y: '-25%' }, // 중간 지점
        { x: '130%', y: '-50%' }, // 끝 지점
      ],
    },
    duration: 2, // 애니메이션 기간 (초)
    ease: 'power1.inOut', // 이징 함수
  })

  // big-circle를 2초 후에 사라지도록 애니메이션 설정
  gsap.to('.big-circle', {
    opacity: 0,
    delay: 2,
    onComplete: () => {
      document.querySelector('.big-circle').style.display = 'none'
    },
  })

  // small-circle를 2초 후에 사라지도록 애니메이션 설정
  gsap.to('.small-circle', {
    opacity: 0,
    delay: 2,
    onComplete: () => {
      document.querySelector('.small-circle').style.display = 'none'
    },
  })

  //2번째 애니메이션 '우리가'
  gsap.to(movingTextTop, {
    x: '125%',
    y: '-40%',
    duration: 2, // 애니메이션 기간 (초)
    ease: 'power1.inOut', // 이징 함수
    delay: 2.5,
  })

  gsap.to(movingTextMiddle, {
    x: '25%',
    y: '30%', // y축으로 이동할 거리
    duration: 2, // 애니메이션 기간 (초)
    ease: 'power1.inOut', // 이징 함수
    delay: 2.5,
  })

  gsap.to(movingTextBottom, {
    x: '-60%', // x축으로 이동할 거리
    y: '100%', // y축으로 이동할 거리
    bezier: {
      type: 'soft', // 곡선 타입 선택 (soft, rough, etc.)
      values: [
        { x: '-20%', y: '0%' }, // 시작 지점
        { x: '100%', y: '-25%' }, // 중간 지점
        { x: '130%', y: '-50%' }, // 끝 지점
      ],
    },
    duration: 2, // 애니메이션 기간 (초)
    ease: 'power1.inOut', // 이징 함수
    delay: 2.5,
  })

  gsap.to(marsImage, {
    y: '-60%', // 위로 올라가는 거리
    scale: 2, // 크기를 1.5배로 키움
    duration: 2.5, // 애니메이션 기간
    delay: 3,
    ease: 'power2.out', // 이징 함수
  })

  function clickDisplay() {
    titleText.style.display = 'none'
    movingTextTop.style.display = 'none'
    movingTextMiddle.style.display = 'none'
    movingTextBottom.style.display = 'none'
    marsImage.style.display = 'none'
  }

  // 우리는 클릭 이벤트
  movingTextTop.addEventListener('click', () => {
    clickDisplay()
  })

  // 우리는 클릭 이벤트
  movingTextMiddle.addEventListener('click', () => {
    clickDisplay()
  })

  // 우리는 클릭 이벤트
  movingTextBottom.addEventListener('click', () => {
    clickDisplay()
  })
}
