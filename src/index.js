document.addEventListener('DOMContentLoaded', function () {
  function animateRandomly() {
    gsap.to('#man', {
      x: () => Math.random() * (window.innerWidth - 100),
      y: () => Math.random() * (window.innerHeight - 100),
      duration: 5,
      onComplete: animateRandomly,
      ease: 'none',
    })
  }

  animateRandomly()
})
