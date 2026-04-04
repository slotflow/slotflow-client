// check if the user can join the call
export const checkJoin = (date: Date | string) => {
  const appointmentDate = new Date(date);
  const now = new Date();
  const diff = appointmentDate.getTime() - now.getTime();
  const minutes = Math.floor(diff / 60000);
  return minutes <= 15;
}

