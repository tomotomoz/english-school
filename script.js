'use strict'
// hamburger menu
const active = document.querySelector('.nav-area')
const hamburgerBtn = document.getElementById('hamburger-btn')
const hamburger = document.querySelector('.hamburger')


hamburgerBtn.addEventListener('click', function() {
  active.classList.toggle('active')
  hamburger.classList.toggle('active')
});

const nav = document.querySelectorAll('.nav-area > nav > ul > li > a')

nav.forEach((el) => {
  el.addEventListener('click', function(){
  active.classList.remove('active')
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

// とても見やすくまとめられています！gsapを使うことでコードも読みやすくなっており、修正点はありませんでした！
// 別の方法としてIntersection Observer APIを使うことができますが、gsapの方がモダンな書き方ですし、記述量も少ないので、あえてIntersection Observer APIを使わなくてもいいかなと個人的には思います！
// 一応、以下に方法は記しておきますので、見比べてみてください！

// hamburger menu
const active = document.querySelector('.nav-area');
const hamburgerBtn = document.getElementById('hamburger-btn');
const hamburger = document.querySelector('.hamburger');

hamburgerBtn.addEventListener('click', function() {
  active.classList.toggle('active');
  hamburger.classList.toggle('active');
});

const nav = document.querySelectorAll('.nav-area > nav > ul > li > a');

nav.forEach((el) => {
  el.addEventListener('click', function() {
    active.classList.remove('active');
  });
});

// Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateElement = (element, options, animation) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Object.assign(element.style, animation);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(element);
  };

  // Initial styles
  const initialStyles = () => {
    const contentLeft = document.querySelector('.content-left');
    const contentRight = document.querySelector('.content-right');

    if (contentLeft) {
      contentLeft.style.transform = 'translateX(-100px)';
      contentLeft.style.opacity = '0';
    }

    if (contentRight) {
      contentRight.style.transform = 'translateX(100px)';
      contentRight.style.opacity = '0';
    }
  };

  initialStyles();

  // reason
  const contentLeft = document.querySelector('.content-left');
  animateElement(contentLeft, observerOptions, { transform: 'translateX(0)', opacity: '1', transition: 'all 1s ease' });

  const contentRight = document.querySelector('.content-right');
  animateElement(contentRight, observerOptions, { transform: 'translateX(0)', opacity: '1', transition: 'all 1s ease' });

  // voice
  const voiceContents = document.querySelectorAll('.voice-content');
  voiceContents.forEach((voiceContent) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          voiceContent.classList.add('balloon');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    observer.observe(voiceContent);
  });

  // marker
  const marker = document.querySelector('.marker');
  const observerMarker = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        marker.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  observerMarker.observe(marker);
});
