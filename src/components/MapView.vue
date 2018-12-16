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
                        v-for="(marker, index) in markers"
                        :position="marker.location"
                        @click="onMarkerClick(marker)"
                >
                    <GmapInfoWindow
                            @closeclick="onInfoWindowClose(marker)"
                            v-if="marker.showInfoWindow"
                    >
                        {{ marker.item.venue.name }}
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
            marker: {
                type: Object,
                required: false
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
    .map-view {
        flex: 1;
    }

</style>