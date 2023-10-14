const movingTextLeft = document.querySelector('.moving-text-left');
const movingTextCenter = document.querySelector('.moving-text-center');
const movingTextRight = document.querySelector('.moving-text-right');
const titleText = document.querySelector('.title');
const marsImage = document.getElementById('mars');

// 우리는
gsap.fromTo(
    movingTextLeft, 
    { x: '-500%', y: 0, opacity: 1 }, 
    { x: '-20%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' }
  );

  // 우리는 클릭 이벤트
  // movingTextLeft.addEventListener('click', () => {
  // titleText.style.display = 'none';
  // movingTextCenter.style.display = 'none';
  // movingTextRight.style.display = 'none';

  //   //introduceTextLeft.style.display = 'block';

  //   gsap.to(movingTextLeft, {
  //     x: '0%',
  //     y: -250,
  //     opacity: 1,
  //     duration: 2,
  //     fontSize: '65px',
  //     color: 'white',
  //     ease: 'power2.out'
  //   });
  // });

  // 타이틀 텍스트 변환 함수
  function changeTitleText(a) {
    if (a == 0) {
      titleText.innerText = '마스외전으로 놀러와!';
    } else if (a == 1) {
      titleText.innerText = '우리는'; 
    } else if (a == 2) {
      titleText.innerText = '어디서';
    } else if (a == 3) {
      titleText.innerText = '무엇을 할까';
    }
  }

  function clickDisplay() {
    movingTextLeft.style.display = 'none';    
    movingTextCenter.style.display = 'none';
    movingTextRight.style.display = 'none';
  }
  
  // 우리는 클릭 이벤트
  movingTextLeft.addEventListener('click', () => {
    changeTitleText(1);
    clickDisplay();
  });

// 어디서
gsap.fromTo(
  movingTextCenter, 
  { x: '30%', y: 300, opacity: 1 },
  { x: '30%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' }
);

  // 어디서 클릭 이벤트
  // movingTextCenter.addEventListener('click', () => {
  // titleText.style.display = 'none';
  // movingTextLeft.style.display = 'none';
  // movingTextRight.style.display = 'none';

  // //introduceTextCenter.style.display = 'block';
  // movingTextRight.style.fontSize = '65px';
  // movingTextRight.style.color = 'white';

  //   gsap.to(movingTextCenter, {
  //     x: '0%',
  //     y: -250,
  //     opacity: 1,
  //     duration: 2,
  //     ease: 'power2.out'
  //   });
  // });

  // 어디서 클릭 이벤트
  movingTextCenter.addEventListener('click', () => {
    changeTitleText(2);
    clickDisplay();
  });

  // 무엇을 할까
  gsap.fromTo(
    movingTextRight, 
    { x: '400%', y: 40, opacity: 1 },
    { x: '40%', y: 0, opacity: 1, duration: 5, ease: 'power2.out'}
  );

  // 무엇을 할까 클릭 이벤트
  // movingTextRight.addEventListener('click', () => {
  // titleText.style.display = 'none';
  // movingTextLeft.style.display = 'none';
  // movingTextCenter.style.display = 'none';

  // //introduceTextRight.style.display = 'block';
  // movingTextRight.style.fontSize = '65px';
  // movingTextRight.style.color = 'white';

  //   gsap.to(movingTextRight, {
  //     x: '0%',
  //     y: -250,
  //     opacity: 1,
  //     duration: 2,
  //     ease: 'power2.out'
  //   });
  // });

  // 무엇을 할까 클릭 이벤트
  movingTextRight.addEventListener('click', () => {
    changeTitleText(3);
    clickDisplay();
  });


  //화성 이동 애니메이션
  gsap.to(marsImage, {
    y: '200px', 
    duration: 2, 
    delay: 2  
  });
  
  //뒤로 가기
  function goBack() {
    changeTitleText(0);
    movingTextLeft.style.display = 'block';
    movingTextCenter.style.display = 'block';
    movingTextRight.style.display = 'block';
  }