<template>
    <div class="map-view">
        <GmapMap
                ref="mapRef"
                :center="mapConfig.coords"
                :zoom="mapConfig.zoom"
                :map-type-id="mapConfig.mapTypeId"
                style="width: 100%; height: 100%">
            <template v-if="markers.length">
                <GmapMarker
                        v-for="marker in markers"
                        :position="marker.item.geometry.location"
                        @click="onMarkerClick(marker)"
                >
                    <GmapInfoWindow
                            @closeclick="onInfoWindowClose(marker)"
                            v-if="marker.showInfoWindow"
                    >
                        <div class="venue-info">

                            <v-card>
                                <template v-if="marker.item.photos && marker.item.photos.length">
                                    <v-img :src="marker.item.photos[0].getUrl()" aspect-ratio="2.75" ></v-img>
                                </template>

                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{ marker.item.name }}</h3>
                                        <span class="marker-rating-text caption mr-2"> ({{ marker.item.rating }}) </span>
                                        <v-rating v-model="marker.item.rating" readonly half-increments></v-rating>
                                        <!--<div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>-->
                                    </div>
                                </v-card-title>

                                <!--<v-card-actions>-->
                                    <!--<v-btn flat color="orange">Share</v-btn>-->
                                    <!--<v-btn flat color="orange">Explore</v-btn>-->
                                <!--</v-card-actions>-->
                            </v-card>
                        </div>
                    </GmapInfoWindow>
                </GmapMarker>
            </template>
        </GmapMap>
    </div>
</template>

<script>

    import {gmapApi} from 'vue2-google-maps';

    export default {
        props: {
            mapConfig: {
                type: Object,
                required: true
            },
            markers: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        data: () => ({
            infoWindow: null
        }),
        methods: {
            onMarkerClick(marker) {
                this.$emit('clearMarkers');
                marker.showInfoWindow = true;
            },
            onInfoWindowClose(marker) {
                marker.showInfoWindow = false;
            },
        },
        computed: {
            google: gmapApi
        },
        name: "MapView",
    }
</script>

<style scoped>

    .marker-rating-text {
        margin-top: 5px !important;
        display: block;
    }

    .map-view {
        flex: 1;
    }

    .venue {}


    .venue-info {

    }
    .venue-info p {
        margin: 0;
    }
    .venue-likes {}
    .venue-name {
        margin: 5px 0 0;
    }

</style>