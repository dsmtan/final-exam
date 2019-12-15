import createSessionCards from './sessionCard.js';

('use strict');
let programGrid = document.querySelector('.program--grid');
const daysBar = document.querySelector('.navbar--days');
const mobileFilterDrawer = document.querySelector('.filterdrawer--mobile');
const filterdrawerContent = document.querySelector('#filterdrawerContent');
const stageFilterSection = document.querySelector('.section--stagefilters');

let speakers = [];
let programSettings = [];
let eventSessions = [];
let favouriteList = [];
let favouriteListClicked = false;

//templates
const daysButtonTemplate = document.querySelector('#daysButtonTemplate')
  .content;
const stageColumnTemplate = document.querySelector('#stageColumnTemplate')
  .content;
const timelineTemplate = document.querySelector('#timelineTemplate').content;

// --------- DATA FETCHING ------------- //
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

const fetchEventSessions = ({ eventID, eventDays, eventStages, eventTags }) => {
  // get the right program sessions for this event
  import(
    /* webpackChunkName: "json/programSessions" */
    './json/programSessions.json'
  ).then(({ default: programSessions }) => {
    const eventProgram = programSessions.find(
      event => event.eventID === eventID
    );
    eventSessions = eventProgram.eventSessions;
    if (eventSessions.length > 0) {
      constructDaysBar(eventDays);
      constructStageColumns(eventDays, eventStages);
      createFilterdrawerContent(eventTags, eventStages);
    }
  });
};

// --------- EVENT HANDLERS ------------- //

// --- user clicks on different day
const showSelectedDay = e => {
  favouriteListClicked = false;
  programGrid.classList.remove('grid--favouriteList');
  const previousSelected = document.querySelector('.current');
  previousSelected && previousSelected.classList.remove('current');

  let dayButton;
  if (e.target.classList.contains('button--days')) {
    dayButton = e.target;
  } else {
    dayButton = event.target.parentNode;
  }

  dayButton.classList.add('current');
  const selectedDayNumber = dayButton.id.charAt(dayButton.id.length - 1);

  // clear grid from previous data and re-render
  programGrid.innerHTML = '';
  constructTimeline();
  constructStageColumns(
    programSettings.eventDays,
    programSettings.eventStages,
    selectedDayNumber
  );
};

// --- favouriteList interactions
const addToFavouriteList = e => {
  const addedSession = e.parentNode.id;
  e.src = './images/heart_solid.svg';
  // prevent duplicate
  const alreadySaved = favouriteList.find(session => session === addedSession);
  if (alreadySaved) {
    e.src = './images/heart.svg';
    let index = favouriteList.indexOf(addedSession);
    index > -1 && favouriteList.splice(index, 1);
  } else {
    favouriteList.push(addedSession);
  }
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
  const currentDay = document.querySelector('.current');
  currentDay && currentDay.classList.remove('current');
  programGrid.innerHTML = '';
  programGrid.classList.add('grid--favouriteList');

  favouriteListClicked = true;
  constructStageColumns(programSettings.eventDays, programSettings.eventStages);
};

const openFilterDrawer = event => {
  mobileFilterDrawer.classList.add('filterdrawerOpened');
  filterdrawerContent.classList.remove('hide');
};

// --------- EVENT LISTENERS ------------- //

document.addEventListener('click', function(event) {
  if (event.target.id === 'button--favouritelist') {
    showFavouriteList();
  }
  if (event.target.classList.contains('selectDay')) {
    showSelectedDay(event);
  }
  if (event.target.id === 'button--opendrawer') {
    openFilterDrawer(event);
  }
});

// --------- BUILD DYNAMIC LAYOUT ------------- //

const createFilterdrawerContent = (eventTags, eventStages) => {
  // eventTags.map( for each tag create a div)
  eventStages.map(stage => {
    const newStageButton = document.createElement('button');
    newStageButton.textContent = stage;
    stageFilterSection.appendChild(newStageButton);
  });
};

const constructDaysBar = eventDays => {
  let dayDurationHours = 0;
  eventDays.map((day, index) => {
    let dayNumber = index + 1;
    let dayStart = new Date(`${day.date}, ${day.startTime}`); //convert to UTC format
    let dayEnd = new Date(`${day.date}, ${day.endTime}`);
    dayDurationHours = (dayEnd.getTime() - dayStart.getTime()) / (1000 * 3600); //number of sections to create vertical timeline

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
  constructTimeline(dayDurationHours);
};

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
const constructTimeline = (dayStart, dayEnd, dayDurationHours) => {
  const timelineColumnCopy = timelineTemplate.cloneNode(true);
  // let timelineDiv = timelineColumnCopy.querySelector('.column--timeline');
  programGrid.appendChild(timelineColumnCopy);
};

const constructStageColumns = (eventDays, eventStages, selectedDayNumber) => {
  const columnNumber = eventStages.length;
  // set sass variable of column numbers in grid
  if (eventStages.length > 0) {
    document.documentElement.style.setProperty('--colNum', columnNumber);
  }

  if (favouriteListClicked) {
    fillColumnTemplate('Favourites');
  } else {
    //grab template
    eventStages.map(stage => fillColumnTemplate(stage));
  }

  prepareColumnData(eventDays, eventStages, selectedDayNumber);
};

const fillColumnTemplate = stageName => {
  const stageColumnCopy = stageColumnTemplate.cloneNode(true);
  let columnDiv = stageColumnCopy.querySelector('.column--stage');
  columnDiv.id = 'column' + stageName.replace(/\s/g, '');
  stageColumnCopy.querySelector('.p--stagetitle').textContent =
    stageName !== 'Favourites' ? stageName : 'Your Favourites';
  programGrid.appendChild(stageColumnCopy);
};

const prepareColumnData = (eventDays, eventStages, selectedDay) => {
  let selectedSessions = [];

  if (favouriteListClicked) {
    selectedSessions =
      favouriteList &&
      favouriteList.map(favourite =>
        eventSessions.find(session => session.sessionID === favourite)
      );
  } else if (selectedDay > 0) {
    selectedSessions = eventSessions.filter(
      session => session.sessionDate === eventDays[selectedDay - 1].date
    );
  } else {
    // default is day 1
    selectedSessions = eventSessions.filter(
      session => session.sessionDate === eventDays[0].date
    );
  }

  eventStages.map(stage => {
    const sessionsByStage = selectedSessions.filter(
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

  sortedSessions.map(session =>
    createSessionCards(
      session,
      speakers,
      favouriteList,
      favouriteListClicked,
      addToFavouriteList,
      removeFromFavouriteList
    )
  );
};
