(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var content = document.querySelector('.content');
var targetElement = document.querySelector('.start_point');
var scroll = document.querySelector('.scrolling-text');
var end = document.querySelector('.stop_point');
var lineLastImage = document.querySelector('.line_four :first-child');
window.document.addEventListener('DOMContentLoaded', function () {
  scroll.style.animationPlayState = 'paused';
  animationPaused = true;
});
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      setTimeout(function () {
        scroll.style.animationPlayState = 'running';
        animationPaused = false;
      }, 1000);
    }
  });
});
var observerEnd = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      setTimeout(function () {
        scroll.style.animationPlayState = 'paused';
        animationPaused = true;
        lineLastImage.src = './images/svg/top.svg';
      }, 1500);
    }
  });
});
observer.observe(targetElement);
observerEnd.observe(end);
lineLastImage.addEventListener('click', function () {
  var imageSrcArr = lineLastImage.src.split('/');
  var imageSrc = imageSrcArr[imageSrcArr.length - 1];
  if (imageSrc === 'down.svg') return;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  lineLastImage.src = './images/svg/down.svg';
});

},{}],2:[function(require,module,exports){
"use strict";

var iteration = 0;
var spacing = 0.06;
var snap = gsap.utils.snap(spacing);
var cards = gsap.utils.toArray('.cards li');
var seamlessLoop = buildSeamlessLoop(cards, spacing);
var scrub = gsap.to(seamlessLoop, {
  totalTime: 0,
  duration: 0.5,
  ease: 'power3',
  paused: true
});
function isMobileDevice() {
  var viewportWidth = window.innerWidth;
  if (viewportWidth <= 768) {
    return true;
  } else {
    return false;
  }
}
function scrubTo(totalTime) {
  var progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
  if (progress > 1) {
    wrapForward();
  } else {
    scrub.vars.totalTime = totalTime;
    scrub.invalidate().restart();
  }
}
document.querySelector('.next').addEventListener('click', function () {
  scrubTo(scrub.vars.totalTime + spacing);
});
document.querySelector('.prev').addEventListener('click', function () {
  scrubTo(scrub.vars.totalTime - spacing);
});
function buildSeamlessLoop(items, spacing) {
  var overlap = Math.ceil(1 / spacing);
  var startTime = items.length * spacing + 0.5;
  var loopTime = (items.length + overlap) * spacing + 1;
  var rawSequence = gsap.timeline({
    paused: true
  });
  var seamlessLoop = gsap.timeline({
    paused: true,
    repeat: -1,
    onRepeat: function onRepeat() {
      this._time === this._dur && (this._tTime += this._dur - 0.01);
    }
  });
  var l = items.length + overlap * 2;
  var time = 0;
  var i;
  var index;
  var item;
  gsap.set(items, {
    xPercent: 400,
    opacity: 0,
    scale: 0
  });
  for (i = 0; i < l; i++) {
    index = i % items.length;
    item = items[index];
    time = i * spacing;
    rawSequence.fromTo(item, {
      scale: 0,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      zIndex: 100,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: 'power1.in',
      immediateRender: false
    }, time).fromTo(item, {
      xPercent: isMobileDevice() ? 100 : 400
    }, {
      xPercent: isMobileDevice() ? -100 : -400,
      duration: 1,
      ease: 'none',
      immediateRender: false
    }, time);
    i <= items.length && seamlessLoop.add('label' + i, time);
  }
  rawSequence.time(startTime);
  seamlessLoop.to(rawSequence, {
    time: loopTime,
    duration: loopTime - startTime,
    ease: 'none'
  }).fromTo(rawSequence, {
    time: overlap * spacing + 1
  }, {
    time: startTime,
    duration: startTime - (overlap * spacing + 1),
    immediateRender: false,
    ease: 'none'
  });
  return seamlessLoop;
}

},{}],3:[function(require,module,exports){
"use strict";

var sections = document.querySelectorAll('.section');
var marsImg = document.querySelector('#mars');
var lineOne = document.querySelector('.line_one');
var lineTwo = document.querySelector('.line_two');
var lineThree = document.querySelector('.line_three');
var sectionOne = document.querySelector('.space_one');
var sectionTwo = document.querySelector('.space_two');
var sectionThree = document.querySelector('.space_three');
var sectionFour = document.querySelector('.space_four');
var sectionOneMobile = document.querySelector('.space_one_m');
var sectionTwoMobile = document.querySelector('.space_two_m');
var sectionThreeMobile = document.querySelector('.space_three_m');
var sectionFourMobile = document.querySelector('.space_four_m');
var isPc = window.innerWidth > 767;
var currentSection = 0;
var isScrolling = false;

/**
 * 스크롤 함수
 * @param {number} index
 */
var scrollToSection = function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({
      behavior: 'smooth'
    });
    currentSection = index;
    if (currentSection !== 0) {
      if (isPc) {
        marsImg.style.opacity = 0;
      }
      return;
    }
    marsImg.style.opacity = 1;
  }
};

/**
 * 우주인 애니메이션 함수
 */
var animateRandomly = function animateRandomly() {
  gsap.to('#man', {
    x: function x() {
      return Math.random() * (window.innerWidth - 100);
    },
    y: function y() {
      return Math.random() * (window.innerHeight - 100);
    },
    duration: 7,
    onComplete: animateRandomly,
    ease: 'none'
  });
};

/**
 * 화성 애니메이션
 */
