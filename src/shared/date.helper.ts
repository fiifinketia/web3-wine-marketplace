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

export {
  GetCurrentDate,
  GetValidTime
}