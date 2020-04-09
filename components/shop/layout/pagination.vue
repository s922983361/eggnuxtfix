<template>
    <div class="inline-block border-t-2 border-b-2 border-gray-400 py-4 mb-2">
        <!-- hide-on-single-page -->
        <el-pagination
            background
            
            prev-text="prev"
            next-text="next"
            layout="prev, pager, next"
            :total="page__total"
            >
            </el-pagination>
    </div>
</template>

<script>
    export default {
        props:{
            // pagination setting
            page__total: { type: Number, default: 0 },
            // 分页参数 === pageSize:每页展示的条数，pageIndex:当前页，pageArray: 每页展示条数的控制集合，默认 _page_array
            page__pagination: { type: Object, default: null }
        },        
        data () {
            return {
                 tableCurrentPagination: {}, //當前分頁的數據結構
            };
        },        
        computed: {},
        methods: {},
        components: {},
    }

</script>
<style scoped>

</style>