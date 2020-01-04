<template>
  <div>
    <section class="container">
      <h2 class="subtitle">📝様々な形式で授業検索を試してみてください</h2>
      <b-field label="授業の検索" label-position="on-border">
        <b-input v-model="name" icon="magnify" @keydown.enter.native="submit()">
        </b-input>
        <p class="control">
          <b-button rounded class="button is-dark" @click="submit()"
            >Search</b-button
          >
        </p>
      </b-field>
      <b-field label="検索の種類" label-position="on-border">
        <b-select v-model="type">
          <option v-for="option in types" :value="option" :key="option">
            {{ option }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Endpoint" label-position="on-border">
        <b-input readonly v-model="endpoint"></b-input>
      </b-field>
      <b-field label="Query" label-position="on-border">
        <b-input readonly v-model="query" type="textarea"></b-input>
      </b-field>

      <b-table striped :data="data" :columns="columns"></b-table>
    </section>
    <!-- → 検索ボックス -->

    <!-- <section class="container">
      <h2 class="subtitle">検索オプション</h2>
      <b-field label="label" label-position="on-border">
        <b-input v-model="name" icon="magnify" />
      </b-field>
    </section> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getLodData, parse } from '../../InterfaceAdapter';
import { SparqlResponse, Lecture } from '../../Domains/sparqlResponse';
import { ParcedSparql } from '../../Domains/spqrqlParcer';

interface table {
  lecture_code: string;
  lecture_name: string;
  room: string;
  instructor: string;
}

@Component
export default class Index extends Vue {
  name = '';
  type = '名称';

  types = ['名称', 'ID型', '教室'];

  parcedRes: string = '';
  data: table[] = [];

  columns = [
    {
      field: 'lecture_code',
      label: '授業番号'
    },
    {
      field: 'lecture_name',
      label: '授業名'
    },
    {
      field: 'instructor',
      label: '教師'
    },
    {
      field: 'room',
      label: '教室'
    }
  ];

  endpoint = `http://localhost:3030/kdb/sparql`;
  prefix = `prefix owl: <http://www.w3.org/2002/07/owl#>
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix xsd: <http://www.w3.org/2001/XMLSchema>
prefix cc: <http://creativecommons.org/ns#>
prefix ic: <http://imi.go.jp/ns/core/rdf#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix ud: <http://localhost:3030/univ#>
`;
  get query() {
    return `SELECT ?subject ?predicate ?object
WHERE {
  ?subject ic:${this.type} ?oid. FILTER( contains(str(?oid),'${this.name}') ) .
  ?subject ?predicate ?object
}
LIMIT 100`;
  }

  async submit() {
    const query = `${this.prefix}${this.query}`;
    const result = await getLodData(this.endpoint, query);
    const parsed = await parse(result);

    this.parcedRes = JSON.stringify(parsed);
    this.data = parsed.map(v => {
      return {
        lecture_code: v.lecture_code,
        lecture_name: v.lecture_name,
        instructor: v.instructor.join(','),
        room: v.room.join(',')
      };
    });
    // 表示用にデータを整形
    this.name = '';
  }
}
</script>

<style></style>
