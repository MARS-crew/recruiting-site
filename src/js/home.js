// home.js

document.addEventListener('DOMContentLoaded', function () {
  // 1, 2, 3, 4 링크 요소 가져오기
  const link1 = document.getElementById('1')
  const link2 = document.getElementById('2')
  const link3 = document.getElementById('3')
  const link4 = document.getElementById('4')

  // 1번 링크 클릭 시 이벤트 처리
  link1.addEventListener('click', function () {
    // 원하는 .html 페이지 주소로 이동
    window.location.href = 'page1.html'
  })

  // 2번 링크 클릭 시 이벤트 처리
  link2.addEventListener('click', function () {
    // 원하는 .html 페이지 주소로 이동
    window.location.href = 'page2.html'
  })

  // 3번 링크 클릭 시 이벤트 처리
  link3.addEventListener('click', function () {
    // 원하는 .html 페이지 주소로 이동
    window.location.href = 'page3.html'
  })

  // 4번 링크 클릭 시 이벤트 처리
  link4.addEventListener('click', function () {
    // 원하는 .html 페이지 주소로 이동
    window.location.href = 'page4.html'
  })
})
