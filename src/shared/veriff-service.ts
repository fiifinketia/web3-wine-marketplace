// eslint-disable-next-line
// @ts-ignore
import { Veriff } from '@veriff/js-sdk';
import { createVeriffFrame } from '@veriff/incontext-sdk';

export const veriff = Veriff({
  host: process.env.VERIFF_BASE_URL,
  apiKey: process.env.VERIFF_API_KEY,
  parentId: 'veriff-root',
  onSession: function(err: any, response: any) {
    createVeriffFrame({
      url: response.verification.url
    });
  }
});
veriff.setParams({
  person: {
    givenName: ' ',
    lastName: ' '
  },
  vendorData: ' '
});