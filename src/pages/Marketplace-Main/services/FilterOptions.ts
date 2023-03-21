import axios from 'axios';
import { FilterOptionsResponse } from '../models/Response.models/FilterOptions.response';

async function RetrieveFilterDetails(): Promise<FilterOptionsResponse> {
  const url = process.env.RETRIEVE_FILTERS_URL;
  const res = <FilterOptionsResponse>(
    await axios.get(<string>url).then(response => response.data)
  );
  return res;
}

export { RetrieveFilterDetails };
