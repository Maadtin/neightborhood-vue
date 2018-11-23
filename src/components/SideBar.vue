<template>

	<aside class="side-bar">
		<input @input="inputSearch" v-model="placeSearch" type="search" placeholder="Search places...">
	</aside>
	
</template>

<script>
	export default {
		name: "SideBar",
		data: () => ({
			placeSearch: ''
		}),
		methods: {
			inputSearch () {
				console.log(this.placeSearch)
			}
		}
	}
</script>

<style scoped>

	.side-bar {
		background-color: green;
		width: 30%;
	}


</style>