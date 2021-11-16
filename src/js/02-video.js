import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

function localStorageCheck() {
  if (localStorage.length !== 0) {
    onPlay();
    return;
  }
  return;
}

function onPlay(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}

player.on('timeupdate', throttle(onPlay, 1000));

const savedTime = localStorage.getItem('videoplayer-current-time');

console.log(savedTime);

let parsedTime;

try {
  parsedTime = JSON.parse(savedTime);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
console.log(parsedTime);

player
  .setCurrentTime(parsedTime)
  .then(function (seconds) {
    console.log(seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(error.message);
        break;

      default:
        console.log(error.name);
        console.log(error.message);
        break;
    }
  });
