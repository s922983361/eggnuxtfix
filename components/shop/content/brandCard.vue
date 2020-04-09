<template>
    <div id="brandCard" class="p-4">
        <slot name="quantityTip"></slot>
        <div class="flex flex-wrap md:max-w-6xl md:mx-auto px-4 py-8">
            <div 
                v-for="item in brandItems" :key="item._id"
                class="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden my-6 p-2">
                <div class="px-4 py-2">
                    <p class="text-gray-900 font-bold text-3xl uppercase">{{ item.name }}</p>
                    <p class="text-gray-600 text-sm mt-1">{{ item.description }}</p>
                </div>
                <img class="h-32 w-full object-cover mt-2" :src="`${IMG_PATH}${item.imageUrl}`" :alt="`${item.name}`">
                <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                    <span class="text-gray-500">
                        <fa-layers>
                            <fa-icon :icon="faEye"></fa-icon>
                        </fa-layers>&nbsp;{{ item.views }}
                    </span>                        
                    <button
                        @click="$router.push(`/shop/brandList/${item._id}?brand=${item.name}&page=1`)"
                        class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
                        >查看詳情
                        </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { faEye } from '@fortawesome/free-solid-svg-icons'
    export default {
        props:{
            brandItems: { type: Array },
            IMG_PATH: { type:String }
        },
        data () {
            return {

            };
        },
        computed: {
            faEye() { return faEye }
        },
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>