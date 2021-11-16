import throttle from 'lodash.throttle';
// import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

function onPlay(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}

player.on('timeupdate', throttle(onPlay, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');

let parsedTime;

try {
  parsedTime = JSON.parse(savedTime);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

if (parsedTime) {
  player
    .setCurrentTime(parsedTime)
    .then(parsedTime => console.log(parsedTime))
    .catch(error => console.log(`${error.name}:`, error.message));
}
