import { getLodData } from "../UseCaseInteractor/getLodDataCase";
import { sparqlResponse } from "../Entities/sparqlResponse";

export default async (endpointUrl: string, query: string) => {
  return await await getLodData(endpointUrl, query);
};
