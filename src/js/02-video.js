import throttle from 'lodash/throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};

player.on('timeupdate', throttle(onPlay, 1000));

const savedVideoplayerObj = localStorage.getItem('videoplayer-current-time');

let parsedVideoplayerObj;

try {
  parsedVideoplayerObj = JSON.parse(savedVideoplayerObj);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

player
  .setCurrentTime(parsedVideoplayerObj.seconds)
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
