<template>
	<div id="app">
		<SideBar></SideBar>
		<MapView></MapView>
	</div>
</template>

<script>


	import SideBar from "./components/SideBar";
	import MapView from "./components/MapView";



	export default {
		name: 'App',
		components: {
			MapView,
			SideBar
		}
	}
</script>

<style lang="scss">

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family: 'Roboto', 'sans-serif';
	}

	#app {
		display: flex;
		min-height: 100vh;
	}

</style>
