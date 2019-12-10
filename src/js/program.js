'use strict';

let programGrid = document.querySelector('.program--grid');
let speakers = [];
let programSettings = [];
let eventSessions = [];

//templates
const daysButtonTemplate = document.querySelector('#daysButtonTemplate')
  .content;
const stageColumnTemplate = document.querySelector('#stageColumnTemplate')
  .content;
const sessionCardTemplate = document.querySelector('#sessionCardTemplate')
  .content;

window.onload = function() {
  //get all programSettings from JSON
  fetch('/src/js/programSettings.json')
    .then(res => res.json())
    .then(programData => {
      programSettings = programData;
      fetchEventSessions(programSettings);
    });

  fetch('/src/js/speakers.json')
    .then(res => res.json())
    .then(speakerData => {
      speakers = speakerData;
    });
};

const fetchEventSessions = ({ eventID, eventDays, eventStages }) => {
  // get the right program sessions for this event
  fetch('/src/js/programSessions2.json')
    .then(res => res.json())
    .then(programSessions => {
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
    let dayStart = new Date(`${day.date}, ${day.startTime}`); //conver to UTC format
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
    console.log(sessionsByStage);
    // for each stage append session items
    displaySessionsByStage(stage, sessionsByStage);
  });
};

const displaySessionsByStage = (stage, sessionsByStage) => {
  sessionsByStage.map(session => {
    const sessionCardCopy = sessionCardTemplate.cloneNode(true);
    let sessionItem = sessionCardCopy.querySelector('.session--item');
    sessionItem.id = session.sessionID;

    // add session content
    sessionCardCopy.querySelector('.session--title').textContent =
      session.sessionTitle;
    sessionCardCopy.querySelector('.session--description').textContent =
      session.sessionDescription;

    // if there are speakers - for each speaker create avatar
    session.sessionSpeakers.length > 0 &&
      session.sessionSpeakers.map(sessionSpeaker => {
        console.log(sessionSpeaker);
        const speakerImg = createSpeakerAvatar(sessionSpeaker);
        const speakerDiv = sessionCardCopy.querySelector('.session--speakers');
        speakerDiv.appendChild(speakerImg);
      });

    // for each session tag create tag

    const parentID = '#column' + session.sessionStage.replace(/\s/g, '');
    const parentColumn = document.querySelector(parentID);

    parentColumn.appendChild(sessionCardCopy);
  });
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

// render fixed timeline column in grid

// create grid column for each stage api: programSettings/eventStages array
// for each column, map through all sessions and filter by stage, create a grid item for each.
