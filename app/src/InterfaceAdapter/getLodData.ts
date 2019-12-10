import { getLodData } from '../UseCaseInteractor/getLodDataCase'
import { sparqlResponse } from '../Entities/sparqlResponse'

export default async (sparql: string): Promise<sparqlResponse> => {
  return await getLodData();
}
