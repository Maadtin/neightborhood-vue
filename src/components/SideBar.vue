<template>
	<aside class="sidebar-view">

		<form class="search-form" @submit.prevent="placeSearchSubmit">
			<v-text-field :autofocus="true" v-model="whatSearch" label="¿Qué buscas?"></v-text-field>
			<v-text-field v-if="whatSearch" v-model="placeSearch" label="¿En dónde?"></v-text-field>
			<v-btn v-if="placeSearch" color="info" type="submit">Buscar</v-btn>
		</form>


		<Loader v-if="loading" />

		<v-list class="lista-venues" v-else>
			<template v-if="venues.length">
				<v-list-tile v-for="venue in venues" class="lista-venue-item" avatar>
					<v-list-tile-avatar v-if="venue.photos && venue.photos.length">
						<img :src="venue.photos[0].getUrl()">
					</v-list-tile-avatar>
					<v-list-tile-content>
						<!--<v-list-tile-sub-title>-->
							<!--{{ item.venue.categories[0].name }}-->
						<!--</v-list-tile-sub-title>-->
						<v-list-tile-title>
							{{ venue.name }}
						</v-list-tile-title>
					</v-list-tile-content>
					<v-list-tile-action>
						<v-btn icon ripple @click="onPlaceClick(venue)">
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
	import { focus } from '../directives'
	export default {
		name: "SideBar",
		components: {Loader},
		directives: {
			focus
		},
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
			whatSearch: null,
			placeSearch: null
		}),
		methods: {
			onPlaceClick (venue) {
				this.$emit('zoomToPlace', venue);
			},
			placeSearchSubmit () {
				this.$emit('placeSearchSubmit', {
					whatSearch: this.whatSearch,
					placeSearch: this.placeSearch
				})
			}
		}
	}
</script>

<style scoped>


	.search-form {
		margin-bottom: 20px;
	}

	.sidebar-view {
		width: 300px;
		padding: 1em;
	}


</style>