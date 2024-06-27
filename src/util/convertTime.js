export function convertToThaiTime(utcTime) {
  if (!utcTime) {
    return "--/--/--";
  }
  
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(utcTime);
  
  // Adjust for Thai time (UTC+7)
  date.setHours(date.getHours() - 7);
  
  const thaiDay = date.getDate();
  const thaiMonth = months[date.getMonth()];
  const thaiYear = date.getFullYear();
  
  return `${thaiDay} ${thaiMonth} ${thaiYear}`;
}
