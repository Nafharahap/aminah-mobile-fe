import { formatNumber } from "react-native-currency-input";

export const formatCurrencyRp = (value) => {
  return formatNumber(value, {
    separator: ',',
    prefix: 'Rp',
    precision: 0,
    delimiter: '.',
    signPosition: 'beforePrefix',
  })
};