interface TokenIdentifier {
  readonly contractAddress: string;
  readonly identifierOrCriteria: string;
  readonly network: string;
}

interface ListableToken extends TokenIdentifier {
  image: string;
  brand: string;
  listingPrice?: string;
  listingCancellationStatus?: boolean;

  appellation?: string;
  case?: string;
  origin?: string;
  productionCountry?: string;
  type?: string;
  format?: string;
  lwin?: string;
  producer?: string;
  investmentGrade?: string;
  heritage?: string;
  region?: string;
}

export { TokenIdentifier, ListableToken };
