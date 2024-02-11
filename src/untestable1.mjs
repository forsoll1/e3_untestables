const millisPerDay = 24 * 60 * 60 * 1000;


// This code is difficult to test because its functionality relies on ever changing time
export function oldDaysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

// Solution, pass time to the function as a parameter
export function daysUntilChristmas(timeNow) {
  const today = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate());
  const christmasDay = new Date(timeNow.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date(timeNow).getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
