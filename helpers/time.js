import dayjs from 'dayjs';

export const diffForHumans = (dueDate) => {
  const dueDateFormatted = dayjs(dueDate, { format: 'YYYY-MM-DD' });
  const currentDate = dayjs()

  // Calculate the difference in months
  const monthsDifference = currentDate.diff(dueDateFormatted, 'month', true);
  let difference = undefined
  let type = undefined
  if (Math.abs(monthsDifference) < 1) {
    difference = currentDate.diff(dueDateFormatted, 'day')
    type = 'hari'
  } else {
    difference = monthsDifference.toFixed(1)
    type = 'bulan'
  }
  return `${Math.abs(difference)} ${type} dari sekarang`
}

export const formateDateTime = (value, format = 'DD-MMMM-YYYY') => {
  if (value) {
    const datetime = dayjs(value).format(format)
    return datetime
  } else {
    return '-'
  }
}