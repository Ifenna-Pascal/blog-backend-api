const calculate_reading_time = (content) => {
  const wpm = 200;
  const words = content.trim().split(/\s+/).length;
  console.log(words);
  const time = Math.ceil(words / wpm);
  return time + " " + "minutes";
};

module.exports = calculate_reading_time;
