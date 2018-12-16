<template>
    <v-app>
        <div id="app">
            <SideBar :showNoResults="showNoResults" :loading="loading" :venues="venues" @placeSearchSubmit="placeSearchSubmit"></SideBar>
            <MapView :markers="markers" :marker="marker" :mapConfig="mapConfig" @clearMarkers="clearMarkers"></MapView>
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
            marker: null,
            markers: [],
            clientId: 'NAI0IQBPCFZYF5EFJNSXQANRAKGTGWL4TXLTMTTFQVS1FBTT',
            clientSecret: 'Q50E5EKEEGFASDGE4RTM4D2DVCX5IVXYCZRXTYJTH4G5N23Q',
            version: moment().format('YYYY-MM-DD').split('-').join(''),
            venues: [],
            loading: false,
            showNoResults: ''
        }),
        methods: {
            clearMarkers () {
                this.markers = this.markers.map(marker => {
                    marker.showInfoWindow = false;
                    return marker;
                });
            },
            placeSearchSubmit(val) {
                this.loading = true;
                let geocoder = new this.google.maps.Geocoder();
                geocoder.geocode({address: val}, (results, status) => {
                    if (results.length) {
                        let ll = results[0].geometry.location.lat().toString() + ',' + results[0].geometry.location.lng().toString();
                        axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${this.clientId}&client_secret=${this.clientSecret}&v=${this.version}&ll=${ll}`)
                            .then(payload => {
                                this.mapConfig.coords = results[0].geometry.location;
                                this.mapConfig.zoom = 14;
                                this.marker = {
                                    location: results[0].geometry.location
                                };
                                this.loading = false;
                                this.venues = payload.data.response.groups[0].items;
                                this.markers = this.venues.map(v => {
                                    return {
                                        location: {
                                            lat: v.venue.location.lat,
                                            lng: v.venue.location.lng
                                        },
                                        item: v,
                                        showInfoWindow: false
                                    }
                                });
                            })
                    } else {
                        this.venues = [];
                        this.markers = [];
                        this.marker = null;
                        this.loading = false;
                        this.showNoResults = 'No se encontraron resultados con tu búsqueda'
                    }
                })
            },
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


    .lista-venues {
        height: 500px;
        overflow: auto;
    }

    .lista-venue-item > div {
        padding-left: 0;
    }

    .lista-venue-item:not(:last-child) {
        margin-bottom: 10px;
    }

</style>
