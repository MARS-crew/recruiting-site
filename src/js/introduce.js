const movingTextLeft = document.querySelector('.moving-text-left');
const movingTextCenter = document.querySelector('.moving-text-center');
const movingTextRight = document.querySelector('.moving-text-right');

// 우리는
gsap.fromTo(
    movingTextLeft, // 애니메이션을 적용할 요소 선택자
    { x: -100, opacity: 0 }, // 시작 위치 및 초기 상태
    { x: 250, opacity: 1, duration: 3, ease: 'power2.out' } // 종료 위치 및 애니메이션 속성
  );

// 어디서
gsap.fromTo(
    movingTextCenter, 
    { x: 500, y: 100, opacity: 0 },
    { x: 500, y: 0, opacity: 1, duration: 3, ease: 'power2.out' }
  );

  // 무엇을 할까
gsap.fromTo(
    movingTextRight, 
    { x: 1000, opacity: 0 },
    { x: 750, opacity: 1, duration: 3, ease: 'power2.out'}
  );
  