<template>
    <div class="inline-block border-t-2 border-b-2 border-gray-400 py-4 mb-2">
        
        <el-pagination
            background
            hide-on-single-page
            prev-text="prev"
            next-text="next"
            layout="prev, pager, next"
            :total="page__total"
            :current-page="$route.query.page? parseInt($route.query.page) : 1"
            @current-change="handleIndexChange"
            >
            </el-pagination>
    </div>
</template>

<script>
    
    export default {
        props:{
            // pagination setting
            page__total: { type: Number, default: 0 },
            // 分页参数 === pageSize:每页展示的条数，pageIndex:当前页
            page__pagination: { type: Object, default: null }
        },        
        data () {
            return {
                 tableCurrentPagination: {}, //當前分頁的數據結構
            };
        },
        created(){
            // 判斷是否需要分頁
            this.tableCurrentPagination = this.page__pagination || {
                pageSize: this.page__total,
                pageIndex: 1
            } 
        },       
        computed: {},
        methods: {
            handleIndexChange (currnet) {
                this.$emit('handleIndexChange', currnet)                                
            },
        },
        components: {},
    }

</script>
<style scoped>

</style>