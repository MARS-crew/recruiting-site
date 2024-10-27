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
var lineTopOne = document.querySelector('.line_top_one');
var lineTopTwo = document.querySelector('.line_top_two');
var lineTopThree = document.querySelector('.line_top_three');
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
  if (isPc) {
    sectionOne.style.animation = '';
    sectionTwo.style.animation = 'zoom 10s infinite';
    sectionThree.style.animation = '';
    sectionFour.style.animation = '';
  } else {
    sectionOneMobile.style.animation = '';
    sectionTwoMobile.style.animation = 'zoom 10s infinite';
    sectionThreeMobile.style.animation = '';
    sectionFourMobile.style.animation = '';
  }
  scrollToSection(1);
});
lineTwo.addEventListener('click', function () {
  var lineTwoImage = document.querySelector('.line_two :first-child');
  var imageSrcArr = lineTwoImage.src.split('/');
  var imageSrc = imageSrcArr[imageSrcArr.length - 1];
  if (imageSrc === 'down.svg') {
    if (isPc) {
      sectionOne.style.animation = '';
      sectionTwo.style.animation = '';
      sectionThree.style.animation = 'zoom 10s infinite';
      sectionFour.style.animation = '';
    } else {
      sectionOneMobile.style.animation = '';
      sectionTwoMobile.style.animation = '';
      sectionThreeMobile.style.animation = 'zoom 10s infinite';
      sectionFourMobile.style.animation = '';
    }
    scrollToSection(2);
  }
});
lineThree.addEventListener('click', function () {
  if (isPc) {
    sectionOne.style.animation = '';
    sectionTwo.style.animation = '';
    sectionThree.style.animation = '';
    sectionFour.style.animation = 'zoom 10s infinite';
  } else {
    sectionOneMobile.style.animation = '';
    sectionTwoMobile.style.animation = '';
    sectionThreeMobile.style.animation = '';
    sectionFourMobile.style.animation = 'zoom 10s infinite';
  }
  scrollToSection(3);
});
lineTopOne.addEventListener('click', function () {
  scrollToSection(0);
});
lineTopTwo.addEventListener('click', function () {
  scrollToSection(1);
});
lineTopThree.addEventListener('click', function () {
  scrollToSection(2);
});
window.addEventListener('wheel', function (e) {
  if (isScrolling) return;
  if (e.deltaY > 0) {
    scrollToSection(currentSection + 1);
  }
  if (e.deltaY < 0) {
    scrollToSection(currentSection - 1);
  }
  if (isPc) {
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
  } else {
    switch (currentSection) {
      case 0:
        sectionOneMobile.style.animation = 'zoom 10s infinite';
        sectionTwoMobile.style.animation = '';
        sectionThreeMobile.style.animation = '';
        sectionFourMobile.style.animation = '';
        break;
      case 1:
        sectionOneMobile.style.animation = '';
        sectionTwoMobile.style.animation = 'zoom 10s infinite';
        sectionThreeMobile.style.animation = '';
        sectionFourMobile.style.animation = '';
        break;
      case 2:
        sectionOneMobile.style.animation = '';
        sectionTwoMobile.style.animation = '';
        sectionThreeMobile.style.animation = 'zoom 10s infinite';
        sectionFourMobile.style.animation = '';
        break;
      case 3:
        sectionOneMobile.style.animation = '';
        sectionTwoMobile.style.animation = '';
        sectionThreeMobile.style.animation = '';
        sectionFourMobile.style.animation = 'zoom 10s infinite';
        break;
    }
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
});
movingTextRight.addEventListener('click', function () {
  if (isMove) return;
  hideComponent();
  lineImage.src = './images/svg/left.svg';
});
movingTextLeft.addEventListener('click', function () {
  if (isMove) return;
  hideComponent();
  lineImage.src = './images/svg/left.svg';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZW5kLmpzIiwic3JjL2pzL2dhbGxlcnkuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvaW50cm9kdWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM1RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFDdkUsSUFBSSxlQUFlO0FBRW5CLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFFBQVE7RUFDMUMsZUFBZSxHQUFHLElBQUk7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFDLE9BQU8sRUFBSztFQUNyRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0lBQ3pCLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRTtNQUN4QixVQUFVLENBQUMsWUFBTTtRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUztRQUMzQyxlQUFlLEdBQUcsS0FBSztNQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1Y7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFL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O01BQzlCLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxXQUFBLE1BQUEsQ0FBVyxDQUFDLE1BQU0sT0FBSSxDQUFDO0lBQy9DLENBQUMsQ0FBQztJQUVGO0VBQ0Y7RUFFQSxlQUFlLEVBQUU7QUFDbkIsQ0FBQztBQUVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0VBQ3hELGlCQUFpQixDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQzVDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsdUJBQXVCO0VBQ3ZDLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDL0MsU0FBUyxDQUFDLEdBQUcsR0FBRyx1QkFBdUI7RUFDdkMsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUM7O0FBRUY7QUFDQSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUMvQyxTQUFTLENBQUMsR0FBRyxHQUFHLHVCQUF1QjtFQUN2QyxjQUFjLENBQUMsQ0FBQyxDQUFDO0FBQ25CLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcbmNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnRfcG9pbnQnKVxyXG5jb25zdCBzY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsaW5nLXRleHQnKVxyXG5jb25zdCBlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RvcF9wb2ludCcpXHJcbmNvbnN0IGxpbmVMYXN0SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV9mb3VyIDpmaXJzdC1jaGlsZCcpXHJcbmxldCBhbmltYXRpb25QYXVzZWRcclxuXHJcbndpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJ1xyXG4gIGFuaW1hdGlvblBhdXNlZCA9IHRydWVcclxufSlcclxuXHJcbmNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncnVubmluZydcclxuICAgICAgICBhbmltYXRpb25QYXVzZWQgPSBmYWxzZVxyXG4gICAgICB9LCAxMDAwKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pXHJcblxyXG5jb25zdCBvYnNlcnZlckVuZCA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzY3JvbGwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCdcclxuICAgICAgICBhbmltYXRpb25QYXVzZWQgPSB0cnVlXHJcbiAgICAgICAgbGluZUxhc3RJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL3RvcC5zdmcnXHJcbiAgICAgIH0sIDE1MDApXHJcbiAgICB9XHJcbiAgfSlcclxufSlcclxuXHJcbm9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWxlbWVudClcclxub2JzZXJ2ZXJFbmQub2JzZXJ2ZShlbmQpXHJcblxyXG5saW5lTGFzdEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IGltYWdlU3JjQXJyID0gbGluZUxhc3RJbWFnZS5zcmMuc3BsaXQoJy8nKVxyXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cclxuXHJcbiAgaWYgKGltYWdlU3JjID09PSAnZG93bi5zdmcnKSByZXR1cm5cclxuXHJcbiAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgIHRvcDogMCxcclxuICAgIGxlZnQ6IDAsXHJcbiAgICBiZWhhdmlvcjogJ3Ntb290aCcsXHJcbiAgfSlcclxuXHJcbiAgbGluZUxhc3RJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2Rvd24uc3ZnJ1xyXG59KVxyXG4iLCJsZXQgaXRlcmF0aW9uID0gMFxyXG5cclxuY29uc3Qgc3BhY2luZyA9IDAuMDZcclxuY29uc3Qgc25hcCA9IGdzYXAudXRpbHMuc25hcChzcGFjaW5nKVxyXG5jb25zdCBjYXJkcyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmNhcmRzIGxpJylcclxuY29uc3Qgc2VhbWxlc3NMb29wID0gYnVpbGRTZWFtbGVzc0xvb3AoY2FyZHMsIHNwYWNpbmcpXHJcbmNvbnN0IHNjcnViID0gZ3NhcC50byhzZWFtbGVzc0xvb3AsIHtcclxuICB0b3RhbFRpbWU6IDAsXHJcbiAgZHVyYXRpb246IDAuNSxcclxuICBlYXNlOiAncG93ZXIzJyxcclxuICBwYXVzZWQ6IHRydWUsXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZURldmljZSgpIHtcclxuICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGhcclxuXHJcbiAgaWYgKHZpZXdwb3J0V2lkdGggPD0gNzY4KSB7XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNjcnViVG8odG90YWxUaW1lKSB7XHJcbiAgbGV0IHByb2dyZXNzID1cclxuICAgICh0b3RhbFRpbWUgLSBzZWFtbGVzc0xvb3AuZHVyYXRpb24oKSAqIGl0ZXJhdGlvbikgLyBzZWFtbGVzc0xvb3AuZHVyYXRpb24oKVxyXG4gIGlmIChwcm9ncmVzcyA+IDEpIHtcclxuICAgIHdyYXBGb3J3YXJkKClcclxuICB9IGVsc2Uge1xyXG4gICAgc2NydWIudmFycy50b3RhbFRpbWUgPSB0b3RhbFRpbWVcclxuICAgIHNjcnViLmludmFsaWRhdGUoKS5yZXN0YXJ0KClcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgc2NydWJUbyhzY3J1Yi52YXJzLnRvdGFsVGltZSArIHNwYWNpbmcpXHJcbn0pXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJldicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHNjcnViVG8oc2NydWIudmFycy50b3RhbFRpbWUgLSBzcGFjaW5nKVxyXG59KVxyXG5cclxuZnVuY3Rpb24gYnVpbGRTZWFtbGVzc0xvb3AoaXRlbXMsIHNwYWNpbmcpIHtcclxuICBsZXQgb3ZlcmxhcCA9IE1hdGguY2VpbCgxIC8gc3BhY2luZylcclxuICBsZXQgc3RhcnRUaW1lID0gaXRlbXMubGVuZ3RoICogc3BhY2luZyArIDAuNVxyXG4gIGxldCBsb29wVGltZSA9IChpdGVtcy5sZW5ndGggKyBvdmVybGFwKSAqIHNwYWNpbmcgKyAxXHJcbiAgbGV0IHJhd1NlcXVlbmNlID0gZ3NhcC50aW1lbGluZSh7IHBhdXNlZDogdHJ1ZSB9KVxyXG4gIGxldCBzZWFtbGVzc0xvb3AgPSBnc2FwLnRpbWVsaW5lKHtcclxuICAgIHBhdXNlZDogdHJ1ZSxcclxuICAgIHJlcGVhdDogLTEsXHJcbiAgICBvblJlcGVhdCgpIHtcclxuICAgICAgdGhpcy5fdGltZSA9PT0gdGhpcy5fZHVyICYmICh0aGlzLl90VGltZSArPSB0aGlzLl9kdXIgLSAwLjAxKVxyXG4gICAgfSxcclxuICB9KVxyXG4gIGxldCBsID0gaXRlbXMubGVuZ3RoICsgb3ZlcmxhcCAqIDJcclxuICBsZXQgdGltZSA9IDBcclxuICBsZXQgaVxyXG4gIGxldCBpbmRleFxyXG4gIGxldCBpdGVtXHJcblxyXG4gIGdzYXAuc2V0KGl0ZW1zLCB7IHhQZXJjZW50OiA0MDAsIG9wYWNpdHk6IDAsIHNjYWxlOiAwIH0pXHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgIGluZGV4ID0gaSAlIGl0ZW1zLmxlbmd0aFxyXG4gICAgaXRlbSA9IGl0ZW1zW2luZGV4XVxyXG4gICAgdGltZSA9IGkgKiBzcGFjaW5nXHJcbiAgICByYXdTZXF1ZW5jZVxyXG4gICAgICAuZnJvbVRvKFxyXG4gICAgICAgIGl0ZW0sXHJcbiAgICAgICAgeyBzY2FsZTogMCwgb3BhY2l0eTogMCB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNjYWxlOiAxLFxyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIHpJbmRleDogMTAwLFxyXG4gICAgICAgICAgZHVyYXRpb246IDAuNSxcclxuICAgICAgICAgIHlveW86IHRydWUsXHJcbiAgICAgICAgICByZXBlYXQ6IDEsXHJcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluJyxcclxuICAgICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lLFxyXG4gICAgICApXHJcbiAgICAgIC5mcm9tVG8oXHJcbiAgICAgICAgaXRlbSxcclxuICAgICAgICB7IHhQZXJjZW50OiBpc01vYmlsZURldmljZSgpID8gMTAwIDogNDAwIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgeFBlcmNlbnQ6IGlzTW9iaWxlRGV2aWNlKCkgPyAtMTAwIDogLTQwMCxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxLFxyXG4gICAgICAgICAgZWFzZTogJ25vbmUnLFxyXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWUsXHJcbiAgICAgIClcclxuICAgIGkgPD0gaXRlbXMubGVuZ3RoICYmIHNlYW1sZXNzTG9vcC5hZGQoJ2xhYmVsJyArIGksIHRpbWUpXHJcbiAgfVxyXG5cclxuICByYXdTZXF1ZW5jZS50aW1lKHN0YXJ0VGltZSlcclxuICBzZWFtbGVzc0xvb3BcclxuICAgIC50byhyYXdTZXF1ZW5jZSwge1xyXG4gICAgICB0aW1lOiBsb29wVGltZSxcclxuICAgICAgZHVyYXRpb246IGxvb3BUaW1lIC0gc3RhcnRUaW1lLFxyXG4gICAgICBlYXNlOiAnbm9uZScsXHJcbiAgICB9KVxyXG4gICAgLmZyb21UbyhcclxuICAgICAgcmF3U2VxdWVuY2UsXHJcbiAgICAgIHsgdGltZTogb3ZlcmxhcCAqIHNwYWNpbmcgKyAxIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0aW1lOiBzdGFydFRpbWUsXHJcbiAgICAgICAgZHVyYXRpb246IHN0YXJ0VGltZSAtIChvdmVybGFwICogc3BhY2luZyArIDEpLFxyXG4gICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXHJcbiAgICAgICAgZWFzZTogJ25vbmUnLFxyXG4gICAgICB9LFxyXG4gICAgKVxyXG4gIHJldHVybiBzZWFtbGVzc0xvb3BcclxufVxyXG4iLCJjb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWN0aW9uJylcclxuY29uc3QgbWFyc0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXJzJylcclxuY29uc3QgbGluZU9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX29uZScpXHJcbmNvbnN0IGxpbmVUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28nKVxyXG5jb25zdCBsaW5lVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90aHJlZScpXHJcbmNvbnN0IHNlY3Rpb25PbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2Vfb25lJylcclxuY29uc3Qgc2VjdGlvblR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90d28nKVxyXG5jb25zdCBzZWN0aW9uVGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdGhyZWUnKVxyXG5jb25zdCBsaW5lVG9wT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdG9wX29uZScpXHJcbmNvbnN0IGxpbmVUb3BUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90b3BfdHdvJylcclxuY29uc3QgbGluZVRvcFRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdG9wX3RocmVlJylcclxuY29uc3Qgc2VjdGlvbkZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfZm91cicpXHJcbmNvbnN0IHNlY3Rpb25PbmVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2Vfb25lX21faW1nJylcclxuY29uc3Qgc2VjdGlvblR3b01vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90d29fbV9pbWcnKVxyXG5jb25zdCBzZWN0aW9uVGhyZWVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdGhyZWVfbV9pbWcnKVxyXG5jb25zdCBzZWN0aW9uRm91ck1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9mb3VyX21faW1nJylcclxuXHJcbmNvbnN0IGlzUGMgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2N1xyXG5cclxubGV0IGN1cnJlbnRTZWN0aW9uID0gMFxyXG5sZXQgaXNTY3JvbGxpbmcgPSBmYWxzZVxyXG5cclxuLyoqXHJcbiAqIOyKpO2BrOuhpCDtlajsiJhcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAqL1xyXG5jb25zdCBzY3JvbGxUb1NlY3Rpb24gPSAoaW5kZXgpID0+IHtcclxuICBzZWN0aW9uc1tpbmRleF0uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSlcclxuICBjdXJyZW50U2VjdGlvbiA9IGluZGV4XHJcblxyXG4gIGlmIChjdXJyZW50U2VjdGlvbiAhPT0gMCkge1xyXG4gICAgaWYgKGlzUGMpIHtcclxuICAgICAgbWFyc0ltZy5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgbWFyc0ltZy5zdHlsZS5vcGFjaXR5ID0gMVxyXG59XHJcblxyXG4vKipcclxuICog7Jqw7KO87J24IOyVoOuLiOuplOydtOyFmCDtlajsiJhcclxuICovXHJcbmNvbnN0IGFuaW1hdGVSYW5kb21seSA9ICgpID0+IHtcclxuICBnc2FwLnRvKCcjbWFuJywge1xyXG4gICAgeDogKCkgPT4gTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCksXHJcbiAgICB5OiAoKSA9PiBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lckhlaWdodCAtIDEwMCksXHJcbiAgICBkdXJhdGlvbjogNyxcclxuICAgIG9uQ29tcGxldGU6IGFuaW1hdGVSYW5kb21seSxcclxuICAgIGVhc2U6ICdub25lJyxcclxuICB9KVxyXG59XHJcblxyXG4vKipcclxuICog7ZmU7ISxIOyVoOuLiOuplOydtOyFmFxyXG4gKi9cclxuY29uc3QgYW5pbWF0ZU1hcnMgPSAoKSA9PiB7XHJcbiAgZ3NhcC50bygnI21hcnMnLCB7XHJcbiAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgZHVyYXRpb246IDE4MCxcclxuICAgIHJlcGVhdDogLTEsXHJcbiAgICBlYXNlOiAnbGluZWFyJyxcclxuICB9KVxyXG59XHJcblxyXG5saW5lT25lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChpc1BjKSB7XHJcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICB9IGVsc2Uge1xyXG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgIHNlY3Rpb25Gb3VyTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb1NlY3Rpb24oMSlcclxufSlcclxuXHJcbmxpbmVUd28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgbGluZVR3b0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXHJcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lVHdvSW1hZ2Uuc3JjLnNwbGl0KCcvJylcclxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXHJcbiAgaWYgKGltYWdlU3JjID09PSAnZG93bi5zdmcnKSB7XHJcbiAgICBpZiAoaXNQYykge1xyXG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgfVxyXG4gICAgc2Nyb2xsVG9TZWN0aW9uKDIpXHJcbiAgfVxyXG59KVxyXG5cclxubGluZVRocmVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChpc1BjKSB7XHJcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICB9IGVsc2Uge1xyXG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvblRocmVlTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb1NlY3Rpb24oMylcclxufSlcclxubGluZVRvcE9uZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBzY3JvbGxUb1NlY3Rpb24oMClcclxufSlcclxuXHJcbmxpbmVUb3BUd28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgc2Nyb2xsVG9TZWN0aW9uKDEpXHJcbn0pXHJcblxyXG5saW5lVG9wVGhyZWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgc2Nyb2xsVG9TZWN0aW9uKDIpXHJcbn0pXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xyXG4gIGlmIChpc1Njcm9sbGluZykgcmV0dXJuXHJcblxyXG4gIGlmIChlLmRlbHRhWSA+IDApIHtcclxuICAgIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpXHJcbiAgfVxyXG5cclxuICBpZiAoZS5kZWx0YVkgPCAwKSB7XHJcbiAgICBzY3JvbGxUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gLSAxKVxyXG4gIH1cclxuXHJcbiAgaWYgKGlzUGMpIHtcclxuICAgIHN3aXRjaCAoY3VycmVudFNlY3Rpb24pIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgICBicmVha1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBzd2l0Y2ggKGN1cnJlbnRTZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgMDpcclxuICAgICAgICBzZWN0aW9uT25lTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgICBzZWN0aW9uVHdvTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblRocmVlTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvbkZvdXJNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBicmVha1xyXG5cclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVHdvTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICBzZWN0aW9uT25lTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25UaHJlZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgICAgICAgc2VjdGlvbkZvdXJNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Ud29Nb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzU2Nyb2xsaW5nID0gdHJ1ZVxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgaXNTY3JvbGxpbmcgPSBmYWxzZVxyXG4gIH0sIDEwMDApXHJcbn0pXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gIGFuaW1hdGVSYW5kb21seSgpXHJcbiAgYW5pbWF0ZU1hcnMoKVxyXG59KVxyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxyXG4gICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb25lID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgfSwgMzApXHJcbn1cclxuXHJcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICd0b3VjaHN0YXJ0JyxcclxuICAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZmFsc2UsXHJcbilcclxuIiwiY29uc3QgbW92aW5nVGV4dExlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtbGVmdCcpXHJcbmNvbnN0IG1vdmluZ1RleHRDZW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtY2VudGVyJylcclxuY29uc3QgbW92aW5nVGV4dFJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LXJpZ2h0JylcclxuY29uc3QgbW92aW5nVGV4dFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC10b3AnKVxyXG5jb25zdCBtb3ZpbmdUZXh0TWlkZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LW1pZGRsZScpXHJcbmNvbnN0IG1vdmluZ1RleHRCb3R0b20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtYm90dG9tJylcclxuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJylcclxuY29uc3QgbWFyc0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcnMyJylcclxuY29uc3QgbW9iaWxlTWFyc0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZV9tYXJzJylcclxuY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjdcclxuXHJcbmNvbnN0IG5vZGVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZScpXHJcbmNvbnN0IG5vZGVEaXZGb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGVfdHdvJylcclxuY29uc3Qgbm9kZURpdkZpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZV90aHJlZScpXHJcblxyXG5jb25zdCB0YXJnZXRFbGVtZW50T25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2UnKVxyXG5jb25zdCB0YXJnZXRFbGVtZW50VHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR3by1jb250ZW50JylcclxuY29uc3QgdGFyZ2V0RWxlbWVudFRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2hhdCcpXHJcbmNvbnN0IHRhcmdldEVsZW1lbnRNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uLWNvbnRhaW5lci1NJylcclxuY29uc3QgdGFyZ2V0RWxlbWVudEZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93aGVyZScpXHJcblxyXG5jb25zdCBsaW5lQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvJylcclxuY29uc3QgbGluZUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXHJcblxyXG5sZXQgaXNNb3ZlU2xpZGVyID0gdHJ1ZVxyXG5sZXQgaXNNb3ZlID0gdHJ1ZVxyXG5sZXQgaXNNb2JpbGVNb3ZlID0gdHJ1ZVxyXG5cclxuY29uc3Qgb2JzZXJ2ZXJPbmUgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudE9uZSxcclxuICAgICAgICB7IHg6ICc1MDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHg6ICcwJyxcclxuICAgICAgICAgIHk6ICctNTAwJScsXHJcbiAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgZHVyYXRpb246IDMsXHJcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXHJcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdzYXAudG8odGFyZ2V0RWxlbWVudE9uZSwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcclxuICAgICAgICAgICAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcclxuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzEnXHJcbiAgICAgICAgICAgIH0sIDEwMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pXHJcblxyXG5jb25zdCBvYnNlcnZlclR3byA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICBpZiAoIWlzTW92ZSkge1xyXG4gICAgICAgIGlzTW92ZSA9IHRydWVcclxuICAgICAgfVxyXG4gICAgICBub2RlRGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzAnXHJcbiAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcwJ1xyXG4gICAgICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMCdcclxuXHJcbiAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgIG1vdmluZ1RleHRMZWZ0LFxyXG4gICAgICAgIHsgeDogJy01MDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxyXG4gICAgICAgIHsgeDogJy0yMCUnLCB5OiAwLCBvcGFjaXR5OiAxLCBkdXJhdGlvbjogNSwgZWFzZTogJ3Bvd2VyMi5vdXQnIH0sXHJcbiAgICAgIClcclxuXHJcbiAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgIG1vdmluZ1RleHRDZW50ZXIsXHJcbiAgICAgICAgeyB4OiAnMzAlJywgeTogMzAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgeyB4OiAnMzAlJywgeTogMCwgb3BhY2l0eTogMSwgZHVyYXRpb246IDUsIGVhc2U6ICdwb3dlcjIub3V0JyB9LFxyXG4gICAgICApXHJcblxyXG4gICAgICBnc2FwLmZyb21UbyhcclxuICAgICAgICBtb3ZpbmdUZXh0UmlnaHQsXHJcbiAgICAgICAgeyB4OiAnNDAwJScsIHk6IDQwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgeDogJzQwJScsXHJcbiAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBpc01vdmUgPSBmYWxzZVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfSlcclxufSlcclxuXHJcbmNvbnN0IG9ic2VydmVyVGhyZWUgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudFRocmVlLFxyXG4gICAgICAgIHsgeDogJzEwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgeDogJzAnLFxyXG4gICAgICAgICAgeTogJy01MDAlJyxcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMyxcclxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50VGhyZWUsIHsgY29sb3I6ICd3aGl0ZScsIGR1cmF0aW9uOiAxIH0pXHJcbiAgICAgICAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcclxuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcxJ1xyXG4gICAgICAgICAgICB9LCAxMDApXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9KVxyXG59KVxyXG5cclxuY29uc3Qgb2JzZXJ2ZXJGb3VyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgIHRhcmdldEVsZW1lbnRGb3VyLFxyXG4gICAgICAgIHsgeDogJzUwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgeDogJzAnLFxyXG4gICAgICAgICAgeTogJy01MDAlJyxcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMyxcclxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50Rm91ciwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcclxuICAgICAgICAgICAgbm9kZURpdkZvdXIuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgICAgICAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xyXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzEnXHJcbiAgICAgICAgICAgIH0sIDEwMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pXHJcblxyXG5jb25zdCBvYnNlcnZlck1vYmlsZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICBpZiAoIWlzTW9iaWxlTW92ZSkgcmV0dXJuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGdzYXAudG8oJy5iaWctY2lyY2xlJywge1xyXG4gICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxODAsXHJcbiAgICAgICAgICByZXBlYXQ6IC0xLFxyXG4gICAgICAgICAgZWFzZTogJ2xpbmVhcicsXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ3NhcC50bygnLnNtYWxsLWNpcmNsZScsIHtcclxuICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwLFxyXG4gICAgICAgICAgcmVwZWF0OiAtMSxcclxuICAgICAgICAgIGVhc2U6ICdsaW5lYXInLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dEJvdHRvbSwge1xyXG4gICAgICAgICAgeDogJy01MCUnLFxyXG4gICAgICAgICAgeTogJzEwMCUnLFxyXG4gICAgICAgICAgYmV6aWVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzb2Z0JyxcclxuICAgICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgICAgeyB4OiAnLTIwJScsIHk6ICcwJScgfSxcclxuICAgICAgICAgICAgICB7IHg6ICcxMDAlJywgeTogJy0yNSUnIH0sXHJcbiAgICAgICAgICAgICAgeyB4OiAnMTMwJScsIHk6ICctNTAlJyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXHJcbiAgICAgICAgICBkZWxheTogMi41LFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBpc01vYmlsZU1vdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgICB9LCAxMDAwKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pXHJcblxyXG5vYnNlcnZlck9uZS5vYnNlcnZlKHRhcmdldEVsZW1lbnRPbmUpXHJcbm9ic2VydmVyVHdvLm9ic2VydmUodGFyZ2V0RWxlbWVudFR3bylcclxub2JzZXJ2ZXJUaHJlZS5vYnNlcnZlKHRhcmdldEVsZW1lbnRUaHJlZSlcclxub2JzZXJ2ZXJGb3VyLm9ic2VydmUodGFyZ2V0RWxlbWVudEZvdXIpXHJcbm9ic2VydmVyTW9iaWxlLm9ic2VydmUodGFyZ2V0RWxlbWVudE1vYmlsZSlcclxuXHJcbmNvbnN0IHNsaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlJylcclxubGV0IHNsaWRlV2lkdGggPSBzbGlkZS5jbGllbnRXaWR0aFxyXG5cclxuY29uc3Qgc2xpZGVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZV9pdGVtJylcclxuY29uc3QgbWF4U2xpZGUgPSBzbGlkZUl0ZW1zLmxlbmd0aFxyXG5cclxubGV0IGN1cnJTbGlkZSA9IDFcclxuXHJcbmNvbnN0IG5leHRNb3ZlID0gKHNsaWRlKSA9PiB7XHJcbiAgY3VyclNsaWRlID0gc2xpZGVcclxuICBpZiAoY3VyclNsaWRlIDw9IG1heFNsaWRlKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoICogKGN1cnJTbGlkZSAtIDEpXHJcbiAgICBzbGlkZUl0ZW1zLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVyblxyXG4gIH1cclxuICBjdXJyU2xpZGUtLVxyXG59XHJcblxyXG5jb25zdCBwcmV2TW92ZSA9ICgpID0+IHtcclxuICBjdXJyU2xpZGUtLVxyXG4gIGlmIChjdXJyU2xpZGUgPiAwKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoICogKGN1cnJTbGlkZSAtIDEpXHJcbiAgICBzbGlkZUl0ZW1zLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgY3VyclNsaWRlKytcclxufVxyXG5cclxuY29uc3QgZGlzYWJsZWQgPSAoKSA9PiB7XHJcbiAgdGl0bGVUZXh0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICBtb3ZpbmdUZXh0UmlnaHQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIG1vdmluZ1RleHRMZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxufVxyXG5cclxuY29uc3QgaGlkZUNvbXBvbmVudCA9ICgpID0+IHtcclxuICBub2RlRGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcclxuICBub2RlRGl2Rml2ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcwJ1xyXG4gIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXHJcbiAgZ3NhcC50byh0YXJnZXRFbGVtZW50T25lLCB7XHJcbiAgICB4OiAnNTAwJScsXHJcbiAgICB5OiAnNTAwJScsXHJcbiAgICBjb2xvcjogJyNhMmEyYTInLFxyXG4gICAgZHVyYXRpb246IDEsXHJcbiAgfSlcclxuICBnc2FwLnRvKHRhcmdldEVsZW1lbnRUaHJlZSwge1xyXG4gICAgeDogJy0xMDAlJyxcclxuICAgIHk6ICc1MDAlJyxcclxuICAgIGNvbG9yOiAnI2EyYTJhMicsXHJcbiAgICBkdXJhdGlvbjogMSxcclxuICB9KVxyXG4gIGdzYXAudG8odGFyZ2V0RWxlbWVudEZvdXIsIHtcclxuICAgIHg6ICc1MDAlJyxcclxuICAgIHk6ICc1MDAlJyxcclxuICAgIGNvbG9yOiAnI2EyYTJhMicsXHJcbiAgICBkdXJhdGlvbjogMSxcclxuICB9KVxyXG59XHJcblxyXG5tb3ZpbmdUZXh0Q2VudGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChpc01vdmUpIHJldHVyblxyXG4gIGhpZGVDb21wb25lbnQoKVxyXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xyXG59KVxyXG5cclxubW92aW5nVGV4dFJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChpc01vdmUpIHJldHVyblxyXG4gIGhpZGVDb21wb25lbnQoKVxyXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xyXG59KVxyXG5cclxubW92aW5nVGV4dExlZnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaWYgKGlzTW92ZSkgcmV0dXJuXHJcbiAgaGlkZUNvbXBvbmVudCgpXHJcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXHJcbn0pXHJcblxyXG4vKipcclxuICog7ZmU7ISxIOyVoOuLiOuplOydtOyFmFxyXG4gKi9cclxuY29uc3QgYW5pbWF0ZU1vYmlsZU1hcnMgPSAoKSA9PiB7XHJcbiAgZ3NhcC50bygnI21vYmlsZV9tYXJzJywge1xyXG4gICAgcm90YXRpb246IDM2MCxcclxuICAgIGR1cmF0aW9uOiAxODAsXHJcbiAgICByZXBlYXQ6IC0xLFxyXG4gICAgZWFzZTogJ2xpbmVhcicsXHJcbiAgfSlcclxufVxyXG5cclxubGluZUJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCBsaW5lVHdvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28gOmZpcnN0LWNoaWxkJylcclxuICBjb25zdCBpbWFnZVNyY0FyciA9IGxpbmVUd29JbWFnZS5zcmMuc3BsaXQoJy8nKVxyXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cclxuICBpZiAoaXNNb2JpbGUpIHtcclxuICAgIGlmIChpbWFnZVNyYyA9PT0gJ2xlZnQuc3ZnJykge1xyXG4gICAgICBuZXh0TW92ZU1vYmlsZSgxKVxyXG4gICAgICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2ZydcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGlzTW92ZVNsaWRlcikgcmV0dXJuXHJcblxyXG4gIGlzTW92ZVNsaWRlciA9IHRydWVcclxuICBpZiAoaW1hZ2VTcmMgPT09ICdsZWZ0LnN2ZycpIHtcclxuICAgIGhpZGVDb21wb25lbnQoKVxyXG4gICAgbmV4dE1vdmUoMSlcclxuICAgIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2Rvd24uc3ZnJ1xyXG4gIH1cclxufSlcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgc2xpZGVXaWR0aCA9IHNsaWRlLmNsaWVudFdpZHRoXHJcbn0pXHJcblxyXG4vLyAqKiBNb2JpbGVcclxuY29uc3Qgc2xpZGVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVfbScpXHJcbmxldCBzbGlkZVdpZHRoTW9iaWxlID0gc2xpZGVNb2JpbGUuY2xpZW50V2lkdGhcclxuXHJcbmNvbnN0IHNsaWRlSXRlbXNNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVfaXRlbV9tJylcclxuY29uc3QgbWF4U2xpZGVNb2JpbGUgPSBzbGlkZUl0ZW1zTW9iaWxlLmxlbmd0aFxyXG5cclxubGV0IGN1cnJTbGlkZU1vYmlsZSA9IDFcclxuXHJcbmNvbnN0IG5leHRNb3ZlTW9iaWxlID0gKHNsaWRlKSA9PiB7XHJcbiAgY3VyclNsaWRlTW9iaWxlID0gc2xpZGVcclxuICBpZiAoY3VyclNsaWRlTW9iaWxlIDw9IG1heFNsaWRlTW9iaWxlKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoTW9iaWxlICogKGN1cnJTbGlkZU1vYmlsZSAtIDEpXHJcbiAgICBzbGlkZUl0ZW1zTW9iaWxlLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVyblxyXG4gIH1cclxuICBjdXJyU2xpZGVNb2JpbGUtLVxyXG59XHJcblxyXG5jb25zdCBwcmV2TW92ZU1vYmlsZSA9ICgpID0+IHtcclxuICBjdXJyU2xpZGVNb2JpbGUtLVxyXG4gIGlmIChjdXJyU2xpZGVNb2JpbGUgPiAwKSB7XHJcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoTW9iaWxlICogKGN1cnJTbGlkZU1vYmlsZSAtIDEpXHJcbiAgICBzbGlkZUl0ZW1zTW9iaWxlLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgY3VyclNsaWRlTW9iaWxlKytcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICBhbmltYXRlTW9iaWxlTWFycygpXHJcbn0pXHJcblxyXG4vLyDsmrDrpqzripQg7YG066atIOydtOuypO2KuFxyXG5tb3ZpbmdUZXh0VG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xyXG4gIG5leHRNb3ZlTW9iaWxlKDIpXHJcbn0pXHJcblxyXG4vLyDslrTrlJTshJwg7YG066atIOydtOuypO2KuFxyXG5tb3ZpbmdUZXh0TWlkZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xyXG4gIG5leHRNb3ZlTW9iaWxlKDMpXHJcbn0pXHJcblxyXG4vLyDrrLTsl4fsnYQg7YG066atIOydtOuypO2KuFxyXG5tb3ZpbmdUZXh0Qm90dG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xyXG4gIG5leHRNb3ZlTW9iaWxlKDQpXHJcbn0pXHJcbiJdfQ==
