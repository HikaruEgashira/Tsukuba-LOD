import { SparqlResponse, res } from '../Domains/SparqlResponse';
var SparqlHttp = require('sparql-http-client');
var isomorphicFetch = require('isomorphic-fetch');
SparqlHttp.fetch = isomorphicFetch;

/**
 * SPARQL言語でエンドポイントに問い合わせを行う
 * @param endpointUrl
 * @param query
 * @returns SparqlResponse
 */
export const getLodData = async (
  endpointUrl: string,
  query: string
): Promise<SparqlResponse> => {
  const endpoint = new SparqlHttp({
    endpointUrl
  });
  const res: res = await endpoint.selectQuery(query);

  return res.text();
};
