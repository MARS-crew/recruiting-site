(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var content = document.querySelector('.content');
var targetElement = document.querySelector('.start_point');
var scroll = document.querySelector('.scrolling-text');
var end = document.querySelector('.stop_point');
var lineLastImage = document.querySelector('.line_four :first-child');
var animationPaused;
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
var sectionOneMobile = document.querySelector('.space_one_m_img');
var sectionTwoMobile = document.querySelector('.space_two_m_img');
var sectionThreeMobile = document.querySelector('.space_three_m_img');
var sectionFourMobile = document.querySelector('.space_four_m_img');
var isPc = window.innerWidth > 767;
var currentSection = 0;
var isScrolling = false;

/**
 * 스크롤 함수
 * @param {number} index
 */
var scrollToSection = function scrollToSection(index) {
  console.log('INDEX : ', index);
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
  scrollToSection(1);
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
    scrollToSection(2);
  }
});
lineThree.addEventListener('click', function () {
  sectionOne.style.animation = '';
  sectionTwo.style.animation = '';
  sectionThree.style.animation = '';
  sectionFour.style.animation = 'zoom 10s infinite';
  scrollToSection(3);
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
    sectionOne.style.animatione = 'zoom 10s infinite';
    sectionOneMobile.style.animation = 'zoom 10s infinite';
  }, 30);
};
document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

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
var isMobileMove = true;
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
      if (!isMobileMove) return;
      setTimeout(function () {
        gsap.to('.big-circle', {
          rotation: 360,
          duration: 180,
          repeat: -1,
          ease: 'linear'
        });
        gsap.to('.small-circle', {
          rotation: 360,
          duration: 100,
          repeat: -1,
          ease: 'linear'
        });

        //1번째 애니메이션 '우리는'
        gsap.to(movingTextTop, {
          x: '150%',
          y: '-20%',
          duration: 2,
          ease: 'power1.inOut'
        });

        // //1번째 애니메이션 '어디서'
        gsap.to(movingTextMiddle, {
          x: '50%',
          y: '185%',
          bezier: {
            type: 'soft',
            values: [{
              x: '-20%',
              y: '0%'
            }, {
              x: '100%',
              y: '-25%'
            }, {
              x: '150%',
              y: '-50%'
            }]
          },
          duration: 2,
          ease: 'power1.inOut'
        });

        //2번째 애니메이션 '우리가'
        gsap.to(movingTextTop, {
          x: '150%',
          y: '-40%',
          duration: 2,
          ease: 'power1.inOut',
          delay: 2.5
        });
        gsap.to(movingTextMiddle, {
          x: '50%',
          y: '30%',
          duration: 2,
          ease: 'power1.inOut',
          delay: 2.5
        });
        gsap.to(movingTextBottom, {
          x: '-50%',
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
          delay: 2.5,
          onComplete: function onComplete() {
            setTimeout(function () {
              isMobileMove = false;
            }, 1000);
          }
        });
        gsap.to(mobileMarsImage, {
          y: '-50%',
          scale: 1,
          duration: 2.5,
          delay: 3,
          ease: 'power2.out'
        });
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

/**
 * 화성 애니메이션
 */
var animateMobileMars = function animateMobileMars() {
  gsap.to('#mobile_mars', {
    rotation: 360,
    duration: 180,
    repeat: -1,
    ease: 'linear'
  });
};
lineBox.addEventListener('click', function () {
  var lineTwoImage = document.querySelector('.line_two :first-child');
  var imageSrcArr = lineTwoImage.src.split('/');
  var imageSrc = imageSrcArr[imageSrcArr.length - 1];
  if (isMobile) {
    if (imageSrc === 'left.svg') {
      nextMoveMobile(1);
      lineImage.src = './images/svg/down.svg';
    }
  }
  if (isMoveSlider) return;
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

// ** Mobile
var slideMobile = document.querySelector('.slide_m');
var slideWidthMobile = slideMobile.clientWidth;
var slideItemsMobile = document.querySelectorAll('.slide_item_m');
var maxSlideMobile = slideItemsMobile.length;
var currSlideMobile = 1;
var nextMoveMobile = function nextMoveMobile(slide) {
  currSlideMobile = slide;
  if (currSlideMobile <= maxSlideMobile) {
    var offset = slideWidthMobile * (currSlideMobile - 1);
    slideItemsMobile.forEach(function (i) {
      i.setAttribute('style', "left: ".concat(-offset, "px"));
    });
    return;
  }
  currSlideMobile--;
};
var prevMoveMobile = function prevMoveMobile() {
  currSlideMobile--;
  if (currSlideMobile > 0) {
    var offset = slideWidthMobile * (currSlideMobile - 1);
    slideItemsMobile.forEach(function (i) {
      i.setAttribute('style', "left: ".concat(-offset, "px"));
    });
    return;
  }
  currSlideMobile++;
};
document.addEventListener('DOMContentLoaded', function () {
  animateMobileMars();
});

// 우리는 클릭 이벤트
movingTextTop.addEventListener('click', function () {
  lineImage.src = './images/svg/left.svg';
  nextMoveMobile(2);
});

// 어디서 클릭 이벤트
movingTextMiddle.addEventListener('click', function () {
  lineImage.src = './images/svg/left.svg';
  nextMoveMobile(3);
});

// 무엇을 클릭 이벤트
movingTextBottom.addEventListener('click', function () {
  lineImage.src = './images/svg/left.svg';
  nextMoveMobile(4);
});

},{}]},{},[3,1,4,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZW5kLmpzIiwic3JjL2pzL2dhbGxlcnkuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvaW50cm9kdWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM1RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFDdkUsSUFBSSxlQUFlO0FBRW5CLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFFBQVE7RUFDMUMsZUFBZSxHQUFHLElBQUk7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFDLE9BQU8sRUFBSztFQUNyRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0lBQ3pCLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRTtNQUN4QixVQUFVLENBQUMsWUFBTTtRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUztRQUMzQyxlQUFlLEdBQUcsS0FBSztNQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1Y7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFLO0VBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7SUFDekIsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO01BQ3hCLFVBQVUsQ0FBQyxZQUFNO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxRQUFRO1FBQzFDLGVBQWUsR0FBRyxJQUFJO1FBQ3RCLGFBQWEsQ0FBQyxHQUFHLEdBQUcsc0JBQXNCO01BQzVDLENBQUMsRUFBRSxJQUFJLENBQUM7SUFDVjtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQy9CLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRXhCLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUM1QyxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDaEQsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0VBRXBELElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtFQUU3QixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2QsR0FBRyxFQUFFLENBQUM7SUFDTixJQUFJLEVBQUUsQ0FBQztJQUNQLFFBQVEsRUFBRTtFQUNaLENBQUMsQ0FBQztFQUVGLGFBQWEsQ0FBQyxHQUFHLEdBQUcsdUJBQXVCO0FBQzdDLENBQUMsQ0FBQzs7Ozs7QUNuREYsSUFBSSxTQUFTLEdBQUcsQ0FBQztBQUVqQixJQUFNLE9BQU8sR0FBRyxJQUFJO0FBQ3BCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNyQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFDN0MsSUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztBQUN0RCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtFQUNsQyxTQUFTLEVBQUUsQ0FBQztFQUNaLFFBQVEsRUFBRSxHQUFHO0VBQ2IsSUFBSSxFQUFFLFFBQVE7RUFDZCxNQUFNLEVBQUU7QUFDVixDQUFDLENBQUM7QUFFRixTQUFTLGNBQWMsQ0FBQSxFQUFHO0VBQ3hCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxVQUFVO0VBRXZDLElBQUksYUFBYSxJQUFJLEdBQUcsRUFBRTtJQUN4QixPQUFPLElBQUk7RUFDYixDQUFDLE1BQU07SUFDTCxPQUFPLEtBQUs7RUFDZDtBQUNGO0FBRUEsU0FBUyxPQUFPLENBQUMsU0FBUyxFQUFFO0VBQzFCLElBQUksUUFBUSxHQUNWLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDN0UsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO0lBQ2hCLFdBQVcsQ0FBQyxDQUFDO0VBQ2YsQ0FBQyxNQUFNO0lBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUztJQUNoQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUM5QjtBQUNGO0FBRUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUM5RCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0FBQ3pDLENBQUMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDOUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFFRixTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7RUFDekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0VBQ3BDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLEdBQUc7RUFDNUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sSUFBSSxPQUFPLEdBQUcsQ0FBQztFQUNyRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQUUsTUFBTSxFQUFFO0VBQUssQ0FBQyxDQUFDO0VBQ2pELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0IsTUFBTSxFQUFFLElBQUk7SUFDWixNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsUUFBUSxXQUFBLFNBQUEsRUFBRztNQUNULElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQy9EO0VBQ0YsQ0FBQyxDQUFDO0VBQ0YsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQztFQUNsQyxJQUFJLElBQUksR0FBRyxDQUFDO0VBQ1osSUFBSSxDQUFDO0VBQ0wsSUFBSSxLQUFLO0VBQ1QsSUFBSSxJQUFJO0VBRVIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7SUFBRSxRQUFRLEVBQUUsR0FBRztJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsS0FBSyxFQUFFO0VBQUUsQ0FBQyxDQUFDO0VBRXhELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3RCLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU07SUFDeEIsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDbkIsSUFBSSxHQUFHLENBQUMsR0FBRyxPQUFPO0lBQ2xCLFdBQVcsQ0FDUixNQUFNLENBQ0wsSUFBSSxFQUNKO01BQUUsS0FBSyxFQUFFLENBQUM7TUFBRSxPQUFPLEVBQUU7SUFBRSxDQUFDLEVBQ3hCO01BQ0UsS0FBSyxFQUFFLENBQUM7TUFDUixPQUFPLEVBQUUsQ0FBQztNQUNWLE1BQU0sRUFBRSxHQUFHO01BQ1gsUUFBUSxFQUFFLEdBQUc7TUFDYixJQUFJLEVBQUUsSUFBSTtNQUNWLE1BQU0sRUFBRSxDQUFDO01BQ1QsSUFBSSxFQUFFLFdBQVc7TUFDakIsZUFBZSxFQUFFO0lBQ25CLENBQUMsRUFDRCxJQUNGLENBQUMsQ0FDQSxNQUFNLENBQ0wsSUFBSSxFQUNKO01BQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHO0lBQUksQ0FBQyxFQUMxQztNQUNFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRztNQUN4QyxRQUFRLEVBQUUsQ0FBQztNQUNYLElBQUksRUFBRSxNQUFNO01BQ1osZUFBZSxFQUFFO0lBQ25CLENBQUMsRUFDRCxJQUNGLENBQUM7SUFDSCxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDO0VBQzFEO0VBRUEsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7RUFDM0IsWUFBWSxDQUNULEVBQUUsQ0FBQyxXQUFXLEVBQUU7SUFDZixJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxRQUFRLEdBQUcsU0FBUztJQUM5QixJQUFJLEVBQUU7RUFDUixDQUFDLENBQUMsQ0FDRCxNQUFNLENBQ0wsV0FBVyxFQUNYO0lBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPLEdBQUc7RUFBRSxDQUFDLEVBQy9CO0lBQ0UsSUFBSSxFQUFFLFNBQVM7SUFDZixRQUFRLEVBQUUsU0FBUyxJQUFJLE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLGVBQWUsRUFBRSxLQUFLO0lBQ3RCLElBQUksRUFBRTtFQUNSLENBQ0YsQ0FBQztFQUNILE9BQU8sWUFBWTtBQUNyQjs7Ozs7QUNsSEEsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztBQUN0RCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUMvQyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUNuRCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUNuRCxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUN2RCxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUN2RCxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUN2RCxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUMzRCxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztBQUN6RCxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7QUFDbkUsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0FBQ25FLElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztBQUN2RSxJQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7QUFFckUsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHO0FBRXBDLElBQUksY0FBYyxHQUFHLENBQUM7QUFDdEIsSUFBSSxXQUFXLEdBQUcsS0FBSzs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNLGVBQWUsR0FBRyxTQUFsQixlQUFlLENBQUksS0FBSyxFQUFLO0VBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztFQUU5QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxDQUFDO0lBQUUsUUFBUSxFQUFFO0VBQVMsQ0FBQyxDQUFDO0VBQ3RELGNBQWMsR0FBRyxLQUFLO0VBRXRCLElBQUksY0FBYyxLQUFLLENBQUMsRUFBRTtJQUN4QixJQUFJLElBQUksRUFBRTtNQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUM7SUFDM0I7SUFFQTtFQUNGO0VBRUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQztBQUMzQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLElBQU0sZUFBZSxHQUFHLFNBQWxCLGVBQWUsQ0FBQSxFQUFTO0VBQzVCLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO0lBQ2QsQ0FBQyxFQUFFLFNBQUEsRUFBQTtNQUFBLE9BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFBQTtJQUNsRCxDQUFDLEVBQUUsU0FBQSxFQUFBO01BQUEsT0FBTSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUFBO0lBQ25ELFFBQVEsRUFBRSxDQUFDO0lBQ1gsVUFBVSxFQUFFLGVBQWU7SUFDM0IsSUFBSSxFQUFFO0VBQ1IsQ0FBQyxDQUFDO0FBQ0osQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFNLFdBQVcsR0FBRyxTQUFkLFdBQVcsQ0FBQSxFQUFTO0VBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFO0lBQ2YsUUFBUSxFQUFFLEdBQUc7SUFDYixRQUFRLEVBQUUsR0FBRztJQUNiLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUU7RUFDUixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQ3RDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7RUFDL0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsbUJBQW1CO0VBQ2hELFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7RUFDakMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtFQUNoQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUN0QyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0VBQ3JFLElBQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUMvQyxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7RUFDcEQsSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO0lBQzNCLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7SUFDL0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtJQUMvQixZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxtQkFBbUI7SUFDbEQsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtJQUNoQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0VBQ3BCO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQ3hDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7RUFDL0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtFQUMvQixZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFO0VBQ2pDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG1CQUFtQjtFQUNqRCxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLEVBQUs7RUFDdEMsSUFBSSxXQUFXLEVBQUU7RUFFakIsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNoQixlQUFlLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztFQUNyQztFQUVBLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7SUFDaEIsZUFBZSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7RUFDckM7RUFFQSxRQUFRLGNBQWM7SUFDcEIsS0FBSyxDQUFDO01BQ0osVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsbUJBQW1CO01BQ2hELFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7TUFDL0IsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtNQUNqQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFO01BQ2hDO0lBRUYsS0FBSyxDQUFDO01BQ0osVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtNQUMvQixVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxtQkFBbUI7TUFDaEQsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtNQUNqQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFO01BQ2hDO0lBQ0YsS0FBSyxDQUFDO01BQ0osVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtNQUMvQixVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFO01BQy9CLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG1CQUFtQjtNQUNsRCxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFO01BQ2hDO0lBQ0YsS0FBSyxDQUFDO01BQ0osVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRTtNQUMvQixVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFO01BQy9CLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUU7TUFDakMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsbUJBQW1CO01BQ2pEO0VBQ0o7RUFFQSxXQUFXLEdBQUcsSUFBSTtFQUNsQixVQUFVLENBQUMsWUFBTTtJQUNmLFdBQVcsR0FBRyxLQUFLO0VBQ3JCLENBQUMsRUFBRSxJQUFJLENBQUM7QUFDVixDQUFDLENBQUM7QUFFRixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWTtFQUN4RCxlQUFlLENBQUMsQ0FBQztFQUNqQixXQUFXLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBTTtFQUNwQixVQUFVLENBQUMsWUFBTTtJQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxtQkFBbUI7SUFDakQsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxtQkFBbUI7RUFDeEQsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNSLENBQUM7QUFFRCxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUN2QyxZQUFZLEVBQ1osVUFBQyxLQUFLLEVBQUs7RUFDVCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUM1QixLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7RUFDeEI7QUFDRixDQUFDLEVBQ0QsS0FDRixDQUFDOzs7OztBQ2hLRCxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0FBQ2xFLElBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztBQUN0RSxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0FBQ3BFLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUM7QUFDaEUsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0FBQ3RFLElBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztBQUN0RSxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUNsRCxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUNsRCxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM5RCxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUc7QUFFekMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFDL0MsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7QUFDdkQsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7QUFFekQsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUMzRCxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO0FBQy9ELElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7QUFDL0QsSUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0FBQzVFLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7QUFFL0QsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7QUFDbkQsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztBQUVsRSxJQUFJLFlBQVksR0FBRyxJQUFJO0FBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUk7QUFDakIsSUFBSSxZQUFZLEdBQUcsSUFBSTtBQUV2QixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFLO0VBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7SUFDekIsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO01BQ3hCLElBQUksQ0FBQyxNQUFNLENBQ1QsZ0JBQWdCLEVBQ2hCO1FBQUUsQ0FBQyxFQUFFLE1BQU07UUFBRSxDQUFDLEVBQUUsQ0FBQztRQUFFLE9BQU8sRUFBRTtNQUFFLENBQUMsRUFDL0I7UUFDRSxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxPQUFPO1FBQ1YsT0FBTyxFQUFFLENBQUM7UUFDVixRQUFRLEVBQUUsQ0FBQztRQUNYLElBQUksRUFBRSxZQUFZO1FBQ2xCLFVBQVUsRUFBRSxTQUFBLFdBQUEsRUFBTTtVQUNoQixJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1lBQUUsS0FBSyxFQUFFLE9BQU87WUFBRSxRQUFRLEVBQUU7VUFBRSxDQUFDLENBQUM7VUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTztVQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHO1VBQzNCLFlBQVksR0FBRyxLQUFLO1VBQ3BCLFVBQVUsQ0FBQyxZQUFZO1lBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUc7VUFDN0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUNUO01BQ0YsQ0FDRixDQUFDO0lBQ0g7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFLO0VBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUs7SUFDekIsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO01BQ3hCLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxNQUFNLEdBQUcsSUFBSTtNQUNmO01BQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTTtNQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHO01BQzNCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU07TUFDbEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRztNQUMvQixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNO01BQ2xDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUc7TUFFL0IsSUFBSSxDQUFDLE1BQU0sQ0FDVCxjQUFjLEVBQ2Q7UUFBRSxDQUFDLEVBQUUsT0FBTztRQUFFLENBQUMsRUFBRSxDQUFDO1FBQUUsT0FBTyxFQUFFO01BQUUsQ0FBQyxFQUNoQztRQUFFLENBQUMsRUFBRSxNQUFNO1FBQUUsQ0FBQyxFQUFFLENBQUM7UUFBRSxPQUFPLEVBQUUsQ0FBQztRQUFFLFFBQVEsRUFBRSxDQUFDO1FBQUUsSUFBSSxFQUFFO01BQWEsQ0FDakUsQ0FBQztNQUVELElBQUksQ0FBQyxNQUFNLENBQ1QsZ0JBQWdCLEVBQ2hCO1FBQUUsQ0FBQyxFQUFFLEtBQUs7UUFBRSxDQUFDLEVBQUUsR0FBRztRQUFFLE9BQU8sRUFBRTtNQUFFLENBQUMsRUFDaEM7UUFBRSxDQUFDLEVBQUUsS0FBSztRQUFFLENBQUMsRUFBRSxDQUFDO1FBQUUsT0FBTyxFQUFFLENBQUM7UUFBRSxRQUFRLEVBQUUsQ0FBQztRQUFFLElBQUksRUFBRTtNQUFhLENBQ2hFLENBQUM7TUFFRCxJQUFJLENBQUMsTUFBTSxDQUNULGVBQWUsRUFDZjtRQUFFLENBQUMsRUFBRSxNQUFNO1FBQUUsQ0FBQyxFQUFFLEVBQUU7UUFBRSxPQUFPLEVBQUU7TUFBRSxDQUFDLEVBQ2hDO1FBQ0UsQ0FBQyxFQUFFLEtBQUs7UUFDUixDQUFDLEVBQUUsQ0FBQztRQUNKLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLENBQUM7UUFDWCxJQUFJLEVBQUUsWUFBWTtRQUNsQixVQUFVLEVBQUUsU0FBQSxXQUFBLEVBQU07VUFDaEIsTUFBTSxHQUFHLEtBQUs7UUFDaEI7TUFDRixDQUNGLENBQUM7SUFDSDtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sYUFBYSxHQUFHLElBQUksb0JBQW9CLENBQUMsVUFBQyxPQUFPLEVBQUs7RUFDMUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztJQUN6QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7TUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FDVCxrQkFBa0IsRUFDbEI7UUFBRSxDQUFDLEVBQUUsTUFBTTtRQUFFLENBQUMsRUFBRSxDQUFDO1FBQUUsT0FBTyxFQUFFO01BQUUsQ0FBQyxFQUMvQjtRQUNFLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLE9BQU87UUFDVixPQUFPLEVBQUUsQ0FBQztRQUNWLFFBQVEsRUFBRSxDQUFDO1FBQ1gsSUFBSSxFQUFFLFlBQVk7UUFDbEIsVUFBVSxFQUFFLFNBQUEsV0FBQSxFQUFNO1VBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUU7WUFBRSxLQUFLLEVBQUUsT0FBTztZQUFFLFFBQVEsRUFBRTtVQUFFLENBQUMsQ0FBQztVQUM1RCxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPO1VBQ25DLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUc7VUFDL0IsWUFBWSxHQUFHLEtBQUs7VUFDcEIsVUFBVSxDQUFDLFlBQVk7WUFDckIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRztVQUNqQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ1Q7TUFDRixDQUNGLENBQUM7SUFDSDtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sWUFBWSxHQUFHLElBQUksb0JBQW9CLENBQUMsVUFBQyxPQUFPLEVBQUs7RUFDekQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztJQUN6QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7TUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FDVCxpQkFBaUIsRUFDakI7UUFBRSxDQUFDLEVBQUUsTUFBTTtRQUFFLENBQUMsRUFBRSxDQUFDO1FBQUUsT0FBTyxFQUFFO01BQUUsQ0FBQyxFQUMvQjtRQUNFLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLE9BQU87UUFDVixPQUFPLEVBQUUsQ0FBQztRQUNWLFFBQVEsRUFBRSxDQUFDO1FBQ1gsSUFBSSxFQUFFLFlBQVk7UUFDbEIsVUFBVSxFQUFFLFNBQUEsV0FBQSxFQUFNO1VBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7WUFBRSxLQUFLLEVBQUUsT0FBTztZQUFFLFFBQVEsRUFBRTtVQUFFLENBQUMsQ0FBQztVQUMzRCxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPO1VBQ25DLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUc7VUFDL0IsWUFBWSxHQUFHLEtBQUs7VUFDcEIsVUFBVSxDQUFDLFlBQVk7WUFDckIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRztVQUNqQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ1Q7TUFDRixDQUNGLENBQUM7SUFDSDtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sY0FBYyxHQUFHLElBQUksb0JBQW9CLENBQUMsVUFBQyxPQUFPLEVBQUs7RUFDM0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztJQUN6QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7TUFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRTtNQUNuQixVQUFVLENBQUMsWUFBTTtRQUNmLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1VBQ3JCLFFBQVEsRUFBRSxHQUFHO1VBQ2IsUUFBUSxFQUFFLEdBQUc7VUFDYixNQUFNLEVBQUUsQ0FBQyxDQUFDO1VBQ1YsSUFBSSxFQUFFO1FBQ1IsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUU7VUFDdkIsUUFBUSxFQUFFLEdBQUc7VUFDYixRQUFRLEVBQUUsR0FBRztVQUNiLE1BQU0sRUFBRSxDQUFDLENBQUM7VUFDVixJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7O1FBRUY7UUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRTtVQUNyQixDQUFDLEVBQUUsTUFBTTtVQUNULENBQUMsRUFBRSxNQUFNO1VBQ1QsUUFBUSxFQUFFLENBQUM7VUFDWCxJQUFJLEVBQUU7UUFDUixDQUFDLENBQUM7O1FBRUY7UUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO1VBQ3hCLENBQUMsRUFBRSxLQUFLO1VBQ1IsQ0FBQyxFQUFFLE1BQU07VUFDVCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxDQUNOO2NBQUUsQ0FBQyxFQUFFLE1BQU07Y0FBRSxDQUFDLEVBQUU7WUFBSyxDQUFDLEVBQ3RCO2NBQUUsQ0FBQyxFQUFFLE1BQU07Y0FBRSxDQUFDLEVBQUU7WUFBTyxDQUFDLEVBQ3hCO2NBQUUsQ0FBQyxFQUFFLE1BQU07Y0FBRSxDQUFDLEVBQUU7WUFBTyxDQUFDO1VBRTVCLENBQUM7VUFDRCxRQUFRLEVBQUUsQ0FBQztVQUNYLElBQUksRUFBRTtRQUNSLENBQUMsQ0FBQzs7UUFFRjtRQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFO1VBQ3JCLENBQUMsRUFBRSxNQUFNO1VBQ1QsQ0FBQyxFQUFFLE1BQU07VUFDVCxRQUFRLEVBQUUsQ0FBQztVQUNYLElBQUksRUFBRSxjQUFjO1VBQ3BCLEtBQUssRUFBRTtRQUNULENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7VUFDeEIsQ0FBQyxFQUFFLEtBQUs7VUFDUixDQUFDLEVBQUUsS0FBSztVQUNSLFFBQVEsRUFBRSxDQUFDO1VBQ1gsSUFBSSxFQUFFLGNBQWM7VUFDcEIsS0FBSyxFQUFFO1FBQ1QsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtVQUN4QixDQUFDLEVBQUUsTUFBTTtVQUNULENBQUMsRUFBRSxNQUFNO1VBQ1QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsQ0FDTjtjQUFFLENBQUMsRUFBRSxNQUFNO2NBQUUsQ0FBQyxFQUFFO1lBQUssQ0FBQyxFQUN0QjtjQUFFLENBQUMsRUFBRSxNQUFNO2NBQUUsQ0FBQyxFQUFFO1lBQU8sQ0FBQyxFQUN4QjtjQUFFLENBQUMsRUFBRSxNQUFNO2NBQUUsQ0FBQyxFQUFFO1lBQU8sQ0FBQztVQUU1QixDQUFDO1VBQ0QsUUFBUSxFQUFFLENBQUM7VUFDWCxJQUFJLEVBQUUsY0FBYztVQUNwQixLQUFLLEVBQUUsR0FBRztVQUNWLFVBQVUsRUFBRSxTQUFBLFdBQUEsRUFBTTtZQUNoQixVQUFVLENBQUMsWUFBTTtjQUNmLFlBQVksR0FBRyxLQUFLO1lBQ3RCLENBQUMsRUFBRSxJQUFJLENBQUM7VUFDVjtRQUNGLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFO1VBQ3ZCLENBQUMsRUFBRSxNQUFNO1VBQ1QsS0FBSyxFQUFFLENBQUM7VUFDUixRQUFRLEVBQUUsR0FBRztVQUNiLEtBQUssRUFBRSxDQUFDO1VBQ1IsSUFBSSxFQUFFO1FBQ1IsQ0FBQyxDQUFDO01BQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNWO0VBQ0YsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsV0FBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztBQUNyQyxXQUFXLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO0FBQ3JDLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7QUFDekMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztBQUN2QyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO0FBRTNDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQzlDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXO0FBRWxDLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7QUFDM0QsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU07QUFFbEMsSUFBSSxTQUFTLEdBQUcsQ0FBQztBQUVqQixJQUFNLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBSSxLQUFLLEVBQUs7RUFDMUIsU0FBUyxHQUFHLEtBQUs7RUFDakIsSUFBSSxTQUFTLElBQUksUUFBUSxFQUFFO0lBQ3pCLElBQU0sTUFBTSxHQUFHLFVBQVUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUs7TUFDeEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLFdBQUEsTUFBQSxDQUFXLENBQUMsTUFBTSxPQUFJLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBRUY7RUFDRjtFQUNBLFNBQVMsRUFBRTtBQUNiLENBQUM7QUFFRCxJQUFNLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBQSxFQUFTO0VBQ3JCLFNBQVMsRUFBRTtFQUNYLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtJQUNqQixJQUFNLE1BQU0sR0FBRyxVQUFVLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUMzQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFLO01BQ3hCLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxXQUFBLE1BQUEsQ0FBVyxDQUFDLE1BQU0sT0FBSSxDQUFDO0lBQy9DLENBQUMsQ0FBQztJQUVGO0VBQ0Y7RUFFQSxTQUFTLEVBQUU7QUFDYixDQUFDO0FBRUQsSUFBTSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQUEsRUFBUztFQUNyQixTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNO0VBQ2hDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU07RUFDdEMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTTtBQUN2QyxDQUFDO0FBRUQsSUFBTSxhQUFhLEdBQUcsU0FBaEIsYUFBYSxDQUFBLEVBQVM7RUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTTtFQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHO0VBQzNCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU07RUFDbEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRztFQUMvQixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNO0VBQ2xDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUc7RUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtJQUN4QixDQUFDLEVBQUUsTUFBTTtJQUNULENBQUMsRUFBRSxNQUFNO0lBQ1QsS0FBSyxFQUFFLFNBQVM7SUFDaEIsUUFBUSxFQUFFO0VBQ1osQ0FBQyxDQUFDO0VBQ0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRTtJQUMxQixDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxNQUFNO0lBQ1QsS0FBSyxFQUFFLFNBQVM7SUFDaEIsUUFBUSxFQUFFO0VBQ1osQ0FBQyxDQUFDO0VBQ0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtJQUN6QixDQUFDLEVBQUUsTUFBTTtJQUNULENBQUMsRUFBRSxNQUFNO0lBQ1QsS0FBSyxFQUFFLFNBQVM7SUFDaEIsUUFBUSxFQUFFO0VBQ1osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQy9DLElBQUksTUFBTSxFQUFFO0VBQ1osYUFBYSxDQUFDLENBQUM7RUFDZixTQUFTLENBQUMsR0FBRyxHQUFHLHVCQUF1QjtFQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQzlDLElBQUksTUFBTSxFQUFFO0VBQ1osYUFBYSxDQUFDLENBQUM7RUFDZixTQUFTLENBQUMsR0FBRyxHQUFHLHVCQUF1QjtFQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQzdDLElBQUksTUFBTSxFQUFFO0VBQ1osYUFBYSxDQUFDLENBQUM7RUFDZixTQUFTLENBQUMsR0FBRyxHQUFHLHVCQUF1QjtFQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQTtBQUNBLElBQU0saUJBQWlCLEdBQUcsU0FBcEIsaUJBQWlCLENBQUEsRUFBUztFQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRTtJQUN0QixRQUFRLEVBQUUsR0FBRztJQUNiLFFBQVEsRUFBRSxHQUFHO0lBQ2IsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNWLElBQUksRUFBRTtFQUNSLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDdEMsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztFQUNyRSxJQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7RUFDL0MsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0VBQ3BELElBQUksUUFBUSxFQUFFO0lBQ1osSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO01BQzNCLGNBQWMsQ0FBQyxDQUFDLENBQUM7TUFDakIsU0FBUyxDQUFDLEdBQUcsR0FBRyx1QkFBdUI7SUFDekM7RUFDRjtFQUNBLElBQUksWUFBWSxFQUFFO0VBRWxCLFlBQVksR0FBRyxJQUFJO0VBQ25CLElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtJQUMzQixhQUFhLENBQUMsQ0FBQztJQUNmLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDWCxTQUFTLENBQUMsR0FBRyxHQUFHLHVCQUF1QjtFQUN6QztBQUNGLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBTTtFQUN0QyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVc7QUFDaEMsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7QUFDdEQsSUFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsV0FBVztBQUU5QyxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7QUFDbkUsSUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsTUFBTTtBQUU5QyxJQUFJLGVBQWUsR0FBRyxDQUFDO0FBRXZCLElBQU0sY0FBYyxHQUFHLFNBQWpCLGNBQWMsQ0FBSSxLQUFLLEVBQUs7RUFDaEMsZUFBZSxHQUFHLEtBQUs7RUFDdkIsSUFBSSxlQUFlLElBQUksY0FBYyxFQUFFO0lBQ3JDLElBQU0sTUFBTSxHQUFHLGdCQUFnQixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDdkQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFLO01BQzlCLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxXQUFBLE1BQUEsQ0FBVyxDQUFDLE1BQU0sT0FBSSxDQUFDO0lBQy9DLENBQUMsQ0FBQztJQUVGO0VBQ0Y7RUFDQSxlQUFlLEVBQUU7QUFDbkIsQ0FBQztBQUVELElBQU0sY0FBYyxHQUFHLFNBQWpCLGNBQWMsQ0FBQSxFQUFTO0VBQzNCLGVBQWUsRUFBRTtFQUNqQixJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUU7SUFDdkIsSUFBTSxNQUFNLEdBQUcsZ0JBQWdCLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztJQUN2RCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUs7TUFDOUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLFdBQUEsTUFBQSxDQUFXLENBQUMsTUFBTSxPQUFJLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBRUY7RUFDRjtFQUVBLGVBQWUsRUFBRTtBQUNuQixDQUFDO0FBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVk7RUFDeEQsaUJBQWlCLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUM7O0FBRUY7QUFDQSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDNUMsU0FBUyxDQUFDLEdBQUcsR0FBRyx1QkFBdUI7RUFDdkMsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUM7O0FBRUY7QUFDQSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUMvQyxTQUFTLENBQUMsR0FBRyxHQUFHLHVCQUF1QjtFQUN2QyxjQUFjLENBQUMsQ0FBQyxDQUFDO0FBQ25CLENBQUMsQ0FBQzs7QUFFRjtBQUNBLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQy9DLFNBQVMsQ0FBQyxHQUFHLEdBQUcsdUJBQXVCO0VBQ3ZDLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcbmNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnRfcG9pbnQnKVxuY29uc3Qgc2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbGluZy10ZXh0JylcbmNvbnN0IGVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdG9wX3BvaW50JylcbmNvbnN0IGxpbmVMYXN0SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV9mb3VyIDpmaXJzdC1jaGlsZCcpXG5sZXQgYW5pbWF0aW9uUGF1c2VkXG5cbndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBzY3JvbGwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCdcbiAgYW5pbWF0aW9uUGF1c2VkID0gdHJ1ZVxufSlcblxuY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncnVubmluZydcbiAgICAgICAgYW5pbWF0aW9uUGF1c2VkID0gZmFsc2VcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJFbmQgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJ1xuICAgICAgICBhbmltYXRpb25QYXVzZWQgPSB0cnVlXG4gICAgICAgIGxpbmVMYXN0SW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy90b3Auc3ZnJ1xuICAgICAgfSwgMTUwMClcbiAgICB9XG4gIH0pXG59KVxuXG5vYnNlcnZlci5vYnNlcnZlKHRhcmdldEVsZW1lbnQpXG5vYnNlcnZlckVuZC5vYnNlcnZlKGVuZClcblxubGluZUxhc3RJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lTGFzdEltYWdlLnNyYy5zcGxpdCgnLycpXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cblxuICBpZiAoaW1hZ2VTcmMgPT09ICdkb3duLnN2ZycpIHJldHVyblxuXG4gIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICB9KVxuXG4gIGxpbmVMYXN0SW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2Zydcbn0pXG4iLCJsZXQgaXRlcmF0aW9uID0gMFxuXG5jb25zdCBzcGFjaW5nID0gMC4wNlxuY29uc3Qgc25hcCA9IGdzYXAudXRpbHMuc25hcChzcGFjaW5nKVxuY29uc3QgY2FyZHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5jYXJkcyBsaScpXG5jb25zdCBzZWFtbGVzc0xvb3AgPSBidWlsZFNlYW1sZXNzTG9vcChjYXJkcywgc3BhY2luZylcbmNvbnN0IHNjcnViID0gZ3NhcC50byhzZWFtbGVzc0xvb3AsIHtcbiAgdG90YWxUaW1lOiAwLFxuICBkdXJhdGlvbjogMC41LFxuICBlYXNlOiAncG93ZXIzJyxcbiAgcGF1c2VkOiB0cnVlLFxufSlcblxuZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2UoKSB7XG4gIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuXG4gIGlmICh2aWV3cG9ydFdpZHRoIDw9IDc2OCkge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gc2NydWJUbyh0b3RhbFRpbWUpIHtcbiAgbGV0IHByb2dyZXNzID1cbiAgICAodG90YWxUaW1lIC0gc2VhbWxlc3NMb29wLmR1cmF0aW9uKCkgKiBpdGVyYXRpb24pIC8gc2VhbWxlc3NMb29wLmR1cmF0aW9uKClcbiAgaWYgKHByb2dyZXNzID4gMSkge1xuICAgIHdyYXBGb3J3YXJkKClcbiAgfSBlbHNlIHtcbiAgICBzY3J1Yi52YXJzLnRvdGFsVGltZSA9IHRvdGFsVGltZVxuICAgIHNjcnViLmludmFsaWRhdGUoKS5yZXN0YXJ0KClcbiAgfVxufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzY3J1YlRvKHNjcnViLnZhcnMudG90YWxUaW1lICsgc3BhY2luZylcbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHNjcnViVG8oc2NydWIudmFycy50b3RhbFRpbWUgLSBzcGFjaW5nKVxufSlcblxuZnVuY3Rpb24gYnVpbGRTZWFtbGVzc0xvb3AoaXRlbXMsIHNwYWNpbmcpIHtcbiAgbGV0IG92ZXJsYXAgPSBNYXRoLmNlaWwoMSAvIHNwYWNpbmcpXG4gIGxldCBzdGFydFRpbWUgPSBpdGVtcy5sZW5ndGggKiBzcGFjaW5nICsgMC41XG4gIGxldCBsb29wVGltZSA9IChpdGVtcy5sZW5ndGggKyBvdmVybGFwKSAqIHNwYWNpbmcgKyAxXG4gIGxldCByYXdTZXF1ZW5jZSA9IGdzYXAudGltZWxpbmUoeyBwYXVzZWQ6IHRydWUgfSlcbiAgbGV0IHNlYW1sZXNzTG9vcCA9IGdzYXAudGltZWxpbmUoe1xuICAgIHBhdXNlZDogdHJ1ZSxcbiAgICByZXBlYXQ6IC0xLFxuICAgIG9uUmVwZWF0KCkge1xuICAgICAgdGhpcy5fdGltZSA9PT0gdGhpcy5fZHVyICYmICh0aGlzLl90VGltZSArPSB0aGlzLl9kdXIgLSAwLjAxKVxuICAgIH0sXG4gIH0pXG4gIGxldCBsID0gaXRlbXMubGVuZ3RoICsgb3ZlcmxhcCAqIDJcbiAgbGV0IHRpbWUgPSAwXG4gIGxldCBpXG4gIGxldCBpbmRleFxuICBsZXQgaXRlbVxuXG4gIGdzYXAuc2V0KGl0ZW1zLCB7IHhQZXJjZW50OiA0MDAsIG9wYWNpdHk6IDAsIHNjYWxlOiAwIH0pXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGluZGV4ID0gaSAlIGl0ZW1zLmxlbmd0aFxuICAgIGl0ZW0gPSBpdGVtc1tpbmRleF1cbiAgICB0aW1lID0gaSAqIHNwYWNpbmdcbiAgICByYXdTZXF1ZW5jZVxuICAgICAgLmZyb21UbyhcbiAgICAgICAgaXRlbSxcbiAgICAgICAgeyBzY2FsZTogMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB6SW5kZXg6IDEwMCxcbiAgICAgICAgICBkdXJhdGlvbjogMC41LFxuICAgICAgICAgIHlveW86IHRydWUsXG4gICAgICAgICAgcmVwZWF0OiAxLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjEuaW4nLFxuICAgICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWUsXG4gICAgICApXG4gICAgICAuZnJvbVRvKFxuICAgICAgICBpdGVtLFxuICAgICAgICB7IHhQZXJjZW50OiBpc01vYmlsZURldmljZSgpID8gMTAwIDogNDAwIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4UGVyY2VudDogaXNNb2JpbGVEZXZpY2UoKSA/IC0xMDAgOiAtNDAwLFxuICAgICAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgICAgIGVhc2U6ICdub25lJyxcbiAgICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB0aW1lLFxuICAgICAgKVxuICAgIGkgPD0gaXRlbXMubGVuZ3RoICYmIHNlYW1sZXNzTG9vcC5hZGQoJ2xhYmVsJyArIGksIHRpbWUpXG4gIH1cblxuICByYXdTZXF1ZW5jZS50aW1lKHN0YXJ0VGltZSlcbiAgc2VhbWxlc3NMb29wXG4gICAgLnRvKHJhd1NlcXVlbmNlLCB7XG4gICAgICB0aW1lOiBsb29wVGltZSxcbiAgICAgIGR1cmF0aW9uOiBsb29wVGltZSAtIHN0YXJ0VGltZSxcbiAgICAgIGVhc2U6ICdub25lJyxcbiAgICB9KVxuICAgIC5mcm9tVG8oXG4gICAgICByYXdTZXF1ZW5jZSxcbiAgICAgIHsgdGltZTogb3ZlcmxhcCAqIHNwYWNpbmcgKyAxIH0sXG4gICAgICB7XG4gICAgICAgIHRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgZHVyYXRpb246IHN0YXJ0VGltZSAtIChvdmVybGFwICogc3BhY2luZyArIDEpLFxuICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgICBlYXNlOiAnbm9uZScsXG4gICAgICB9LFxuICAgIClcbiAgcmV0dXJuIHNlYW1sZXNzTG9vcFxufVxuIiwiY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbicpXG5jb25zdCBtYXJzSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcnMnKVxuY29uc3QgbGluZU9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX29uZScpXG5jb25zdCBsaW5lVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvJylcbmNvbnN0IGxpbmVUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3RocmVlJylcbmNvbnN0IHNlY3Rpb25PbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2Vfb25lJylcbmNvbnN0IHNlY3Rpb25Ud28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdHdvJylcbmNvbnN0IHNlY3Rpb25UaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90aHJlZScpXG5jb25zdCBzZWN0aW9uRm91ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9mb3VyJylcbmNvbnN0IHNlY3Rpb25PbmVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2Vfb25lX21faW1nJylcbmNvbnN0IHNlY3Rpb25Ud29Nb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdHdvX21faW1nJylcbmNvbnN0IHNlY3Rpb25UaHJlZU1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90aHJlZV9tX2ltZycpXG5jb25zdCBzZWN0aW9uRm91ck1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9mb3VyX21faW1nJylcblxuY29uc3QgaXNQYyA9IHdpbmRvdy5pbm5lcldpZHRoID4gNzY3XG5cbmxldCBjdXJyZW50U2VjdGlvbiA9IDBcbmxldCBpc1Njcm9sbGluZyA9IGZhbHNlXG5cbi8qKlxuICog7Iqk7YGs66GkIO2VqOyImFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKi9cbmNvbnN0IHNjcm9sbFRvU2VjdGlvbiA9IChpbmRleCkgPT4ge1xuICBjb25zb2xlLmxvZygnSU5ERVggOiAnLCBpbmRleClcblxuICBzZWN0aW9uc1tpbmRleF0uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSlcbiAgY3VycmVudFNlY3Rpb24gPSBpbmRleFxuXG4gIGlmIChjdXJyZW50U2VjdGlvbiAhPT0gMCkge1xuICAgIGlmIChpc1BjKSB7XG4gICAgICBtYXJzSW1nLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgfVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBtYXJzSW1nLnN0eWxlLm9wYWNpdHkgPSAxXG59XG5cbi8qKlxuICog7Jqw7KO87J24IOyVoOuLiOuplOydtOyFmCDtlajsiJhcbiAqL1xuY29uc3QgYW5pbWF0ZVJhbmRvbWx5ID0gKCkgPT4ge1xuICBnc2FwLnRvKCcjbWFuJywge1xuICAgIHg6ICgpID0+IE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVyV2lkdGggLSAxMDApLFxuICAgIHk6ICgpID0+IE1hdGgucmFuZG9tKCkgKiAod2luZG93LmlubmVySGVpZ2h0IC0gMTAwKSxcbiAgICBkdXJhdGlvbjogNyxcbiAgICBvbkNvbXBsZXRlOiBhbmltYXRlUmFuZG9tbHksXG4gICAgZWFzZTogJ25vbmUnLFxuICB9KVxufVxuXG4vKipcbiAqIO2ZlOyEsSDslaDri4jrqZTsnbTshZhcbiAqL1xuY29uc3QgYW5pbWF0ZU1hcnMgPSAoKSA9PiB7XG4gIGdzYXAudG8oJyNtYXJzJywge1xuICAgIHJvdGF0aW9uOiAzNjAsXG4gICAgZHVyYXRpb246IDE4MCxcbiAgICByZXBlYXQ6IC0xLFxuICAgIGVhc2U6ICdsaW5lYXInLFxuICB9KVxufVxuXG5saW5lT25lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2Nyb2xsVG9TZWN0aW9uKDEpXG59KVxuXG5saW5lVHdvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBsaW5lVHdvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28gOmZpcnN0LWNoaWxkJylcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lVHdvSW1hZ2Uuc3JjLnNwbGl0KCcvJylcbiAgY29uc3QgaW1hZ2VTcmMgPSBpbWFnZVNyY0FycltpbWFnZVNyY0Fyci5sZW5ndGggLSAxXVxuICBpZiAoaW1hZ2VTcmMgPT09ICdkb3duLnN2ZycpIHtcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzY3JvbGxUb1NlY3Rpb24oMilcbiAgfVxufSlcblxubGluZVRocmVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgc2Nyb2xsVG9TZWN0aW9uKDMpXG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuICBpZiAoaXNTY3JvbGxpbmcpIHJldHVyblxuXG4gIGlmIChlLmRlbHRhWSA+IDApIHtcbiAgICBzY3JvbGxUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gKyAxKVxuICB9XG5cbiAgaWYgKGUuZGVsdGFZIDwgMCkge1xuICAgIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiAtIDEpXG4gIH1cblxuICBzd2l0Y2ggKGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgY2FzZSAwOlxuICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAxOlxuICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBicmVha1xuICAgIGNhc2UgMjpcbiAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlIDM6XG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgIGJyZWFrXG4gIH1cblxuICBpc1Njcm9sbGluZyA9IHRydWVcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaXNTY3JvbGxpbmcgPSBmYWxzZVxuICB9LCAxMDAwKVxufSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgYW5pbWF0ZVJhbmRvbWx5KClcbiAgYW5pbWF0ZU1hcnMoKVxufSlcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb25lID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICB9LCAzMClcbn1cblxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICd0b3VjaHN0YXJ0JyxcbiAgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfSxcbiAgZmFsc2UsXG4pXG4iLCJjb25zdCBtb3ZpbmdUZXh0TGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1sZWZ0JylcbmNvbnN0IG1vdmluZ1RleHRDZW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtY2VudGVyJylcbmNvbnN0IG1vdmluZ1RleHRSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1yaWdodCcpXG5jb25zdCBtb3ZpbmdUZXh0VG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LXRvcCcpXG5jb25zdCBtb3ZpbmdUZXh0TWlkZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LW1pZGRsZScpXG5jb25zdCBtb3ZpbmdUZXh0Qm90dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LWJvdHRvbScpXG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKVxuY29uc3QgbWFyc0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcnMyJylcbmNvbnN0IG1vYmlsZU1hcnNJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGVfbWFycycpXG5jb25zdCBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2N1xuXG5jb25zdCBub2RlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGUnKVxuY29uc3Qgbm9kZURpdkZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZV90d28nKVxuY29uc3Qgbm9kZURpdkZpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZV90aHJlZScpXG5cbmNvbnN0IHRhcmdldEVsZW1lbnRPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93ZScpXG5jb25zdCB0YXJnZXRFbGVtZW50VHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3by1jb250ZW50JylcbmNvbnN0IHRhcmdldEVsZW1lbnRUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlX3doYXQnKVxuY29uc3QgdGFyZ2V0RWxlbWVudE1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb24tY29udGFpbmVyLU0nKVxuY29uc3QgdGFyZ2V0RWxlbWVudEZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93aGVyZScpXG5cbmNvbnN0IGxpbmVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28nKVxuY29uc3QgbGluZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXG5cbmxldCBpc01vdmVTbGlkZXIgPSB0cnVlXG5sZXQgaXNNb3ZlID0gdHJ1ZVxubGV0IGlzTW9iaWxlTW92ZSA9IHRydWVcblxuY29uc3Qgb2JzZXJ2ZXJPbmUgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIHRhcmdldEVsZW1lbnRPbmUsXG4gICAgICAgIHsgeDogJzUwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnMCcsXG4gICAgICAgICAgeTogJy01MDAlJyxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBnc2FwLnRvKHRhcmdldEVsZW1lbnRPbmUsIHsgY29sb3I6ICd3aGl0ZScsIGR1cmF0aW9uOiAxIH0pXG4gICAgICAgICAgICBub2RlRGl2LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgICAgICAgIGlzTW92ZVNsaWRlciA9IGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzEnXG4gICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlclR3byA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBpZiAoIWlzTW92ZSkge1xuICAgICAgICBpc01vdmUgPSB0cnVlXG4gICAgICB9XG4gICAgICBub2RlRGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgbm9kZURpdkZvdXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xuXG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgbW92aW5nVGV4dExlZnQsXG4gICAgICAgIHsgeDogJy01MDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7IHg6ICctMjAlJywgeTogMCwgb3BhY2l0eTogMSwgZHVyYXRpb246IDUsIGVhc2U6ICdwb3dlcjIub3V0JyB9LFxuICAgICAgKVxuXG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgbW92aW5nVGV4dENlbnRlcixcbiAgICAgICAgeyB4OiAnMzAlJywgeTogMzAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgIHsgeDogJzMwJScsIHk6IDAsIG9wYWNpdHk6IDEsIGR1cmF0aW9uOiA1LCBlYXNlOiAncG93ZXIyLm91dCcgfSxcbiAgICAgIClcblxuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIG1vdmluZ1RleHRSaWdodCxcbiAgICAgICAgeyB4OiAnNDAwJScsIHk6IDQwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnNDAlJyxcbiAgICAgICAgICB5OiAwLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGlzTW92ZSA9IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlclRocmVlID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICB0YXJnZXRFbGVtZW50VGhyZWUsXG4gICAgICAgIHsgeDogJzEwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnMCcsXG4gICAgICAgICAgeTogJy01MDAlJyxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBnc2FwLnRvKHRhcmdldEVsZW1lbnRUaHJlZSwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcbiAgICAgICAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyRm91ciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgdGFyZ2V0RWxlbWVudEZvdXIsXG4gICAgICAgIHsgeDogJzUwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnMCcsXG4gICAgICAgICAgeTogJy01MDAlJyxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBnc2FwLnRvKHRhcmdldEVsZW1lbnRGb3VyLCB7IGNvbG9yOiAnd2hpdGUnLCBkdXJhdGlvbjogMSB9KVxuICAgICAgICAgICAgbm9kZURpdkZvdXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgICAgICAgIGlzTW92ZVNsaWRlciA9IGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJNb2JpbGUgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgaWYgKCFpc01vYmlsZU1vdmUpIHJldHVyblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGdzYXAudG8oJy5iaWctY2lyY2xlJywge1xuICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXG4gICAgICAgICAgZHVyYXRpb246IDE4MCxcbiAgICAgICAgICByZXBlYXQ6IC0xLFxuICAgICAgICAgIGVhc2U6ICdsaW5lYXInLFxuICAgICAgICB9KVxuXG4gICAgICAgIGdzYXAudG8oJy5zbWFsbC1jaXJjbGUnLCB7XG4gICAgICAgICAgcm90YXRpb246IDM2MCxcbiAgICAgICAgICBkdXJhdGlvbjogMTAwLFxuICAgICAgICAgIHJlcGVhdDogLTEsXG4gICAgICAgICAgZWFzZTogJ2xpbmVhcicsXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8x67KI7Ke4IOyVoOuLiOuplOydtOyFmCAn7Jqw66as64qUJ1xuICAgICAgICBnc2FwLnRvKG1vdmluZ1RleHRUb3AsIHtcbiAgICAgICAgICB4OiAnMTUwJScsXG4gICAgICAgICAgeTogJy0yMCUnLFxuICAgICAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIC8vMeuyiOynuCDslaDri4jrqZTsnbTshZggJ+yWtOuUlOyEnCdcbiAgICAgICAgZ3NhcC50byhtb3ZpbmdUZXh0TWlkZGxlLCB7XG4gICAgICAgICAgeDogJzUwJScsXG4gICAgICAgICAgeTogJzE4NSUnLFxuICAgICAgICAgIGJlemllcjoge1xuICAgICAgICAgICAgdHlwZTogJ3NvZnQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbXG4gICAgICAgICAgICAgIHsgeDogJy0yMCUnLCB5OiAnMCUnIH0sXG4gICAgICAgICAgICAgIHsgeDogJzEwMCUnLCB5OiAnLTI1JScgfSxcbiAgICAgICAgICAgICAgeyB4OiAnMTUwJScsIHk6ICctNTAlJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgICAgICB9KVxuXG4gICAgICAgIC8vMuuyiOynuCDslaDri4jrqZTsnbTshZggJ+yasOumrOqwgCdcbiAgICAgICAgZ3NhcC50byhtb3ZpbmdUZXh0VG9wLCB7XG4gICAgICAgICAgeDogJzE1MCUnLFxuICAgICAgICAgIHk6ICctNDAlJyxcbiAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcbiAgICAgICAgICBkZWxheTogMi41LFxuICAgICAgICB9KVxuXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dE1pZGRsZSwge1xuICAgICAgICAgIHg6ICc1MCUnLFxuICAgICAgICAgIHk6ICczMCUnLFxuICAgICAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgICAgICAgIGRlbGF5OiAyLjUsXG4gICAgICAgIH0pXG5cbiAgICAgICAgZ3NhcC50byhtb3ZpbmdUZXh0Qm90dG9tLCB7XG4gICAgICAgICAgeDogJy01MCUnLFxuICAgICAgICAgIHk6ICcxMDAlJyxcbiAgICAgICAgICBiZXppZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzb2Z0JyxcbiAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICB7IHg6ICctMjAlJywgeTogJzAlJyB9LFxuICAgICAgICAgICAgICB7IHg6ICcxMDAlJywgeTogJy0yNSUnIH0sXG4gICAgICAgICAgICAgIHsgeDogJzEzMCUnLCB5OiAnLTUwJScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcbiAgICAgICAgICBkZWxheTogMi41LFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpc01vYmlsZU1vdmUgPSBmYWxzZVxuICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuXG4gICAgICAgIGdzYXAudG8obW9iaWxlTWFyc0ltYWdlLCB7XG4gICAgICAgICAgeTogJy01MCUnLFxuICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAyLjUsXG4gICAgICAgICAgZGVsYXk6IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICB9KVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH0pXG59KVxuXG5vYnNlcnZlck9uZS5vYnNlcnZlKHRhcmdldEVsZW1lbnRPbmUpXG5vYnNlcnZlclR3by5vYnNlcnZlKHRhcmdldEVsZW1lbnRUd28pXG5vYnNlcnZlclRocmVlLm9ic2VydmUodGFyZ2V0RWxlbWVudFRocmVlKVxub2JzZXJ2ZXJGb3VyLm9ic2VydmUodGFyZ2V0RWxlbWVudEZvdXIpXG5vYnNlcnZlck1vYmlsZS5vYnNlcnZlKHRhcmdldEVsZW1lbnRNb2JpbGUpXG5cbmNvbnN0IHNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlJylcbmxldCBzbGlkZVdpZHRoID0gc2xpZGUuY2xpZW50V2lkdGhcblxuY29uc3Qgc2xpZGVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZV9pdGVtJylcbmNvbnN0IG1heFNsaWRlID0gc2xpZGVJdGVtcy5sZW5ndGhcblxubGV0IGN1cnJTbGlkZSA9IDFcblxuY29uc3QgbmV4dE1vdmUgPSAoc2xpZGUpID0+IHtcbiAgY3VyclNsaWRlID0gc2xpZGVcbiAgaWYgKGN1cnJTbGlkZSA8PSBtYXhTbGlkZSkge1xuICAgIGNvbnN0IG9mZnNldCA9IHNsaWRlV2lkdGggKiAoY3VyclNsaWRlIC0gMSlcbiAgICBzbGlkZUl0ZW1zLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxuICAgIH0pXG5cbiAgICByZXR1cm5cbiAgfVxuICBjdXJyU2xpZGUtLVxufVxuXG5jb25zdCBwcmV2TW92ZSA9ICgpID0+IHtcbiAgY3VyclNsaWRlLS1cbiAgaWYgKGN1cnJTbGlkZSA+IDApIHtcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoICogKGN1cnJTbGlkZSAtIDEpXG4gICAgc2xpZGVJdGVtcy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICBpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbGVmdDogJHstb2Zmc2V0fXB4YClcbiAgICB9KVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBjdXJyU2xpZGUrK1xufVxuXG5jb25zdCBkaXNhYmxlZCA9ICgpID0+IHtcbiAgdGl0bGVUZXh0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbW92aW5nVGV4dFJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbW92aW5nVGV4dExlZnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xufVxuXG5jb25zdCBoaWRlQ29tcG9uZW50ID0gKCkgPT4ge1xuICBub2RlRGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gIG5vZGVEaXZGaXZlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgZ3NhcC50byh0YXJnZXRFbGVtZW50T25lLCB7XG4gICAgeDogJzUwMCUnLFxuICAgIHk6ICc1MDAlJyxcbiAgICBjb2xvcjogJyNhMmEyYTInLFxuICAgIGR1cmF0aW9uOiAxLFxuICB9KVxuICBnc2FwLnRvKHRhcmdldEVsZW1lbnRUaHJlZSwge1xuICAgIHg6ICctMTAwJScsXG4gICAgeTogJzUwMCUnLFxuICAgIGNvbG9yOiAnI2EyYTJhMicsXG4gICAgZHVyYXRpb246IDEsXG4gIH0pXG4gIGdzYXAudG8odGFyZ2V0RWxlbWVudEZvdXIsIHtcbiAgICB4OiAnNTAwJScsXG4gICAgeTogJzUwMCUnLFxuICAgIGNvbG9yOiAnI2EyYTJhMicsXG4gICAgZHVyYXRpb246IDEsXG4gIH0pXG59XG5cbm1vdmluZ1RleHRDZW50ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChpc01vdmUpIHJldHVyblxuICBoaWRlQ29tcG9uZW50KClcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlKDMpXG59KVxuXG5tb3ZpbmdUZXh0UmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChpc01vdmUpIHJldHVyblxuICBoaWRlQ29tcG9uZW50KClcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlKDQpXG59KVxuXG5tb3ZpbmdUZXh0TGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGlzTW92ZSkgcmV0dXJuXG4gIGhpZGVDb21wb25lbnQoKVxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcbiAgbmV4dE1vdmUoMilcbn0pXG5cbi8qKlxuICog7ZmU7ISxIOyVoOuLiOuplOydtOyFmFxuICovXG5jb25zdCBhbmltYXRlTW9iaWxlTWFycyA9ICgpID0+IHtcbiAgZ3NhcC50bygnI21vYmlsZV9tYXJzJywge1xuICAgIHJvdGF0aW9uOiAzNjAsXG4gICAgZHVyYXRpb246IDE4MCxcbiAgICByZXBlYXQ6IC0xLFxuICAgIGVhc2U6ICdsaW5lYXInLFxuICB9KVxufVxuXG5saW5lQm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBsaW5lVHdvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28gOmZpcnN0LWNoaWxkJylcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lVHdvSW1hZ2Uuc3JjLnNwbGl0KCcvJylcbiAgY29uc3QgaW1hZ2VTcmMgPSBpbWFnZVNyY0FycltpbWFnZVNyY0Fyci5sZW5ndGggLSAxXVxuICBpZiAoaXNNb2JpbGUpIHtcbiAgICBpZiAoaW1hZ2VTcmMgPT09ICdsZWZ0LnN2ZycpIHtcbiAgICAgIG5leHRNb3ZlTW9iaWxlKDEpXG4gICAgICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2ZydcbiAgICB9XG4gIH1cbiAgaWYgKGlzTW92ZVNsaWRlcikgcmV0dXJuXG5cbiAgaXNNb3ZlU2xpZGVyID0gdHJ1ZVxuICBpZiAoaW1hZ2VTcmMgPT09ICdsZWZ0LnN2ZycpIHtcbiAgICBoaWRlQ29tcG9uZW50KClcbiAgICBuZXh0TW92ZSgxKVxuICAgIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2Rvd24uc3ZnJ1xuICB9XG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICBzbGlkZVdpZHRoID0gc2xpZGUuY2xpZW50V2lkdGhcbn0pXG5cbi8vICoqIE1vYmlsZVxuY29uc3Qgc2xpZGVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfbScpXG5sZXQgc2xpZGVXaWR0aE1vYmlsZSA9IHNsaWRlTW9iaWxlLmNsaWVudFdpZHRoXG5cbmNvbnN0IHNsaWRlSXRlbXNNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVfaXRlbV9tJylcbmNvbnN0IG1heFNsaWRlTW9iaWxlID0gc2xpZGVJdGVtc01vYmlsZS5sZW5ndGhcblxubGV0IGN1cnJTbGlkZU1vYmlsZSA9IDFcblxuY29uc3QgbmV4dE1vdmVNb2JpbGUgPSAoc2xpZGUpID0+IHtcbiAgY3VyclNsaWRlTW9iaWxlID0gc2xpZGVcbiAgaWYgKGN1cnJTbGlkZU1vYmlsZSA8PSBtYXhTbGlkZU1vYmlsZSkge1xuICAgIGNvbnN0IG9mZnNldCA9IHNsaWRlV2lkdGhNb2JpbGUgKiAoY3VyclNsaWRlTW9iaWxlIC0gMSlcbiAgICBzbGlkZUl0ZW1zTW9iaWxlLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxuICAgIH0pXG5cbiAgICByZXR1cm5cbiAgfVxuICBjdXJyU2xpZGVNb2JpbGUtLVxufVxuXG5jb25zdCBwcmV2TW92ZU1vYmlsZSA9ICgpID0+IHtcbiAgY3VyclNsaWRlTW9iaWxlLS1cbiAgaWYgKGN1cnJTbGlkZU1vYmlsZSA+IDApIHtcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoTW9iaWxlICogKGN1cnJTbGlkZU1vYmlsZSAtIDEpXG4gICAgc2xpZGVJdGVtc01vYmlsZS5mb3JFYWNoKChpKSA9PiB7XG4gICAgICBpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbGVmdDogJHstb2Zmc2V0fXB4YClcbiAgICB9KVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBjdXJyU2xpZGVNb2JpbGUrK1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBhbmltYXRlTW9iaWxlTWFycygpXG59KVxuXG4vLyDsmrDrpqzripQg7YG066atIOydtOuypO2KuFxubW92aW5nVGV4dFRvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlTW9iaWxlKDIpXG59KVxuXG4vLyDslrTrlJTshJwg7YG066atIOydtOuypO2KuFxubW92aW5nVGV4dE1pZGRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlTW9iaWxlKDMpXG59KVxuXG4vLyDrrLTsl4fsnYQg7YG066atIOydtOuypO2KuFxubW92aW5nVGV4dEJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlTW9iaWxlKDQpXG59KVxuIl19
