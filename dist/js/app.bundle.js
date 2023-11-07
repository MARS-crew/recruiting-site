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
var mobileFunc = function mobileFunc() {
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
    delay: 2.5
  });
  gsap.to(mobileMarsImage, {
    y: '-50%',
    scale: 1,
    duration: 2.5,
    delay: 3,
    ease: 'power2.out'
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
document.addEventListener('DOMContentLoaded', function () {
  animateMobileMars();
});

// 우리는 클릭 이벤트
movingTextTop.addEventListener('click', function () {
  hideComponent();
  lineImage.src = './images/svg/left.svg';
  nextMove(2);
});

// 어디서 클릭 이벤트
movingTextMiddle.addEventListener('click', function () {
  clickDisplay();
});

// 무엇을 클릭 이벤트
movingTextBottom.addEventListener('click', function () {
  clickDisplay();
});

},{}]},{},[3,1,4,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZW5kLmpzIiwic3JjL2pzL2dhbGxlcnkuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvaW50cm9kdWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM1RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFDdkUsSUFBSSxlQUFlO0FBRW5CLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFFBQVE7RUFDMUMsZUFBZSxHQUFHLElBQUk7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFDLE9BQU8sRUFBSztFQUNyRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0lBQ3pCLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRTtNQUN4QixVQUFVLENBQUMsWUFBTTtRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUztRQUMzQyxlQUFlLEdBQUcsS0FBSztNQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1Y7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFL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QUFDO0lBQ1gsU0FBUyxDQUFDLEdBQUcsR0FBRyx1QkFBdUI7RUFDekM7QUFDRixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQU07RUFDdEMsVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXO0FBQ2hDLENBQUMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0VBQ3hELGlCQUFpQixDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQzVDLGFBQWEsQ0FBQyxDQUFDO0VBQ2YsU0FBUyxDQUFDLEdBQUcsR0FBRyx1QkFBdUI7RUFDdkMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNiLENBQUMsQ0FBQzs7QUFFRjtBQUNBLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQy9DLFlBQVksQ0FBQyxDQUFDO0FBQ2hCLENBQUMsQ0FBQzs7QUFFRjtBQUNBLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQy9DLFlBQVksQ0FBQyxDQUFDO0FBQ2hCLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXG5jb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0X3BvaW50JylcbmNvbnN0IHNjcm9sbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGxpbmctdGV4dCcpXG5jb25zdCBlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RvcF9wb2ludCcpXG5jb25zdCBsaW5lTGFzdEltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfZm91ciA6Zmlyc3QtY2hpbGQnKVxubGV0IGFuaW1hdGlvblBhdXNlZFxuXG53aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgc2Nyb2xsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnXG4gIGFuaW1hdGlvblBhdXNlZCA9IHRydWVcbn0pXG5cbmNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3J1bm5pbmcnXG4gICAgICAgIGFuaW1hdGlvblBhdXNlZCA9IGZhbHNlXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyRW5kID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCdcbiAgICAgICAgYW5pbWF0aW9uUGF1c2VkID0gdHJ1ZVxuICAgICAgICBsaW5lTGFzdEltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvdG9wLnN2ZydcbiAgICAgIH0sIDE1MDApXG4gICAgfVxuICB9KVxufSlcblxub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRFbGVtZW50KVxub2JzZXJ2ZXJFbmQub2JzZXJ2ZShlbmQpXG5cbmxpbmVMYXN0SW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IGltYWdlU3JjQXJyID0gbGluZUxhc3RJbWFnZS5zcmMuc3BsaXQoJy8nKVxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXG5cbiAgaWYgKGltYWdlU3JjID09PSAnZG93bi5zdmcnKSByZXR1cm5cblxuICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgfSlcblxuICBsaW5lTGFzdEltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvZG93bi5zdmcnXG59KVxuIiwibGV0IGl0ZXJhdGlvbiA9IDBcblxuY29uc3Qgc3BhY2luZyA9IDAuMDZcbmNvbnN0IHNuYXAgPSBnc2FwLnV0aWxzLnNuYXAoc3BhY2luZylcbmNvbnN0IGNhcmRzID0gZ3NhcC51dGlscy50b0FycmF5KCcuY2FyZHMgbGknKVxuY29uc3Qgc2VhbWxlc3NMb29wID0gYnVpbGRTZWFtbGVzc0xvb3AoY2FyZHMsIHNwYWNpbmcpXG5jb25zdCBzY3J1YiA9IGdzYXAudG8oc2VhbWxlc3NMb29wLCB7XG4gIHRvdGFsVGltZTogMCxcbiAgZHVyYXRpb246IDAuNSxcbiAgZWFzZTogJ3Bvd2VyMycsXG4gIHBhdXNlZDogdHJ1ZSxcbn0pXG5cbmZ1bmN0aW9uIGlzTW9iaWxlRGV2aWNlKCkge1xuICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGhcblxuICBpZiAodmlld3BvcnRXaWR0aCA8PSA3NjgpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIHNjcnViVG8odG90YWxUaW1lKSB7XG4gIGxldCBwcm9ncmVzcyA9XG4gICAgKHRvdGFsVGltZSAtIHNlYW1sZXNzTG9vcC5kdXJhdGlvbigpICogaXRlcmF0aW9uKSAvIHNlYW1sZXNzTG9vcC5kdXJhdGlvbigpXG4gIGlmIChwcm9ncmVzcyA+IDEpIHtcbiAgICB3cmFwRm9yd2FyZCgpXG4gIH0gZWxzZSB7XG4gICAgc2NydWIudmFycy50b3RhbFRpbWUgPSB0b3RhbFRpbWVcbiAgICBzY3J1Yi5pbnZhbGlkYXRlKCkucmVzdGFydCgpXG4gIH1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc2NydWJUbyhzY3J1Yi52YXJzLnRvdGFsVGltZSArIHNwYWNpbmcpXG59KVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJldicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzY3J1YlRvKHNjcnViLnZhcnMudG90YWxUaW1lIC0gc3BhY2luZylcbn0pXG5cbmZ1bmN0aW9uIGJ1aWxkU2VhbWxlc3NMb29wKGl0ZW1zLCBzcGFjaW5nKSB7XG4gIGxldCBvdmVybGFwID0gTWF0aC5jZWlsKDEgLyBzcGFjaW5nKVxuICBsZXQgc3RhcnRUaW1lID0gaXRlbXMubGVuZ3RoICogc3BhY2luZyArIDAuNVxuICBsZXQgbG9vcFRpbWUgPSAoaXRlbXMubGVuZ3RoICsgb3ZlcmxhcCkgKiBzcGFjaW5nICsgMVxuICBsZXQgcmF3U2VxdWVuY2UgPSBnc2FwLnRpbWVsaW5lKHsgcGF1c2VkOiB0cnVlIH0pXG4gIGxldCBzZWFtbGVzc0xvb3AgPSBnc2FwLnRpbWVsaW5lKHtcbiAgICBwYXVzZWQ6IHRydWUsXG4gICAgcmVwZWF0OiAtMSxcbiAgICBvblJlcGVhdCgpIHtcbiAgICAgIHRoaXMuX3RpbWUgPT09IHRoaXMuX2R1ciAmJiAodGhpcy5fdFRpbWUgKz0gdGhpcy5fZHVyIC0gMC4wMSlcbiAgICB9LFxuICB9KVxuICBsZXQgbCA9IGl0ZW1zLmxlbmd0aCArIG92ZXJsYXAgKiAyXG4gIGxldCB0aW1lID0gMFxuICBsZXQgaVxuICBsZXQgaW5kZXhcbiAgbGV0IGl0ZW1cblxuICBnc2FwLnNldChpdGVtcywgeyB4UGVyY2VudDogNDAwLCBvcGFjaXR5OiAwLCBzY2FsZTogMCB9KVxuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICBpbmRleCA9IGkgJSBpdGVtcy5sZW5ndGhcbiAgICBpdGVtID0gaXRlbXNbaW5kZXhdXG4gICAgdGltZSA9IGkgKiBzcGFjaW5nXG4gICAgcmF3U2VxdWVuY2VcbiAgICAgIC5mcm9tVG8oXG4gICAgICAgIGl0ZW0sXG4gICAgICAgIHsgc2NhbGU6IDAsIG9wYWNpdHk6IDAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgekluZGV4OiAxMDAsXG4gICAgICAgICAgZHVyYXRpb246IDAuNSxcbiAgICAgICAgICB5b3lvOiB0cnVlLFxuICAgICAgICAgIHJlcGVhdDogMSxcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluJyxcbiAgICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB0aW1lLFxuICAgICAgKVxuICAgICAgLmZyb21UbyhcbiAgICAgICAgaXRlbSxcbiAgICAgICAgeyB4UGVyY2VudDogaXNNb2JpbGVEZXZpY2UoKSA/IDEwMCA6IDQwMCB9LFxuICAgICAgICB7XG4gICAgICAgICAgeFBlcmNlbnQ6IGlzTW9iaWxlRGV2aWNlKCkgPyAtMTAwIDogLTQwMCxcbiAgICAgICAgICBkdXJhdGlvbjogMSxcbiAgICAgICAgICBlYXNlOiAnbm9uZScsXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgdGltZSxcbiAgICAgIClcbiAgICBpIDw9IGl0ZW1zLmxlbmd0aCAmJiBzZWFtbGVzc0xvb3AuYWRkKCdsYWJlbCcgKyBpLCB0aW1lKVxuICB9XG5cbiAgcmF3U2VxdWVuY2UudGltZShzdGFydFRpbWUpXG4gIHNlYW1sZXNzTG9vcFxuICAgIC50byhyYXdTZXF1ZW5jZSwge1xuICAgICAgdGltZTogbG9vcFRpbWUsXG4gICAgICBkdXJhdGlvbjogbG9vcFRpbWUgLSBzdGFydFRpbWUsXG4gICAgICBlYXNlOiAnbm9uZScsXG4gICAgfSlcbiAgICAuZnJvbVRvKFxuICAgICAgcmF3U2VxdWVuY2UsXG4gICAgICB7IHRpbWU6IG92ZXJsYXAgKiBzcGFjaW5nICsgMSB9LFxuICAgICAge1xuICAgICAgICB0aW1lOiBzdGFydFRpbWUsXG4gICAgICAgIGR1cmF0aW9uOiBzdGFydFRpbWUgLSAob3ZlcmxhcCAqIHNwYWNpbmcgKyAxKSxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBmYWxzZSxcbiAgICAgICAgZWFzZTogJ25vbmUnLFxuICAgICAgfSxcbiAgICApXG4gIHJldHVybiBzZWFtbGVzc0xvb3Bcbn1cbiIsImNvbnN0IHNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY3Rpb24nKVxuY29uc3QgbWFyc0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXJzJylcbmNvbnN0IGxpbmVPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV9vbmUnKVxuY29uc3QgbGluZVR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3R3bycpXG5jb25zdCBsaW5lVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90aHJlZScpXG5jb25zdCBzZWN0aW9uT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX29uZScpXG5jb25zdCBzZWN0aW9uVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX3R3bycpXG5jb25zdCBzZWN0aW9uVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdGhyZWUnKVxuY29uc3Qgc2VjdGlvbkZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfZm91cicpXG5jb25zdCBzZWN0aW9uT25lTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX29uZV9tJylcbmNvbnN0IHNlY3Rpb25Ud29Nb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdHdvX20nKVxuY29uc3Qgc2VjdGlvblRocmVlTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX3RocmVlX20nKVxuY29uc3Qgc2VjdGlvbkZvdXJNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfZm91cl9tJylcblxuY29uc3QgaXNQYyA9IHdpbmRvdy5pbm5lcldpZHRoID4gNzY3XG5cbmxldCBjdXJyZW50U2VjdGlvbiA9IDBcbmxldCBpc1Njcm9sbGluZyA9IGZhbHNlXG5cbi8qKlxuICog7Iqk7YGs66GkIO2VqOyImFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKi9cbmNvbnN0IHNjcm9sbFRvU2VjdGlvbiA9IChpbmRleCkgPT4ge1xuICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHNlY3Rpb25zLmxlbmd0aCkge1xuICAgIHNlY3Rpb25zW2luZGV4XS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KVxuICAgIGN1cnJlbnRTZWN0aW9uID0gaW5kZXhcblxuICAgIGlmIChjdXJyZW50U2VjdGlvbiAhPT0gMCkge1xuICAgICAgaWYgKGlzUGMpIHtcbiAgICAgICAgbWFyc0ltZy5zdHlsZS5vcGFjaXR5ID0gMFxuICAgICAgfVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBtYXJzSW1nLnN0eWxlLm9wYWNpdHkgPSAxXG4gIH1cbn1cblxuLyoqXG4gKiDsmrDso7zsnbgg7JWg64uI66mU7J207IWYIO2VqOyImFxuICovXG5jb25zdCBhbmltYXRlUmFuZG9tbHkgPSAoKSA9PiB7XG4gIGdzYXAudG8oJyNtYW4nLCB7XG4gICAgeDogKCkgPT4gTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCksXG4gICAgeTogKCkgPT4gTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDApLFxuICAgIGR1cmF0aW9uOiA3LFxuICAgIG9uQ29tcGxldGU6IGFuaW1hdGVSYW5kb21seSxcbiAgICBlYXNlOiAnbm9uZScsXG4gIH0pXG59XG5cbi8qKlxuICog7ZmU7ISxIOyVoOuLiOuplOydtOyFmFxuICovXG5jb25zdCBhbmltYXRlTWFycyA9ICgpID0+IHtcbiAgZ3NhcC50bygnI21hcnMnLCB7XG4gICAgcm90YXRpb246IDM2MCxcbiAgICBkdXJhdGlvbjogMTgwLFxuICAgIHJlcGVhdDogLTEsXG4gICAgZWFzZTogJ2xpbmVhcicsXG4gIH0pXG59XG5cbmxpbmVPbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICBzY3JvbGxUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gKyAxKVxufSlcblxubGluZVR3by5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgbGluZVR3b0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXG4gIGNvbnN0IGltYWdlU3JjQXJyID0gbGluZVR3b0ltYWdlLnNyYy5zcGxpdCgnLycpXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cbiAgaWYgKGltYWdlU3JjID09PSAnZG93bi5zdmcnKSB7XG4gICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgc2Nyb2xsVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uICsgMSlcbiAgfVxuXG4gIGlmIChpbWFnZVNyYyA9PT0gJ2xlZnQuc3ZnJykge1xuICAgIGN1cnJlbnRTbGlkZSA9IDFcbiAgfVxufSlcblxubGluZVRocmVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgc2Nyb2xsVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uICsgMSlcbn0pXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XG4gIGlmIChpc1Njcm9sbGluZykgcmV0dXJuXG5cbiAgaWYgKGUuZGVsdGFZID4gMCkge1xuICAgIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpXG4gIH1cblxuICBpZiAoZS5kZWx0YVkgPCAwKSB7XG4gICAgc2Nyb2xsVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uIC0gMSlcbiAgfVxuXG4gIHN3aXRjaCAoY3VycmVudFNlY3Rpb24pIHtcbiAgICBjYXNlIDA6XG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlIDE6XG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAyOlxuICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBicmVha1xuICAgIGNhc2UgMzpcbiAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgYnJlYWtcbiAgfVxuXG4gIGlzU2Nyb2xsaW5nID0gdHJ1ZVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpc1Njcm9sbGluZyA9IGZhbHNlXG4gIH0sIDEwMDApXG59KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBhbmltYXRlUmFuZG9tbHkoKVxuICBhbmltYXRlTWFycygpXG59KVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMClcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICBzZWN0aW9uT25lTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgfSwgMzApXG59XG5cbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAndG91Y2hzdGFydCcsXG4gIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH0sXG4gIGZhbHNlLFxuKVxuIiwiY29uc3QgbW92aW5nVGV4dExlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtbGVmdCcpXG5jb25zdCBtb3ZpbmdUZXh0Q2VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LWNlbnRlcicpXG5jb25zdCBtb3ZpbmdUZXh0UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtcmlnaHQnKVxuY29uc3QgbW92aW5nVGV4dFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC10b3AnKVxuY29uc3QgbW92aW5nVGV4dE1pZGRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1taWRkbGUnKVxuY29uc3QgbW92aW5nVGV4dEJvdHRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1ib3R0b20nKVxuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJylcbmNvbnN0IG1hcnNJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXJzMicpXG5jb25zdCBtb2JpbGVNYXJzSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX21hcnMnKVxuY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjdcblxuY29uc3Qgbm9kZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub2RlJylcbmNvbnN0IG5vZGVEaXZGb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGVfdHdvJylcbmNvbnN0IG5vZGVEaXZGaXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGVfdGhyZWUnKVxuXG5jb25zdCB0YXJnZXRFbGVtZW50T25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2UnKVxuY29uc3QgdGFyZ2V0RWxlbWVudFR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50d28tY29udGVudCcpXG5jb25zdCB0YXJnZXRFbGVtZW50VGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93aGF0JylcbmNvbnN0IHRhcmdldEVsZW1lbnRNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uLWNvbnRhaW5lci1NJylcbmNvbnN0IHRhcmdldEVsZW1lbnRGb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2hlcmUnKVxuXG5jb25zdCBsaW5lQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvJylcbmNvbnN0IGxpbmVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3R3byA6Zmlyc3QtY2hpbGQnKVxuXG5sZXQgaXNNb3ZlU2xpZGVyID0gdHJ1ZVxubGV0IGlzTW92ZSA9IHRydWVcblxuY29uc3QgbW9iaWxlRnVuYyA9ICgpID0+IHtcbiAgZ3NhcC50bygnLmJpZy1jaXJjbGUnLCB7XG4gICAgcm90YXRpb246IDM2MCxcbiAgICBkdXJhdGlvbjogMTgwLFxuICAgIHJlcGVhdDogLTEsXG4gICAgZWFzZTogJ2xpbmVhcicsXG4gIH0pXG5cbiAgZ3NhcC50bygnLnNtYWxsLWNpcmNsZScsIHtcbiAgICByb3RhdGlvbjogMzYwLFxuICAgIGR1cmF0aW9uOiAxMDAsXG4gICAgcmVwZWF0OiAtMSxcbiAgICBlYXNlOiAnbGluZWFyJyxcbiAgfSlcblxuICAvLzHrsojsp7gg7JWg64uI66mU7J207IWYICfsmrDrpqzripQnXG4gIGdzYXAudG8obW92aW5nVGV4dFRvcCwge1xuICAgIHg6ICcxNTAlJyxcbiAgICB5OiAnLTIwJScsXG4gICAgZHVyYXRpb246IDIsXG4gICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gIH0pXG5cbiAgLy8gLy8x67KI7Ke4IOyVoOuLiOuplOydtOyFmCAn7Ja065SU7IScJ1xuICBnc2FwLnRvKG1vdmluZ1RleHRNaWRkbGUsIHtcbiAgICB4OiAnNTAlJyxcbiAgICB5OiAnMTg1JScsXG4gICAgYmV6aWVyOiB7XG4gICAgICB0eXBlOiAnc29mdCcsXG4gICAgICB2YWx1ZXM6IFtcbiAgICAgICAgeyB4OiAnLTIwJScsIHk6ICcwJScgfSxcbiAgICAgICAgeyB4OiAnMTAwJScsIHk6ICctMjUlJyB9LFxuICAgICAgICB7IHg6ICcxNTAlJywgeTogJy01MCUnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgZHVyYXRpb246IDIsXG4gICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gIH0pXG5cbiAgLy8y67KI7Ke4IOyVoOuLiOuplOydtOyFmCAn7Jqw66as6rCAJ1xuICBnc2FwLnRvKG1vdmluZ1RleHRUb3AsIHtcbiAgICB4OiAnMTUwJScsXG4gICAgeTogJy00MCUnLFxuICAgIGR1cmF0aW9uOiAyLFxuICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgIGRlbGF5OiAyLjUsXG4gIH0pXG5cbiAgZ3NhcC50byhtb3ZpbmdUZXh0TWlkZGxlLCB7XG4gICAgeDogJzUwJScsXG4gICAgeTogJzMwJScsXG4gICAgZHVyYXRpb246IDIsXG4gICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gICAgZGVsYXk6IDIuNSxcbiAgfSlcblxuICBnc2FwLnRvKG1vdmluZ1RleHRCb3R0b20sIHtcbiAgICB4OiAnLTUwJScsXG4gICAgeTogJzEwMCUnLFxuICAgIGJlemllcjoge1xuICAgICAgdHlwZTogJ3NvZnQnLFxuICAgICAgdmFsdWVzOiBbXG4gICAgICAgIHsgeDogJy0yMCUnLCB5OiAnMCUnIH0sXG4gICAgICAgIHsgeDogJzEwMCUnLCB5OiAnLTI1JScgfSxcbiAgICAgICAgeyB4OiAnMTMwJScsIHk6ICctNTAlJyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIGR1cmF0aW9uOiAyLFxuICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgIGRlbGF5OiAyLjUsXG4gIH0pXG5cbiAgZ3NhcC50byhtb2JpbGVNYXJzSW1hZ2UsIHtcbiAgICB5OiAnLTUwJScsXG4gICAgc2NhbGU6IDEsXG4gICAgZHVyYXRpb246IDIuNSxcbiAgICBkZWxheTogMyxcbiAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gIH0pXG59XG5cbmNvbnN0IG9ic2VydmVyT25lID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICB0YXJnZXRFbGVtZW50T25lLFxuICAgICAgICB7IHg6ICc1MDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzAnLFxuICAgICAgICAgIHk6ICctNTAwJScsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50T25lLCB7IGNvbG9yOiAnd2hpdGUnLCBkdXJhdGlvbjogMSB9KVxuICAgICAgICAgICAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgICAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJUd28gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgaWYgKCFpc01vdmUpIHtcbiAgICAgICAgaXNNb3ZlID0gdHJ1ZVxuICAgICAgfVxuICAgICAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMCdcblxuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIG1vdmluZ1RleHRMZWZ0LFxuICAgICAgICB7IHg6ICctNTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgeyB4OiAnLTIwJScsIHk6IDAsIG9wYWNpdHk6IDEsIGR1cmF0aW9uOiA1LCBlYXNlOiAncG93ZXIyLm91dCcgfSxcbiAgICAgIClcblxuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIG1vdmluZ1RleHRDZW50ZXIsXG4gICAgICAgIHsgeDogJzMwJScsIHk6IDMwMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7IHg6ICczMCUnLCB5OiAwLCBvcGFjaXR5OiAxLCBkdXJhdGlvbjogNSwgZWFzZTogJ3Bvd2VyMi5vdXQnIH0sXG4gICAgICApXG5cbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBtb3ZpbmdUZXh0UmlnaHQsXG4gICAgICAgIHsgeDogJzQwMCUnLCB5OiA0MCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzQwJScsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBpc01vdmUgPSBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJUaHJlZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgdGFyZ2V0RWxlbWVudFRocmVlLFxuICAgICAgICB7IHg6ICcxMDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzAnLFxuICAgICAgICAgIHk6ICctNTAwJScsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50VGhyZWUsIHsgY29sb3I6ICd3aGl0ZScsIGR1cmF0aW9uOiAxIH0pXG4gICAgICAgICAgICBub2RlRGl2Rml2ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzEnXG4gICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlckZvdXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIHRhcmdldEVsZW1lbnRGb3VyLFxuICAgICAgICB7IHg6ICc1MDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzAnLFxuICAgICAgICAgIHk6ICctNTAwJScsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50Rm91ciwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcbiAgICAgICAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyTW9iaWxlID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb2JpbGVGdW5jKClcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9KVxufSlcblxub2JzZXJ2ZXJPbmUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50T25lKVxub2JzZXJ2ZXJUd28ub2JzZXJ2ZSh0YXJnZXRFbGVtZW50VHdvKVxub2JzZXJ2ZXJUaHJlZS5vYnNlcnZlKHRhcmdldEVsZW1lbnRUaHJlZSlcbm9ic2VydmVyRm91ci5vYnNlcnZlKHRhcmdldEVsZW1lbnRGb3VyKVxub2JzZXJ2ZXJNb2JpbGUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50TW9iaWxlKVxuXG5jb25zdCBzbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZScpXG5sZXQgc2xpZGVXaWR0aCA9IHNsaWRlLmNsaWVudFdpZHRoXG5cbmNvbnN0IHNsaWRlSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVfaXRlbScpXG5jb25zdCBtYXhTbGlkZSA9IHNsaWRlSXRlbXMubGVuZ3RoXG5cbmxldCBjdXJyU2xpZGUgPSAxXG5cbmNvbnN0IG5leHRNb3ZlID0gKHNsaWRlKSA9PiB7XG4gIGN1cnJTbGlkZSA9IHNsaWRlXG4gIGlmIChjdXJyU2xpZGUgPD0gbWF4U2xpZGUpIHtcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoICogKGN1cnJTbGlkZSAtIDEpXG4gICAgc2xpZGVJdGVtcy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICBpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbGVmdDogJHstb2Zmc2V0fXB4YClcbiAgICB9KVxuXG4gICAgcmV0dXJuXG4gIH1cbiAgY3VyclNsaWRlLS1cbn1cblxuY29uc3QgcHJldk1vdmUgPSAoKSA9PiB7XG4gIGN1cnJTbGlkZS0tXG4gIGlmIChjdXJyU2xpZGUgPiAwKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aCAqIChjdXJyU2xpZGUgLSAxKVxuICAgIHNsaWRlSXRlbXMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXG4gICAgfSlcblxuICAgIHJldHVyblxuICB9XG5cbiAgY3VyclNsaWRlKytcbn1cblxuY29uc3QgZGlzYWJsZWQgPSAoKSA9PiB7XG4gIHRpdGxlVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG1vdmluZ1RleHRSaWdodC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG1vdmluZ1RleHRMZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cblxuY29uc3QgaGlkZUNvbXBvbmVudCA9ICgpID0+IHtcbiAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICBub2RlRGl2Rml2ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgbm9kZURpdkZvdXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gIGdzYXAudG8odGFyZ2V0RWxlbWVudE9uZSwge1xuICAgIHg6ICc1MDAlJyxcbiAgICB5OiAnNTAwJScsXG4gICAgY29sb3I6ICcjYTJhMmEyJyxcbiAgICBkdXJhdGlvbjogMSxcbiAgfSlcbiAgZ3NhcC50byh0YXJnZXRFbGVtZW50VGhyZWUsIHtcbiAgICB4OiAnLTEwMCUnLFxuICAgIHk6ICc1MDAlJyxcbiAgICBjb2xvcjogJyNhMmEyYTInLFxuICAgIGR1cmF0aW9uOiAxLFxuICB9KVxuICBnc2FwLnRvKHRhcmdldEVsZW1lbnRGb3VyLCB7XG4gICAgeDogJzUwMCUnLFxuICAgIHk6ICc1MDAlJyxcbiAgICBjb2xvcjogJyNhMmEyYTInLFxuICAgIGR1cmF0aW9uOiAxLFxuICB9KVxufVxuXG5tb3ZpbmdUZXh0Q2VudGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoaXNNb3ZlKSByZXR1cm5cbiAgaGlkZUNvbXBvbmVudCgpXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZSgzKVxufSlcblxubW92aW5nVGV4dFJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoaXNNb3ZlKSByZXR1cm5cbiAgaGlkZUNvbXBvbmVudCgpXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZSg0KVxufSlcblxubW92aW5nVGV4dExlZnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChpc01vdmUpIHJldHVyblxuICBoaWRlQ29tcG9uZW50KClcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlKDIpXG59KVxuXG4vKipcbiAqIO2ZlOyEsSDslaDri4jrqZTsnbTshZhcbiAqL1xuY29uc3QgYW5pbWF0ZU1vYmlsZU1hcnMgPSAoKSA9PiB7XG4gIGdzYXAudG8oJyNtb2JpbGVfbWFycycsIHtcbiAgICByb3RhdGlvbjogMzYwLFxuICAgIGR1cmF0aW9uOiAxODAsXG4gICAgcmVwZWF0OiAtMSxcbiAgICBlYXNlOiAnbGluZWFyJyxcbiAgfSlcbn1cblxubGluZUJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGlzTW92ZVNsaWRlcikgcmV0dXJuXG5cbiAgY29uc3QgbGluZVR3b0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXG4gIGNvbnN0IGltYWdlU3JjQXJyID0gbGluZVR3b0ltYWdlLnNyYy5zcGxpdCgnLycpXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cbiAgaXNNb3ZlU2xpZGVyID0gdHJ1ZVxuICBpZiAoaW1hZ2VTcmMgPT09ICdsZWZ0LnN2ZycpIHtcbiAgICBoaWRlQ29tcG9uZW50KClcbiAgICBuZXh0TW92ZSgxKVxuICAgIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2Rvd24uc3ZnJ1xuICB9XG59KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICBzbGlkZVdpZHRoID0gc2xpZGUuY2xpZW50V2lkdGhcbn0pXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGFuaW1hdGVNb2JpbGVNYXJzKClcbn0pXG5cbi8vIOyasOumrOuKlCDtgbTrpq0g7J2067Kk7Yq4XG5tb3ZpbmdUZXh0VG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBoaWRlQ29tcG9uZW50KClcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlKDIpXG59KVxuXG4vLyDslrTrlJTshJwg7YG066atIOydtOuypO2KuFxubW92aW5nVGV4dE1pZGRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY2xpY2tEaXNwbGF5KClcbn0pXG5cbi8vIOustOyXh+ydhCDtgbTrpq0g7J2067Kk7Yq4XG5tb3ZpbmdUZXh0Qm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjbGlja0Rpc3BsYXkoKVxufSlcbiJdfQ==
