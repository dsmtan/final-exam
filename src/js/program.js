import moment from 'moment';
import createSessionCards from './sessionCard.js';

('use strict');
let programGrid = document.querySelector('.program--grid');
const daysBar = document.querySelector('.navbar--days');
const mobileFilterDrawer = document.querySelector('.filterdrawer--mobile');
const filterIndicator = document.querySelector('.div--filterindicator');
const filterdrawerContent = document.querySelector('#button--drawerContent');
const tagFilterSection = document.querySelector('.section--tagfilters');
const typeFilterSection = document.querySelector('.section--typefilters');
const timeFilterSection = document.querySelector('.section--timefilters');
const stageFilterSection = document.querySelector('.section--stagefilters');
const applyFilterSection = document.querySelector('.section--applyreset');

let speakers = [];
let programSettings = [];
let eventSessions = [];
let favouriteList = [];
let favouriteListClicked = false;
let chosenFilters = {
  tags: [],
  types: [],
  timeslots: [],
  stages: [],
};
let filtersApplied = false;
let drawerOpened = false;

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

const fetchEventSessions = ({
  eventID,
  eventMainColor,
  eventDays,
  eventStages,
  eventTags,
  eventTimeSlots,
  eventSessionTypes,
}) => {
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
      createFilterdrawerContent(
        eventTags,
        eventTimeSlots,
        eventStages,
        eventSessionTypes
      );
    }
  });

  document.documentElement.style.setProperty('--mainColor', eventMainColor);
};

// --------- EVENT HANDLERS ------------- //

// --- user clicks on different day
const showSelectedDay = e => {
  favouriteListClicked = false;
  filtersApplied = false;
  programGrid.classList.remove('grid--filteredlist');
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
  const { eventDays, eventStages } = programSettings;

  // clear grid from previous data and re-render
  programGrid.innerHTML = '';
  constructTimeline();
  constructStageColumns(eventDays, eventStages, selectedDayNumber);
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
  showFilteredList();
};

const showFilteredList = filteredSessions => {
  const { eventDays, eventStages } = programSettings;
  const currentDay = document.querySelector('.current');
  currentDay && currentDay.classList.remove('current');
  programGrid.innerHTML = '';
  programGrid.classList.add('grid--filteredlist');

  constructStageColumns(eventDays, eventStages, {}, filteredSessions);
};

const toggleFilterDrawer = () => {
  drawerOpened = !drawerOpened;
  drawerOpened
    ? (mobileFilterDrawer.style.height = window.innerHeight - 50 + 'px')
    : (mobileFilterDrawer.style.height = '45px');
  filterdrawerContent.classList.toggle('hide');
  applyFilterSection.classList.toggle('hide');
};

const toggleFilter = (e, clickedFilter) => {
  const chosenFilterArray = findFilterArray(e);
  // check if filter is already selected
  let filterIndex = chosenFilterArray.findIndex(
    filter => filter === clickedFilter
  );

  filterIndex > -1
    ? chosenFilterArray.splice(filterIndex, 1)
    : chosenFilterArray.push(clickedFilter);
  console.log(chosenFilters);
};

const applyFilters = () => {
  let filteredSessions = [];
  filterIndicator.classList.remove('hideIndicator');

  if (chosenFilters.tags.length > 0) {
    const tagSessions = chosenFilters.tags.flatMap(chosenTag =>
      eventSessions.filter(session => {
        const foundTag = session.sessionTags.find(tag => tag === chosenTag);
        if (foundTag) {
          return session;
        }
      })
    );
    filteredSessions.push(...tagSessions);
  }

  if (chosenFilters.types.length > 0) {
    const typeSessions = chosenFilters.types.flatMap(chosenType =>
      eventSessions.filter(session => {
        const foundType = session.sessionType === chosenType;
        if (foundType) {
          return session;
        }
      })
    );
    filteredSessions.push(...typeSessions);
  }

  if (chosenFilters.timeslots.length > 0) {
    const slotSessions = chosenFilters.timeslots.flatMap(chosenSlot =>
      eventSessions.filter(session => {
        const foundSlot = session.sessionSlot === chosenSlot;
        if (foundSlot) {
          return session;
        }
      })
    );
    filteredSessions.push(...slotSessions);
  }

  if (chosenFilters.stages.length > 0) {
    const stageSessions = chosenFilters.stages.flatMap(chosenStage =>
      eventSessions.filter(session => {
        const foundStage = session.sessionStage === chosenStage;
        if (foundStage) {
          return session;
        }
      })
    );
    filteredSessions.push(...stageSessions);
    console.log(filteredSessions);
  }
  // filter out duplicate sessions
  const uniqueFilteredSessions = [...new Set(filteredSessions)]; //mind blown
  console.log(uniqueFilteredSessions);

  filtersApplied = true;
  toggleFilterDrawer();
  showFilteredList(uniqueFilteredSessions);
};

