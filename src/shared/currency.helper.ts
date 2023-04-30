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

export { GetCurrencyLabel };