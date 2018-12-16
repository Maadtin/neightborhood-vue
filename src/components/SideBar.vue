<template>
	<aside class="sidebar-view">

		<form @submit.prevent="placeSearchSubmit">
			<v-text-field v-model="placeSearch" label="Busca lugares..."></v-text-field>
		</form>


		<Loader v-if="loading" />

		<v-list class="lista-venues" v-else>
			<template v-if="venues.length">
				<v-list-tile v-for="item in venues" class="lista-venue-item">
					<v-list-tile-content>
						<v-list-tile-sub-title>
							{{ item.venue.categories[0].name }}
						</v-list-tile-sub-title>
						<v-list-tile-title>
							{{ item.venue.name }}
						</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-btn icon ripple>
							<v-icon color="grey lighten-1">info</v-icon>
						</v-btn>
					</v-list-tile-action>
				</v-list-tile>
			</template>
			<v-list-tile v-else-if="showNoResults">
				<v-list-tile-content>
					{{ showNoResults }}
				</v-list-tile-content>
			</v-list-tile>
		</v-list>

	</aside>
</template>

<script>

	import Loader from "./Loader";
	export default {
		name: "SideBar",
		components: {Loader},
		props: {
			venues: {
				type: Array,
				required: true,
				default: () => []
			},
			loading: {
				type: Boolean,
				required: true,
				default: () => false
			},
			showNoResults: {
				type: String,
				required: true,
				default: () => ''
			}
		},
		data: () => ({
			placeSearch: null,
		}),
		methods: {
			inputSearch () {
				console.log(this.placeSearch)
			},
			onPlaceChange (place) {
				this.$emit('placeChanged', place.geometry ? place.geometry.location : null)
			},
			placeSearchSubmit () {
				this.$emit('placeSearchSubmit', this.placeSearch)
			}
		}
	}
</script>

<style scoped>

	.sidebar-view {
		width: 300px;
		padding: 1em;
	}


</style>