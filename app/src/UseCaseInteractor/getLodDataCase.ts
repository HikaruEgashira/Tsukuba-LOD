import { sparqlResponse } from "../Entities/sparqlResponse";
var SparqlHttp = require("sparql-http-client");
var isomorphicFetch = require("isomorphic-fetch");
SparqlHttp.fetch = isomorphicFetch;

const empty: sparqlResponse = {
  object: "",
  predicate: "",
  subject: ""
};

/**
 * SPARQL言語でエンドポイントに問い合わせを行う
 * @param endpointUrl
 * @param query
 * @returns {
 *  "head": {
 *   "vars": [
 *    "height"
 *   ]
 *  },
 *  "results": {
 *   "bindings": [
 *    {
 *     "height": {
 *      "datatype": "http://www.w3.org/2001/XMLSchema#decimal",
 *      "type": "literal",
 *      "value": "300"
 *     }
 *    },
 *    {
 *     "height": {
 *      "datatype": "http://www.w3.org/2001/XMLSchema#decimal",
 *      "type": "literal",
 *      "value": "324"
 *     }
 *    }
 *   ]
 *  }
 * }
 */
export const getLodData = async (
  endpointUrl: string = "https://query.wikidata.org/sparql",
  query: string = "SELECT ?height WHERE { wd:Q243 wdt:P2048 ?height . }"
) => {
  const endpoint = new SparqlHttp({
    endpointUrl
  });

  const a = await endpoint.selectQuery(query);
  return a.text();
};
