export interface Lecture {
  subject: {
    type: string;
    value: string;
  };
  predicate: {
    type: string;
    value: string;
  };
  object: {
    type: string;
    value: string;
  };
}

export interface SparqlResponse {
  head: {
    vars: string[];
  };
  results: {
    bindings: Lecture[];
  };
}

export interface res {
  text: () => SparqlResponse;
}
