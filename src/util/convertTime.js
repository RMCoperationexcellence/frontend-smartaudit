export function convertToThaiTime(utcTime) {
  if (!utcTime) {
    return "--/--/--";
  }
  const date = new Date(utcTime);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
  const thaiDate = date.toLocaleString('th-TH', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, "$3/$2/$1 $4:$5");
  return thaiDate;
}
