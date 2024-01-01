/**
 * Parse the lyric string to Object
 * {time: string, line: string}
 */
function parseLrc() {
  const lines = lrc.split("\n");
  const result = [];
  for (var i = 0; i < lines.length; i++) {
    const str = lines[i];
    const parts = str.split("]");
    const timeStr = parts[0].substring(1);
    const obj = {
      time: parseTime(timeStr),
      line: str.split(" ")[1],
    };
    result.push(obj);
  }

  return result;
}

/**
 * Parse the time string to number (second)
 * @param {String} timeStr
 * @returns {number}
 */
function parseTime(timeStr) {
  const parts = timeStr.split(":");
  const min = +parts[0] * 60;
  const sec = +parts[1];
  return min + sec;
}

const lrcData = parseLrc();

const doms = {
  audio: document.querySelector("audio"),
};

/**
 * Get the current index of the lrcData while the music playing.
 * @return {number}
 */
function findIndex() {
  const curTime = doms.audio.currentTime;
  for (let i = 0; i < lrcData.length; i++)
    if (curTime < lrcData[i].time) return i - 1;
}
