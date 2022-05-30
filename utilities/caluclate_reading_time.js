const calculate_reading_time = async (content) => {
  const wpm = 225;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time
};
module.exports = calculate_reading_time;