interface TokenIdentifier {
  readonly contractAddress: string;
  readonly identifierOrCriteria: string;
  readonly network: string;
}

interface ListableToken extends TokenIdentifier {
  image: string;
  brand: string;
  listingPrice?: string;
}

export {
  TokenIdentifier,
  ListableToken
}