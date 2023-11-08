document.addEventListener('DOMContentLoaded', function () {
  let currentSection = 0
  const sections = document.querySelectorAll('.section-middle')

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