const resetFilters = () => {
  filterIndicator.classList.add('hideIndicator');
  let selectedTags = document.getElementsByClassName('tagClicked');
  let selectedFilters = document.getElementsByClassName('filterClicked');
  removeClasses(selectedTags, selectedFilters);

  chosenFilters = {
    tags: [],
    types: [],
    timeslots: [],
    stages: [],
  };
  console.log(chosenFilters);
};

function removeClasses(selectedTags, selectedFilters) {
  while (selectedTags.length)
    selectedTags[0].className = selectedTags[0].className.replace(
      /\btagClicked\b/g,
      ''
    );

  while (selectedFilters.length)
    selectedFilters[0].className = selectedFilters[0].className.replace(
      /\bfilterClicked\b/g,
      ''
    );
}

function findFilterArray(e) {
  if (e.target.classList.contains('button--tags')) {
    e.target.classList.toggle('tagClicked');
    return chosenFilters.tags;
  }
  if (e.target.classList.contains('button--types')) {
    e.target.classList.toggle('filterClicked');
    return chosenFilters.types;
  }
  if (e.target.classList.contains('button--timeslots')) {
    e.target.classList.toggle('filterClicked');
    return chosenFilters.timeslots;
  }
  if (e.target.classList.contains('button--stages')) {
    e.target.classList.toggle('filterClicked');
    return chosenFilters.stages;
  }
}

// --------- EVENT LISTENERS ------------- //

document.addEventListener('click', function(event) {
  if (event.target.id === 'button--favouritelist') {
    favouriteListClicked = true;
    resetFilters();
    showFilteredList();
  }
  if (event.target.classList.contains('selectDay')) {
    resetFilters();
    showSelectedDay(event);
  }
  if (event.target.id === 'button--toggledrawer') {
    toggleFilterDrawer();
  }
  if (event.target.id === 'applyButton') {
    applyFilters();
  }
  if (event.target.id === 'resetButton') {
    resetFilters();
  }
});

// --------- BUILD DYNAMIC LAYOUT ------------- //

const createFilterdrawerContent = (
  eventTags,
  eventTimeSlots,
  eventStages,
  eventSessionTypes
) => {
  // eventTags.map( for each tag create a div)
  eventTags.map(tag => {
    const newTagButton = document.createElement('button');
    newTagButton.textContent = tag;
    newTagButton.classList.add('button--tags');
    newTagButton.addEventListener('click', e => {
      toggleFilter(e, tag);
    });
    tagFilterSection.appendChild(newTagButton);
  });

  eventSessionTypes.map(type => {
    if (type.name !== 'Break') {
      const newTypeButton = document.createElement('button');
      newTypeButton.classList.add('button--types');
      newTypeButton.textContent = type.name;
      newTypeButton.style.borderColor = type.color;
      newTypeButton.addEventListener('click', e => {
        toggleFilter(e, type.name);
      });
      typeFilterSection.appendChild(newTypeButton);
    }
  });

  eventTimeSlots.map(slot => {
    const newTimeSlotButton = document.createElement('button');
    newTimeSlotButton.textContent = slot;
    newTimeSlotButton.classList.add('button--timeslots');
    newTimeSlotButton.addEventListener('click', e => {
      toggleFilter(e, slot);
    });
    timeFilterSection.appendChild(newTimeSlotButton);
  });

  eventStages.map(stage => {
    const newStageButton = document.createElement('button');
    newStageButton.textContent = stage;
    newStageButton.classList.add('button--stages');
    newStageButton.addEventListener('click', e => {
      toggleFilter(e, stage);
    });
    stageFilterSection.appendChild(newStageButton);
  });
};

