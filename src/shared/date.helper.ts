function GetCurrentDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}

function GetValidTime(offerExpirationDate: string, offerExpirationTime: string) {
  if (!offerExpirationDate) return false;
  const now = new Date();
  const nowInHours = now.getHours();
  const nowInMinutes = now.getMinutes();
  const selectedDate = new Date(offerExpirationDate);
  if (selectedDate.getDate() === now.getDate()) {
    const chosenTime = offerExpirationTime.split(':');
    if (parseInt(chosenTime[0]) > nowInHours) {
      return true;
    } else if (parseInt(chosenTime[0]) == nowInHours) {
      if (parseInt(chosenTime[1]) > nowInMinutes) {
        return true;
      }
    }
    return false;
  } else {
    return true
  }
}

function GetUnixAsDate (date: string) {
  const ms = +date * 1000;
  return new Date(ms);
}

function ConvertUnixToDate(date: string) {
  const newDate = GetUnixAsDate(date);
  const now = new Date();

  const expYear = newDate.getFullYear() % 100;
  const expMonth = newDate.getMonth() + 1;
  const expDay = newDate.getDate();

  const yearNow = now.getFullYear() % 100;
  const monthNow = now.getMonth() + 1;
  const dayNow = now.getDate();

  if (expDay === dayNow && expYear === yearNow && expMonth === monthNow) {
    return 'today';
  } else {
    return `${expMonth.toString().padStart(2, '0')}/${expDay.toString().padStart(2, '0')}/${expYear.toString().padStart(2, '0')}`;
  }
}

function ConvertUnixToTime(date: string) {
  const newDate = GetUnixAsDate(date);
  let meridiem = ''
  let hours = +('0' + newDate.getHours()).slice(-2);
  const minutes = ('0' + newDate.getMinutes()).slice(-2);

  if (hours > 12) {
    hours = hours - 12
    meridiem = 'PM'
  } else if (hours == 0) {
    hours = 12;
    meridiem = 'AM'
  } else {
    meridiem = 'AM'
  }

  return `${hours}:${minutes} ${meridiem}`
}

export {
  GetCurrentDate,
  GetValidTime,
  ConvertUnixToDate,
  ConvertUnixToTime
}