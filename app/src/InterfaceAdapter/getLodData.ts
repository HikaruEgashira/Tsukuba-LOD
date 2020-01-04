import { getLodData } from '../UseCaseInteractor/getLodDataCase';
import { SparqlResponse } from '../Domains/sparqlResponse';

export default async (
  endpointUrl: string,
  query: string
): Promise<SparqlResponse> => {
  return await getLodData(endpointUrl, query);
};
