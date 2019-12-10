'use strict';

let programSettings = [];
let eventSessions = [];

//templates
const daysButtonTemplate = document.querySelector('#daysButtonTemplate')
  .content;

window.onload = function() {
  //get all programSettings from JSON
  fetch('/src/js/programSettings.json')
    .then(res => res.json())
    .then(programSettings => {
      programSettings = programSettings;
      fetchEventSessions(programSettings);
    });
};

const fetchEventSessions = ({ eventID, eventDays }) => {
  // get the right program sessions for this event
  fetch('/src/js/programSessions.json')
    .then(res => res.json())
    .then(programSessions => {
      const eventProgram = programSessions.find(
        event => event.eventID === eventID
      );
      eventSessions = eventProgram.eventSessions;
      console.log(eventSessions);
    });
  constructDaysBar(eventDays);
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
    console.log(dayData);
    createDaysButton(dayData);
    constructTimeline(dayStart, dayEnd, dayDurationHours);
  });
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

const dayOnclickHandler = () => {
  // get class of current on targetdiv
  // fetch right data
};

// render fixed timeline column in grid

// create grid column for each stage api: programSettings/eventStages array
// for each column, map through all sessions and filter by stage, create a grid item for each.
