<template>
	<div id="app">
		<AppBar />
		<SearchArea />
		<AppResult />
		<AppFooter />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import SearchArea from "./components/SearchArea.vue";
	import AppBar from "./components/AppBar.vue";
	import AppResult from "./components/Result.vue";
	import AppFooter from "./components/Footer.vue";

	@Component({
		components: {
			SearchArea,
			AppBar,
			AppResult,
			AppFooter
		}
	})
	export default class App extends Vue {
		searchIconClick = false;
	}
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
	.underline {
		position: relative;
		display: inline-block;
		text-decoration: none;
	}
	.underline::after {
		position: absolute;
		bottom: -4px;
		left: 0;
		margin-bottom: 4px;
		content: "";
		width: 100%;
		height: 2px;
		background: #333;
		transform: scale(1, 1);
		transform-origin: center top;
		transition: transform 0.3s;
	}
	.underline:hover::after {
		transform: scale(0, 1);
	}
</style>
