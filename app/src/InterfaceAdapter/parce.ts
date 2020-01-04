import { parceSparqlData } from '../UseCaseInteractor/parceSparqlData';
import { SparqlResponse } from '../Domains/sparqlResponse';

export const parse = async (response: SparqlResponse) => {
  return await parceSparqlData(response);
};
