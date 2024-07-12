'use strict'
// hamburger menu
const navArea = document.querySelector('.nav-area')
const hamburgerBtn = document.getElementById('hamburger-btn')
const hamburger = document.querySelector('.hamburger')


hamburgerBtn.addEventListener('click', function() {
  navArea.classList.toggle('active')
  hamburger.classList.toggle('active')
});

const nav = document.querySelectorAll('.nav-area > nav > ul > li > a')

nav.forEach((el) => {
  el.addEventListener('click', function(){
    navArea.classList.remove('active')
  });
});



// gsap
gsap.registerPlugin(ScrollTrigger);


// reason
gsap.to('.content-left', {
  scrollTrigger: {
  trigger: '.content-area',
  start: 'top center', 
  //  markers: true,
  },
  x: 0,
  opacity: 1,
  duration: 1,
});

gsap.to('.content-right', {
  scrollTrigger: {
  trigger: '.content-left',
  start: 'center center', 
  //  markers: true,
  },
  x: 0,
  opacity: 1,
  duration: 1,
});

// voice
const voiceContents = document.querySelectorAll('.voice-content')

voiceContents.forEach((voiceContent) => {

  gsap.to (voiceContent, {
    scrollTrigger: {
      trigger: voiceContent,
      start: 'top center',
      // markers: true,
      toggleClass: {
        targets: voiceContent,
        className: 'balloon',
      },
      once: true,
    }
  });
});



// marker
gsap.to('.marker', {
  scrollTrigger: {
    trigger: '.marker',
    start: 'top center',
    toggleClass: {
      targets: '.marker',
      className: 'active',
    },
    once: true,
  }
});

