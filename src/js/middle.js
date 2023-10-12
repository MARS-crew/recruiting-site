document.addEventListener('DOMContentLoaded', function () {
    function animateRandomly() {
      gsap.to('#man', {
        x: () => Math.random() * (window.innerWidth - 100),
        y: () => Math.random() * (window.innerHeight - 100),
        duration: 15,
        onComplete: animateRandomly,
        ease: 'none',
      })
    }
  
    animateRandomly()
  })
  
  document.addEventListener('DOMContentLoaded', function () {
    let currentSection = 0
    const sections = document.querySelectorAll('.section')
  
    function scrollToSection(index) {
      if (index < 0 || index >= sections.length) return
      console.log(sections[index])
  
      const section = sections[index]
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
  
      currentSection = index
    }
  
    function handleScroll(event) {
      const delta = event.deltaY
      if (delta > 0) {
        scrollToSection(currentSection + 1)
      } else if (delta < 0) {
        scrollToSection(currentSection - 1)
      }
    }
  
    window.addEventListener('wheel', handleScroll)
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
  