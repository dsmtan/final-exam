'use strict';
let programGrid = document.querySelector('.program--grid');
let speakers = [];
let programSettings = [];
let eventSessions = [];
let favouriteList =
  localStorage.getItem('favouriteList') === null
    ? []
    : localStorage.getItem('favouriteList');

//templates
const daysButtonTemplate = document.querySelector('#daysButtonTemplate')
  .content;
const stageColumnTemplate = document.querySelector('#stageColumnTemplate')
  .content;
const sessionCardTemplate = document.querySelector('#sessionCardTemplate')
  .content;

// init
window.onload = function() {
  localStorage.clear(); // for dev purposes in prod it will remember

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
  constructTimeline();
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
  eventStages.map(stage => {
    const stageColumnCopy = stageColumnTemplate.cloneNode(true);
    let columnDiv = stageColumnCopy.querySelector('.column--stage');
    columnDiv.id = 'column' + stage.replace(/\s/g, '');
    stageColumnCopy.querySelector('.p--stagetitle').textContent = stage;
    programGrid.appendChild(stageColumnCopy);

    //for each stage display sessions
  });
  prepareColumnData(eventDays, eventStages);
};

const prepareColumnData = (eventDays, eventStages) => {
  const sessionsFirstDay = eventSessions.filter(
    session => session.sessionDate === eventDays[0].date
  );
  console.log(sessionsFirstDay);

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
  sortedSessions.map(session => createSessionCards(session));
};

const sortList = array => {};

const createSessionCards = ({
  sessionID,
  sessionTitle,
  sessionDescription,
  sessionSpeakers,
  sessionDate,
  sessionStartTime,
  sessionEndTime,
  sessionStage,
  sessionTags,
  isBreak,
}) => {
  const sessionCardCopy = sessionCardTemplate.cloneNode(true);
  let sessionItem = sessionCardCopy.querySelector('.session--item');
  sessionItem.id = sessionID;

  // add session content
  sessionCardCopy.querySelector('.session--title').textContent = sessionTitle;
  sessionCardCopy.querySelector(
    '.session--description'
  ).textContent = sessionDescription;

  const durationDiv = sessionCardCopy.querySelector('.session--duration');
  durationDiv.textContent = calculateSessionDuration(
    sessionDate,
    sessionStartTime,
    sessionEndTime
  );

  if (!isBreak) {
    durationDiv.style.marginTop = '18px';
    // if there are speakers - for each speaker create avatar
    sessionSpeakers.length > 0 &&
      sessionSpeakers.map(sessionSpeaker => {
        const speakerImg = createSpeakerAvatar(sessionSpeaker);
        const speakerDiv = sessionCardCopy.querySelector('.session--speakers');
        speakerDiv.appendChild(speakerImg);
      });

    // for each session tag add tag
    sessionTags.length > 0 &&
      sessionTags.map(sessionTag => {
        const newTag = document.createElement('div');
        newTag.classList.add('session--styletag');
        newTag.innerHTML = sessionTag;
        const tagsDiv = sessionCardCopy.querySelector('.session--tags');
        tagsDiv.appendChild(newTag);
      });
  }

  const parentID = '#column' + sessionStage.replace(/\s/g, '');
  const parentColumn = document.querySelector(parentID);

  parentColumn.appendChild(sessionCardCopy);
};

const createSpeakerAvatar = sessionSpeaker => {
  const speakerData = speakers.find(
    speakerObj => speakerObj.speakerName === sessionSpeaker
  );
  const speakerAvatar = document.createElement('img');
  speakerAvatar.src = speakerData.speakerImgURL;
  speakerAvatar.classList.add('session--avatar');
  return speakerAvatar;
};

const calculateSessionDuration = (dayDate, startTime, endTime) => {
  let sessionStart = new Date(`${dayDate}, ${startTime}`); //convert to UTC format
  let sessionEnd = new Date(`${dayDate}, ${endTime}`);
  let totalMins = Math.floor((sessionEnd - sessionStart) / 60000);
  let durationHrs = Math.floor(totalMins / 60);
  let durationMin = totalMins - durationHrs * 60;
  return `${durationHrs}h${durationMin}m`;
};

// EVENT LISTENERS

document.addEventListener('click', function(event) {
  if (event.target.id === 'button--favouritelist') {
    showFavouriteList();
  }
  if (event.target.classList.contains('icon--heartoutline')) {
    addToFavouriteList(event.target);
  }
});

const showFavouriteList = () => {
  programGrid.innerHTML = '';

  const favouriteSessions = favouriteList.map(favourite =>
    eventSessions.find(session => session.sessionID === favourite)
  );
  console.log(favouriteList);
  console.log(favouriteSessions);

  // replace programGrid entire innerHTML string
  // add class grid--favouriteList to program--grid
};

const addToFavouriteList = e => {
  const addedSession = e.parentNode.id;
  e.src = './images/heart_solid.svg';
  favouriteList.push(addedSession);
  localStorage.setItem('favouriteList', favouriteList);
};
