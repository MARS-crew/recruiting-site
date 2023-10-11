const movingTextLeft = document.querySelector('.moving-text-left');
const movingTextCenter = document.querySelector('.moving-text-center');
const movingTextRight = document.querySelector('.moving-text-right');
const titleText = document.querySelector('.title');
const introduceTextLeft = document.querySelector('.container');
const introduceTextCenter = document.querySelector('.body-text-center');
const introduceTextRight = document.querySelector('.body-text-right');

introduceTextLeft.style.display = 'none';
introduceTextCenter.style.display = 'none';
introduceTextRight.style.display = 'none';

// 우리는
gsap.fromTo(
    movingTextLeft, 
    { x: -100, opacity: 1 }, 
    { x: 450, opacity: 1, duration: 3, ease: 'power2.out' }
  );

  movingTextLeft.addEventListener('click', () => {
    titleText.style.display = 'none';
    movingTextCenter.style.display = 'none';
    movingTextRight.style.display = 'none';

    introduceTextLeft.style.display = 'block';

    gsap.to(movingTextLeft, {
      x: 650,
      y: -200,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    });
  });

// 어디서
gsap.fromTo(
    movingTextCenter, 
    { x: 650, y: 100, opacity: 1 },
    { x: 650, y: 0, opacity: 1, duration: 3, ease: 'power2.out' }
  );

  movingTextCenter.addEventListener('click', () => {
    titleText.style.display = 'none';
    movingTextLeft.style.display = 'none';
    movingTextRight.style.display = 'none';

    introduceTextCenter.style.display = 'block';

    gsap.to(movingTextCenter, {
      x: 650,
      y: -200,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    });
  });

  // 무엇을 할까
gsap.fromTo(
    movingTextRight, 
    { x: 1200, y: 40, opacity: 1 },
    { x: 850, y: 0, opacity: 1, duration: 3, ease: 'power2.out'}
  );

  movingTextRight.addEventListener('click', () => {
    titleText.style.display = 'none';
    movingTextLeft.style.display = 'none';
    movingTextCenter.style.display = 'none';

    introduceTextRight.style.display = 'block';

    gsap.to(movingTextRight, {
      x: 650,
      y: -200,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    });
  });
  