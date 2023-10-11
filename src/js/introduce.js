const movingTextLeft = document.querySelector('.moving-text-left');
const movingTextCenter = document.querySelector('.moving-text-center');
const movingTextRight = document.querySelector('.moving-text-right');
const titleText = document.querySelector('.content');

movingTextLeft.addEventListener('click', () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: titleText.offsetTop - 100 }, 
    ease: 'power2.out'
  });
});

// 우리는
gsap.fromTo(
    movingTextLeft, // 애니메이션을 적용할 요소 선택자
    { x: -100, opacity: 1 }, // 시작 위치 및 초기 상태
    { x: 450, opacity: 1, duration: 3, ease: 'power2.out' } // 종료 위치 및 애니메이션 속성
  );

// 어디서
gsap.fromTo(
    movingTextCenter, 
    { x: 650, y: 100, opacity: 1 },
    { x: 650, y: 0, opacity: 1, duration: 3, ease: 'power2.out' }
  );

  // 무엇을 할까
gsap.fromTo(
    movingTextRight, 
    { x: 1200, y: 40, opacity: 1 },
    { x: 850, y: 0, opacity: 1, duration: 3, ease: 'power2.out'}
  );
  