import createSessionCards from './sessionCard.js';

('use strict');
let programGrid = document.querySelector('.program--grid');
let speakers = [];
let programSettings = [];
let eventSessions = [];
let favouriteList = [];
let favouriteClicked = false;

//templates
const daysButtonTemplate = document.querySelector('#daysButtonTemplate')
  .content;
const stageColumnTemplate = document.querySelector('#stageColumnTemplate')
  .content;

// init
window.onload = function() {
  localStorage.clear(); // for dev purposes clear - in prod it will remember from previous sessions
  favouriteList =
    localStorage.getItem('favouriteList') === null
      ? []
      : JSON.parse(localStorage.getItem('favouriteList'));

  // fetch programSettings and speakers data
  import(
    /* webpackChunkName: "json/programSettings" */
    './json/programSettings.json'
  ).then(({ default: programData }) => {
    programSettings = programData;
    fetchEventSessions(programSettings);
  });

  import(
    /* webpackChunkName: "json/speakers" */
    './json/speakers.json'
  ).then(({ default: speakerData }) => {
    speakers = speakerData;
  });
};

const fetchEventSessions = ({ eventID, eventDays, eventStages }) => {
  // get the right program sessions for this event
  import(
    /* webpackChunkName: "json/programSessions" */
    './json/programSessions.json'
  ).then(({ default: programSessions }) => {
    const eventProgram = programSessions.find(
      event => event.eventID === eventID
    );
    eventSessions = eventProgram.eventSessions;
    console.log(eventSessions);
    if (eventSessions.length > 0) {
      constructDaysBar(eventDays);
      constructStageColumns(eventDays, eventStages);
    }
  });
};

// EVENT HANDLERS
// -- favouriteList
const addToFavouriteList = e => {
  const addedSession = e.parentNode.id;
  e.src = './images/heart_solid.svg';
  favouriteList.push(addedSession);
  localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
  console.log(favouriteList);
};

const removeFromFavouriteList = e => {
  const removedSession = e.parentNode.id;
  e.src = './images/heart.svg';
  let index = favouriteList.indexOf(removedSession);
  index > -1 && favouriteList.splice(index, 1);
  localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
  showFavouriteList();
};

const showFavouriteList = () => {
  const selectedDay = document.querySelector('.current');
  selectedDay && selectedDay.classList.remove('current');
  programGrid.innerHTML = '';
  programGrid.classList.add('grid--favouriteList');
  fillColumnTemplate('Favourites');

  favouriteClicked = true;
  const favouriteSessions =
    favouriteList &&
    favouriteList.map(favourite =>
      eventSessions.find(session => session.sessionID === favourite)
    );
  displaySessionsByStage(favouriteSessions);
  console.log(favouriteList);
  console.log(favouriteSessions);

  // remove .current from day bar
};

// EVENT LISTENERS

document.addEventListener('click', function(event) {
  if (event.target.id === 'button--favouritelist') {
    showFavouriteList();
  }
  // if (event.target.classList.contains('icon--heartoutline')) {
  //   addToFavouriteList(event.target);
  // }
});

const constructDaysBar = eventDays => {
  eventDays.map((day, index) => {
    let dayNumber = index + 1;
    let dayStart = new Date(`${day.date}, ${day.startTime}`); //convert to UTC format
    let dayEnd = new Date(`${day.date}, ${day.endTime}`);
    let dayDurationHours =
      (dayEnd.getTime() - dayStart.getTime()) / (1000 * 3600); //number of sections to create vertical timeline

    let dayDateNumber = dayStart.getDate();
    const abbrOptions = { weekday: 'short' };
    let dayOfWeek = new Intl.DateTimeFormat('en-US', abbrOptions).format(
      dayStart
    );
    const dayData = {
      dayNumber,
      dayDateNumber,
      dayOfWeek,
    };
    createDaysButton(dayData);
  });
  // constructTimeline(dayDurationHours);
};

const daysBar = document.querySelector('.navbar--days');

// create button for each day and append to .navbar--days
const createDaysButton = dayData => {
  const dayButtonCopy = daysButtonTemplate.cloneNode(true);
  let dayButtonDiv = dayButtonCopy.querySelector('div');
  dayButtonDiv.id = 'dayButton' + dayData.dayNumber;
  dayButtonCopy.querySelector('.p--weekday').textContent = dayData.dayOfWeek;
  dayButtonCopy.querySelector('.p--date').textContent = dayData.dayDateNumber;

  //default current tab set to day 1
  if (dayData.dayNumber === 1) {
    dayButtonDiv.classList.add('current');
  }
  daysBar.appendChild(dayButtonCopy);
};

// STILL TO DO: CALCULATE HEIGHT TIMELINE
const constructTimeline = (dayStart, dayEnd, dayDurationHours) => {};

const constructStageColumns = (eventDays, eventStages) => {
  const columnNumber = eventStages.length;
  // set sass variable of column numbers in grid
  if (eventStages.length > 0) {
    document.documentElement.style.setProperty('--colNum', columnNumber);
  }

  //grab template
  eventStages.map(stage => fillColumnTemplate(stage));
  prepareColumnData(eventDays, eventStages);
};

const fillColumnTemplate = stageName => {
  const stageColumnCopy = stageColumnTemplate.cloneNode(true);
  let columnDiv = stageColumnCopy.querySelector('.column--stage');
  columnDiv.id = 'column' + stageName.replace(/\s/g, '');
  stageColumnCopy.querySelector('.p--stagetitle').textContent =
    stageName !== 'Favourites' ? stageName : 'Your Favourites';
  programGrid.appendChild(stageColumnCopy);
};

const prepareColumnData = (eventDays, eventStages) => {
  // default shows first day of event
  const sessionsFirstDay = eventSessions.filter(
    session => session.sessionDate === eventDays[0].date
  );

  eventStages.map(stage => {
    const sessionsByStage = sessionsFirstDay.filter(
      session => session.sessionStage === stage
    );
    // for each stage append session items
    displaySessionsByStage(sessionsByStage);
  });
};

const displaySessionsByStage = sessionsByStage => {
  const sortedSessions = sessionsByStage.sort((a, b) => {
    if (a.sessionStartTime < b.sessionStartTime) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log(sortedSessions);
  sortedSessions.map(session =>
    createSessionCards(
      session,
      speakers,
      favouriteClicked,
      addToFavouriteList,
      removeFromFavouriteList
    )
  );
};
