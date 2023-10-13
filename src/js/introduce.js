const movingTextLeft = document.querySelector('.moving-text-left');
const movingTextCenter = document.querySelector('.moving-text-center');
const movingTextRight = document.querySelector('.moving-text-right');
const titleText = document.querySelector('.title');
const marsImage = document.getElementById('mars');
// const introduceTextLeft = document.querySelector('.container');
// const introduceTextCenter = document.querySelector('.body-text-center');
// const introduceTextRight = document.querySelector('.body-text-right');



// 우리는
gsap.fromTo(
    movingTextLeft, 
    { x: '-500%', y: 0, opacity: 1 }, 
    { x: '-20%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' }
  );

    //우리는 클릭 이벤트
    movingTextLeft.addEventListener('click', () => {
    titleText.style.display = 'none';
    movingTextCenter.style.display = 'none';
    movingTextRight.style.display = 'none';

    //introduceTextLeft.style.display = 'block';

    gsap.to(movingTextLeft, {
      x: '10%',
      y: -250,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    });
  });

// 어디서
gsap.fromTo(
    movingTextCenter, 
    { x: '30%', y: 300, opacity: 1 },
    { x: '50%', y: 0, opacity: 1, duration: 5, ease: 'power2.out' }
  );

  //어디서 클릭 이벤트
  movingTextCenter.addEventListener('click', () => {
    titleText.style.display = 'none';
    movingTextLeft.style.display = 'none';
    movingTextRight.style.display = 'none';

    //introduceTextCenter.style.display = 'block';

    gsap.to(movingTextCenter, {
      x: '10%',
      y: -250,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    });
  });

  // 무엇을 할까
gsap.fromTo(
    movingTextRight, 
    { x: '400%', y: 40, opacity: 1 },
    { x: '60%', y: 0, opacity: 1, duration: 5, ease: 'power2.out'}
  );

  //무엇을 할까 클릭 이벤트
  movingTextRight.addEventListener('click', () => {
    titleText.style.display = 'none';
    movingTextLeft.style.display = 'none';
    movingTextCenter.style.display = 'none';

    //introduceTextRight.style.display = 'block';

    gsap.to(movingTextRight, {
      x: '10%',
      y: -250,
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    });
  });


  //화성 이동 애니메이션
  gsap.to(marsImage, {
    y: '200px', 
    duration: 2, 
    delay: 2  
  });
  
  //뒤로 가기
  function goBack() {
    titleText.style.display = 'block';
    movingTextLeft.style.display = 'block';
    movingTextCenter.style.display = 'block';
    movingTextRight.style.display = 'block';
    
    // 각 섹션의 정보를 초기 상태로 돌림
    // introduceTextLeft.style.display = 'none';
    // introduceTextCenter.style.display = 'none';
    // introduceTextRight.style.display = 'none';
  
    // 각 텍스트를 초기 위치로 이동
    gsap.to(movingTextLeft, { x: '-30%', y: 0, opacity: 1, duration: 3, ease: 'power2.out'});
    gsap.to(movingTextCenter, { x: '50%', y: 0, opacity: 1, duration: 3, ease: 'power2.out'});
    gsap.to(movingTextRight, { x: '70%', y: 0, opacity: 1, duration: 3, ease: 'power2.out'});
  }