var animateMars = function animateMars() {
  gsap.to('#mars', {
    rotation: 360,
    duration: 180,
    repeat: -1,
    ease: 'linear'
  });
};
lineOne.addEventListener('click', function () {
  sectionOne.style.animation = '';
  sectionTwo.style.animation = 'zoom 10s infinite';
  sectionThree.style.animation = '';
  sectionFour.style.animation = '';
  scrollToSection(currentSection + 1);
});
lineTwo.addEventListener('click', function () {
  var lineTwoImage = document.querySelector('.line_two :first-child');
  var imageSrcArr = lineTwoImage.src.split('/');
  var imageSrc = imageSrcArr[imageSrcArr.length - 1];
  if (imageSrc === 'down.svg') {
    sectionOne.style.animation = '';
    sectionTwo.style.animation = '';
    sectionThree.style.animation = 'zoom 10s infinite';
    sectionFour.style.animation = '';
    scrollToSection(currentSection + 1);
  }
  if (imageSrc === 'left.svg') {
    currentSlide = 1;
  }
});
lineThree.addEventListener('click', function () {
  sectionOne.style.animation = '';
  sectionTwo.style.animation = '';
  sectionThree.style.animation = '';
  sectionFour.style.animation = 'zoom 10s infinite';
  scrollToSection(currentSection + 1);
});
window.addEventListener('wheel', function (e) {
  if (isScrolling) return;
  if (e.deltaY > 0) {
    scrollToSection(currentSection + 1);
  }
  if (e.deltaY < 0) {
    scrollToSection(currentSection - 1);
  }
  switch (currentSection) {
    case 0:
      sectionOne.style.animation = 'zoom 10s infinite';
      sectionTwo.style.animation = '';
      sectionThree.style.animation = '';
      sectionFour.style.animation = '';
      break;
    case 1:
      sectionOne.style.animation = '';
      sectionTwo.style.animation = 'zoom 10s infinite';
      sectionThree.style.animation = '';
      sectionFour.style.animation = '';
      break;
    case 2:
      sectionOne.style.animation = '';
      sectionTwo.style.animation = '';
      sectionThree.style.animation = 'zoom 10s infinite';
      sectionFour.style.animation = '';
      break;
    case 3:
      sectionOne.style.animation = '';
      sectionTwo.style.animation = '';
      sectionThree.style.animation = '';
      sectionFour.style.animation = 'zoom 10s infinite';
      break;
  }
  isScrolling = true;
  setTimeout(function () {
    isScrolling = false;
  }, 1000);
});
document.addEventListener('DOMContentLoaded', function () {
  animateRandomly();
  animateMars();
});
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
    sectionOne.style.animation = 'zoom 10s infinite';
    sectionOneMobile.style.animation = 'zoom 10s infinite';
  }, 30);
};

},{}],4:[function(require,module,exports){
"use strict";

var movingTextLeft = document.querySelector('.moving-text-left');
var movingTextCenter = document.querySelector('.moving-text-center');
var movingTextRight = document.querySelector('.moving-text-right');
var movingTextTop = document.querySelector('.moving-text-top');
var movingTextMiddle = document.querySelector('.moving-text-middle');
var movingTextBottom = document.querySelector('.moving-text-bottom');
var titleText = document.querySelector('.title');
var marsImage = document.querySelector('#mars2');
var mobileMarsImage = document.querySelector('#mobile_mars');
var isMobile = window.innerWidth <= 767;
var nodeDiv = document.querySelector('.node');
var nodeDivFour = document.querySelector('.node_two');
var nodeDivFive = document.querySelector('.node_three');
var targetElementOne = document.querySelector('.move_we');
var targetElementTwo = document.querySelector('.two-content');
var targetElementThree = document.querySelector('.move_what');
var targetElementMobile = document.querySelector('.animation-container-M');
var targetElementFour = document.querySelector('.move_where');
var lineBox = document.querySelector('.line_two');
var lineImage = document.querySelector('.line_two :first-child');
var isMoveSlider = true;
var isMove = true;
var mobileFunc = function mobileFunc() {
  //1번째 애니메이션 '우리는'
  gsap.to(movingTextTop, {
    x: '130%',
    // x축으로 이동할 거리
    y: '-50%',
    // y축으로 이동할 거리
    duration: 2,
    // 애니메이션 기간 (초)
    ease: 'power1.inOut' // 이징 함수
  });

  //1번째 애니메이션 '어디서'
  gsap.to(movingTextMiddle, {
    x: '35%',
    // x축으로 이동할 거리
    y: '185%',
    // y축으로 이동할 거리
    bezier: {
      type: 'soft',
      // 곡선 타입 선택 (soft, rough, etc.)
      values: [{
        x: '-20%',
        y: '0%'
      },
      // 시작 지점
      {
        x: '100%',
        y: '-25%'
      },
      // 중간 지점
      {
        x: '130%',
        y: '-50%'
      } // 끝 지점
      ]
    },

    duration: 2,
    // 애니메이션 기간 (초)
    ease: 'power1.inOut' // 이징 함수
  });

  // big-circle를 2초 후에 사라지도록 애니메이션 설정
  gsap.to('.big-circle', {
    opacity: 0,
    delay: 2,
    onComplete: function onComplete() {
      document.querySelector('.big-circle').style.opacity = 'none';
    }
  });

  // small-circle를 2초 후에 사라지도록 애니메이션 설정
  // gsap.to('.small-circle', {
  //   opacity: 0,
  //   delay: 2,
  //   onComplete: () => {
  //     document.querySelector('.small-circle').style.display = 'none'
  //   },
  // })

  //2번째 애니메이션 '우리가'
  gsap.to(movingTextTop, {
    x: '125%',
    y: '-40%',
    duration: 2,
    ease: 'power1.inOut',
    delay: 2.5
  });
  gsap.to(movingTextMiddle, {
    x: '25%',
    y: '30%',
    duration: 2,
    ease: 'power1.inOut',
    delay: 2.5
  });
  gsap.to(movingTextBottom, {
    x: '-60%',
    y: '100%',
    bezier: {
      type: 'soft',
      values: [{
        x: '-20%',
        y: '0%'
      }, {
        x: '100%',
        y: '-25%'
      }, {
        x: '130%',
        y: '-50%'
      }]
    },
    duration: 2,
    ease: 'power1.inOut',
    delay: 2.5
  });
  gsap.to(mobileMarsImage, {
    y: '-60%',
    scale: 1,
    duration: 2.5,
    delay: 3,
    ease: 'power2.out'
  });
  function clickDisplay() {
    titleText.style.display = 'none';
    movingTextTop.style.display = 'none';
    movingTextMiddle.style.display = 'none';
    movingTextBottom.style.display = 'none';
    marsImage.style.display = 'none';
  }

  // 우리는 클릭 이벤트
  movingTextTop.addEventListener('click', function () {
    clickDisplay();
  });

  // 어디서 클릭 이벤트
  movingTextMiddle.addEventListener('click', function () {
    clickDisplay();
  });

  // 무엇을 클릭 이벤트
  movingTextBottom.addEventListener('click', function () {
    clickDisplay();
  });
};
var observerOne = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      gsap.fromTo(targetElementOne, {
        x: '500%',
        y: 0,
        opacity: 1
      }, {
        x: '0',
        y: '-500%',
        opacity: 1,
        duration: 3,
        ease: 'power2.out',
        onComplete: function onComplete() {
          gsap.to(targetElementOne, {
            color: 'white',
            duration: 1
          });
          nodeDiv.style.display = 'block';
          nodeDiv.style.opacity = '0';
          isMoveSlider = false;
          setTimeout(function () {
            nodeDiv.style.opacity = '1';
          }, 100);
        }
      });
    }
  });
});
var observerTwo = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      if (!isMove) {
        isMove = true;
      }
      nodeDiv.style.display = 'none';
      nodeDiv.style.opacity = '0';
      nodeDivFive.style.display = 'none';
      nodeDivFive.style.opacity = '0';
      nodeDivFour.style.display = 'none';
      nodeDivFour.style.opacity = '0';
      gsap.fromTo(movingTextLeft, {
        x: '-500%',
        y: 0,
        opacity: 1
      }, {
        x: '-20%',
        y: 0,
        opacity: 1,
        duration: 5,
        ease: 'power2.out'
      });
      gsap.fromTo(movingTextCenter, {
        x: '30%',
        y: 300,
        opacity: 1
      }, {
        x: '30%',
        y: 0,
        opacity: 1,
        duration: 5,
        ease: 'power2.out'
      });
      gsap.fromTo(movingTextRight, {
        x: '400%',
        y: 40,
        opacity: 1
      }, {
        x: '40%',
        y: 0,
        opacity: 1,
        duration: 3,
        ease: 'power2.out',
        onComplete: function onComplete() {
          isMove = false;
        }
      });
    }
  });
});
var observerThree = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      gsap.fromTo(targetElementThree, {
        x: '100%',
        y: 0,
        opacity: 1
      }, {
        x: '0',
        y: '-500%',
        opacity: 1,
        duration: 3,
        ease: 'power2.out',
        onComplete: function onComplete() {
          gsap.to(targetElementThree, {
            color: 'white',
            duration: 1
          });
          nodeDivFive.style.display = 'block';
          nodeDivFive.style.opacity = '0';
          isMoveSlider = false;
          setTimeout(function () {
            nodeDivFive.style.opacity = '1';
          }, 100);
        }
      });
    }
  });
});
var observerFour = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      gsap.fromTo(targetElementFour, {
        x: '500%',
        y: 0,
        opacity: 1
      }, {
        x: '0',
        y: '-500%',
        opacity: 1,
        duration: 3,
        ease: 'power2.out',
        onComplete: function onComplete() {
          gsap.to(targetElementFour, {
            color: 'white',
            duration: 1
          });
          nodeDivFour.style.display = 'block';
          nodeDivFour.style.opacity = '0';
          isMoveSlider = false;
          setTimeout(function () {
            nodeDivFour.style.opacity = '1';
          }, 100);
        }
      });
    }
  });
});
var observerMobile = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      setTimeout(function () {
        mobileFunc();
      }, 1000);
    }
  });
});
observerOne.observe(targetElementOne);
observerTwo.observe(targetElementTwo);
observerThree.observe(targetElementThree);
observerFour.observe(targetElementFour);
observerMobile.observe(targetElementMobile);
var slide = document.querySelector('.slide');
var slideWidth = slide.clientWidth;
var slideItems = document.querySelectorAll('.slide_item');
var maxSlide = slideItems.length;
var currSlide = 1;
var nextMove = function nextMove(slide) {
  currSlide = slide;
  if (currSlide <= maxSlide) {
    var offset = slideWidth * (currSlide - 1);
    slideItems.forEach(function (i) {
      i.setAttribute('style', "left: ".concat(-offset, "px"));
    });
    return;
  }
  currSlide--;
};
var prevMove = function prevMove() {
  currSlide--;
  if (currSlide > 0) {
    var offset = slideWidth * (currSlide - 1);
    slideItems.forEach(function (i) {
      i.setAttribute('style', "left: ".concat(-offset, "px"));
    });
    return;
  }
  currSlide++;
};
var disabled = function disabled() {
  titleText.style.display = 'none';
  movingTextRight.style.display = 'none';
  movingTextLeft.style.display = 'none';
};
var hideComponent = function hideComponent() {
  nodeDiv.style.display = 'none';
  nodeDiv.style.opacity = '0';
  nodeDivFive.style.display = 'none';
  nodeDivFive.style.opacity = '0';
  nodeDivFour.style.display = 'none';
  nodeDivFour.style.opacity = '0';
  gsap.to(targetElementOne, {
    x: '500%',
    y: '500%',
    color: '#a2a2a2',
    duration: 1
  });
  gsap.to(targetElementThree, {
    x: '-100%',
    y: '500%',
    color: '#a2a2a2',
    duration: 1
  });
  gsap.to(targetElementFour, {
    x: '500%',
    y: '500%',
    color: '#a2a2a2',
    duration: 1
  });
};
movingTextCenter.addEventListener('click', function () {
  if (isMove) return;
  hideComponent();
  lineImage.src = './images/svg/left.svg';
  nextMove(3);
});
movingTextRight.addEventListener('click', function () {
  if (isMove) return;
  hideComponent();
  lineImage.src = './images/svg/left.svg';
  nextMove(4);
});
movingTextLeft.addEventListener('click', function () {
  if (isMove) return;
  hideComponent();
  lineImage.src = './images/svg/left.svg';
  nextMove(2);
});
lineBox.addEventListener('click', function () {
  if (isMoveSlider) return;
  var lineTwoImage = document.querySelector('.line_two :first-child');
  var imageSrcArr = lineTwoImage.src.split('/');
  var imageSrc = imageSrcArr[imageSrcArr.length - 1];
  isMoveSlider = true;
  if (imageSrc === 'left.svg') {
    hideComponent();
    nextMove(1);
    lineImage.src = './images/svg/down.svg';
  }
});
window.addEventListener('resize', function () {
  slideWidth = slide.clientWidth;
});

},{}]},{},[3,1,4,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZW5kLmpzIiwic3JjL2pzL2dhbGxlcnkuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvaW50cm9kdWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM1RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFFdkUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0VBQ3pELE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsUUFBUTtFQUMxQyxlQUFlLEdBQUcsSUFBSTtBQUN4QixDQUFDLENBQUM7QUFFRixJQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFLO0VBQ3JELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7SUFDekIsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO01BQ3hCLFVBQVUsQ0FBQyxZQUFNO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxTQUFTO1FBQzNDLGVBQWUsR0FBRyxLQUFLO01BQ3pCLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDVjtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFHLElBQUksb0JBQW9CLENBQUMsVUFBQyxPQUFPLEVBQUs7RUFDeEQsT0FBTyxDQUFD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Q0FBQztFQUMvQyxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7RUFDcEQsWUFBWSxHQUFHLElBQUk7RUFDbkIsSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO0lBQzNCLGFBQWEsQ0FBQyxDQUFDO0lBQ2YsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNYLFNBQVMsQ0FBQyxHQUFHLEdBQUcsdUJBQXVCO0VBQ3pDO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFNO0VBQ3RDLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVztBQUNoQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxuY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydF9wb2ludCcpXG5jb25zdCBzY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsaW5nLXRleHQnKVxuY29uc3QgZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3BfcG9pbnQnKVxuY29uc3QgbGluZUxhc3RJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX2ZvdXIgOmZpcnN0LWNoaWxkJylcblxud2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJ1xuICBhbmltYXRpb25QYXVzZWQgPSB0cnVlXG59KVxuXG5jb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJ1xuICAgICAgICBhbmltYXRpb25QYXVzZWQgPSBmYWxzZVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlckVuZCA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnXG4gICAgICAgIGFuaW1hdGlvblBhdXNlZCA9IHRydWVcbiAgICAgICAgbGluZUxhc3RJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL3RvcC5zdmcnXG4gICAgICB9LCAxNTAwKVxuICAgIH1cbiAgfSlcbn0pXG5cbm9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWxlbWVudClcbm9ic2VydmVyRW5kLm9ic2VydmUoZW5kKVxuXG5saW5lTGFzdEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBpbWFnZVNyY0FyciA9IGxpbmVMYXN0SW1hZ2Uuc3JjLnNwbGl0KCcvJylcbiAgY29uc3QgaW1hZ2VTcmMgPSBpbWFnZVNyY0FycltpbWFnZVNyY0Fyci5sZW5ndGggLSAxXVxuXG4gIGlmIChpbWFnZVNyYyA9PT0gJ2Rvd24uc3ZnJykgcmV0dXJuXG5cbiAgd2luZG93LnNjcm9sbFRvKHtcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gIH0pXG5cbiAgbGluZUxhc3RJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2Rvd24uc3ZnJ1xufSlcbiIsImxldCBpdGVyYXRpb24gPSAwXG5cbmNvbnN0IHNwYWNpbmcgPSAwLjA2XG5jb25zdCBzbmFwID0gZ3NhcC51dGlscy5zbmFwKHNwYWNpbmcpXG5jb25zdCBjYXJkcyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmNhcmRzIGxpJylcbmNvbnN0IHNlYW1sZXNzTG9vcCA9IGJ1aWxkU2VhbWxlc3NMb29wKGNhcmRzLCBzcGFjaW5nKVxuY29uc3Qgc2NydWIgPSBnc2FwLnRvKHNlYW1sZXNzTG9vcCwge1xuICB0b3RhbFRpbWU6IDAsXG4gIGR1cmF0aW9uOiAwLjUsXG4gIGVhc2U6ICdwb3dlcjMnLFxuICBwYXVzZWQ6IHRydWUsXG59KVxuXG5mdW5jdGlvbiBpc01vYmlsZURldmljZSgpIHtcbiAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cbiAgaWYgKHZpZXdwb3J0V2lkdGggPD0gNzY4KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBzY3J1YlRvKHRvdGFsVGltZSkge1xuICBsZXQgcHJvZ3Jlc3MgPVxuICAgICh0b3RhbFRpbWUgLSBzZWFtbGVzc0xvb3AuZHVyYXRpb24oKSAqIGl0ZXJhdGlvbikgLyBzZWFtbGVzc0xvb3AuZHVyYXRpb24oKVxuICBpZiAocHJvZ3Jlc3MgPiAxKSB7XG4gICAgd3JhcEZvcndhcmQoKVxuICB9IGVsc2Uge1xuICAgIHNjcnViLnZhcnMudG90YWxUaW1lID0gdG90YWxUaW1lXG4gICAgc2NydWIuaW52YWxpZGF0ZSgpLnJlc3RhcnQoKVxuICB9XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHNjcnViVG8oc2NydWIudmFycy50b3RhbFRpbWUgKyBzcGFjaW5nKVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc2NydWJUbyhzY3J1Yi52YXJzLnRvdGFsVGltZSAtIHNwYWNpbmcpXG59KVxuXG5mdW5jdGlvbiBidWlsZFNlYW1sZXNzTG9vcChpdGVtcywgc3BhY2luZykge1xuICBsZXQgb3ZlcmxhcCA9IE1hdGguY2VpbCgxIC8gc3BhY2luZylcbiAgbGV0IHN0YXJ0VGltZSA9IGl0ZW1zLmxlbmd0aCAqIHNwYWNpbmcgKyAwLjVcbiAgbGV0IGxvb3BUaW1lID0gKGl0ZW1zLmxlbmd0aCArIG92ZXJsYXApICogc3BhY2luZyArIDFcbiAgbGV0IHJhd1NlcXVlbmNlID0gZ3NhcC50aW1lbGluZSh7IHBhdXNlZDogdHJ1ZSB9KVxuICBsZXQgc2VhbWxlc3NMb29wID0gZ3NhcC50aW1lbGluZSh7XG4gICAgcGF1c2VkOiB0cnVlLFxuICAgIHJlcGVhdDogLTEsXG4gICAgb25SZXBlYXQoKSB7XG4gICAgICB0aGlzLl90aW1lID09PSB0aGlzLl9kdXIgJiYgKHRoaXMuX3RUaW1lICs9IHRoaXMuX2R1ciAtIDAuMDEpXG4gICAgfSxcbiAgfSlcbiAgbGV0IGwgPSBpdGVtcy5sZW5ndGggKyBvdmVybGFwICogMlxuICBsZXQgdGltZSA9IDBcbiAgbGV0IGlcbiAgbGV0IGluZGV4XG4gIGxldCBpdGVtXG5cbiAgZ3NhcC5zZXQoaXRlbXMsIHsgeFBlcmNlbnQ6IDQwMCwgb3BhY2l0eTogMCwgc2NhbGU6IDAgfSlcblxuICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaW5kZXggPSBpICUgaXRlbXMubGVuZ3RoXG4gICAgaXRlbSA9IGl0ZW1zW2luZGV4XVxuICAgIHRpbWUgPSBpICogc3BhY2luZ1xuICAgIHJhd1NlcXVlbmNlXG4gICAgICAuZnJvbVRvKFxuICAgICAgICBpdGVtLFxuICAgICAgICB7IHNjYWxlOiAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHpJbmRleDogMTAwLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXG4gICAgICAgICAgeW95bzogdHJ1ZSxcbiAgICAgICAgICByZXBlYXQ6IDEsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbicsXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgdGltZSxcbiAgICAgIClcbiAgICAgIC5mcm9tVG8oXG4gICAgICAgIGl0ZW0sXG4gICAgICAgIHsgeFBlcmNlbnQ6IGlzTW9iaWxlRGV2aWNlKCkgPyAxMDAgOiA0MDAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHhQZXJjZW50OiBpc01vYmlsZURldmljZSgpID8gLTEwMCA6IC00MDAsXG4gICAgICAgICAgZHVyYXRpb246IDEsXG4gICAgICAgICAgZWFzZTogJ25vbmUnLFxuICAgICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWUsXG4gICAgICApXG4gICAgaSA8PSBpdGVtcy5sZW5ndGggJiYgc2VhbWxlc3NMb29wLmFkZCgnbGFiZWwnICsgaSwgdGltZSlcbiAgfVxuXG4gIHJhd1NlcXVlbmNlLnRpbWUoc3RhcnRUaW1lKVxuICBzZWFtbGVzc0xvb3BcbiAgICAudG8ocmF3U2VxdWVuY2UsIHtcbiAgICAgIHRpbWU6IGxvb3BUaW1lLFxuICAgICAgZHVyYXRpb246IGxvb3BUaW1lIC0gc3RhcnRUaW1lLFxuICAgICAgZWFzZTogJ25vbmUnLFxuICAgIH0pXG4gICAgLmZyb21UbyhcbiAgICAgIHJhd1NlcXVlbmNlLFxuICAgICAgeyB0aW1lOiBvdmVybGFwICogc3BhY2luZyArIDEgfSxcbiAgICAgIHtcbiAgICAgICAgdGltZTogc3RhcnRUaW1lLFxuICAgICAgICBkdXJhdGlvbjogc3RhcnRUaW1lIC0gKG92ZXJsYXAgKiBzcGFjaW5nICsgMSksXG4gICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICAgIGVhc2U6ICdub25lJyxcbiAgICAgIH0sXG4gICAgKVxuICByZXR1cm4gc2VhbWxlc3NMb29wXG59XG4iLCJjb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWN0aW9uJylcbmNvbnN0IG1hcnNJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFycycpXG5jb25zdCBsaW5lT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfb25lJylcbmNvbnN0IGxpbmVUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28nKVxuY29uc3QgbGluZVRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdGhyZWUnKVxuY29uc3Qgc2VjdGlvbk9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9vbmUnKVxuY29uc3Qgc2VjdGlvblR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90d28nKVxuY29uc3Qgc2VjdGlvblRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX3RocmVlJylcbmNvbnN0IHNlY3Rpb25Gb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX2ZvdXInKVxuY29uc3Qgc2VjdGlvbk9uZU1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9vbmVfbScpXG5jb25zdCBzZWN0aW9uVHdvTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX3R3b19tJylcbmNvbnN0IHNlY3Rpb25UaHJlZU1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90aHJlZV9tJylcbmNvbnN0IHNlY3Rpb25Gb3VyTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX2ZvdXJfbScpXG5cbmNvbnN0IGlzUGMgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2N1xuXG5sZXQgY3VycmVudFNlY3Rpb24gPSAwXG5sZXQgaXNTY3JvbGxpbmcgPSBmYWxzZVxuXG4vKipcbiAqIOyKpO2BrOuhpCDtlajsiJhcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICovXG5jb25zdCBzY3JvbGxUb1NlY3Rpb24gPSAoaW5kZXgpID0+IHtcbiAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBzZWN0aW9ucy5sZW5ndGgpIHtcbiAgICBzZWN0aW9uc1tpbmRleF0uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSlcbiAgICBjdXJyZW50U2VjdGlvbiA9IGluZGV4XG5cbiAgICBpZiAoY3VycmVudFNlY3Rpb24gIT09IDApIHtcbiAgICAgIGlmIChpc1BjKSB7XG4gICAgICAgIG1hcnNJbWcuc3R5bGUub3BhY2l0eSA9IDBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbWFyc0ltZy5zdHlsZS5vcGFjaXR5ID0gMVxuICB9XG59XG5cbi8qKlxuICog7Jqw7KO87J24IOyVoOuLiOuplOydtOyFmCDtlajsiJhcbiAqL1xuY29uc3QgYW5pbWF0ZVJhbmRvbWx5ID0gKCkgPT4ge1xuICBnc2FwLnRvKCcjbWFuJywge1xuICAgIHg6ICgpID0+IE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVyV2lkdGggLSAxMDApLFxuICAgIHk6ICgpID0+IE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVySGVpZ2h0IC0gMTAwKSxcbiAgICBkdXJhdGlvbjogNyxcbiAgICBvbkNvbXBsZXRlOiBhbmltYXRlUmFuZG9tbHksXG4gICAgZWFzZTogJ25vbmUnLFxuICB9KVxufVxuXG4vKipcbiAqIO2ZlOyEsSDslaDri4jrqZTsnbTshZhcbiAqL1xuY29uc3QgYW5pbWF0ZU1hcnMgPSAoKSA9PiB7XG4gIGdzYXAudG8oJyNtYXJzJywge1xuICAgIHJvdGF0aW9uOiAzNjAsXG4gICAgZHVyYXRpb246IDE4MCxcbiAgICByZXBlYXQ6IC0xLFxuICAgIGVhc2U6ICdsaW5lYXInLFxuICB9KVxufVxuXG5saW5lT25lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2Nyb2xsVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uICsgMSlcbn0pXG5cbmxpbmVUd28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IGxpbmVUd29JbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3R3byA6Zmlyc3QtY2hpbGQnKVxuICBjb25zdCBpbWFnZVNyY0FyciA9IGxpbmVUd29JbWFnZS5zcmMuc3BsaXQoJy8nKVxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXG4gIGlmIChpbWFnZVNyYyA9PT0gJ2Rvd24uc3ZnJykge1xuICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpXG4gIH1cblxuICBpZiAoaW1hZ2VTcmMgPT09ICdsZWZ0LnN2ZycpIHtcbiAgICBjdXJyZW50U2xpZGUgPSAxXG4gIH1cbn0pXG5cbmxpbmVUaHJlZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpXG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuICBpZiAoaXNTY3JvbGxpbmcpIHJldHVyblxuXG4gIGlmIChlLmRlbHRhWSA+IDApIHtcbiAgICBzY3JvbGxUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gKyAxKVxuICB9XG5cbiAgaWYgKGUuZGVsdGFZIDwgMCkge1xuICAgIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiAtIDEpXG4gIH1cblxuICBzd2l0Y2ggKGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgY2FzZSAwOlxuICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAxOlxuICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBicmVha1xuICAgIGNhc2UgMjpcbiAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlIDM6XG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgIGJyZWFrXG4gIH1cblxuICBpc1Njcm9sbGluZyA9IHRydWVcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaXNTY3JvbGxpbmcgPSBmYWxzZVxuICB9LCAxMDAwKVxufSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgYW5pbWF0ZVJhbmRvbWx5KClcbiAgYW5pbWF0ZU1hcnMoKVxufSlcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gIH0sIDMwKVxufVxuIiwiY29uc3QgbW92aW5nVGV4dExlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtbGVmdCcpXG5jb25zdCBtb3ZpbmdUZXh0Q2VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LWNlbnRlcicpXG5jb25zdCBtb3ZpbmdUZXh0UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtcmlnaHQnKVxuY29uc3QgbW92aW5nVGV4dFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC10b3AnKVxuY29uc3QgbW92aW5nVGV4dE1pZGRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1taWRkbGUnKVxuY29uc3QgbW92aW5nVGV4dEJvdHRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1ib3R0b20nKVxuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJylcbmNvbnN0IG1hcnNJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXJzMicpXG5jb25zdCBtb2JpbGVNYXJzSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX21hcnMnKVxuY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjdcblxuY29uc3Qgbm9kZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub2RlJylcbmNvbnN0IG5vZGVEaXZGb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGVfdHdvJylcbmNvbnN0IG5vZGVEaXZGaXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGVfdGhyZWUnKVxuXG5jb25zdCB0YXJnZXRFbGVtZW50T25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2UnKVxuY29uc3QgdGFyZ2V0RWxlbWVudFR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50d28tY29udGVudCcpXG5jb25zdCB0YXJnZXRFbGVtZW50VGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93aGF0JylcbmNvbnN0IHRhcmdldEVsZW1lbnRNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uLWNvbnRhaW5lci1NJylcbmNvbnN0IHRhcmdldEVsZW1lbnRGb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2hlcmUnKVxuXG5jb25zdCBsaW5lQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvJylcbmNvbnN0IGxpbmVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3R3byA6Zmlyc3QtY2hpbGQnKVxuXG5sZXQgaXNNb3ZlU2xpZGVyID0gdHJ1ZVxubGV0IGlzTW92ZSA9IHRydWVcblxuY29uc3QgbW9iaWxlRnVuYyA9ICgpID0+IHtcbiAgLy8x67KI7Ke4IOyVoOuLiOuplOydtOyFmCAn7Jqw66as64qUJ1xuICBnc2FwLnRvKG1vdmluZ1RleHRUb3AsIHtcbiAgICB4OiAnMTMwJScsIC8vIHjstpXsnLzroZwg7J2064+Z7ZWgIOqxsOumrFxuICAgIHk6ICctNTAlJywgLy8geey2leycvOuhnCDsnbTrj5ntlaAg6rGw66asXG4gICAgZHVyYXRpb246IDIsIC8vIOyVoOuLiOuplOydtOyFmCDquLDqsIQgKOy0iClcbiAgICBlYXNlOiAncG93ZXIxLmluT3V0JywgLy8g7J207KeVIO2VqOyImFxuICB9KVxuXG4gIC8vMeuyiOynuCDslaDri4jrqZTsnbTshZggJ+yWtOuUlOyEnCdcbiAgZ3NhcC50byhtb3ZpbmdUZXh0TWlkZGxlLCB7XG4gICAgeDogJzM1JScsIC8vIHjstpXsnLzroZwg7J2064+Z7ZWgIOqxsOumrFxuICAgIHk6ICcxODUlJywgLy8geey2leycvOuhnCDsnbTrj5ntlaAg6rGw66asXG4gICAgYmV6aWVyOiB7XG4gICAgICB0eXBlOiAnc29mdCcsIC8vIOqzoeyEoCDtg4DsnoUg7ISg7YOdIChzb2Z0LCByb3VnaCwgZXRjLilcbiAgICAgIHZhbHVlczogW1xuICAgICAgICB7IHg6ICctMjAlJywgeTogJzAlJyB9LCAvLyDsi5zsnpEg7KeA7KCQXG4gICAgICAgIHsgeDogJzEwMCUnLCB5OiAnLTI1JScgfSwgLy8g7KSR6rCEIOyngOygkFxuICAgICAgICB7IHg6ICcxMzAlJywgeTogJy01MCUnIH0sIC8vIOuBnSDsp4DsoJBcbiAgICAgIF0sXG4gICAgfSxcbiAgICBkdXJhdGlvbjogMiwgLy8g7JWg64uI66mU7J207IWYIOq4sOqwhCAo7LSIKVxuICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLCAvLyDsnbTsp5Ug7ZWo7IiYXG4gIH0pXG5cbiAgLy8gYmlnLWNpcmNsZeulvCAy7LSIIO2bhOyXkCDsgqzrnbzsp4Drj4TroZ0g7JWg64uI66mU7J207IWYIOyEpOyglVxuICBnc2FwLnRvKCcuYmlnLWNpcmNsZScsIHtcbiAgICBvcGFjaXR5OiAwLFxuICAgIGRlbGF5OiAyLFxuICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctY2lyY2xlJykuc3R5bGUub3BhY2l0eSA9ICdub25lJ1xuICAgIH0sXG4gIH0pXG5cbiAgLy8gc21hbGwtY2lyY2xl66W8IDLstIgg7ZuE7JeQIOyCrOudvOyngOuPhOuhnSDslaDri4jrqZTsnbTshZgg7ISk7KCVXG4gIC8vIGdzYXAudG8oJy5zbWFsbC1jaXJjbGUnLCB7XG4gIC8vICAgb3BhY2l0eTogMCxcbiAgLy8gICBkZWxheTogMixcbiAgLy8gICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gIC8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc21hbGwtY2lyY2xlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAvLyAgIH0sXG4gIC8vIH0pXG5cbiAgLy8y67KI7Ke4IOyVoOuLiOuplOydtOyFmCAn7Jqw66as6rCAJ1xuICBnc2FwLnRvKG1vdmluZ1RleHRUb3AsIHtcbiAgICB4OiAnMTI1JScsXG4gICAgeTogJy00MCUnLFxuICAgIGR1cmF0aW9uOiAyLFxuICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgIGRlbGF5OiAyLjUsXG4gIH0pXG5cbiAgZ3NhcC50byhtb3ZpbmdUZXh0TWlkZGxlLCB7XG4gICAgeDogJzI1JScsXG4gICAgeTogJzMwJScsXG4gICAgZHVyYXRpb246IDIsXG4gICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gICAgZGVsYXk6IDIuNSxcbiAgfSlcblxuICBnc2FwLnRvKG1vdmluZ1RleHRCb3R0b20sIHtcbiAgICB4OiAnLTYwJScsXG4gICAgeTogJzEwMCUnLFxuICAgIGJlemllcjoge1xuICAgICAgdHlwZTogJ3NvZnQnLFxuICAgICAgdmFsdWVzOiBbXG4gICAgICAgIHsgeDogJy0yMCUnLCB5OiAnMCUnIH0sXG4gICAgICAgIHsgeDogJzEwMCUnLCB5OiAnLTI1JScgfSxcbiAgICAgICAgeyB4OiAnMTMwJScsIHk6ICctNTAlJyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIGR1cmF0aW9uOiAyLFxuICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgIGRlbGF5OiAyLjUsXG4gIH0pXG5cbiAgZ3NhcC50byhtb2JpbGVNYXJzSW1hZ2UsIHtcbiAgICB5OiAnLTYwJScsXG4gICAgc2NhbGU6IDEsXG4gICAgZHVyYXRpb246IDIuNSxcbiAgICBkZWxheTogMyxcbiAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gIH0pXG5cbiAgZnVuY3Rpb24gY2xpY2tEaXNwbGF5KCkge1xuICAgIHRpdGxlVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgbW92aW5nVGV4dFRvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgbW92aW5nVGV4dE1pZGRsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgbW92aW5nVGV4dEJvdHRvbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgbWFyc0ltYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuXG4gIC8vIOyasOumrOuKlCDtgbTrpq0g7J2067Kk7Yq4XG4gIG1vdmluZ1RleHRUb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY2xpY2tEaXNwbGF5KClcbiAgfSlcblxuICAvLyDslrTrlJTshJwg7YG066atIOydtOuypO2KuFxuICBtb3ZpbmdUZXh0TWlkZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNsaWNrRGlzcGxheSgpXG4gIH0pXG5cbiAgLy8g66y07JeH7J2EIO2BtOumrSDsnbTrsqTtirhcbiAgbW92aW5nVGV4dEJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjbGlja0Rpc3BsYXkoKVxuICB9KVxufVxuXG5jb25zdCBvYnNlcnZlck9uZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgdGFyZ2V0RWxlbWVudE9uZSxcbiAgICAgICAgeyB4OiAnNTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcwJyxcbiAgICAgICAgICB5OiAnLTUwMCUnLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0RWxlbWVudE9uZSwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcbiAgICAgICAgICAgIG5vZGVEaXYuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyVHdvID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGlmICghaXNNb3ZlKSB7XG4gICAgICAgIGlzTW92ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIG5vZGVEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICBub2RlRGl2Rml2ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXG5cbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBtb3ZpbmdUZXh0TGVmdCxcbiAgICAgICAgeyB4OiAnLTUwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgIHsgeDogJy0yMCUnLCB5OiAwLCBvcGFjaXR5OiAxLCBkdXJhdGlvbjogNSwgZWFzZTogJ3Bvd2VyMi5vdXQnIH0sXG4gICAgICApXG5cbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBtb3ZpbmdUZXh0Q2VudGVyLFxuICAgICAgICB7IHg6ICczMCUnLCB5OiAzMDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgeyB4OiAnMzAlJywgeTogMCwgb3BhY2l0eTogMSwgZHVyYXRpb246IDUsIGVhc2U6ICdwb3dlcjIub3V0JyB9LFxuICAgICAgKVxuXG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgbW92aW5nVGV4dFJpZ2h0LFxuICAgICAgICB7IHg6ICc0MDAlJywgeTogNDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICc0MCUnLFxuICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyVGhyZWUgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIHRhcmdldEVsZW1lbnRUaHJlZSxcbiAgICAgICAgeyB4OiAnMTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcwJyxcbiAgICAgICAgICB5OiAnLTUwMCUnLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0RWxlbWVudFRocmVlLCB7IGNvbG9yOiAnd2hpdGUnLCBkdXJhdGlvbjogMSB9KVxuICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgICAgICAgIGlzTW92ZVNsaWRlciA9IGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJGb3VyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICB0YXJnZXRFbGVtZW50Rm91cixcbiAgICAgICAgeyB4OiAnNTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcwJyxcbiAgICAgICAgICB5OiAnLTUwMCUnLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0RWxlbWVudEZvdXIsIHsgY29sb3I6ICd3aGl0ZScsIGR1cmF0aW9uOiAxIH0pXG4gICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgICAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzEnXG4gICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlck1vYmlsZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW9iaWxlRnVuYygpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfSlcbn0pXG5cbm9ic2VydmVyT25lLm9ic2VydmUodGFyZ2V0RWxlbWVudE9uZSlcbm9ic2VydmVyVHdvLm9ic2VydmUodGFyZ2V0RWxlbWVudFR3bylcbm9ic2VydmVyVGhyZWUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50VGhyZWUpXG5vYnNlcnZlckZvdXIub2JzZXJ2ZSh0YXJnZXRFbGVtZW50Rm91cilcbm9ic2VydmVyTW9iaWxlLm9ic2VydmUodGFyZ2V0RWxlbWVudE1vYmlsZSlcblxuY29uc3Qgc2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGUnKVxubGV0IHNsaWRlV2lkdGggPSBzbGlkZS5jbGllbnRXaWR0aFxuXG5jb25zdCBzbGlkZUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlX2l0ZW0nKVxuY29uc3QgbWF4U2xpZGUgPSBzbGlkZUl0ZW1zLmxlbmd0aFxuXG5sZXQgY3VyclNsaWRlID0gMVxuXG5jb25zdCBuZXh0TW92ZSA9IChzbGlkZSkgPT4ge1xuICBjdXJyU2xpZGUgPSBzbGlkZVxuICBpZiAoY3VyclNsaWRlIDw9IG1heFNsaWRlKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aCAqIChjdXJyU2xpZGUgLSAxKVxuICAgIHNsaWRlSXRlbXMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXG4gICAgfSlcblxuICAgIHJldHVyblxuICB9XG4gIGN1cnJTbGlkZS0tXG59XG5cbmNvbnN0IHByZXZNb3ZlID0gKCkgPT4ge1xuICBjdXJyU2xpZGUtLVxuICBpZiAoY3VyclNsaWRlID4gMCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHNsaWRlV2lkdGggKiAoY3VyclNsaWRlIC0gMSlcbiAgICBzbGlkZUl0ZW1zLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxuICAgIH0pXG5cbiAgICByZXR1cm5cbiAgfVxuXG4gIGN1cnJTbGlkZSsrXG59XG5cbmNvbnN0IGRpc2FibGVkID0gKCkgPT4ge1xuICB0aXRsZVRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBtb3ZpbmdUZXh0UmlnaHQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBtb3ZpbmdUZXh0TGVmdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG5cbmNvbnN0IGhpZGVDb21wb25lbnQgPSAoKSA9PiB7XG4gIG5vZGVEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICBnc2FwLnRvKHRhcmdldEVsZW1lbnRPbmUsIHtcbiAgICB4OiAnNTAwJScsXG4gICAgeTogJzUwMCUnLFxuICAgIGNvbG9yOiAnI2EyYTJhMicsXG4gICAgZHVyYXRpb246IDEsXG4gIH0pXG4gIGdzYXAudG8odGFyZ2V0RWxlbWVudFRocmVlLCB7XG4gICAgeDogJy0xMDAlJyxcbiAgICB5OiAnNTAwJScsXG4gICAgY29sb3I6ICcjYTJhMmEyJyxcbiAgICBkdXJhdGlvbjogMSxcbiAgfSlcbiAgZ3NhcC50byh0YXJnZXRFbGVtZW50Rm91ciwge1xuICAgIHg6ICc1MDAlJyxcbiAgICB5OiAnNTAwJScsXG4gICAgY29sb3I6ICcjYTJhMmEyJyxcbiAgICBkdXJhdGlvbjogMSxcbiAgfSlcbn1cblxubW92aW5nVGV4dENlbnRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGlzTW92ZSkgcmV0dXJuXG4gIGhpZGVDb21wb25lbnQoKVxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcbiAgbmV4dE1vdmUoMylcbn0pXG5cbm1vdmluZ1RleHRSaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGlzTW92ZSkgcmV0dXJuXG4gIGhpZGVDb21wb25lbnQoKVxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcbiAgbmV4dE1vdmUoNClcbn0pXG5cbm1vdmluZ1RleHRMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoaXNNb3ZlKSByZXR1cm5cbiAgaGlkZUNvbXBvbmVudCgpXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZSgyKVxufSlcblxubGluZUJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGlzTW92ZVNsaWRlcikgcmV0dXJuXG5cbiAgY29uc3QgbGluZVR3b0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXG4gIGNvbnN0IGltYWdlU3JjQXJyID0gbGluZVR3b0ltYWdlLnNyYy5zcGxpdCgnLycpXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cbiAgaXNNb3ZlU2xpZGVyID0gdHJ1ZVxuICBpZiAoaW1hZ2VTcmMgPT09ICdsZWZ0LnN2ZycpIHtcbiAgICBoaWRlQ29tcG9uZW50KClcbiAgICBuZXh0TW92ZSgxKVxuICAgIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2Rvd24uc3ZnJ1xuICB9XG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICBzbGlkZVdpZHRoID0gc2xpZGUuY2xpZW50V2lkdGhcbn0pXG4iXX0=