const constructDaysBar = eventDays => {
  let dayDurationHours = 0;
  eventDays.map((day, index) => {
    let dayNumber = index + 1;
    let dayStart = moment(`${day.date} ${day.startTime}`, 'MM-DD-YYYY HH:mm');
    let dayEnd = moment(`${day.date} ${day.endTime}`, 'MM-DD-YYYY HH:mm');
    dayDurationHours = dayEnd.diff(dayStart, 'hours', true); //number of sections to create vertical timeline

    let dayDateNumber = moment(dayStart).format('DD');
    let dayOfWeek = moment(day.date, 'MM-DD-YYYY').format('ddd');

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

const constructStageColumns = (
  eventDays,
  eventStages,
  selectedDayNumber,
  filteredSessions
) => {
  const columnNumber = eventStages.length;
  // set sass variable of column numbers in grid
  if (eventStages.length > 0) {
    document.documentElement.style.setProperty('--colNum', columnNumber);
  }

  if (favouriteListClicked) {
    fillColumnTemplate('Favourites');
  } else if (filtersApplied) {
    fillColumnTemplate('Filtered Sessions');
  } else {
    //grab template
    eventStages.map(stage => fillColumnTemplate(stage));
  }

  prepareColumnData(
    eventDays,
    eventStages,
    selectedDayNumber,
    filteredSessions
  );
};

const fillColumnTemplate = stageName => {
  const stageColumnCopy = stageColumnTemplate.cloneNode(true);
  const columnDiv = stageColumnCopy.querySelector('.column--stage');
  columnDiv.id = 'column' + stageName.replace(/\s/g, '');
  const stageTitle = stageColumnCopy.querySelector('.p--stagetitle');
  stageTitle.textContent =
    stageName === 'Favourites' ? 'Your Favourites' : stageName;

  if (stageName === 'Favourites' || stageName === 'Filtered Sessions') {
    stageColumnCopy.querySelector('#stageDots').classList.add('hide');
    stageTitle.style.marginBottom = '5px';
  }
  // make dots dynamic with more time
  if (stageName === 'Main Stage') {
    stageColumnCopy.querySelector('#dot1').style.backgroundColor = '#AAE0EC';
    stageColumnCopy.querySelector('#dot2').style.backgroundColor = '#F5C9C9';
    stageColumnCopy.querySelector('#dot3').style.backgroundColor = '#7C7AEE';
  }
  if (stageName === 'Inspiration Stage') {
    stageColumnCopy.querySelector('#dot1').style.backgroundColor = '#AAE0EC';
    stageColumnCopy.querySelector('#dot2').style.backgroundColor = '#F5C9C9';
    stageColumnCopy.querySelector('#dot3').classList.add('hide');
  }
  if (stageName === 'Panel Stage') {
    stageColumnCopy.querySelector('#dot1').style.backgroundColor = '#f8d3a4';
    stageColumnCopy.querySelector('#dot2').style.backgroundColor = '#F5C9C9';
    stageColumnCopy.querySelector('#dot3').classList.add('hide');
  }
  if (stageName === 'Exhibition Space') {
    stageColumnCopy.querySelector('#dot1').style.backgroundColor = '#AAE0EC';
    stageColumnCopy.querySelector('#dot2').classList.add('hide');
    stageColumnCopy.querySelector('#dot3').classList.add('hide');
  }

  programGrid.appendChild(stageColumnCopy);
};

const prepareColumnData = (
  eventDays,
  eventStages,
  selectedDay,
  filteredSessions
) => {
  let selectedSessions = [];

  if (favouriteListClicked) {
    console.log(favouriteList);
    selectedSessions =
      favouriteList &&
      favouriteList.map(favourite =>
        eventSessions.find(session => session.sessionID === favourite)
      );
  } else if (filtersApplied) {
    selectedSessions = filteredSessions;
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
      removeFromFavouriteList,
      filtersApplied,
      programSettings.eventSessionTypes
    )
  );
};
