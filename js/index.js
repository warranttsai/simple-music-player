const doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector("ul"),
  container: document.querySelector(".container"),
};

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

/**
 * Get the current index of the lrcData while the music playing.
 * @return {number}
 */
function findIndex() {
  const curTime = doms.audio.currentTime;
  for (let i = 0; i < lrcData.length; i++)
    if (curTime < lrcData[i].time) return i - 1;
}

/**
 * Create lyric element <li> and append the elements to <ul>
 */
function createElements() {
  let frag = document.createDocumentFragment(); // document fragment
  for (let i = 0; i < lrcData.length; i++) {
    let li = document.createElement("li");
    li.textContent = lrcData[i].line;
    frag.appendChild(li);
  }
  doms.ul.appendChild(frag);
}

createElements();

const containerHeight = doms.container.clientHeight;
const liHeight = doms.ul.children[0].clientHeight;
const maxOffset = doms.ul.clientHeight - containerHeight;
/**
 * Set offset of the <ul>
 */
function setOffset() {
  const index = findIndex();

  // set offset effect to the <ul>
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  if (offset < 0) offset = 0;
  else if (offset > maxOffset) offset = maxOffset;
  doms.ul.style.transform = `translateY(-${offset}px)`;

  // remove the previous active class on <li>
  let activeLi = doms.ul.querySelector(".active");
  if (activeLi) activeLi.classList.remove("active");

  // set highlight effect to the <li>
  let li = doms.ul.children[index];
  if (li) li.classList.add(`active`);
}

doms.audio.addEventListener("timeupdate", setOffset);
