<template>
        <v-app>
            <div id="app">
                <SideBar
                        :showNoResults="showNoResults"
                        :loading="loading"
                        :venues="venues"
                        @placeSearchSubmit="placeSearchSubmit"
                        @zoomToPlace="zoomToPlace"></SideBar>
                <MapView
                        ref="mapViewRef"
                        :markers="markers"
                        :mapConfig="mapConfig"
                        @clearMarkers="clearMarkers"
                >
                </MapView>
            </div>
        </v-app>
</template>

<script>

    import SideBar from './components/SideBar';
    import MapView from './components/MapView';
    import axios from 'axios';
    import moment from 'moment';

    import {gmapApi} from 'vue2-google-maps';


    export default {
        name: 'App',
        components: {
            MapView,
            SideBar
        },
        data: () => ({
            mapConfig: {
                coords: {
                    lat: 41.385063,
                    lng: 2.173404
                },
                zoom: 7,
                mapTypeId: 'terrain'
            },
            markers: [],
            clientId: 'NAI0IQBPCFZYF5EFJNSXQANRAKGTGWL4TXLTMTTFQVS1FBTT',
            clientSecret: 'Q50E5EKEEGFASDGE4RTM4D2DVCX5IVXYCZRXTYJTH4G5N23Q',
            version: moment().format('YYYY-MM-DD').split('-').join(''),
            venues: [],
            loading: false,
            showNoResults: ''
        }),
        methods: {
            zoomToPlace (place) {
                console.log(place);
                this.mapConfig.coords = place.geometry.location;
                this.mapConfig.zoom = 18;
            },
            clearMarkers () {
                this.markers = this.markers.map(m => {
                    m.showInfoWindow = false;
                    return m;
                });
            },
            placeSearchSubmit ({ whatSearch, placeSearch }) {

                let geocoder = new this.google.maps.Geocoder(),
                    queryParams = `client_id=${this.clientId}&client_secret=${this.clientSecret}&v=${this.version}`;

                this.loading = true;
                geocoder.geocode({address: placeSearch}, (geoResults, status) => {
                    if (geoResults.length) {
                        let request = {
                            location: geoResults[0].geometry.location,
                            query: whatSearch,
                            radius: '500'
                        };
                        this.$refs.mapViewRef.$refs.mapRef.$mapPromise.then(map => {
                            let service = new this.google.maps.places.PlacesService(map);
                            service.textSearch(request, (results, status) => {
                               if (results.length) {
                                   this.venues = results;
                                   this.markers = this.venues.map(v => {
                                       return {
                                           item: v,
                                           showInfoWindow: false
                                       }
                                   });
                                   this.mapConfig.coords = geoResults[0].geometry.location;
                                   this.mapConfig.zoom = 16;
                                   this.loading = false;
                               } else {
                                   this.venues = [];
                                   this.markers = [];
                                   this.loading = false;
                                   this.showNoResults = 'No se encontraron resultados con tu búsqueda'
                               }
                            });
                        });

                    } else {
                        this.venues = [];
                        this.markers = [];
                        this.loading = false;
                        this.showNoResults = 'No se encontraron resultados con tu búsqueda'
                    }
                });

            }
        },
        computed: {
            google: gmapApi
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


    .v-btn {
        margin: 0 !important;
    }

    .lista-venues {
        height: 500px;
        overflow: auto;
    }

    .lista-venue-item > div {
        padding-left: 0;
    }

    .v-card__title{
        padding-left: 0 !important;;
    }

    .v-icon:first-child {
        padding-left: 0 !important;
    }

    .lista-venue-item:not(:last-child) {
        margin-bottom: 10px;
    }

</style>
