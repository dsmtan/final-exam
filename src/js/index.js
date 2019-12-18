import '../scss/styles.scss';
// don't delete! or cry.

const header = document.querySelector('.header--main');
const navBar = document.querySelector('.section--navbar');
const navBarInfo = document.querySelector('.div--eventessentials');

let websiteSettings = [];

console.log('Hi am I working?');

window.onload = function() {
  import(
    /* webpackChunkName: "json/eventInfo" */
    './json/eventInfo.json'
  ).then(({ default: eventData }) => {
    websiteSettings = eventData;
    console.log(eventData);
    console.log(websiteSettings);
    setWebsiteColors(websiteSettings);
    setCoverPhoto(websiteSettings);
  });
};

// window.addEventListener('DOMContentLoaded', loadCalendarSVG);
// function loadCalendarSVG() {
//   fetch('./images/calendar.svg')
//     .then(response => response.text())
//     .then(svgdata => {
//       document
//         .querySelector('#calendarSvgContainer')
//         .insertAdjacentHTML('afterbegin', svgdata);
//     });
// }

window.addEventListener('scroll', function(e) {
  if (window.scrollY < 20) {
    navBar.classList.remove('onscrollHeight');
    navBarInfo.classList.remove('scrollDown');
  } else {
    navBar.classList.add('onscrollHeight');
    navBarInfo.classList.add('scrollDown');
  }
});

const setWebsiteColors = () => {
  document.documentElement.style.setProperty(
    '--mainColor',
    websiteSettings.mainEventColor
  );
  document.documentElement.style.setProperty(
    '--secondaryColor',
    websiteSettings.secondaryColor
  );
};

const setCoverPhoto = () => {
  header.style.backgroundImage = `url(${websiteSettings.coverPhoto})`;
};
