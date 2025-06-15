function getTimeString(time) {
  // get hours and rest seconds
  const hours = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  const seconds = parseInt(remainingSecond % 60);
  return `${hours} hours ${minutes} minute ${seconds} seconds ago`;
}

const result = getTimeString(5350);
console.log(result);
