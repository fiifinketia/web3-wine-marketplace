function GetCurrencyLabel(currency: string) {
  switch (currency) {
    case process.env.WIVA_CURRENCY:
      return 'WIVA';
    case process.env.USDT_CURRENCY:
      return 'USDT';
    case process.env.USDC_CURRENCY:
      return 'USDC';
  }
}

function FormatNumber(num: number) {
  const format = (_num: string) => {
    return parseFloat(_num).toString();
  }

  const strAmount = num.toString();
  const half = strAmount.split('.');
  if (!half[1]) return format(`${strAmount}.00`);
  const decimalLen = half[1].length;
  return decimalLen == 1
    ? format(`${half[0]}.${half[1]}0`)
    : format(`${half[0]}.${half[1].substring(0, 2)}`)
}

export { GetCurrencyLabel, FormatNumber };