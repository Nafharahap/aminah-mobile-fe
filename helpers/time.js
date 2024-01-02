import dayjs from 'dayjs';

export const diffForHumans = (dueDate) => {
  const dueDateFormatted = dayjs(dueDate, { format: 'YYYY-MM-DD' });
  const currentDate = dayjs();

  // Calculate the difference in months
  const monthsDifference = currentDate.diff(dueDateFormatted, 'month');
  return Math.abs(monthsDifference)
} 