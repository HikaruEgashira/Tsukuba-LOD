import { SparqlResponse } from '../Domains/sparqlResponse';
import { ParcedSparql } from '../Domains/spqrqlParcer';

import union from 'lodash/union';

const init: ParcedSparql = {
  instructor: [],
  lecture_code: '',
  lecture_name: '',
  room: []
};

export const parceSparqlData = async (
  response: SparqlResponse
): Promise<ParcedSparql[]> => {
  if (typeof response === 'string') {
    response = JSON.parse(response);
  }

  const res: ParcedSparql[] = [];

  let value = response.results.bindings[0].subject.value; // 直前の b0
  response.results.bindings.forEach(lecture => {
    const sameId = value === lecture.subject.value && res.length > 0; // b0 かどうか
    value = lecture.subject.value;

    let initialState: ParcedSparql = sameId ? res.splice(-1, 1)[0] : init;
    switch (lecture.predicate.value.split('#')[1]) {
      case 'ID型':
        initialState = {
          ...initialState,
          lecture_code: lecture.object.value
        };
        break;
      case '名称':
        initialState = {
          ...initialState,
          lecture_name: lecture.object.value
        };
        break;
      case '担当者':
        initialState = {
          ...initialState,
          instructor: union([...initialState.instructor, lecture.object.value])
        };
        break;
      case '開催場所':
        initialState = {
          ...initialState,
          room: union([...initialState.room, lecture.object.value])
        };
        break;
      default:
        break;
    }
    res.push(initialState);
  });
  return res.filter(v => v.lecture_code !== '');
};
