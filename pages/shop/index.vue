<template>
    <div id="shopIndex">
        <!-- AD -->
        <ad></ad>
        <search>
            <template v-slot:pageContent>
                <brandCard
                    :brandItems="brandItems"
                    :IMG_PATH="brandImgPath"
                    >
                    </brandCard>
            </template>
            <template v-slot:pagination>
                <pagination></pagination>
            </template>
        </search>        
    </div>
</template>

<script>
    const ad = () => ({ component: import(/* webpackChunkName: "ad"*/ "@/components/shop/layout/ad")})
    const search = () => ({ component: import(/* webpackChunkName: "search"*/ "@/components/shop/layout/search")})
    const pagination = () => ({ component: import(/* webpackChunkName: "pagination"*/ "@/components/shop/layout/pagination")})
    const brandCard = () => ({ component: import(/* webpackChunkName: "brandCard"*/ "@/components/shop/content/brandCard")})
    
    export default {
        layout: 'shop',
        scrollToTop: true,
        head(){
            return{
                title:'採購中心首頁',
                meta:[
                    {
                        'name':'description',
                        'content': '文具分類查詢, 文具品牌查詢, 文具關鍵字搜尋及查詢'
                    }
                ]
            }
        },
        data () {
            return {
                brandTotal: 0,
                brandItems: [],
                brandImgPath: `${process.env.BASE_URL}/uploads/`
            };
        },
        async asyncData({ app }) {
            try {
                const { brandTotal, brandItems } = await app.$axios.$get(`${process.env.EGG_API_URL}/shop/index`)
                return {
                    brandTotal,
                    brandItems
                }
            }catch(err) {
                console.log(err)
            } 
        },
        computed: {},
        methods: {},
        components: {
            ad,
            search,
            pagination,
            brandCard
        },
    }

</script>
<style scoped>

</style>