import { formatNumber } from "react-native-currency-input";

export const formatCurrencyRp = (value) => {
  if (!value) {
    return formatNumber(0, {
      separator: ',',
      prefix: 'Rp',
      precision: 0,
      delimiter: '.',
      signPosition: 'beforePrefix',
    })
  }

  return formatNumber(value, {
    separator: ',',
    prefix: 'Rp',
    precision: 0,
    delimiter: '.',
    signPosition: 'beforePrefix',
  })
};