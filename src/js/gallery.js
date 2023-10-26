let iteration = 0

const spacing = 0.06
const snap = gsap.utils.snap(spacing)
const cards = gsap.utils.toArray('.cards li')
const seamlessLoop = buildSeamlessLoop(cards, spacing)
const scrub = gsap.to(seamlessLoop, {
  totalTime: 0,
  duration: 0.5,
  ease: 'power3',
  paused: true,
})

function isMobileDevice() {
  const viewportWidth = window.innerWidth

  if (viewportWidth <= 768) {
    return true
  } else {
    return false
  }
}

function scrubTo(totalTime) {
  let progress =
    (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration()
  if (progress > 1) {
    wrapForward()
  } else {
    scrub.vars.totalTime = totalTime
    scrub.invalidate().restart()
  }
}

document.querySelector('.next').addEventListener('click', () => {
  scrubTo(scrub.vars.totalTime + spacing)
})

document.querySelector('.prev').addEventListener('click', () => {
  scrubTo(scrub.vars.totalTime - spacing)
})

function buildSeamlessLoop(items, spacing) {
  let overlap = Math.ceil(1 / spacing)
  let startTime = items.length * spacing + 0.5
  let loopTime = (items.length + overlap) * spacing + 1
  let rawSequence = gsap.timeline({ paused: true })
  let seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat() {
      this._time === this._dur && (this._tTime += this._dur - 0.01)
    },
  })
  let l = items.length + overlap * 2
  let time = 0
  let i
  let index
  let item

  gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 })

  for (i = 0; i < l; i++) {
    index = i % items.length
    item = items[index]
    time = i * spacing
    rawSequence
      .fromTo(
        item,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 100,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.in',
          immediateRender: false,
        },
        time,
      )
      .fromTo(
        item,
        { xPercent: isMobileDevice() ? 100 : 400 },
        {
          xPercent: isMobileDevice() ? -100 : -400,
          duration: 1,
          ease: 'none',
          immediateRender: false,
        },
        time,
      )
    i <= items.length && seamlessLoop.add('label' + i, time)
  }

  rawSequence.time(startTime)
  seamlessLoop
    .to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: 'none',
    })
    .fromTo(
      rawSequence,
      { time: overlap * spacing + 1 },
      {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: 'none',
      },
    )
  return seamlessLoop
}
