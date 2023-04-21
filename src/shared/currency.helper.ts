import { Currencies } from './models/entities/currency';

  function ReturnCurrency (currency: string) {
    switch (currency) {
      case process.env.USDC_CURRENCY:
        return Currencies.USDC;
      case process.env.USDT_CURRENCY:
        return Currencies.USDT;
      case process.env.WIVA_CURRENCY:
        return Currencies.WIVA;
    }
  }

export { ReturnCurrency };