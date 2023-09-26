document.addEventListener('DOMContentLoaded', function () {
  function animateRandomly() {
    gsap.to('.box img', {
      x: () => Math.random() * (window.innerWidth - 100),
      y: () => Math.random() * (window.innerHeight - 100),
      duration: 5,
      onComplete: animateRandomly,
      ease: 'none', // 속도 일정하게 유지
    })
  }

  animateRandomly()
})
