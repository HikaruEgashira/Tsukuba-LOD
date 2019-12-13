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
import { Component, Vue } from "vue-property-decorator";
import { getLodData } from "../../InterfaceAdapter";

@Component
export default class Index extends Vue {
  name = "";
  result: any = null;
  async submit() {
    const endpoint = `http://localhost:3030/kdb/sparql`;
    const query = `prefix owl: <http://www.w3.org/2002/07/owl#>
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix xsd: <http://www.w3.org/2001/XMLSchema>
prefix cc: <http://creativecommons.org/ns#>
prefix ic: <http://imi.go.jp/ns/core/rdf#>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix ud: <http://localhost:3030/univ#>
SELECT ?subject ?predicate ?object

WHERE {
  ?subject ic:名称 ?oid. FILTER( contains(str(?oid),'${this.name}') ) .
  ?subject ic:名称 ?object
}
LIMIT 100
`;
    console.log(query);
    const a = await getLodData(endpoint, query);
    this.result = JSON.parse(a);
    const subjects = this.result.results.bindings.map((b: any) => {
      if (b.object) return b.object.value;
      return null;
    });
    alert(subjects);
  }
}
</script>

<style></style>
