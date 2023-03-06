interface TokenIdentifier {
  readonly contractAddress: string;
  readonly identifierOrCriteria: string;
  readonly network: string;
}

interface TokenWithBrandImage extends TokenIdentifier {
  image: string;
  brand: string;
}

export {
  TokenIdentifier,
  TokenWithBrandImage
}