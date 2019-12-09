// fetch programSettings
// fetch sessions

// function to process data for topbar
// from programSettings/eventDays create eventDaysArray + for each:
// let dayStart = new Date( dynamic input date + start time )
// let dayEnd = new Date( dynamic input date + end time )
// calculate hours between start and end > let totalDayDuration = Date.getTime() for timeline
// https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/

// render fixed top bar > create buttons for each day in event.
// let specificDay = Date.getDay() returns Sun-Sat = 0-6
// let dayDate = Date.getDate() > e.g. returns 19 for January 19

// render fixed timeline column in grid
//

// create grid column for each stage api: programSettings/eventStages array
// for each column, map through all sessions and filter by stage, create a grid item for each.
