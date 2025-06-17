function getTimeString(time) {
  // get hours and rest seconds
  const hours = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  const seconds = parseInt(remainingSecond % 60);
  return `${hours} hours ${minutes} minute ${seconds} seconds ago`;
}

// const result = getTimeString(5350);
// console.log(result);

// check verify icon using if else condition
const isVerified = true; // "" --> empty returns --> false
// if (isVerified === true) {
//   console.log("user is verified");
// } else {
//   console.log("user is not verified");
// }

// using ternary operator
console.log(isVerified === true ? "user is verified" : "user is not verified");
