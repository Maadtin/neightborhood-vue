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
                const { lat, lng } = place.venue.location;
                this.mapConfig.coords.lat = lat;
                this.mapConfig.coords.lng = lng;
                this.mapConfig.zoom = 18;
            },
            clearMarkers () {
                this.markers = this.markers.map(m => {
                    m.showInfoWindow = false;
                    return m;
                });
            },
            placeSearchSubmit(val) {
                this.loading = true;
                let geocoder = new this.google.maps.Geocoder(),
                    queryParams = `client_id=${this.clientId}&client_secret=${this.clientSecret}&v=${this.version}`;

                geocoder.geocode({address: val}, (results, status) => {
                    if (results.length) {
                        let ll = results[0].geometry.location.lat().toString() + ',' + results[0].geometry.location.lng().toString();
                        axios.get(`https://api.foursquare.com/v2/venues/explore?${queryParams}&ll=${ll}`)
                            .then(payload => {

                                this.mapConfig.coords = results[0].geometry.location;
                                this.mapConfig.zoom = 16;
                                this.loading = false;

                                let venuesResult = payload.data.response.groups[0].items;

                                venuesResult = venuesResult.map (v => {
                                    axios.get(`https://api.foursquare.com/v2/venues/${v.venue.id}?${queryParams}`)
                                        .then(payload => {
                                            v.details = payload.data.response;
                                        });
                                    return v;
                                });

                                this.venues = venuesResult;
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
