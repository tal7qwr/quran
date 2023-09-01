const hadithDetails = [
  "اتقوا دعوة المظلوم، فإنه ليس بينها وبين الله حجاب ",
  "تفاصيل الحديث الثاني",
  " اتقوا دعوة المظلوم، فإنه ليس بينها وبين الله حجاب  ",
  " اتقوا دعوة المظلوم، فإنه ليس بينها وبين الله حجاب  ",
];

const audioElements = [
  new Audio('quran.mp3'),
  new Audio('001.mp3'),
  new Audio('001.mp3'),
];

let isSeeking = [false, false];

function showHadith(hadithNumber) {
  const hadithDiv = document.getElementById('hadith-details-' + hadithNumber);
  const hadithContentElement = document.getElementById('hadith-content-' + hadithNumber);

  hadithContentElement.innerHTML = hadithDetails[hadithNumber - 1];
  hadithDiv.style.display = 'block';

  // إيقاف التشغيل إذا كان الصوت قيد التشغيل
  audioElements.forEach((audioElement, index) => {
    if (!audioElement.paused && index + 1 !== hadithNumber) {
      audioElement.pause();
    }
  });

  // تشغيل الصوت المحدد
  audioElements[hadithNumber - 1].play();
}

function playAudio(audioNumber) {
  audioElements[audioNumber - 1].play();
}

function pauseAudio(audioNumber) {
  audioElements[audioNumber - 1].pause();
}

function stopAudio(audioNumber) {
  const audioElement = audioElements[audioNumber - 1];
  audioElement.pause();
  audioElement.currentTime = 0; 
}

function setVolume(audioNumber) {
  const volumeSlider = document.getElementById('volume-slider-' + audioNumber);
  const volume = volumeSlider.value;
  audioElements[audioNumber - 1].volume = volume;
}

function resumeAudio(audioNumber) {
  const audioElement = audioElements[audioNumber - 1];
  audioElement.currentTime = 0; // العودة إلى بداية الملف الصوتي
  audioElement.play();
}

function seek(audioNumber) {
  isSeeking[audioNumber - 1] = true;
  const seekBar = document.getElementById(`seek-bar-${audioNumber}`);
  const time = (seekBar.value / 100) * audioElements[audioNumber - 1].duration;
  audioElements[audioNumber - 1].currentTime = time;
}

function updateSeekBar(audioNumber) {
  const seekBar = document.getElementById(`seek-bar-${audioNumber}`);
  const currentTime = document.getElementById(`current-time-${audioNumber}`);
  seekBar.value = (audioElements[audioNumber - 1].currentTime / audioElements[audioNumber - 1].duration) * 100;
  currentTime.textContent = formatTime(audioElements[audioNumber - 1].currentTime);
}

audioElements.forEach((audioElement, index) => {
  audioElement.addEventListener('timeupdate', function() {
    if (!isSeeking[index]) {
      updateSeekBar(index + 1);
    }
  });

  audioElement.addEventListener('ended', function() {
    isSeeking[index] = false;
    updateSeekBar(index + 1);
  });
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
function showHadith(hadithNumber) {
  const hadithDiv = document.getElementById('hadith-details-' + hadithNumber);
  const hadithContentElement = document.getElementById('hadith-content-' + hadithNumber);

  hadithContentElement.innerHTML = hadithDetails[hadithNumber - 1];
  hadithDiv.style.display = 'block';

  // إيقاف التشغيل إذا كان الصوت قيد التشغيل
  audioElements.forEach((audioElement, index) => {
    if (!audioElement.paused && index + 1 !== hadithNumber) {
      audioElement.pause();
    }
  });
}
