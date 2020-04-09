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
                    <template v-slot:quantityTip>
                        <div 
                            v-if="brandTotal > 0"
                            class="bg-teal-200 text-teal-700 px-6 py-4 rounded-lg relative" role="alert">
                            <div class="mr-4">
                                <strong class="font-bold">搜尋結果:</strong>
                                <span class="block sm:inline text-sm">共{{ brandTotal }}個品牌可選</span>
                                
                            </div>

                            <span class="cursor-pointer absolute top-0 bottom-0 right-0 bg-teal-100 w-10 h-10 rounded-full inline-flex items-center justify-center mt-2 mr-3">
                                <fa-layers class="text-teal-300 text-2xl">
                                    <fa-icon :icon="faCheck"></fa-icon>
                                </fa-layers>
                            </span>
                        </div>
                        <div 
                            v-if="brandTotal == 0"
                            class="bg-red-200 text-red-700 px-6 py-4 rounded-lg relative" role="alert">
                            <div class="mr-4">
                                <strong class="font-bold">搜尋結果:</strong>
                                <span class="block sm:inline text-sm">共 0 個品牌</span>
                                
                            </div>

                            <span class="cursor-pointer absolute top-0 bottom-0 right-0 bg-red-100 w-10 h-10 rounded-full inline-flex items-center justify-center mt-2 mr-3">
                                <fa-layers class="text-red-300 text-2xl">
                                    <fa-icon :icon="faTimes"></fa-icon>
                                </fa-layers>                                
                            </span>
                        </div>
                    </template>
                    </brandCard>
            </template>
            <template v-slot:pagination>
                <pagination
                    :page_total="brandTotal"
                    :page__pagination="pagination"
                    @handleIndexChange="handleIndexChange"
                    ></pagination>
            </template>
        </search>        
    </div>
</template>

<script>
    import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

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
                brandTotal: 0,/**數據總數量 default:0 */ 
                brandItems: [],
                brandImgPath: `${process.env.BASE_URL}/uploads/`,
                
                pagination: {
                    pageIndex: this.$store.state.shop.currentPageIndex,/**第幾頁 default:1 */ 
                }, 
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
        computed: {
            faCheck(){ return faCheck },
            faTimes(){ return faTimes }
        },
        methods: {
            handleIndexChange(value){
                console.log(value)
            }
        },
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