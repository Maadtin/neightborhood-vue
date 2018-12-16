<template>
    <div class="map-view">
        <GmapMap
                ref="mapRef"
                :center="mapConfig.coords"
                :zoom="mapConfig.zoom"
                :map-type-id="mapConfig.mapTypeId"
                style="width: 100%; height: 100%">
            <GmapMarker v-if="marker" :position="marker.location" @click="onMarkerClick">
                <GmapInfoWindow @closeclick="onInfoWindowClose" v-if="infoWindow">
                    {{ infoWindow.text }}
                </GmapInfoWindow>
            </GmapMarker>
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
            }
        },
        data: () => ({
            infoWindow: null
        }),
        methods: {
            onMarkerClick(a) {
                this.infoWindow = {
                    text: 'Hola'
                };
            },
            onInfoWindowClose() {
                this.infoWindow = null;
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