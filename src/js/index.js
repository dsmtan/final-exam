import '../scss/styles.scss';
// don't delete! or cry.

const header = document.querySelector('.header--main');
const eventTitle = document.querySelector('.h1--eventtitle');
const eventTagline = document.querySelector('.h2--eventsubtitle');
const navBar = document.querySelector('.section--navbar');
const navBarInfo = document.querySelector('.div--eventessentials');

const aboutHeader = document.querySelector('#h2--about');
const aboutDescription = document.querySelector('.p--aboutDescription');
const aboutImage = document.querySelector('.img--about');
const firstSpeakerDiv = document.querySelector('.div--firstspeakers');
const collapsedSpeakerDiv = document.querySelector('.div--collapsiblespeakers');
const collapseButton = document.querySelector('#collapseButton');

const ticketTypesDiv = document.querySelector('.div--ticketTypes');
const partnerDiv = document.querySelector('.div--partners');

const speakerTemplate = document.querySelector('#featuredSpeakerTemplate')
  .content;
const ticketTemplate = document.querySelector('#ticketTemplate').content;
const partnerTemplate = document.querySelector('#featuredPartnerTemplate')
  .content;

let websiteSettings = [];
let speakers = [];
let isCollapsed = true;

window.onload = function() {
  import(
    /* webpackChunkName: "json/eventInfo" */
    './json/eventInfo.json'
  ).then(({ default: eventData }) => {
    websiteSettings = eventData;
    console.log(eventData);
    setWebsiteColors(websiteSettings);
    setHeader(websiteSettings);
    setAbout(websiteSettings);
    setTickets(websiteSettings);
    setPartners(websiteSettings);
    setVenue(websiteSettings);
  });

  import(
    /* webpackChunkName: "json/speakers" */
    './json/speakers.json'
  ).then(({ default: speakerData }) => {
    speakers = speakerData;
    setSpeakers(speakers);
  });
};

window.addEventListener('DOMContentLoaded', loadCalendarSVG);
function loadCalendarSVG() {
  fetch('./images/calendar.svg')
    .then(response => response.text())
    .then(svgdata => {
      document
        .querySelector('#calendarSvgContainer')
        .insertAdjacentHTML('afterbegin', svgdata);
    });
}

window.addEventListener('scroll', function(e) {
  if (window.scrollY < 20) {
    navBar.classList.remove('onscrollHeight');
    navBarInfo.classList.remove('scrollDown');
  } else {
    navBar.classList.add('onscrollHeight');
    navBarInfo.classList.add('scrollDown');
  }
});

collapseButton.addEventListener('click', function(e) {
  isCollapsed = !isCollapsed;
  collapsedSpeakerDiv.classList.toggle('collapsed');
  collapseButton.textContent = isCollapsed ? 'See more' : 'See less';
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

const setHeader = websiteSettings => {
  header.style.backgroundImage = `url(${websiteSettings.coverPhoto})`;
  document.title = websiteSettings.eventTitle;
  eventTitle.textContent = websiteSettings.eventTitle;
  eventTagline.textContent = websiteSettings.eventTagline;
};

const setAbout = websiteSettings => {
  aboutHeader.textContent = websiteSettings.descriptionHeader;
  aboutDescription.innerHTML = websiteSettings.description;
  aboutImage.src = websiteSettings.aboutImage;
};

const setSpeakers = speakers => {
  speakers.slice(0, 6).map(featuredSpeaker => {
    const speakerCopy = speakerTemplate.cloneNode(true);
    const newSpeaker = speakerCopy.querySelector('.div--speakerfeatured');
    newSpeaker.querySelector('img').src = featuredSpeaker.speakerFeaturedImg;
    newSpeaker.querySelector('h3').textContent = featuredSpeaker.speakerName;
    newSpeaker.querySelector('p').textContent = featuredSpeaker.speakerPosition;
    firstSpeakerDiv.appendChild(newSpeaker);
  });

  speakers.slice(6).map(featuredSpeaker => {
    const speakerCopy = speakerTemplate.cloneNode(true);
    const newSpeaker = speakerCopy.querySelector('.div--speakerfeatured');
    newSpeaker.querySelector('img').src = featuredSpeaker.speakerFeaturedImg;
    newSpeaker.querySelector('h3').textContent = featuredSpeaker.speakerName;
    newSpeaker.querySelector('p').textContent = featuredSpeaker.speakerPosition;
    collapsedSpeakerDiv.appendChild(newSpeaker);
  });
};

const setTickets = websiteSettings => {
  websiteSettings.ticketTypes.map(ticketType => {
    const ticketCopy = ticketTemplate.cloneNode(true);
    const ticketDiv = ticketCopy.querySelector('.div--ticketItem');
    ticketDiv.querySelector('h3').textContent = ticketType.ticketName;
    ticketDiv.querySelector('p').textContent = ticketType.ticketPrice;

    ticketType.included.map(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      ticketDiv.appendChild(listItem);
    });

    ticketTypesDiv.appendChild(ticketDiv);
  });
};

const setPartners = websiteSettings => {
  websiteSettings.featuredPartners.map(partner => {
    const newPartner = partnerTemplate.cloneNode(true);
    newPartner.querySelector(
      '.img--partnerFeatured'
    ).style.backgroundImage = `url(${partner.logo})`;
    partnerDiv.appendChild(newPartner);
  });
};

const setVenue = ({ venueName, location, hashtags }) => {
  document.querySelector(
    '.p--address'
  ).textContent = `${venueName}, ${location}`;
  document.querySelector('.p--venuename').textContent = venueName;
  document.querySelector('.p--hashtag').textContent = hashtags;
};

// var docWidth = document.documentElement.offsetWidth;
// [].forEach.call(document.querySelectorAll('*'), function(el) {
//   if (el.offsetWidth > docWidth) {
//     console.log(el);
//     console.log(el.offsetWidth);
//     console.log(docWidth);
//   }
// });
