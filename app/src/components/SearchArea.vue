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
			<h2 class="container">検索オプション</h2>
			<b-field label="label">
				<b-input v-model="name" placeholder="input data" icon="magnify">
				</b-input>
			</b-field>
		</section> -->
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";

	@Component
	export default class Index extends Vue {
		name = "";
		submit() {
			alert(this.name);
		}
	}
</script>

<style>
</style>
