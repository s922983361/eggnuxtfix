<template>
    <div id="shopCateList">
        <!-- AD -->
        <ad></ad>
        <search>
            <template v-slot:pageContent>
                <prodCard 
                    :goodsData="items"
                    :IMG_PATH="imgPath"
                    >
                    <template v-slot:cateTitle>
                        <div 
                            v-if="total > 0"
                            class="bg-teal-200 text-teal-700 px-6 py-4 rounded-lg relative" role="alert">
                            <div class="mr-4">
                                <strong class="font-bold">{{ $route.query.cate }}</strong>
                                <span class="block sm:inline text-sm"> 搜尋結果: 共{{ total }}個商品符合</span>
                                
                            </div>

                            <span class="cursor-pointer absolute top-0 bottom-0 right-0 bg-teal-100 w-10 h-10 rounded-full inline-flex items-center justify-center mt-2 mr-3">
                                <fa-layers class="text-teal-300 text-2xl">
                                    <fa-icon :icon="faCheck"></fa-icon>
                                </fa-layers>
                            </span>
                        </div>
                        <div 
                            v-if="total == 0"
                            class="bg-red-200 text-red-700 px-6 py-4 rounded-lg relative" role="alert">
                            <div class="mr-4">
                                <strong class="font-bold">{{ $route.query.cate }}</strong>
                                <span class="block sm:inline text-sm"> 搜尋結果: 共 0 個商品符合</span>
                                
                            </div>

                            <span class="cursor-pointer absolute top-0 bottom-0 right-0 bg-red-100 w-10 h-10 rounded-full inline-flex items-center justify-center mt-2 mr-3">
                                <fa-layers class="text-red-300 text-2xl">
                                    <fa-icon :icon="faTimes"></fa-icon>
                                </fa-layers>                                
                            </span>
                        </div>
                    </template>
                </prodCard>
            </template>
            <template v-slot:pagination>
                <pagination v-if="total != 0"></pagination>
            </template>
        </search> 
    </div>
</template>

<script>
    import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

    const ad = () => ({ component: import(/* webpackChunkName: "ad"*/ "@/components/shop/layout/ad")})
    const search = () => ({ component: import(/* webpackChunkName: "search"*/ "@/components/shop/layout/search")})
    const pagination = () => ({ component: import(/* webpackChunkName: "pagination"*/ "@/components/shop/layout/pagination")})
    const prodCard = () => ({ component: import(/* webpackChunkName: "brandCard"*/ "@/components/shop/content/prodCard")})
    
    export default {
        layout: 'shop',
        scrollToTop: true,
        head(){
            return{
                title:'分類名稱',
                meta:[
                    {
                        'name':'description',
                        'content': '分類名稱描述細項'
                    }
                ]
            }
        },
        data () {
            return {
                imgPath: `${process.env.BASE_URL}/uploads/`
            };
        },
        async asyncData({ app, route }, pageSize=20) {            
            try {
                const { total, items } = await app.$axios.$get(`${process.env.EGG_API_URL}/shop/cateList/${route.params.cateId}/${route.query.page}/${pageSize}`)
                return {
                    total,
                    items
                }
            }catch(err) {
                console.log(err)
            } 
        },
        computed: {
            faCheck() { return faCheck },
            faTimes() { return faTimes }
        },
        methods: {},
        components: {
            ad,
            search,
            pagination,
            prodCard
        },
    }

</script>
<style scoped>

</style>