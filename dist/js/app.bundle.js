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

  // gsap.to('.big-circle', {
  //   opacity: 0,
  //   scale: 0.1,
  //   delay: 2,
  //   onComplete: () => {
  //     document.querySelector('.big-circle').style.opacity = 'none'
  //   },
  // })

  // gsap.to('.small-circle', {
  //   opacity: 0,
  //   scale: 0.1,
  //   delay: 2,
  //   onComplete: () => {
  //     document.querySelector('.small-circle').style.display = 'none'
  //   },
  // })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZW5kLmpzIiwic3JjL2pzL2dhbGxlcnkuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvaW50cm9kdWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM1RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFDdkUsSUFBSSxlQUFlO0FBRW5CLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFFBQVE7RUFDMUMsZUFBZSxHQUFHLElBQUk7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFDLE9BQU8sRUFBSztFQUNyRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0lBQ3pCLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRTtNQUN4QixVQUFVLENBQUMsWUFBTTtRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUztRQUMzQyxlQUFlLEdBQUcsS0FBSztNQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1Y7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFL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QUFFLFlBQVk7RUFDeEQsaUJBQWlCLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUM7O0FBRUY7QUFDQSxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDNUMsYUFBYSxDQUFDLENBQUM7RUFDZixTQUFTLENBQUMsR0FBRyxHQUFHLHVCQUF1QjtFQUN2QyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2IsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDL0MsWUFBWSxDQUFDLENBQUM7QUFDaEIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDL0MsWUFBWSxDQUFDLENBQUM7QUFDaEIsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcbmNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnRfcG9pbnQnKVxuY29uc3Qgc2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbGluZy10ZXh0JylcbmNvbnN0IGVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdG9wX3BvaW50JylcbmNvbnN0IGxpbmVMYXN0SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV9mb3VyIDpmaXJzdC1jaGlsZCcpXG5sZXQgYW5pbWF0aW9uUGF1c2VkXG5cbndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICBzY3JvbGwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCdcbiAgYW5pbWF0aW9uUGF1c2VkID0gdHJ1ZVxufSlcblxuY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncnVubmluZydcbiAgICAgICAgYW5pbWF0aW9uUGF1c2VkID0gZmFsc2VcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJFbmQgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJ1xuICAgICAgICBhbmltYXRpb25QYXVzZWQgPSB0cnVlXG4gICAgICAgIGxpbmVMYXN0SW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy90b3Auc3ZnJ1xuICAgICAgfSwgMTUwMClcbiAgICB9XG4gIH0pXG59KVxuXG5vYnNlcnZlci5vYnNlcnZlKHRhcmdldEVsZW1lbnQpXG5vYnNlcnZlckVuZC5vYnNlcnZlKGVuZClcblxubGluZUxhc3RJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lTGFzdEltYWdlLnNyYy5zcGxpdCgnLycpXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cblxuICBpZiAoaW1hZ2VTcmMgPT09ICdkb3duLnN2ZycpIHJldHVyblxuXG4gIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICB9KVxuXG4gIGxpbmVMYXN0SW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2Zydcbn0pXG4iLCJsZXQgaXRlcmF0aW9uID0gMFxuXG5jb25zdCBzcGFjaW5nID0gMC4wNlxuY29uc3Qgc25hcCA9IGdzYXAudXRpbHMuc25hcChzcGFjaW5nKVxuY29uc3QgY2FyZHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5jYXJkcyBsaScpXG5jb25zdCBzZWFtbGVzc0xvb3AgPSBidWlsZFNlYW1sZXNzTG9vcChjYXJkcywgc3BhY2luZylcbmNvbnN0IHNjcnViID0gZ3NhcC50byhzZWFtbGVzc0xvb3AsIHtcbiAgdG90YWxUaW1lOiAwLFxuICBkdXJhdGlvbjogMC41LFxuICBlYXNlOiAncG93ZXIzJyxcbiAgcGF1c2VkOiB0cnVlLFxufSlcblxuZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2UoKSB7XG4gIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuXG4gIGlmICh2aWV3cG9ydFdpZHRoIDw9IDc2OCkge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gc2NydWJUbyh0b3RhbFRpbWUpIHtcbiAgbGV0IHByb2dyZXNzID1cbiAgICAodG90YWxUaW1lIC0gc2VhbWxlc3NMb29wLmR1cmF0aW9uKCkgKiBpdGVyYXRpb24pIC8gc2VhbWxlc3NMb29wLmR1cmF0aW9uKClcbiAgaWYgKHByb2dyZXNzID4gMSkge1xuICAgIHdyYXBGb3J3YXJkKClcbiAgfSBlbHNlIHtcbiAgICBzY3J1Yi52YXJzLnRvdGFsVGltZSA9IHRvdGFsVGltZVxuICAgIHNjcnViLmludmFsaWRhdGUoKS5yZXN0YXJ0KClcbiAgfVxufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBzY3J1YlRvKHNjcnViLnZhcnMudG90YWxUaW1lICsgc3BhY2luZylcbn0pXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHNjcnViVG8oc2NydWIudmFycy50b3RhbFRpbWUgLSBzcGFjaW5nKVxufSlcblxuZnVuY3Rpb24gYnVpbGRTZWFtbGVzc0xvb3AoaXRlbXMsIHNwYWNpbmcpIHtcbiAgbGV0IG92ZXJsYXAgPSBNYXRoLmNlaWwoMSAvIHNwYWNpbmcpXG4gIGxldCBzdGFydFRpbWUgPSBpdGVtcy5sZW5ndGggKiBzcGFjaW5nICsgMC41XG4gIGxldCBsb29wVGltZSA9IChpdGVtcy5sZW5ndGggKyBvdmVybGFwKSAqIHNwYWNpbmcgKyAxXG4gIGxldCByYXdTZXF1ZW5jZSA9IGdzYXAudGltZWxpbmUoeyBwYXVzZWQ6IHRydWUgfSlcbiAgbGV0IHNlYW1sZXNzTG9vcCA9IGdzYXAudGltZWxpbmUoe1xuICAgIHBhdXNlZDogdHJ1ZSxcbiAgICByZXBlYXQ6IC0xLFxuICAgIG9uUmVwZWF0KCkge1xuICAgICAgdGhpcy5fdGltZSA9PT0gdGhpcy5fZHVyICYmICh0aGlzLl90VGltZSArPSB0aGlzLl9kdXIgLSAwLjAxKVxuICAgIH0sXG4gIH0pXG4gIGxldCBsID0gaXRlbXMubGVuZ3RoICsgb3ZlcmxhcCAqIDJcbiAgbGV0IHRpbWUgPSAwXG4gIGxldCBpXG4gIGxldCBpbmRleFxuICBsZXQgaXRlbVxuXG4gIGdzYXAuc2V0KGl0ZW1zLCB7IHhQZXJjZW50OiA0MDAsIG9wYWNpdHk6IDAsIHNjYWxlOiAwIH0pXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIGluZGV4ID0gaSAlIGl0ZW1zLmxlbmd0aFxuICAgIGl0ZW0gPSBpdGVtc1tpbmRleF1cbiAgICB0aW1lID0gaSAqIHNwYWNpbmdcbiAgICByYXdTZXF1ZW5jZVxuICAgICAgLmZyb21UbyhcbiAgICAgICAgaXRlbSxcbiAgICAgICAgeyBzY2FsZTogMCwgb3BhY2l0eTogMCB9LFxuICAgICAgICB7XG4gICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB6SW5kZXg6IDEwMCxcbiAgICAgICAgICBkdXJhdGlvbjogMC41LFxuICAgICAgICAgIHlveW86IHRydWUsXG4gICAgICAgICAgcmVwZWF0OiAxLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjEuaW4nLFxuICAgICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWUsXG4gICAgICApXG4gICAgICAuZnJvbVRvKFxuICAgICAgICBpdGVtLFxuICAgICAgICB7IHhQZXJjZW50OiBpc01vYmlsZURldmljZSgpID8gMTAwIDogNDAwIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4UGVyY2VudDogaXNNb2JpbGVEZXZpY2UoKSA/IC0xMDAgOiAtNDAwLFxuICAgICAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgICAgIGVhc2U6ICdub25lJyxcbiAgICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB0aW1lLFxuICAgICAgKVxuICAgIGkgPD0gaXRlbXMubGVuZ3RoICYmIHNlYW1sZXNzTG9vcC5hZGQoJ2xhYmVsJyArIGksIHRpbWUpXG4gIH1cblxuICByYXdTZXF1ZW5jZS50aW1lKHN0YXJ0VGltZSlcbiAgc2VhbWxlc3NMb29wXG4gICAgLnRvKHJhd1NlcXVlbmNlLCB7XG4gICAgICB0aW1lOiBsb29wVGltZSxcbiAgICAgIGR1cmF0aW9uOiBsb29wVGltZSAtIHN0YXJ0VGltZSxcbiAgICAgIGVhc2U6ICdub25lJyxcbiAgICB9KVxuICAgIC5mcm9tVG8oXG4gICAgICByYXdTZXF1ZW5jZSxcbiAgICAgIHsgdGltZTogb3ZlcmxhcCAqIHNwYWNpbmcgKyAxIH0sXG4gICAgICB7XG4gICAgICAgIHRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgZHVyYXRpb246IHN0YXJ0VGltZSAtIChvdmVybGFwICogc3BhY2luZyArIDEpLFxuICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgICBlYXNlOiAnbm9uZScsXG4gICAgICB9LFxuICAgIClcbiAgcmV0dXJuIHNlYW1sZXNzTG9vcFxufVxuIiwiY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbicpXG5jb25zdCBtYXJzSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcnMnKVxuY29uc3QgbGluZU9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX29uZScpXG5jb25zdCBsaW5lVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvJylcbmNvbnN0IGxpbmVUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3RocmVlJylcbmNvbnN0IHNlY3Rpb25PbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2Vfb25lJylcbmNvbnN0IHNlY3Rpb25Ud28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdHdvJylcbmNvbnN0IHNlY3Rpb25UaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90aHJlZScpXG5jb25zdCBzZWN0aW9uRm91ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9mb3VyJylcbmNvbnN0IHNlY3Rpb25PbmVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2Vfb25lX20nKVxuY29uc3Qgc2VjdGlvblR3b01vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90d29fbScpXG5jb25zdCBzZWN0aW9uVGhyZWVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdGhyZWVfbScpXG5jb25zdCBzZWN0aW9uRm91ck1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9mb3VyX20nKVxuXG5jb25zdCBpc1BjID0gd2luZG93LmlubmVyV2lkdGggPiA3NjdcblxubGV0IGN1cnJlbnRTZWN0aW9uID0gMFxubGV0IGlzU2Nyb2xsaW5nID0gZmFsc2VcblxuLyoqXG4gKiDsiqTtgazroaQg7ZWo7IiYXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqL1xuY29uc3Qgc2Nyb2xsVG9TZWN0aW9uID0gKGluZGV4KSA9PiB7XG4gIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgc2VjdGlvbnMubGVuZ3RoKSB7XG4gICAgc2VjdGlvbnNbaW5kZXhdLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXG4gICAgY3VycmVudFNlY3Rpb24gPSBpbmRleFxuXG4gICAgaWYgKGN1cnJlbnRTZWN0aW9uICE9PSAwKSB7XG4gICAgICBpZiAoaXNQYykge1xuICAgICAgICBtYXJzSW1nLnN0eWxlLm9wYWNpdHkgPSAwXG4gICAgICB9XG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIG1hcnNJbWcuc3R5bGUub3BhY2l0eSA9IDFcbiAgfVxufVxuXG4vKipcbiAqIOyasOyjvOyduCDslaDri4jrqZTsnbTshZgg7ZWo7IiYXG4gKi9cbmNvbnN0IGFuaW1hdGVSYW5kb21seSA9ICgpID0+IHtcbiAgZ3NhcC50bygnI21hbicsIHtcbiAgICB4OiAoKSA9PiBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwKSxcbiAgICB5OiAoKSA9PiBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lckhlaWdodCAtIDEwMCksXG4gICAgZHVyYXRpb246IDcsXG4gICAgb25Db21wbGV0ZTogYW5pbWF0ZVJhbmRvbWx5LFxuICAgIGVhc2U6ICdub25lJyxcbiAgfSlcbn1cblxuLyoqXG4gKiDtmZTshLEg7JWg64uI66mU7J207IWYXG4gKi9cbmNvbnN0IGFuaW1hdGVNYXJzID0gKCkgPT4ge1xuICBnc2FwLnRvKCcjbWFycycsIHtcbiAgICByb3RhdGlvbjogMzYwLFxuICAgIGR1cmF0aW9uOiAxODAsXG4gICAgcmVwZWF0OiAtMSxcbiAgICBlYXNlOiAnbGluZWFyJyxcbiAgfSlcbn1cblxubGluZU9uZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpXG59KVxuXG5saW5lVHdvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBsaW5lVHdvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28gOmZpcnN0LWNoaWxkJylcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lVHdvSW1hZ2Uuc3JjLnNwbGl0KCcvJylcbiAgY29uc3QgaW1hZ2VTcmMgPSBpbWFnZVNyY0FycltpbWFnZVNyY0Fyci5sZW5ndGggLSAxXVxuICBpZiAoaW1hZ2VTcmMgPT09ICdkb3duLnN2ZycpIHtcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzY3JvbGxUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gKyAxKVxuICB9XG5cbiAgaWYgKGltYWdlU3JjID09PSAnbGVmdC5zdmcnKSB7XG4gICAgY3VycmVudFNsaWRlID0gMVxuICB9XG59KVxuXG5saW5lVGhyZWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICBzY3JvbGxUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gKyAxKVxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGUpID0+IHtcbiAgaWYgKGlzU2Nyb2xsaW5nKSByZXR1cm5cblxuICBpZiAoZS5kZWx0YVkgPiAwKSB7XG4gICAgc2Nyb2xsVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uICsgMSlcbiAgfVxuXG4gIGlmIChlLmRlbHRhWSA8IDApIHtcbiAgICBzY3JvbGxUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gLSAxKVxuICB9XG5cbiAgc3dpdGNoIChjdXJyZW50U2VjdGlvbikge1xuICAgIGNhc2UgMDpcbiAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgYnJlYWtcblxuICAgIGNhc2UgMTpcbiAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlIDI6XG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAzOlxuICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICBicmVha1xuICB9XG5cbiAgaXNTY3JvbGxpbmcgPSB0cnVlXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlzU2Nyb2xsaW5nID0gZmFsc2VcbiAgfSwgMTAwMClcbn0pXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGFuaW1hdGVSYW5kb21seSgpXG4gIGFuaW1hdGVNYXJzKClcbn0pXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICB9LCAzMClcbn1cblxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICd0b3VjaHN0YXJ0JyxcbiAgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfSxcbiAgZmFsc2UsXG4pXG4iLCJjb25zdCBtb3ZpbmdUZXh0TGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1sZWZ0JylcbmNvbnN0IG1vdmluZ1RleHRDZW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtY2VudGVyJylcbmNvbnN0IG1vdmluZ1RleHRSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1yaWdodCcpXG5jb25zdCBtb3ZpbmdUZXh0VG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LXRvcCcpXG5jb25zdCBtb3ZpbmdUZXh0TWlkZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LW1pZGRsZScpXG5jb25zdCBtb3ZpbmdUZXh0Qm90dG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LWJvdHRvbScpXG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKVxuY29uc3QgbWFyc0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcnMyJylcbmNvbnN0IG1vYmlsZU1hcnNJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGVfbWFycycpXG5jb25zdCBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2N1xuXG5jb25zdCBub2RlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGUnKVxuY29uc3Qgbm9kZURpdkZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZV90d28nKVxuY29uc3Qgbm9kZURpdkZpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZV90aHJlZScpXG5cbmNvbnN0IHRhcmdldEVsZW1lbnRPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93ZScpXG5jb25zdCB0YXJnZXRFbGVtZW50VHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3by1jb250ZW50JylcbmNvbnN0IHRhcmdldEVsZW1lbnRUaHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlX3doYXQnKVxuY29uc3QgdGFyZ2V0RWxlbWVudE1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb24tY29udGFpbmVyLU0nKVxuY29uc3QgdGFyZ2V0RWxlbWVudEZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93aGVyZScpXG5cbmNvbnN0IGxpbmVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28nKVxuY29uc3QgbGluZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXG5cbmxldCBpc01vdmVTbGlkZXIgPSB0cnVlXG5sZXQgaXNNb3ZlID0gdHJ1ZVxuXG5jb25zdCBtb2JpbGVGdW5jID0gKCkgPT4ge1xuICAvLzHrsojsp7gg7JWg64uI66mU7J207IWYICfsmrDrpqzripQnXG4gIGdzYXAudG8obW92aW5nVGV4dFRvcCwge1xuICAgIHg6ICcxNTAlJyxcbiAgICB5OiAnLTIwJScsXG4gICAgZHVyYXRpb246IDIsXG4gICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gIH0pXG5cbiAgLy8gLy8x67KI7Ke4IOyVoOuLiOuplOydtOyFmCAn7Ja065SU7IScJ1xuICBnc2FwLnRvKG1vdmluZ1RleHRNaWRkbGUsIHtcbiAgICB4OiAnNTAlJyxcbiAgICB5OiAnMTg1JScsXG4gICAgYmV6aWVyOiB7XG4gICAgICB0eXBlOiAnc29mdCcsXG4gICAgICB2YWx1ZXM6IFtcbiAgICAgICAgeyB4OiAnLTIwJScsIHk6ICcwJScgfSxcbiAgICAgICAgeyB4OiAnMTAwJScsIHk6ICctMjUlJyB9LFxuICAgICAgICB7IHg6ICcxNTAlJywgeTogJy01MCUnIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgZHVyYXRpb246IDIsXG4gICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gIH0pXG5cbiAgLy8gZ3NhcC50bygnLmJpZy1jaXJjbGUnLCB7XG4gIC8vICAgb3BhY2l0eTogMCxcbiAgLy8gICBzY2FsZTogMC4xLFxuICAvLyAgIGRlbGF5OiAyLFxuICAvLyAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctY2lyY2xlJykuc3R5bGUub3BhY2l0eSA9ICdub25lJ1xuICAvLyAgIH0sXG4gIC8vIH0pXG5cbiAgLy8gZ3NhcC50bygnLnNtYWxsLWNpcmNsZScsIHtcbiAgLy8gICBvcGFjaXR5OiAwLFxuICAvLyAgIHNjYWxlOiAwLjEsXG4gIC8vICAgZGVsYXk6IDIsXG4gIC8vICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNtYWxsLWNpcmNsZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgLy8gICB9LFxuICAvLyB9KVxuXG4gIC8vMuuyiOynuCDslaDri4jrqZTsnbTshZggJ+yasOumrOqwgCdcbiAgZ3NhcC50byhtb3ZpbmdUZXh0VG9wLCB7XG4gICAgeDogJzE1MCUnLFxuICAgIHk6ICctNDAlJyxcbiAgICBkdXJhdGlvbjogMixcbiAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcbiAgICBkZWxheTogMi41LFxuICB9KVxuXG4gIGdzYXAudG8obW92aW5nVGV4dE1pZGRsZSwge1xuICAgIHg6ICc1MCUnLFxuICAgIHk6ICczMCUnLFxuICAgIGR1cmF0aW9uOiAyLFxuICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxuICAgIGRlbGF5OiAyLjUsXG4gIH0pXG5cbiAgZ3NhcC50byhtb3ZpbmdUZXh0Qm90dG9tLCB7XG4gICAgeDogJy01MCUnLFxuICAgIHk6ICcxMDAlJyxcbiAgICBiZXppZXI6IHtcbiAgICAgIHR5cGU6ICdzb2Z0JyxcbiAgICAgIHZhbHVlczogW1xuICAgICAgICB7IHg6ICctMjAlJywgeTogJzAlJyB9LFxuICAgICAgICB7IHg6ICcxMDAlJywgeTogJy0yNSUnIH0sXG4gICAgICAgIHsgeDogJzEzMCUnLCB5OiAnLTUwJScgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBkdXJhdGlvbjogMixcbiAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcbiAgICBkZWxheTogMi41LFxuICB9KVxuXG4gIGdzYXAudG8obW9iaWxlTWFyc0ltYWdlLCB7XG4gICAgeTogJy01MCUnLFxuICAgIHNjYWxlOiAxLFxuICAgIGR1cmF0aW9uOiAyLjUsXG4gICAgZGVsYXk6IDMsXG4gICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICB9KVxufVxuXG5jb25zdCBvYnNlcnZlck9uZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgdGFyZ2V0RWxlbWVudE9uZSxcbiAgICAgICAgeyB4OiAnNTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcwJyxcbiAgICAgICAgICB5OiAnLTUwMCUnLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0RWxlbWVudE9uZSwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcbiAgICAgICAgICAgIG5vZGVEaXYuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyVHdvID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGlmICghaXNNb3ZlKSB7XG4gICAgICAgIGlzTW92ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIG5vZGVEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICBub2RlRGl2Rml2ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXG5cbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBtb3ZpbmdUZXh0TGVmdCxcbiAgICAgICAgeyB4OiAnLTUwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXG4gICAgICAgIHsgeDogJy0yMCUnLCB5OiAwLCBvcGFjaXR5OiAxLCBkdXJhdGlvbjogNSwgZWFzZTogJ3Bvd2VyMi5vdXQnIH0sXG4gICAgICApXG5cbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBtb3ZpbmdUZXh0Q2VudGVyLFxuICAgICAgICB7IHg6ICczMCUnLCB5OiAzMDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgeyB4OiAnMzAlJywgeTogMCwgb3BhY2l0eTogMSwgZHVyYXRpb246IDUsIGVhc2U6ICdwb3dlcjIub3V0JyB9LFxuICAgICAgKVxuXG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgbW92aW5nVGV4dFJpZ2h0LFxuICAgICAgICB7IHg6ICc0MDAlJywgeTogNDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICc0MCUnLFxuICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgaXNNb3ZlID0gZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyVGhyZWUgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIHRhcmdldEVsZW1lbnRUaHJlZSxcbiAgICAgICAgeyB4OiAnMTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcwJyxcbiAgICAgICAgICB5OiAnLTUwMCUnLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0RWxlbWVudFRocmVlLCB7IGNvbG9yOiAnd2hpdGUnLCBkdXJhdGlvbjogMSB9KVxuICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgICAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgICAgICAgIGlzTW92ZVNsaWRlciA9IGZhbHNlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJGb3VyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICB0YXJnZXRFbGVtZW50Rm91cixcbiAgICAgICAgeyB4OiAnNTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcwJyxcbiAgICAgICAgICB5OiAnLTUwMCUnLFxuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgZHVyYXRpb246IDMsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0RWxlbWVudEZvdXIsIHsgY29sb3I6ICd3aGl0ZScsIGR1cmF0aW9uOiAxIH0pXG4gICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgICAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzEnXG4gICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlck1vYmlsZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW9iaWxlRnVuYygpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfSlcbn0pXG5cbm9ic2VydmVyT25lLm9ic2VydmUodGFyZ2V0RWxlbWVudE9uZSlcbm9ic2VydmVyVHdvLm9ic2VydmUodGFyZ2V0RWxlbWVudFR3bylcbm9ic2VydmVyVGhyZWUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50VGhyZWUpXG5vYnNlcnZlckZvdXIub2JzZXJ2ZSh0YXJnZXRFbGVtZW50Rm91cilcbm9ic2VydmVyTW9iaWxlLm9ic2VydmUodGFyZ2V0RWxlbWVudE1vYmlsZSlcblxuY29uc3Qgc2xpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGUnKVxubGV0IHNsaWRlV2lkdGggPSBzbGlkZS5jbGllbnRXaWR0aFxuXG5jb25zdCBzbGlkZUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlX2l0ZW0nKVxuY29uc3QgbWF4U2xpZGUgPSBzbGlkZUl0ZW1zLmxlbmd0aFxuXG5sZXQgY3VyclNsaWRlID0gMVxuXG5jb25zdCBuZXh0TW92ZSA9IChzbGlkZSkgPT4ge1xuICBjdXJyU2xpZGUgPSBzbGlkZVxuICBpZiAoY3VyclNsaWRlIDw9IG1heFNsaWRlKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aCAqIChjdXJyU2xpZGUgLSAxKVxuICAgIHNsaWRlSXRlbXMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXG4gICAgfSlcblxuICAgIHJldHVyblxuICB9XG4gIGN1cnJTbGlkZS0tXG59XG5cbmNvbnN0IHByZXZNb3ZlID0gKCkgPT4ge1xuICBjdXJyU2xpZGUtLVxuICBpZiAoY3VyclNsaWRlID4gMCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHNsaWRlV2lkdGggKiAoY3VyclNsaWRlIC0gMSlcbiAgICBzbGlkZUl0ZW1zLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxuICAgIH0pXG5cbiAgICByZXR1cm5cbiAgfVxuXG4gIGN1cnJTbGlkZSsrXG59XG5cbmNvbnN0IGRpc2FibGVkID0gKCkgPT4ge1xuICB0aXRsZVRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBtb3ZpbmdUZXh0UmlnaHQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBtb3ZpbmdUZXh0TGVmdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG5cbmNvbnN0IGhpZGVDb21wb25lbnQgPSAoKSA9PiB7XG4gIG5vZGVEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICBnc2FwLnRvKHRhcmdldEVsZW1lbnRPbmUsIHtcbiAgICB4OiAnNTAwJScsXG4gICAgeTogJzUwMCUnLFxuICAgIGNvbG9yOiAnI2EyYTJhMicsXG4gICAgZHVyYXRpb246IDEsXG4gIH0pXG4gIGdzYXAudG8odGFyZ2V0RWxlbWVudFRocmVlLCB7XG4gICAgeDogJy0xMDAlJyxcbiAgICB5OiAnNTAwJScsXG4gICAgY29sb3I6ICcjYTJhMmEyJyxcbiAgICBkdXJhdGlvbjogMSxcbiAgfSlcbiAgZ3NhcC50byh0YXJnZXRFbGVtZW50Rm91ciwge1xuICAgIHg6ICc1MDAlJyxcbiAgICB5OiAnNTAwJScsXG4gICAgY29sb3I6ICcjYTJhMmEyJyxcbiAgICBkdXJhdGlvbjogMSxcbiAgfSlcbn1cblxubW92aW5nVGV4dENlbnRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGlzTW92ZSkgcmV0dXJuXG4gIGhpZGVDb21wb25lbnQoKVxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcbiAgbmV4dE1vdmUoMylcbn0pXG5cbm1vdmluZ1RleHRSaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGlzTW92ZSkgcmV0dXJuXG4gIGhpZGVDb21wb25lbnQoKVxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcbiAgbmV4dE1vdmUoNClcbn0pXG5cbm1vdmluZ1RleHRMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoaXNNb3ZlKSByZXR1cm5cbiAgaGlkZUNvbXBvbmVudCgpXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZSgyKVxufSlcblxuLyoqXG4gKiDtmZTshLEg7JWg64uI66mU7J207IWYXG4gKi9cbmNvbnN0IGFuaW1hdGVNb2JpbGVNYXJzID0gKCkgPT4ge1xuICBnc2FwLnRvKCcjbW9iaWxlX21hcnMnLCB7XG4gICAgcm90YXRpb246IDM2MCxcbiAgICBkdXJhdGlvbjogMTgwLFxuICAgIHJlcGVhdDogLTEsXG4gICAgZWFzZTogJ2xpbmVhcicsXG4gIH0pXG59XG5cbmxpbmVCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChpc01vdmVTbGlkZXIpIHJldHVyblxuXG4gIGNvbnN0IGxpbmVUd29JbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3R3byA6Zmlyc3QtY2hpbGQnKVxuICBjb25zdCBpbWFnZVNyY0FyciA9IGxpbmVUd29JbWFnZS5zcmMuc3BsaXQoJy8nKVxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXG4gIGlzTW92ZVNsaWRlciA9IHRydWVcbiAgaWYgKGltYWdlU3JjID09PSAnbGVmdC5zdmcnKSB7XG4gICAgaGlkZUNvbXBvbmVudCgpXG4gICAgbmV4dE1vdmUoMSlcbiAgICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2ZydcbiAgfVxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgc2xpZGVXaWR0aCA9IHNsaWRlLmNsaWVudFdpZHRoXG59KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICBhbmltYXRlTW9iaWxlTWFycygpXG59KVxuXG4vLyDsmrDrpqzripQg7YG066atIOydtOuypO2KuFxubW92aW5nVGV4dFRvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaGlkZUNvbXBvbmVudCgpXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZSgyKVxufSlcblxuLy8g7Ja065SU7IScIO2BtOumrSDsnbTrsqTtirhcbm1vdmluZ1RleHRNaWRkbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNsaWNrRGlzcGxheSgpXG59KVxuXG4vLyDrrLTsl4fsnYQg7YG066atIOydtOuypO2KuFxubW92aW5nVGV4dEJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY2xpY2tEaXNwbGF5KClcbn0pXG4iXX0=
