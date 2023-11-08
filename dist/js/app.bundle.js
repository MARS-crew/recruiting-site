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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZW5kLmpzIiwic3JjL2pzL2dhbGxlcnkuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvaW50cm9kdWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztBQUNsRCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztBQUM1RCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQ3hELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUM7QUFDdkUsSUFBSSxlQUFlO0FBRW5CLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFFBQVE7RUFDMUMsZUFBZSxHQUFHLElBQUk7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFDLE9BQU8sRUFBSztFQUNyRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFLO0lBQ3pCLElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRTtNQUN4QixVQUFVLENBQUMsWUFBTTtRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUztRQUMzQyxlQUFlLEdBQUcsS0FBSztNQUN6QixDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ1Y7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFVBQUMsT0FBTyxFQUFL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QUFDO0FBQ25CLENBQUMsQ0FBQzs7QUFFRjtBQUNBLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0VBQy9DLFNBQVMsQ0FBQyxHQUFHLEdBQUcsdUJBQXVCO0VBQ3ZDLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDOztBQUVGO0FBQ0EsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDL0MsU0FBUyxDQUFDLEdBQUcsR0FBRyx1QkFBdUI7RUFDdkMsY0FBYyxDQUFDLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxuY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydF9wb2ludCcpXG5jb25zdCBzY3JvbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsaW5nLXRleHQnKVxuY29uc3QgZW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0b3BfcG9pbnQnKVxuY29uc3QgbGluZUxhc3RJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX2ZvdXIgOmZpcnN0LWNoaWxkJylcbmxldCBhbmltYXRpb25QYXVzZWRcblxud2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIHNjcm9sbC5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJ1xuICBhbmltYXRpb25QYXVzZWQgPSB0cnVlXG59KVxuXG5jb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJ1xuICAgICAgICBhbmltYXRpb25QYXVzZWQgPSBmYWxzZVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlckVuZCA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnXG4gICAgICAgIGFuaW1hdGlvblBhdXNlZCA9IHRydWVcbiAgICAgICAgbGluZUxhc3RJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL3RvcC5zdmcnXG4gICAgICB9LCAxNTAwKVxuICAgIH1cbiAgfSlcbn0pXG5cbm9ic2VydmVyLm9ic2VydmUodGFyZ2V0RWxlbWVudClcbm9ic2VydmVyRW5kLm9ic2VydmUoZW5kKVxuXG5saW5lTGFzdEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBpbWFnZVNyY0FyciA9IGxpbmVMYXN0SW1hZ2Uuc3JjLnNwbGl0KCcvJylcbiAgY29uc3QgaW1hZ2VTcmMgPSBpbWFnZVNyY0FycltpbWFnZVNyY0Fyci5sZW5ndGggLSAxXVxuXG4gIGlmIChpbWFnZVNyYyA9PT0gJ2Rvd24uc3ZnJykgcmV0dXJuXG5cbiAgd2luZG93LnNjcm9sbFRvKHtcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gIH0pXG5cbiAgbGluZUxhc3RJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2Rvd24uc3ZnJ1xufSlcbiIsImxldCBpdGVyYXRpb24gPSAwXG5cbmNvbnN0IHNwYWNpbmcgPSAwLjA2XG5jb25zdCBzbmFwID0gZ3NhcC51dGlscy5zbmFwKHNwYWNpbmcpXG5jb25zdCBjYXJkcyA9IGdzYXAudXRpbHMudG9BcnJheSgnLmNhcmRzIGxpJylcbmNvbnN0IHNlYW1sZXNzTG9vcCA9IGJ1aWxkU2VhbWxlc3NMb29wKGNhcmRzLCBzcGFjaW5nKVxuY29uc3Qgc2NydWIgPSBnc2FwLnRvKHNlYW1sZXNzTG9vcCwge1xuICB0b3RhbFRpbWU6IDAsXG4gIGR1cmF0aW9uOiAwLjUsXG4gIGVhc2U6ICdwb3dlcjMnLFxuICBwYXVzZWQ6IHRydWUsXG59KVxuXG5mdW5jdGlvbiBpc01vYmlsZURldmljZSgpIHtcbiAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cbiAgaWYgKHZpZXdwb3J0V2lkdGggPD0gNzY4KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBzY3J1YlRvKHRvdGFsVGltZSkge1xuICBsZXQgcHJvZ3Jlc3MgPVxuICAgICh0b3RhbFRpbWUgLSBzZWFtbGVzc0xvb3AuZHVyYXRpb24oKSAqIGl0ZXJhdGlvbikgLyBzZWFtbGVzc0xvb3AuZHVyYXRpb24oKVxuICBpZiAocHJvZ3Jlc3MgPiAxKSB7XG4gICAgd3JhcEZvcndhcmQoKVxuICB9IGVsc2Uge1xuICAgIHNjcnViLnZhcnMudG90YWxUaW1lID0gdG90YWxUaW1lXG4gICAgc2NydWIuaW52YWxpZGF0ZSgpLnJlc3RhcnQoKVxuICB9XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHNjcnViVG8oc2NydWIudmFycy50b3RhbFRpbWUgKyBzcGFjaW5nKVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXYnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgc2NydWJUbyhzY3J1Yi52YXJzLnRvdGFsVGltZSAtIHNwYWNpbmcpXG59KVxuXG5mdW5jdGlvbiBidWlsZFNlYW1sZXNzTG9vcChpdGVtcywgc3BhY2luZykge1xuICBsZXQgb3ZlcmxhcCA9IE1hdGguY2VpbCgxIC8gc3BhY2luZylcbiAgbGV0IHN0YXJ0VGltZSA9IGl0ZW1zLmxlbmd0aCAqIHNwYWNpbmcgKyAwLjVcbiAgbGV0IGxvb3BUaW1lID0gKGl0ZW1zLmxlbmd0aCArIG92ZXJsYXApICogc3BhY2luZyArIDFcbiAgbGV0IHJhd1NlcXVlbmNlID0gZ3NhcC50aW1lbGluZSh7IHBhdXNlZDogdHJ1ZSB9KVxuICBsZXQgc2VhbWxlc3NMb29wID0gZ3NhcC50aW1lbGluZSh7XG4gICAgcGF1c2VkOiB0cnVlLFxuICAgIHJlcGVhdDogLTEsXG4gICAgb25SZXBlYXQoKSB7XG4gICAgICB0aGlzLl90aW1lID09PSB0aGlzLl9kdXIgJiYgKHRoaXMuX3RUaW1lICs9IHRoaXMuX2R1ciAtIDAuMDEpXG4gICAgfSxcbiAgfSlcbiAgbGV0IGwgPSBpdGVtcy5sZW5ndGggKyBvdmVybGFwICogMlxuICBsZXQgdGltZSA9IDBcbiAgbGV0IGlcbiAgbGV0IGluZGV4XG4gIGxldCBpdGVtXG5cbiAgZ3NhcC5zZXQoaXRlbXMsIHsgeFBlcmNlbnQ6IDQwMCwgb3BhY2l0eTogMCwgc2NhbGU6IDAgfSlcblxuICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgaW5kZXggPSBpICUgaXRlbXMubGVuZ3RoXG4gICAgaXRlbSA9IGl0ZW1zW2luZGV4XVxuICAgIHRpbWUgPSBpICogc3BhY2luZ1xuICAgIHJhd1NlcXVlbmNlXG4gICAgICAuZnJvbVRvKFxuICAgICAgICBpdGVtLFxuICAgICAgICB7IHNjYWxlOiAwLCBvcGFjaXR5OiAwIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHpJbmRleDogMTAwLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjUsXG4gICAgICAgICAgeW95bzogdHJ1ZSxcbiAgICAgICAgICByZXBlYXQ6IDEsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbicsXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgdGltZSxcbiAgICAgIClcbiAgICAgIC5mcm9tVG8oXG4gICAgICAgIGl0ZW0sXG4gICAgICAgIHsgeFBlcmNlbnQ6IGlzTW9iaWxlRGV2aWNlKCkgPyAxMDAgOiA0MDAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHhQZXJjZW50OiBpc01vYmlsZURldmljZSgpID8gLTEwMCA6IC00MDAsXG4gICAgICAgICAgZHVyYXRpb246IDEsXG4gICAgICAgICAgZWFzZTogJ25vbmUnLFxuICAgICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWUsXG4gICAgICApXG4gICAgaSA8PSBpdGVtcy5sZW5ndGggJiYgc2VhbWxlc3NMb29wLmFkZCgnbGFiZWwnICsgaSwgdGltZSlcbiAgfVxuXG4gIHJhd1NlcXVlbmNlLnRpbWUoc3RhcnRUaW1lKVxuICBzZWFtbGVzc0xvb3BcbiAgICAudG8ocmF3U2VxdWVuY2UsIHtcbiAgICAgIHRpbWU6IGxvb3BUaW1lLFxuICAgICAgZHVyYXRpb246IGxvb3BUaW1lIC0gc3RhcnRUaW1lLFxuICAgICAgZWFzZTogJ25vbmUnLFxuICAgIH0pXG4gICAgLmZyb21UbyhcbiAgICAgIHJhd1NlcXVlbmNlLFxuICAgICAgeyB0aW1lOiBvdmVybGFwICogc3BhY2luZyArIDEgfSxcbiAgICAgIHtcbiAgICAgICAgdGltZTogc3RhcnRUaW1lLFxuICAgICAgICBkdXJhdGlvbjogc3RhcnRUaW1lIC0gKG92ZXJsYXAgKiBzcGFjaW5nICsgMSksXG4gICAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICAgIGVhc2U6ICdub25lJyxcbiAgICAgIH0sXG4gICAgKVxuICByZXR1cm4gc2VhbWxlc3NMb29wXG59XG4iLCJjb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWN0aW9uJylcbmNvbnN0IG1hcnNJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFycycpXG5jb25zdCBsaW5lT25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfb25lJylcbmNvbnN0IGxpbmVUd28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZV90d28nKVxuY29uc3QgbGluZVRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdGhyZWUnKVxuY29uc3Qgc2VjdGlvbk9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9vbmUnKVxuY29uc3Qgc2VjdGlvblR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90d28nKVxuY29uc3Qgc2VjdGlvblRocmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX3RocmVlJylcbmNvbnN0IHNlY3Rpb25Gb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX2ZvdXInKVxuY29uc3Qgc2VjdGlvbk9uZU1vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV9vbmVfbV9pbWcnKVxuY29uc3Qgc2VjdGlvblR3b01vYmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zcGFjZV90d29fbV9pbWcnKVxuY29uc3Qgc2VjdGlvblRocmVlTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX3RocmVlX21faW1nJylcbmNvbnN0IHNlY3Rpb25Gb3VyTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwYWNlX2ZvdXJfbV9pbWcnKVxuXG5jb25zdCBpc1BjID0gd2luZG93LmlubmVyV2lkdGggPiA3NjdcblxubGV0IGN1cnJlbnRTZWN0aW9uID0gMFxubGV0IGlzU2Nyb2xsaW5nID0gZmFsc2VcblxuLyoqXG4gKiDsiqTtgazroaQg7ZWo7IiYXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqL1xuY29uc3Qgc2Nyb2xsVG9TZWN0aW9uID0gKGluZGV4KSA9PiB7XG4gIHNlY3Rpb25zW2luZGV4XS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KVxuICBjdXJyZW50U2VjdGlvbiA9IGluZGV4XG5cbiAgaWYgKGN1cnJlbnRTZWN0aW9uICE9PSAwKSB7XG4gICAgaWYgKGlzUGMpIHtcbiAgICAgIG1hcnNJbWcuc3R5bGUub3BhY2l0eSA9IDBcbiAgICB9XG5cbiAgICByZXR1cm5cbiAgfVxuXG4gIG1hcnNJbWcuc3R5bGUub3BhY2l0eSA9IDFcbn1cblxuLyoqXG4gKiDsmrDso7zsnbgg7JWg64uI66mU7J207IWYIO2VqOyImFxuICovXG5jb25zdCBhbmltYXRlUmFuZG9tbHkgPSAoKSA9PiB7XG4gIGdzYXAudG8oJyNtYW4nLCB7XG4gICAgeDogKCkgPT4gTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCksXG4gICAgeTogKCkgPT4gTWF0aC5yYW5kb20oKSAqICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDApLFxuICAgIGR1cmF0aW9uOiA3LFxuICAgIG9uQ29tcGxldGU6IGFuaW1hdGVSYW5kb21seSxcbiAgICBlYXNlOiAnbm9uZScsXG4gIH0pXG59XG5cbi8qKlxuICog7ZmU7ISxIOyVoOuLiOuplOydtOyFmFxuICovXG5jb25zdCBhbmltYXRlTWFycyA9ICgpID0+IHtcbiAgZ3NhcC50bygnI21hcnMnLCB7XG4gICAgcm90YXRpb246IDM2MCxcbiAgICBkdXJhdGlvbjogMTgwLFxuICAgIHJlcGVhdDogLTEsXG4gICAgZWFzZTogJ2xpbmVhcicsXG4gIH0pXG59XG5cbmxpbmVPbmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChpc1BjKSB7XG4gICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIH0gZWxzZSB7XG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25Ud29Nb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgIHNlY3Rpb25UaHJlZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25Gb3VyTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gIH1cblxuICBzY3JvbGxUb1NlY3Rpb24oMSlcbn0pXG5cbmxpbmVUd28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IGxpbmVUd29JbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3R3byA6Zmlyc3QtY2hpbGQnKVxuICBjb25zdCBpbWFnZVNyY0FyciA9IGxpbmVUd29JbWFnZS5zcmMuc3BsaXQoJy8nKVxuICBjb25zdCBpbWFnZVNyYyA9IGltYWdlU3JjQXJyW2ltYWdlU3JjQXJyLmxlbmd0aCAtIDFdXG4gIGlmIChpbWFnZVNyYyA9PT0gJ2Rvd24uc3ZnJykge1xuICAgIGlmIChpc1BjKSB7XG4gICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgc2VjdGlvblRocmVlTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgIHNlY3Rpb25Gb3VyTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgfVxuICAgIHNjcm9sbFRvU2VjdGlvbigyKVxuICB9XG59KVxuXG5saW5lVGhyZWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChpc1BjKSB7XG4gICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzZWN0aW9uRm91ci5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gIH0gZWxzZSB7XG4gICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgIHNlY3Rpb25Ud29Nb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzZWN0aW9uVGhyZWVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gIH1cblxuICBzY3JvbGxUb1NlY3Rpb24oMylcbn0pXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XG4gIGlmIChpc1Njcm9sbGluZykgcmV0dXJuXG5cbiAgaWYgKGUuZGVsdGFZID4gMCkge1xuICAgIHNjcm9sbFRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpXG4gIH1cblxuICBpZiAoZS5kZWx0YVkgPCAwKSB7XG4gICAgc2Nyb2xsVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uIC0gMSlcbiAgfVxuXG4gIGlmIChpc1BjKSB7XG4gICAgc3dpdGNoIChjdXJyZW50U2VjdGlvbikge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAxOlxuICAgICAgICBzZWN0aW9uT25lLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICAgIHNlY3Rpb25Ud28uc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgc2VjdGlvbk9uZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBzZWN0aW9uVHdvLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICAgIHNlY3Rpb25UaHJlZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICAgIHNlY3Rpb25Gb3VyLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgc2VjdGlvblR3by5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBzZWN0aW9uVGhyZWUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgc2VjdGlvbkZvdXIuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJ3pvb20gMTBzIGluZmluaXRlJ1xuICAgICAgICBzZWN0aW9uVHdvTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICAgIHNlY3Rpb25UaHJlZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIDE6XG4gICAgICAgIHNlY3Rpb25PbmVNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgc2VjdGlvblR3b01vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICAgIHNlY3Rpb25UaHJlZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzZWN0aW9uT25lTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICAgIHNlY3Rpb25Ud29Nb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgc2VjdGlvblRocmVlTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICAgICAgc2VjdGlvbkZvdXJNb2JpbGUuc3R5bGUuYW5pbWF0aW9uID0gJydcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgc2VjdGlvbk9uZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBzZWN0aW9uVHdvTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICcnXG4gICAgICAgIHNlY3Rpb25UaHJlZU1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnJ1xuICAgICAgICBzZWN0aW9uRm91ck1vYmlsZS5zdHlsZS5hbmltYXRpb24gPSAnem9vbSAxMHMgaW5maW5pdGUnXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaXNTY3JvbGxpbmcgPSB0cnVlXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlzU2Nyb2xsaW5nID0gZmFsc2VcbiAgfSwgMTAwMClcbn0pXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIGFuaW1hdGVSYW5kb21seSgpXG4gIGFuaW1hdGVNYXJzKClcbn0pXG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgIHNlY3Rpb25PbmUuc3R5bGUuYW5pbWF0aW9uZSA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgICBzZWN0aW9uT25lTW9iaWxlLnN0eWxlLmFuaW1hdGlvbiA9ICd6b29tIDEwcyBpbmZpbml0ZSdcbiAgfSwgMzApXG59XG5cbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAndG91Y2hzdGFydCcsXG4gIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH0sXG4gIGZhbHNlLFxuKVxuIiwiY29uc3QgbW92aW5nVGV4dExlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtbGVmdCcpXG5jb25zdCBtb3ZpbmdUZXh0Q2VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmluZy10ZXh0LWNlbnRlcicpXG5jb25zdCBtb3ZpbmdUZXh0UmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aW5nLXRleHQtcmlnaHQnKVxuY29uc3QgbW92aW5nVGV4dFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC10b3AnKVxuY29uc3QgbW92aW5nVGV4dE1pZGRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1taWRkbGUnKVxuY29uc3QgbW92aW5nVGV4dEJvdHRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctdGV4dC1ib3R0b20nKVxuY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJylcbmNvbnN0IG1hcnNJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXJzMicpXG5jb25zdCBtb2JpbGVNYXJzSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlX21hcnMnKVxuY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjdcblxuY29uc3Qgbm9kZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub2RlJylcbmNvbnN0IG5vZGVEaXZGb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGVfdHdvJylcbmNvbnN0IG5vZGVEaXZGaXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vZGVfdGhyZWUnKVxuXG5jb25zdCB0YXJnZXRFbGVtZW50T25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2UnKVxuY29uc3QgdGFyZ2V0RWxlbWVudFR3byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50d28tY29udGVudCcpXG5jb25zdCB0YXJnZXRFbGVtZW50VGhyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92ZV93aGF0JylcbmNvbnN0IHRhcmdldEVsZW1lbnRNb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uLWNvbnRhaW5lci1NJylcbmNvbnN0IHRhcmdldEVsZW1lbnRGb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVfd2hlcmUnKVxuXG5jb25zdCBsaW5lQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvJylcbmNvbnN0IGxpbmVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5lX3R3byA6Zmlyc3QtY2hpbGQnKVxuXG5sZXQgaXNNb3ZlU2xpZGVyID0gdHJ1ZVxubGV0IGlzTW92ZSA9IHRydWVcbmxldCBpc01vYmlsZU1vdmUgPSB0cnVlXG5cbmNvbnN0IG9ic2VydmVyT25lID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICB0YXJnZXRFbGVtZW50T25lLFxuICAgICAgICB7IHg6ICc1MDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzAnLFxuICAgICAgICAgIHk6ICctNTAwJScsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50T25lLCB7IGNvbG9yOiAnd2hpdGUnLCBkdXJhdGlvbjogMSB9KVxuICAgICAgICAgICAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgICAgbm9kZURpdi5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJUd28gPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgaWYgKCFpc01vdmUpIHtcbiAgICAgICAgaXNNb3ZlID0gdHJ1ZVxuICAgICAgfVxuICAgICAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICBub2RlRGl2LnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMCdcblxuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIG1vdmluZ1RleHRMZWZ0LFxuICAgICAgICB7IHg6ICctNTAwJScsIHk6IDAsIG9wYWNpdHk6IDEgfSxcbiAgICAgICAgeyB4OiAnLTIwJScsIHk6IDAsIG9wYWNpdHk6IDEsIGR1cmF0aW9uOiA1LCBlYXNlOiAncG93ZXIyLm91dCcgfSxcbiAgICAgIClcblxuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIG1vdmluZ1RleHRDZW50ZXIsXG4gICAgICAgIHsgeDogJzMwJScsIHk6IDMwMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7IHg6ICczMCUnLCB5OiAwLCBvcGFjaXR5OiAxLCBkdXJhdGlvbjogNSwgZWFzZTogJ3Bvd2VyMi5vdXQnIH0sXG4gICAgICApXG5cbiAgICAgIGdzYXAuZnJvbVRvKFxuICAgICAgICBtb3ZpbmdUZXh0UmlnaHQsXG4gICAgICAgIHsgeDogJzQwMCUnLCB5OiA0MCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzQwJScsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAzLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBpc01vdmUgPSBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuICB9KVxufSlcblxuY29uc3Qgb2JzZXJ2ZXJUaHJlZSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBnc2FwLmZyb21UbyhcbiAgICAgICAgdGFyZ2V0RWxlbWVudFRocmVlLFxuICAgICAgICB7IHg6ICcxMDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzAnLFxuICAgICAgICAgIHk6ICctNTAwJScsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50VGhyZWUsIHsgY29sb3I6ICd3aGl0ZScsIGR1cmF0aW9uOiAxIH0pXG4gICAgICAgICAgICBub2RlRGl2Rml2ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgICAgbm9kZURpdkZpdmUuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgaXNNb3ZlU2xpZGVyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBub2RlRGl2Rml2ZS5zdHlsZS5vcGFjaXR5ID0gJzEnXG4gICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICB9XG4gIH0pXG59KVxuXG5jb25zdCBvYnNlcnZlckZvdXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgZ3NhcC5mcm9tVG8oXG4gICAgICAgIHRhcmdldEVsZW1lbnRGb3VyLFxuICAgICAgICB7IHg6ICc1MDAlJywgeTogMCwgb3BhY2l0eTogMSB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogJzAnLFxuICAgICAgICAgIHk6ICctNTAwJScsXG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMyxcbiAgICAgICAgICBlYXNlOiAncG93ZXIyLm91dCcsXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgZ3NhcC50byh0YXJnZXRFbGVtZW50Rm91ciwgeyBjb2xvcjogJ3doaXRlJywgZHVyYXRpb246IDEgfSlcbiAgICAgICAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICAgICAgICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICAgICAgICBpc01vdmVTbGlkZXIgPSBmYWxzZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG5vZGVEaXZGb3VyLnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKVxuICAgIH1cbiAgfSlcbn0pXG5cbmNvbnN0IG9ic2VydmVyTW9iaWxlID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIGlmICghaXNNb2JpbGVNb3ZlKSByZXR1cm5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBnc2FwLnRvKCcuYmlnLWNpcmNsZScsIHtcbiAgICAgICAgICByb3RhdGlvbjogMzYwLFxuICAgICAgICAgIGR1cmF0aW9uOiAxODAsXG4gICAgICAgICAgcmVwZWF0OiAtMSxcbiAgICAgICAgICBlYXNlOiAnbGluZWFyJyxcbiAgICAgICAgfSlcblxuICAgICAgICBnc2FwLnRvKCcuc21hbGwtY2lyY2xlJywge1xuICAgICAgICAgIHJvdGF0aW9uOiAzNjAsXG4gICAgICAgICAgZHVyYXRpb246IDEwMCxcbiAgICAgICAgICByZXBlYXQ6IC0xLFxuICAgICAgICAgIGVhc2U6ICdsaW5lYXInLFxuICAgICAgICB9KVxuXG4gICAgICAgIC8vMeuyiOynuCDslaDri4jrqZTsnbTshZggJ+yasOumrOuKlCdcbiAgICAgICAgZ3NhcC50byhtb3ZpbmdUZXh0VG9wLCB7XG4gICAgICAgICAgeDogJzE1MCUnLFxuICAgICAgICAgIHk6ICctMjAlJyxcbiAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcbiAgICAgICAgfSlcblxuICAgICAgICAvLyAvLzHrsojsp7gg7JWg64uI66mU7J207IWYICfslrTrlJTshJwnXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dE1pZGRsZSwge1xuICAgICAgICAgIHg6ICc1MCUnLFxuICAgICAgICAgIHk6ICcxODUlJyxcbiAgICAgICAgICBiZXppZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzb2Z0JyxcbiAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICB7IHg6ICctMjAlJywgeTogJzAlJyB9LFxuICAgICAgICAgICAgICB7IHg6ICcxMDAlJywgeTogJy0yNSUnIH0sXG4gICAgICAgICAgICAgIHsgeDogJzE1MCUnLCB5OiAnLTUwJScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcbiAgICAgICAgfSlcblxuICAgICAgICAvLzLrsojsp7gg7JWg64uI66mU7J207IWYICfsmrDrpqzqsIAnXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dFRvcCwge1xuICAgICAgICAgIHg6ICcxNTAlJyxcbiAgICAgICAgICB5OiAnLTQwJScsXG4gICAgICAgICAgZHVyYXRpb246IDIsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gICAgICAgICAgZGVsYXk6IDIuNSxcbiAgICAgICAgfSlcblxuICAgICAgICBnc2FwLnRvKG1vdmluZ1RleHRNaWRkbGUsIHtcbiAgICAgICAgICB4OiAnNTAlJyxcbiAgICAgICAgICB5OiAnMzAlJyxcbiAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICBlYXNlOiAncG93ZXIxLmluT3V0JyxcbiAgICAgICAgICBkZWxheTogMi41LFxuICAgICAgICB9KVxuXG4gICAgICAgIGdzYXAudG8obW92aW5nVGV4dEJvdHRvbSwge1xuICAgICAgICAgIHg6ICctNTAlJyxcbiAgICAgICAgICB5OiAnMTAwJScsXG4gICAgICAgICAgYmV6aWVyOiB7XG4gICAgICAgICAgICB0eXBlOiAnc29mdCcsXG4gICAgICAgICAgICB2YWx1ZXM6IFtcbiAgICAgICAgICAgICAgeyB4OiAnLTIwJScsIHk6ICcwJScgfSxcbiAgICAgICAgICAgICAgeyB4OiAnMTAwJScsIHk6ICctMjUlJyB9LFxuICAgICAgICAgICAgICB7IHg6ICcxMzAlJywgeTogJy01MCUnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZHVyYXRpb246IDIsXG4gICAgICAgICAgZWFzZTogJ3Bvd2VyMS5pbk91dCcsXG4gICAgICAgICAgZGVsYXk6IDIuNSxcbiAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaXNNb2JpbGVNb3ZlID0gZmFsc2VcbiAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBnc2FwLnRvKG1vYmlsZU1hcnNJbWFnZSwge1xuICAgICAgICAgIHk6ICctNTAlJyxcbiAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMi41LFxuICAgICAgICAgIGRlbGF5OiAzLFxuICAgICAgICAgIGVhc2U6ICdwb3dlcjIub3V0JyxcbiAgICAgICAgfSlcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9KVxufSlcblxub2JzZXJ2ZXJPbmUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50T25lKVxub2JzZXJ2ZXJUd28ub2JzZXJ2ZSh0YXJnZXRFbGVtZW50VHdvKVxub2JzZXJ2ZXJUaHJlZS5vYnNlcnZlKHRhcmdldEVsZW1lbnRUaHJlZSlcbm9ic2VydmVyRm91ci5vYnNlcnZlKHRhcmdldEVsZW1lbnRGb3VyKVxub2JzZXJ2ZXJNb2JpbGUub2JzZXJ2ZSh0YXJnZXRFbGVtZW50TW9iaWxlKVxuXG5jb25zdCBzbGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZScpXG5sZXQgc2xpZGVXaWR0aCA9IHNsaWRlLmNsaWVudFdpZHRoXG5cbmNvbnN0IHNsaWRlSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVfaXRlbScpXG5jb25zdCBtYXhTbGlkZSA9IHNsaWRlSXRlbXMubGVuZ3RoXG5cbmxldCBjdXJyU2xpZGUgPSAxXG5cbmNvbnN0IG5leHRNb3ZlID0gKHNsaWRlKSA9PiB7XG4gIGN1cnJTbGlkZSA9IHNsaWRlXG4gIGlmIChjdXJyU2xpZGUgPD0gbWF4U2xpZGUpIHtcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoICogKGN1cnJTbGlkZSAtIDEpXG4gICAgc2xpZGVJdGVtcy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICBpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbGVmdDogJHstb2Zmc2V0fXB4YClcbiAgICB9KVxuXG4gICAgcmV0dXJuXG4gIH1cbiAgY3VyclNsaWRlLS1cbn1cblxuY29uc3QgcHJldk1vdmUgPSAoKSA9PiB7XG4gIGN1cnJTbGlkZS0tXG4gIGlmIChjdXJyU2xpZGUgPiAwKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aCAqIChjdXJyU2xpZGUgLSAxKVxuICAgIHNsaWRlSXRlbXMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXG4gICAgfSlcblxuICAgIHJldHVyblxuICB9XG5cbiAgY3VyclNsaWRlKytcbn1cblxuY29uc3QgZGlzYWJsZWQgPSAoKSA9PiB7XG4gIHRpdGxlVGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG1vdmluZ1RleHRSaWdodC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG1vdmluZ1RleHRMZWZ0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cblxuY29uc3QgaGlkZUNvbXBvbmVudCA9ICgpID0+IHtcbiAgbm9kZURpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG5vZGVEaXYuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICBub2RlRGl2Rml2ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIG5vZGVEaXZGaXZlLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgbm9kZURpdkZvdXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlRGl2Rm91ci5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gIGdzYXAudG8odGFyZ2V0RWxlbWVudE9uZSwge1xuICAgIHg6ICc1MDAlJyxcbiAgICB5OiAnNTAwJScsXG4gICAgY29sb3I6ICcjYTJhMmEyJyxcbiAgICBkdXJhdGlvbjogMSxcbiAgfSlcbiAgZ3NhcC50byh0YXJnZXRFbGVtZW50VGhyZWUsIHtcbiAgICB4OiAnLTEwMCUnLFxuICAgIHk6ICc1MDAlJyxcbiAgICBjb2xvcjogJyNhMmEyYTInLFxuICAgIGR1cmF0aW9uOiAxLFxuICB9KVxuICBnc2FwLnRvKHRhcmdldEVsZW1lbnRGb3VyLCB7XG4gICAgeDogJzUwMCUnLFxuICAgIHk6ICc1MDAlJyxcbiAgICBjb2xvcjogJyNhMmEyYTInLFxuICAgIGR1cmF0aW9uOiAxLFxuICB9KVxufVxuXG5tb3ZpbmdUZXh0Q2VudGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoaXNNb3ZlKSByZXR1cm5cbiAgaGlkZUNvbXBvbmVudCgpXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZSgzKVxufSlcblxubW92aW5nVGV4dFJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoaXNNb3ZlKSByZXR1cm5cbiAgaGlkZUNvbXBvbmVudCgpXG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZSg0KVxufSlcblxubW92aW5nVGV4dExlZnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChpc01vdmUpIHJldHVyblxuICBoaWRlQ29tcG9uZW50KClcbiAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvbGVmdC5zdmcnXG4gIG5leHRNb3ZlKDIpXG59KVxuXG4vKipcbiAqIO2ZlOyEsSDslaDri4jrqZTsnbTshZhcbiAqL1xuY29uc3QgYW5pbWF0ZU1vYmlsZU1hcnMgPSAoKSA9PiB7XG4gIGdzYXAudG8oJyNtb2JpbGVfbWFycycsIHtcbiAgICByb3RhdGlvbjogMzYwLFxuICAgIGR1cmF0aW9uOiAxODAsXG4gICAgcmVwZWF0OiAtMSxcbiAgICBlYXNlOiAnbGluZWFyJyxcbiAgfSlcbn1cblxubGluZUJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgbGluZVR3b0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmVfdHdvIDpmaXJzdC1jaGlsZCcpXG4gIGNvbnN0IGltYWdlU3JjQXJyID0gbGluZVR3b0ltYWdlLnNyYy5zcGxpdCgnLycpXG4gIGNvbnN0IGltYWdlU3JjID0gaW1hZ2VTcmNBcnJbaW1hZ2VTcmNBcnIubGVuZ3RoIC0gMV1cbiAgaWYgKGlzTW9iaWxlKSB7XG4gICAgaWYgKGltYWdlU3JjID09PSAnbGVmdC5zdmcnKSB7XG4gICAgICBuZXh0TW92ZU1vYmlsZSgxKVxuICAgICAgbGluZUltYWdlLnNyYyA9ICcuL2ltYWdlcy9zdmcvZG93bi5zdmcnXG4gICAgfVxuICB9XG4gIGlmIChpc01vdmVTbGlkZXIpIHJldHVyblxuXG4gIGlzTW92ZVNsaWRlciA9IHRydWVcbiAgaWYgKGltYWdlU3JjID09PSAnbGVmdC5zdmcnKSB7XG4gICAgaGlkZUNvbXBvbmVudCgpXG4gICAgbmV4dE1vdmUoMSlcbiAgICBsaW5lSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL3N2Zy9kb3duLnN2ZydcbiAgfVxufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgc2xpZGVXaWR0aCA9IHNsaWRlLmNsaWVudFdpZHRoXG59KVxuXG4vLyAqKiBNb2JpbGVcbmNvbnN0IHNsaWRlTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNsaWRlX20nKVxubGV0IHNsaWRlV2lkdGhNb2JpbGUgPSBzbGlkZU1vYmlsZS5jbGllbnRXaWR0aFxuXG5jb25zdCBzbGlkZUl0ZW1zTW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlX2l0ZW1fbScpXG5jb25zdCBtYXhTbGlkZU1vYmlsZSA9IHNsaWRlSXRlbXNNb2JpbGUubGVuZ3RoXG5cbmxldCBjdXJyU2xpZGVNb2JpbGUgPSAxXG5cbmNvbnN0IG5leHRNb3ZlTW9iaWxlID0gKHNsaWRlKSA9PiB7XG4gIGN1cnJTbGlkZU1vYmlsZSA9IHNsaWRlXG4gIGlmIChjdXJyU2xpZGVNb2JpbGUgPD0gbWF4U2xpZGVNb2JpbGUpIHtcbiAgICBjb25zdCBvZmZzZXQgPSBzbGlkZVdpZHRoTW9iaWxlICogKGN1cnJTbGlkZU1vYmlsZSAtIDEpXG4gICAgc2xpZGVJdGVtc01vYmlsZS5mb3JFYWNoKChpKSA9PiB7XG4gICAgICBpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgbGVmdDogJHstb2Zmc2V0fXB4YClcbiAgICB9KVxuXG4gICAgcmV0dXJuXG4gIH1cbiAgY3VyclNsaWRlTW9iaWxlLS1cbn1cblxuY29uc3QgcHJldk1vdmVNb2JpbGUgPSAoKSA9PiB7XG4gIGN1cnJTbGlkZU1vYmlsZS0tXG4gIGlmIChjdXJyU2xpZGVNb2JpbGUgPiAwKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVXaWR0aE1vYmlsZSAqIChjdXJyU2xpZGVNb2JpbGUgLSAxKVxuICAgIHNsaWRlSXRlbXNNb2JpbGUuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGxlZnQ6ICR7LW9mZnNldH1weGApXG4gICAgfSlcblxuICAgIHJldHVyblxuICB9XG5cbiAgY3VyclNsaWRlTW9iaWxlKytcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgYW5pbWF0ZU1vYmlsZU1hcnMoKVxufSlcblxuLy8g7Jqw66as64qUIO2BtOumrSDsnbTrsqTtirhcbm1vdmluZ1RleHRUb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZU1vYmlsZSgyKVxufSlcblxuLy8g7Ja065SU7IScIO2BtOumrSDsnbTrsqTtirhcbm1vdmluZ1RleHRNaWRkbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZU1vYmlsZSgzKVxufSlcblxuLy8g66y07JeH7J2EIO2BtOumrSDsnbTrsqTtirhcbm1vdmluZ1RleHRCb3R0b20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGxpbmVJbWFnZS5zcmMgPSAnLi9pbWFnZXMvc3ZnL2xlZnQuc3ZnJ1xuICBuZXh0TW92ZU1vYmlsZSg0KVxufSlcbiJdfQ==
