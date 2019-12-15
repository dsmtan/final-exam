const sessionCardTemplate = document.querySelector('#sessionCardTemplate')
  .content;

const createSessionCards = (
  {
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
  },
  speakers,
  favouriteList,
  favouriteListClicked,
  addToFavouriteList,
  removeFromFavouriteList
) => {
  const sessionCardCopy = sessionCardTemplate.cloneNode(true);
  let sessionItem = sessionCardCopy.querySelector('.session--item');
  sessionItem.id = sessionID;

  // add session content
  sessionCardCopy.querySelector('.session--title').textContent = sessionTitle;
  sessionCardCopy.querySelector(
    '.session--description'
  ).textContent = sessionDescription;

  const durationDiv = sessionCardCopy.querySelector('.session--duration');
  const heartIcon = sessionCardCopy.querySelector('.icon--heartoutline');

  if (favouriteListClicked) {
    durationDiv.style.width = '100%';
    const utcDate = new Date(sessionDate);
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    };
    const stringDate = new Intl.DateTimeFormat('en-GB', options).format(
      utcDate
    );

    durationDiv.innerHTML = `${sessionStage.toUpperCase()} &nbsp;&nbsp;|&nbsp;&nbsp; ${stringDate} ${sessionStartTime} - ${sessionEndTime}`;
    heartIcon.src = './images/heart_solid.svg';
    heartIcon.addEventListener('click', e => {
      removeFromFavouriteList(e.target);
    });
  } else {
    durationDiv.textContent = calculateSessionDuration(
      sessionDate,
      sessionStartTime,
      sessionEndTime
    );

    heartIcon.addEventListener('click', e => {
      addToFavouriteList(e.target);
    });
  }

  // details for session that are not breaks
  if (!isBreak) {
    durationDiv.style.marginTop = '18px';
    // if there are speakers - for each speaker create avatar
    sessionSpeakers.length > 0 &&
      sessionSpeakers.map(sessionSpeaker => {
        const speakerImg = createSpeakerAvatar(sessionSpeaker, speakers);
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

  const parentName = favouriteListClicked ? 'Favourites' : sessionStage;
  const parentID = '#column' + parentName.replace(/\s/g, '');
  const parentColumn = document.querySelector(parentID);

  parentColumn.appendChild(sessionCardCopy);
};

const createSpeakerAvatar = (sessionSpeaker, speakers) => {
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

export default createSessionCards;
