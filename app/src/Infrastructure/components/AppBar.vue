<template>
	<div>
		<b-navbar spaced>
			<template slot="brand">
				<b-navbar-item tag="router-link" :to="{ path: '/' }">
					<h1 class="title underline">MyKDB</h1>
				</b-navbar-item>
			</template>
			<template slot="end">
				<b-navbar-item tag="div">
					<b-navbar-item href="https://www.coins.tsukuba.ac.jp/special-seminar/">
						情報科学特別演習
					</b-navbar-item>
					<b-navbar-item href="https://github.com/HikaruEgashira/Tsukuba-LOD">
						<b-icon icon="github-circle" size="is-medium"> </b-icon>
					</b-navbar-item>
				</b-navbar-item>
			</template>
		</b-navbar>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";

	@Component({})
	export default class Index extends Vue {}
</script>

<style scoped>
.navbar-item {
    color: gray;
}
</style>
