<template>
    <div>
        {{$route.query.brand}}
    </div>
</template>

<script>
    export default {
        
        data () {
            return {

            };
        },
        async asyncData({ app, route }, pageSize=20) {            
            try {
                const { total, items } = await app.$axios.$get(`${process.env.EGG_API_URL}/shop/brandList/${route.params.brandId}/${route.query.page}/${pageSize}`)
                return {
                    total,
                    items
                }
            }catch(err) {
                console.log(err)
            } 
        },
        computed: {},
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>