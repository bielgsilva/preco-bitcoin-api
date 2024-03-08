exports.formatPrice = (price) => {
  return parseFloat(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

exports.formatDate = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} - ${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

  return formattedDate;
};


exports.calculateTimeLeft = () => {
  const difference = +new Date('2024-04-18') - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = { days: Math.floor(difference / (1000 * 60 * 60 * 24)) };
  }

  return timeLeft;
};