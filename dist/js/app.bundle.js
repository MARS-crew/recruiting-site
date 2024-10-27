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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZW5kLmpzIiwic3JjL2pzL2dhbGxlcnkuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvaW50cm9kdWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM1RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFDdkUsSUFBSSxlQUFlO0FBRW5CLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFFBQVE7RUFDMUMsZUFBZSxHQUFHLElBQUk7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFDLE9BQU8sRUFBSztFQUNyRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0lBQ3pCLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRTtNQUN4QixVQUFVLENBQUMsWUFBTTtRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUztRQUMzQyxlQUFlLEdBQUcsS0FBSztNQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1Y7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFL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QUFDO0FBQ25CLENBQUMsQ0FBQzs7QUFFRjtBQUNBLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQy9DLFNBQVMsQ0FBQyxHQUFHLEdBQUcsdUJBQXVCO0VBQ3ZDLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDL0MsU0FBUyxDQUFDLEdBQUcsR0FBRyx1QkFBdUI7RUFDdkMsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5jb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0X3BvaW50JylcclxuY29uc3Qgc2Nyb2xsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbGluZy10ZXh0JylcclxuY29uc3QgZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3BfcG9pbnQnKVxyXG5jb25zdCBsaW5lTGFzdEltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfZm91ciA6Zmlyc3QtY2hpbGQnKVxyXG5sZXQgYW5pbWF0aW9uUGF1c2VkXHJcblxyXG53aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBzY3JvbGwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCdcclxuICBhbmltYXRpb25QYXVzZWQgPSB0cnVlXHJcbn0pXHJcblxyXG5jb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzY3JvbGwuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3J1bm5pbmcnXHJcbiAgICAgICAgYW5pbWF0aW9uUGF1c2VkID0gZmFsc2VcclxuICAgICAgfSwgMTAwMClcclxuICAgIH1cclxuICB9KVxyXG59KVxyXG5cclxuY29uc3Qgb2JzZXJ2ZXJFbmQgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2Nyb2xsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnXHJcbiAgICAgICAgYW5pbWF0aW9uUGF1c2VkID0gdHJ1ZVxyXG4gICAgICAgIGxpbmVMYXN0SW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy90b3Auc3ZnJ1xyXG4gICAgICB9LCAxNTAwKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pXHJcblxyXG5vYnNlcnZlci5vYnNlcnZlKHRhcmdldEVsZW1lbnQpXHJcbm9ic2VydmVyRW5kLm9ic2VydmUoZW5kKVxyXG5cclxubGluZUxhc3RJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCBpbWFnZVNyY0FyciA9IGxpbmVMYXN0SW1hZ2Uuc3JjLnNwbGl0KCcvJylcclxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXHJcblxyXG4gIGlmIChpbWFnZVNyYyA9PT0gJ2Rvd24uc3ZnJykgcmV0dXJuXHJcblxyXG4gIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICB0b3A6IDAsXHJcbiAgICBsZWZ0OiAwLFxyXG4gICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxyXG4gIH0pXHJcblxyXG4gIGxpbmVMYXN0SW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2ZydcclxufSlcclxuIiwibGV0IGl0ZXJhdGlvbiA9IDBcclxuXHJcbmNvbnN0IHNwYWNpbmcgPSAwLjA2XHJcbmNvbnN0IHNuYXAgPSBnc2FwLnV0aWxzLnNuYXAoc3BhY2luZylcclxuY29uc3QgY2FyZHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoJy5jYXJkcyBsaScpXHJcbmNvbnN0IHNlYW1sZXNzTG9vcCA9IGJ1aWxkU2VhbWxlc3NMb29wKGNhcmRzLCBzcGFjaW5nKVxyXG5jb25zdCBzY3J1YiA9IGdzYXAudG8oc2VhbWxlc3NMb29wLCB7XHJcbiAgdG90YWxUaW1lOiAwLFxyXG4gIGR1cmF0aW9uOiAwLjUsXHJcbiAgZWFzZTogJ3Bvd2VyMycsXHJcbiAgcGF1c2VkOiB0cnVlLFxyXG59KVxyXG5cclxuZnVuY3Rpb24gaXNNb2JpbGVEZXZpY2UoKSB7XHJcbiAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXHJcblxyXG4gIGlmICh2aWV3cG9ydFdpZHRoIDw9IDc2OCkge1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzY3J1YlRvKHRvdGFsVGltZSkge1xyXG4gIGxldCBwcm9ncmVzcyA9XHJcbiAgICAodG90YWxUaW1lIC0gc2VhbWxlc3NMb29wLmR1cmF0aW9uKCkgKiBpdGVyYXRpb24pIC8gc2VhbWxlc3NMb29wLmR1cmF0aW9uKClcclxuICBpZiAocHJvZ3Jlc3MgPiAxKSB7XHJcbiAgICB3cmFwRm9yd2FyZCgpXHJcbiAgfSBlbHNlIHtcclxuICAgIHNjcnViLnZhcnMudG90YWxUaW1lID0gdG90YWxUaW1lXHJcbiAgICBzY3J1Yi5pbnZhbGlkYXRlKCkucmVzdGFydCgpXHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV4dCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHNjcnViVG8oc2NydWIudmFycy50b3RhbFRpbWUgKyBzcGFjaW5nKVxyXG59KVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBzY3J1YlRvKHNjcnViLnZhcnMudG90YWxUaW1lIC0gc3BhY2luZylcclxufSlcclxuXHJcbmZ1bmN0aW9uIGJ1aWxkU2VhbWxlc3NMb29wKGl0ZW1zLCBzcGFjaW5nKSB7XHJcbiAgbGV0IG92ZXJsYXAgPSBNYXRoLmNlaWwoMSAvIHNwYWNpbmcpXHJcbiAgbGV0IHN0YXJ0VGltZSA9IGl0ZW1zLmxlbmd0aCAqIHNwYWNpbmcgKyAwLjVcclxuICBsZXQgbG9vcFRpbWUgPSAoaXRlbXMubGVuZ3RoICsgb3ZlcmxhcCkgKiBzcGFjaW5nICsgMVxyXG4gIGxldCByYXdTZXF1ZW5jZSA9IGdzYXAudGltZWxpbmUoeyBwYXVzZWQ6IHRydWUgfSlcclxuICBsZXQgc2VhbWxlc3NMb29wID0gZ3NhcC50aW1lbGluZSh7XHJcbiAgICBwYXVzZWQ6IHRydWUsXHJcbiAgICByZXBlYXQ6IC0xLFxyXG4gICAgb25SZXBlYXQoKSB7XHJcbiAgICAgIHRoaXMuX3RpbWUgPT09IHRoaXMuX2R1ciAmJiAodGhpcy5fdFRpbWUgKz0gdGhpcy5fZHVyIC0gMC4wMSlcclxuICAgIH0sXHJcbiAgfSlcclxuICBsZXQgbCA9IGl0ZW1zLmxlbmd0aCArIG92ZXJsYXAgKiAyXHJcbiAgbGV0IHRpbWUgPSAwXHJcbiAgbGV0IGlcclxuICBsZXQgaW5kZXhcclxuICBsZXQgaXRlbVxyXG5cclxuICBnc2FwLnNldChpdGVtcywgeyB4UGVyY2VudDogNDAwLCBvcGFjaXR5OiAwLCBzY2FsZTogMCB9KVxyXG5cclxuICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcbiAgICBpbmRleCA9IGkgJSBpdGVtcy5sZW5ndGhcclxuICAgIGl0ZW0gPSBpdGVtc1tpbmRleF1cclxuICAgIHRpbWUgPSBpICogc3BhY2luZ1xyXG4gICAgcmF3U2VxdWVuY2VcclxuICAgICAgLmZyb21UbyhcclxuICAgICAgICBpdGVtLFxyXG4gICAgICAgIHsgc2NhbGU6IDAsIG9wYWNpdHk6IDAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzY2FsZTogMSxcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICB6SW5kZXg6IDEwMCxcclxuICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXHJcbiAgICAgICAgICB5b3lvOiB0cnVlLFxyXG4gICAgICAgICAgcmVwZWF0OiAxLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbicsXHJcbiAgICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZSxcclxuICAgICAgKVxyXG4gICAgICAuZnJvbVRvKFxyXG4gICAgICAgIGl0ZW0sXHJcbiAgICAgICAgeyB4UGVyY2VudDogaXNNb2JpbGVEZXZpY2UoKSA/IDEwMCA6IDQwMCB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHhQZXJjZW50OiBpc01vYmlsZURldmljZSgpID8gLTEwMCA6IC00MDAsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMSxcclxuICAgICAgICAgIGVhc2U6ICdub25lJyxcclxuICAgICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lLFxyXG4gICAgICApXHJcbiAgICBpIDw9IGl0ZW1zLmxlbmd0aCAmJiBzZWFtbGVzc0xvb3AuYWRkKCdsYWJlbCcgKyBpLCB0aW1lKVxyXG4gIH1cclxuXHJcbiAgcmF3U2VxdWVuY2UudGltZShzdGFydFRpbWUpXHJcbiAgc2VhbWxlc3NMb29wXHJcbiAgICAudG8ocmF3U2VxdWVuY2UsIHtcclxuICAgICAgdGltZTogbG9vcFRpbWUsXHJcbiAgICAgIGR1cmF0aW9uOiBsb29wVGltZSAtIHN0YXJ0VGltZSxcclxuICAgICAgZWFzZTogJ25vbmUnLFxyXG4gICAgfSlcclxuICAgIC5mcm9tVG8oXHJcbiAgICAgIHJhd1NlcXVlbmNlLFxyXG4gICAgICB7IHRpbWU6IG92ZXJsYXAgKiBzcGFjaW5nICsgMSB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGltZTogc3RhcnRUaW1lLFxyXG4gICAgICAgIGR1cmF0aW9uOiBzdGFydFRpbWUgLSAob3ZlcmxhcCAqIHNwYWNpbmcgKyAxKSxcclxuICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxyXG4gICAgICAgIGVhc2U6ICdub25lJyxcclxuICAgICAgfSxcclxuICAgIClcclxuICByZXR1cm4gc2VhbWxlc3NMb29wXHJcbn1cclxuIiwiY29uc3Qgc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VjdGlvbicpXHJcbmNvbnN0IG1hcnNJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFycycpXHJcbmNvbnN0IGxpbmVPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV9vbmUnKVxyXG5jb25zdCBsaW5lVHdvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvJylcclxuY29uc3QgbGluZVRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdGhyZWUnKVxyXG5jb25zdCBzZWN0aW9uT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX29uZScpXHJcbmNvbnN0IHNlY3Rpb25Ud28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdHdvJylcclxuY29uc3Qgc2VjdGlvblRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX3RocmVlJylcclxuY29uc3Qgc2VjdGlvbkZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfZm91cicpXHJcbmNvbnN0IHNlY3Rpb25PbmVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2Vfb25lX21faW1nJylcclxuY29uc3Qgc2VjdGlvblR3b01vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90d29fbV9pbWcnKVxyXG5jb25zdCBzZWN0aW9uVGhyZWVNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BhY2VfdGhyZWVfbV9pbWcnKVxyXG5jb25zdCBzZWN0aW9uRm91ck1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9mb3VyX21faW1nJylcclxuXHJcbmNvbnN0IGlzUGMgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2N1xyXG5cclxubGV0IGN1cnJlbnRTZWN0aW9uID0gMFxyXG5sZXQgaXNTY3JvbGxpbmcgPSBmYWxzZVxyXG5cclxuLyoqXHJcbiAqIOyKpO2BrOuhpCDtlajsiJhcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAqL1xyXG5jb25zdCBzY3JvbGxUb1NlY3Rpb24gPSAoaW5kZXgpID0+IHtcclxuICBzZWN0aW9uc1tpbmRleF0uc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSlcclxuICBjdXJyZW50U2VjdGlvbiA9IGluZGV4XHJcblxyXG4gIGlmIChjdXJyZW50U2VjdGlvbiAhPT0gMCkge1xyXG4gICAgaWYgKGlzUGMpIHtcclxuICAgICAgbWFyc0ltZy5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgbWFyc0ltZy5zdHlsZS5vcGFjaXR5ID0gMVxyXG59XHJcblxyXG4vKipcclxuICog7Jqw7KO87J24IOyVoOuLiOuplOydtOyFmCDtlajsiJhcclxuICovXHJcbmNvbnN0IGFuaW1hdGVSYW5kb21seSA9ICgpID0+IHtcclxuICBnc2FwLnRvKCcjbWFuJywge1xyXG4gICAgeDogKCkgPT4gTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCksXHJcbiAgICB5OiAoKSA9PiBNYXRoLnJhbmRvbSgpICogKHdpbmRvdy5pbm5lckhlaWdodCAtIDEwMCksXHJcbiAgICBkdXJhdGlvbjogNyxcclxuICAgIG9uQ29tcGxldGU6IGFuaW1hdGVSYW5kb21seSxcclxuICAgIGVhc2U6ICdub25lJyxcclxuICB9KVxyXG59XHJcblxyXG4vKipcclxuICog7ZmU7ISxIOyVoOuLiOuplOydtOyFmFxyXG4gKi9cclxuY29uc3QgYW5pbWF0ZU1hcnMgPSAoKSA9PiB7XHJcbiAgZ3NhcC50bygnI21hcnMnLCB7XHJcbiAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgZHVyYXRpb246IDE4MCxcclxuICAgIHJlcGVhdDogLTEsXHJcbiAgICBlYXNlOiAnbGluZWFyJyxcclxuICB9KVxyXG59XHJcblxyXG5saW5lT25lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChpc1BjKSB7XHJcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICB9IGVsc2Uge1xyXG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgIHNlY3Rpb25Gb3VyTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb1NlY3Rpb24oMSlcclxufSlcclxuXHJcbmxpbmVUd28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgbGluZVR3b0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXHJcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lVHdvSW1hZ2Uuc3JjLnNwbGl0KCcvJylcclxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXHJcbiAgaWYgKGltYWdlU3JjID09PSAnZG93bi5zdmcnKSB7XHJcbiAgICBpZiAoaXNQYykge1xyXG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgfVxyXG4gICAgc2Nyb2xsVG9TZWN0aW9uKDIpXHJcbiAgfVxyXG59KVxyXG5cclxubGluZVRocmVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChpc1BjKSB7XHJcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICB9IGVsc2Uge1xyXG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgc2VjdGlvblRocmVlTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb1NlY3Rpb24oMylcclxufSlcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XHJcbiAgaWYgKGlzU2Nyb2xsaW5nKSByZXR1cm5cclxuXHJcbiAgaWYgKGUuZGVsdGFZID4gMCkge1xyXG4gICAgc2Nyb2xsVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uICsgMSlcclxuICB9XHJcblxyXG4gIGlmIChlLmRlbHRhWSA8IDApIHtcclxuICAgIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiAtIDEpXHJcbiAgfVxyXG5cclxuICBpZiAoaXNQYykge1xyXG4gICAgc3dpdGNoIChjdXJyZW50U2VjdGlvbikge1xyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblRocmVlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHN3aXRjaCAoY3VycmVudFNlY3Rpb24pIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICAgIHNlY3Rpb25Ud29Nb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIGJyZWFrXHJcblxyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Ud29Nb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xyXG4gICAgICAgIHNlY3Rpb25UaHJlZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Gb3VyTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgYnJlYWtcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcclxuICAgICAgICBzZWN0aW9uVHdvTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblRocmVlTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICBzZWN0aW9uT25lTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXHJcbiAgICAgICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25UaHJlZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xyXG4gICAgICAgIHNlY3Rpb25Gb3VyTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICAgICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNTY3JvbGxpbmcgPSB0cnVlXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBpc1Njcm9sbGluZyA9IGZhbHNlXHJcbiAgfSwgMTAwMClcclxufSlcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5pbWF0ZVJhbmRvbWx5KClcclxuICBhbmltYXRlTWFycygpXHJcbn0pXHJcblxyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApXHJcbiAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbmUgPSAnem9vbSAxMHMgaW5maW5pdGUnXHJcbiAgICBzZWN0aW9uT25lTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcclxuICB9LCAzMClcclxufVxyXG5cclxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgJ3RvdWNoc3RhcnQnLFxyXG4gIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICB9XHJcbiAgfSxcclxuICBmYWxzZSxcclxuKVxyXG4iLCJjb25zdCBtb3ZpbmdUZXh0TGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1sZWZ0JylcclxuY29uc3QgbW92aW5nVGV4dENlbnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1jZW50ZXInKVxyXG5jb25zdCBtb3ZpbmdUZXh0UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtcmlnaHQnKVxyXG5jb25zdCBtb3ZpbmdUZXh0VG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LXRvcCcpXHJcbmNvbnN0IG1vdmluZ1RleHRNaWRkbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtbWlkZGxlJylcclxuY29uc3QgbW92aW5nVGV4dEJvdHRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1ib3R0b20nKVxyXG5jb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKVxyXG5jb25zdCBtYXJzSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFyczInKVxyXG5jb25zdCBtb2JpbGVNYXJzSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX21hcnMnKVxyXG5jb25zdCBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2N1xyXG5cclxuY29uc3Qgbm9kZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub2RlJylcclxuY29uc3Qgbm9kZURpdkZvdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm9kZV90d28nKVxyXG5jb25zdCBub2RlRGl2Rml2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub2RlX3RocmVlJylcclxuXHJcbmNvbnN0IHRhcmdldEVsZW1lbnRPbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93ZScpXHJcbmNvbnN0IHRhcmdldEVsZW1lbnRUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHdvLWNvbnRlbnQnKVxyXG5jb25zdCB0YXJnZXRFbGVtZW50VGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93aGF0JylcclxuY29uc3QgdGFyZ2V0RWxlbWVudE1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb24tY29udGFpbmVyLU0nKVxyXG5jb25zdCB0YXJnZXRFbGVtZW50Rm91ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlX3doZXJlJylcclxuXHJcbmNvbnN0IGxpbmVCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28nKVxyXG5jb25zdCBsaW5lSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28gOmZpcnN0LWNoaWxkJylcclxuXHJcbmxldCBpc01vdmVTbGlkZXIgPSB0cnVlXHJcbmxldCBpc01vdmUgPSB0cnVlXHJcbmxldCBpc01vYmlsZU1vdmUgPSB0cnVlXHJcblxyXG5jb25zdCBvYnNlcnZlck9uZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICBnc2FwLmZyb21UbyhcclxuICAgICAgICB0YXJnZXRFbGVtZW50T25lLFxyXG4gICAgICAgIHsgeDogJzUwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgeDogJzAnLFxyXG4gICAgICAgICAgeTogJy01MDAlJyxcclxuICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMyxcclxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcclxuICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50T25lLCB7IGNvbG9yOiAnd2hpdGUnLCBkdXJhdGlvbjogMSB9KVxyXG4gICAgICAgICAgICBub2RlRGl2LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICAgICAgICAgIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcwJ1xyXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMSdcclxuICAgICAgICAgICAgfSwgMTAwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfSlcclxufSlcclxuXHJcbmNvbnN0IG9ic2VydmVyVHdvID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgIGlmICghaXNNb3ZlKSB7XHJcbiAgICAgICAgaXNNb3ZlID0gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICAgIG5vZGVEaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcclxuICAgICAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzAnXHJcbiAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xyXG5cclxuICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgbW92aW5nVGV4dExlZnQsXHJcbiAgICAgICAgeyB4OiAnLTUwMCUnLCB5OiAwLCBvcGFjaXR5OiAxIH0sXHJcbiAgICAgICAgeyB4OiAnLTIwJScsIHk6IDAsIG9wYWNpdHk6IDEsIGR1cmF0aW9uOiA1LCBlYXNlOiAncG93ZXIyLm91dCcgfSxcclxuICAgICAgKVxyXG5cclxuICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgbW92aW5nVGV4dENlbnRlcixcclxuICAgICAgICB7IHg6ICczMCUnLCB5OiAzMDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICB7IHg6ICczMCUnLCB5OiAwLCBvcGFjaXR5OiAxLCBkdXJhdGlvbjogNSwgZWFzZTogJ3Bvd2VyMi5vdXQnIH0sXHJcbiAgICAgIClcclxuXHJcbiAgICAgIGdzYXAuZnJvbVRvKFxyXG4gICAgICAgIG1vdmluZ1RleHRSaWdodCxcclxuICAgICAgICB7IHg6ICc0MDAlJywgeTogNDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB4OiAnNDAlJyxcclxuICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgZHVyYXRpb246IDMsXHJcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXHJcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlzTW92ZSA9IGZhbHNlXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9KVxyXG59KVxyXG5cclxuY29uc3Qgb2JzZXJ2ZXJUaHJlZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICBnc2FwLmZyb21UbyhcclxuICAgICAgICB0YXJnZXRFbGVtZW50VGhyZWUsXHJcbiAgICAgICAgeyB4OiAnMTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB4OiAnMCcsXHJcbiAgICAgICAgICB5OiAnLTUwMCUnLFxyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBnc2FwLnRvKHRhcmdldEVsZW1lbnRUaHJlZSwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcclxuICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcclxuICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcwJ1xyXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzEnXHJcbiAgICAgICAgICAgIH0sIDEwMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pXHJcblxyXG5jb25zdCBvYnNlcnZlckZvdXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgZ3NhcC5mcm9tVG8oXHJcbiAgICAgICAgdGFyZ2V0RWxlbWVudEZvdXIsXHJcbiAgICAgICAgeyB4OiAnNTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB4OiAnMCcsXHJcbiAgICAgICAgICB5OiAnLTUwMCUnLFxyXG4gICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMi5vdXQnLFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBnc2FwLnRvKHRhcmdldEVsZW1lbnRGb3VyLCB7IGNvbG9yOiAnd2hpdGUnLCBkdXJhdGlvbjogMSB9KVxyXG4gICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG4gICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXHJcbiAgICAgICAgICAgIGlzTW92ZVNsaWRlciA9IGZhbHNlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMSdcclxuICAgICAgICAgICAgfSwgMTAwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfSlcclxufSlcclxuXHJcbmNvbnN0IG9ic2VydmVyTW9iaWxlID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgIGlmICghaXNNb2JpbGVNb3ZlKSByZXR1cm5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZ3NhcC50bygnLmJpZy1jaXJjbGUnLCB7XHJcbiAgICAgICAgICByb3RhdGlvbjogMzYwLFxyXG4gICAgICAgICAgZHVyYXRpb246IDE4MCxcclxuICAgICAgICAgIHJlcGVhdDogLTEsXHJcbiAgICAgICAgICBlYXNlOiAnbGluZWFyJyxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnc2FwLnRvKCcuc21hbGwtY2lyY2xlJywge1xyXG4gICAgICAgICAgcm90YXRpb246IDM2MCxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgICByZXBlYXQ6IC0xLFxyXG4gICAgICAgICAgZWFzZTogJ2xpbmVhcicsXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8x67KI7Ke4IOyVoOuLiOuplOydtOyFmCAn7Jqw66as64qUJ1xyXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dFRvcCwge1xyXG4gICAgICAgICAgeDogJzE1MCUnLFxyXG4gICAgICAgICAgeTogJy0yMCUnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyAvLzHrsojsp7gg7JWg64uI66mU7J207IWYICfslrTrlJTshJwnXHJcbiAgICAgICAgZ3NhcC50byhtb3ZpbmdUZXh0TWlkZGxlLCB7XHJcbiAgICAgICAgICB4OiAnNTAlJyxcclxuICAgICAgICAgIHk6ICcxODUlJyxcclxuICAgICAgICAgIGJlemllcjoge1xyXG4gICAgICAgICAgICB0eXBlOiAnc29mdCcsXHJcbiAgICAgICAgICAgIHZhbHVlczogW1xyXG4gICAgICAgICAgICAgIHsgeDogJy0yMCUnLCB5OiAnMCUnIH0sXHJcbiAgICAgICAgICAgICAgeyB4OiAnMTAwJScsIHk6ICctMjUlJyB9LFxyXG4gICAgICAgICAgICAgIHsgeDogJzE1MCUnLCB5OiAnLTUwJScgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgIGVhc2U6ICdwb3dlcjEuaW5PdXQnLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vMuuyiOynuCDslaDri4jrqZTsnbTshZggJ+yasOumrOqwgCdcclxuICAgICAgICBnc2FwLnRvKG1vdmluZ1RleHRUb3AsIHtcclxuICAgICAgICAgIHg6ICcxNTAlJyxcclxuICAgICAgICAgIHk6ICctNDAlJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXHJcbiAgICAgICAgICBkZWxheTogMi41LFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dE1pZGRsZSwge1xyXG4gICAgICAgICAgeDogJzUwJScsXHJcbiAgICAgICAgICB5OiAnMzAlJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXHJcbiAgICAgICAgICBkZWxheTogMi41LFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dEJvdHRvbSwge1xyXG4gICAgICAgICAgeDogJy01MCUnLFxyXG4gICAgICAgICAgeTogJzEwMCUnLFxyXG4gICAgICAgICAgYmV6aWVyOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzb2Z0JyxcclxuICAgICAgICAgICAgdmFsdWVzOiBbXHJcbiAgICAgICAgICAgICAgeyB4OiAnLTIwJScsIHk6ICcwJScgfSxcclxuICAgICAgICAgICAgICB7IHg6ICcxMDAlJywgeTogJy0yNSUnIH0sXHJcbiAgICAgICAgICAgICAgeyB4OiAnMTMwJScsIHk6ICctNTAlJyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXHJcbiAgICAgICAgICBkZWxheTogMi41LFxyXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBpc01vYmlsZU1vdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnc2FwLnRvKG1vYmlsZU1hcnNJbWFnZSwge1xyXG4gICAgICAgICAgeTogJy01MCUnLFxyXG4gICAgICAgICAgc2NhbGU6IDEsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMi41LFxyXG4gICAgICAgICAgZGVsYXk6IDMsXHJcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXHJcbiAgICAgICAgfSlcclxuICAgICAgfSwgMTAwMClcclxuICAgIH1cclxuICB9KVxyXG59KVxyXG5cclxub2JzZXJ2ZXJPbmUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50T25lKVxyXG5vYnNlcnZlclR3by5vYnNlcnZlKHRhcmdldEVsZW1lbnRUd28pXHJcbm9ic2VydmVyVGhyZWUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50VGhyZWUpXHJcbm9ic2VydmVyRm91ci5vYnNlcnZlKHRhcmdldEVsZW1lbnRGb3VyKVxyXG5vYnNlcnZlck1vYmlsZS5vYnNlcnZlKHRhcmdldEVsZW1lbnRNb2JpbGUpXHJcblxyXG5jb25zdCBzbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZScpXHJcbmxldCBzbGlkZVdpZHRoID0gc2xpZGUuY2xpZW50V2lkdGhcclxuXHJcbmNvbnN0IHNsaWRlSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVfaXRlbScpXHJcbmNvbnN0IG1heFNsaWRlID0gc2xpZGVJdGVtcy5sZW5ndGhcclxuXHJcbmxldCBjdXJyU2xpZGUgPSAxXHJcblxyXG5jb25zdCBuZXh0TW92ZSA9IChzbGlkZSkgPT4ge1xyXG4gIGN1cnJTbGlkZSA9IHNsaWRlXHJcbiAgaWYgKGN1cnJTbGlkZSA8PSBtYXhTbGlkZSkge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aCAqIChjdXJyU2xpZGUgLSAxKVxyXG4gICAgc2xpZGVJdGVtcy5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgY3VyclNsaWRlLS1cclxufVxyXG5cclxuY29uc3QgcHJldk1vdmUgPSAoKSA9PiB7XHJcbiAgY3VyclNsaWRlLS1cclxuICBpZiAoY3VyclNsaWRlID4gMCkge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aCAqIChjdXJyU2xpZGUgLSAxKVxyXG4gICAgc2xpZGVJdGVtcy5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGN1cnJTbGlkZSsrXHJcbn1cclxuXHJcbmNvbnN0IGRpc2FibGVkID0gKCkgPT4ge1xyXG4gIHRpdGxlVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgbW92aW5nVGV4dFJpZ2h0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICBtb3ZpbmdUZXh0TGVmdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbn1cclxuXHJcbmNvbnN0IGhpZGVDb21wb25lbnQgPSAoKSA9PiB7XHJcbiAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzAnXHJcbiAgbm9kZURpdkZpdmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcclxuICBub2RlRGl2Rm91ci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgbm9kZURpdkZvdXIuc3R5bGUub3BhY2l0eSA9ICcwJ1xyXG4gIGdzYXAudG8odGFyZ2V0RWxlbWVudE9uZSwge1xyXG4gICAgeDogJzUwMCUnLFxyXG4gICAgeTogJzUwMCUnLFxyXG4gICAgY29sb3I6ICcjYTJhMmEyJyxcclxuICAgIGR1cmF0aW9uOiAxLFxyXG4gIH0pXHJcbiAgZ3NhcC50byh0YXJnZXRFbGVtZW50VGhyZWUsIHtcclxuICAgIHg6ICctMTAwJScsXHJcbiAgICB5OiAnNTAwJScsXHJcbiAgICBjb2xvcjogJyNhMmEyYTInLFxyXG4gICAgZHVyYXRpb246IDEsXHJcbiAgfSlcclxuICBnc2FwLnRvKHRhcmdldEVsZW1lbnRGb3VyLCB7XHJcbiAgICB4OiAnNTAwJScsXHJcbiAgICB5OiAnNTAwJScsXHJcbiAgICBjb2xvcjogJyNhMmEyYTInLFxyXG4gICAgZHVyYXRpb246IDEsXHJcbiAgfSlcclxufVxyXG5cclxubW92aW5nVGV4dENlbnRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoaXNNb3ZlKSByZXR1cm5cclxuICBoaWRlQ29tcG9uZW50KClcclxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcclxuICBuZXh0TW92ZSgzKVxyXG59KVxyXG5cclxubW92aW5nVGV4dFJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGlmIChpc01vdmUpIHJldHVyblxyXG4gIGhpZGVDb21wb25lbnQoKVxyXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xyXG4gIG5leHRNb3ZlKDQpXHJcbn0pXHJcblxyXG5tb3ZpbmdUZXh0TGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpZiAoaXNNb3ZlKSByZXR1cm5cclxuICBoaWRlQ29tcG9uZW50KClcclxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcclxuICBuZXh0TW92ZSgyKVxyXG59KVxyXG5cclxuLyoqXHJcbiAqIO2ZlOyEsSDslaDri4jrqZTsnbTshZhcclxuICovXHJcbmNvbnN0IGFuaW1hdGVNb2JpbGVNYXJzID0gKCkgPT4ge1xyXG4gIGdzYXAudG8oJyNtb2JpbGVfbWFycycsIHtcclxuICAgIHJvdGF0aW9uOiAzNjAsXHJcbiAgICBkdXJhdGlvbjogMTgwLFxyXG4gICAgcmVwZWF0OiAtMSxcclxuICAgIGVhc2U6ICdsaW5lYXInLFxyXG4gIH0pXHJcbn1cclxuXHJcbmxpbmVCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29uc3QgbGluZVR3b0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXHJcbiAgY29uc3QgaW1hZ2VTcmNBcnIgPSBsaW5lVHdvSW1hZ2Uuc3JjLnNwbGl0KCcvJylcclxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXHJcbiAgaWYgKGlzTW9iaWxlKSB7XHJcbiAgICBpZiAoaW1hZ2VTcmMgPT09ICdsZWZ0LnN2ZycpIHtcclxuICAgICAgbmV4dE1vdmVNb2JpbGUoMSlcclxuICAgICAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvZG93bi5zdmcnXHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChpc01vdmVTbGlkZXIpIHJldHVyblxyXG5cclxuICBpc01vdmVTbGlkZXIgPSB0cnVlXHJcbiAgaWYgKGltYWdlU3JjID09PSAnbGVmdC5zdmcnKSB7XHJcbiAgICBoaWRlQ29tcG9uZW50KClcclxuICAgIG5leHRNb3ZlKDEpXHJcbiAgICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2ZydcclxuICB9XHJcbn0pXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gIHNsaWRlV2lkdGggPSBzbGlkZS5jbGllbnRXaWR0aFxyXG59KVxyXG5cclxuLy8gKiogTW9iaWxlXHJcbmNvbnN0IHNsaWRlTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlX20nKVxyXG5sZXQgc2xpZGVXaWR0aE1vYmlsZSA9IHNsaWRlTW9iaWxlLmNsaWVudFdpZHRoXHJcblxyXG5jb25zdCBzbGlkZUl0ZW1zTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlX2l0ZW1fbScpXHJcbmNvbnN0IG1heFNsaWRlTW9iaWxlID0gc2xpZGVJdGVtc01vYmlsZS5sZW5ndGhcclxuXHJcbmxldCBjdXJyU2xpZGVNb2JpbGUgPSAxXHJcblxyXG5jb25zdCBuZXh0TW92ZU1vYmlsZSA9IChzbGlkZSkgPT4ge1xyXG4gIGN1cnJTbGlkZU1vYmlsZSA9IHNsaWRlXHJcbiAgaWYgKGN1cnJTbGlkZU1vYmlsZSA8PSBtYXhTbGlkZU1vYmlsZSkge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aE1vYmlsZSAqIChjdXJyU2xpZGVNb2JpbGUgLSAxKVxyXG4gICAgc2xpZGVJdGVtc01vYmlsZS5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgY3VyclNsaWRlTW9iaWxlLS1cclxufVxyXG5cclxuY29uc3QgcHJldk1vdmVNb2JpbGUgPSAoKSA9PiB7XHJcbiAgY3VyclNsaWRlTW9iaWxlLS1cclxuICBpZiAoY3VyclNsaWRlTW9iaWxlID4gMCkge1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aE1vYmlsZSAqIChjdXJyU2xpZGVNb2JpbGUgLSAxKVxyXG4gICAgc2xpZGVJdGVtc01vYmlsZS5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIGkuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAkey1vZmZzZXR9cHhgKVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGN1cnJTbGlkZU1vYmlsZSsrXHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgYW5pbWF0ZU1vYmlsZU1hcnMoKVxyXG59KVxyXG5cclxuLy8g7Jqw66as64qUIO2BtOumrSDsnbTrsqTtirhcclxubW92aW5nVGV4dFRvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcclxuICBuZXh0TW92ZU1vYmlsZSgyKVxyXG59KVxyXG5cclxuLy8g7Ja065SU7IScIO2BtOumrSDsnbTrsqTtirhcclxubW92aW5nVGV4dE1pZGRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcclxuICBuZXh0TW92ZU1vYmlsZSgzKVxyXG59KVxyXG5cclxuLy8g66y07JeH7J2EIO2BtOumrSDsnbTrsqTtirhcclxubW92aW5nVGV4dEJvdHRvbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9sZWZ0LnN2ZydcclxuICBuZXh0TW92ZU1vYmlsZSg0KVxyXG59KVxyXG4iXX0=
