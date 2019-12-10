import { sparqlResponse } from '../Entities/sparqlResponse'
var SparqlHttp = require('sparql-http-client')
var isomorphicFetch = require('isomorphic-fetch')
SparqlHttp.fetch = isomorphicFetch

const empty: sparqlResponse = {
  object: '',
  predicate: '',
  subject: '',
}

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
export async function getLodData(
  endpointUrl: string = 'https://query.wikidata.org/sparql',
  query: string = 'SELECT ?height WHERE { wd:Q243 wdt:P2048 ?height . }'
): Promise<sparqlResponse> {

  const endpoint = new SparqlHttp({
    endpointUrl,
  })

  endpoint
    .selectQuery(query)
    .then(function(res: any) {
      return res.text()
    })
    .then(function(body: string) {
      const result: sparqlResponse | null = JSON.parse(body)
      if (result) {
        return result
      }
      return empty
    })
    .catch(function(err: Error) {
      console.error(err)
      return empty
    })

  return empty
}
