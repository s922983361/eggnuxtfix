<template>
    <div id="cateTree">
        <client-only>
            <el-tree 
                empty-text="尚無數據!"
                :data="treeData"
                :props="defaultProps"
                :highlight-current="true"
                :accordion="true"
                :render-content="renderContent"
                >
                </el-tree>
        </client-only>  
    </div>
</template>

<script>
    export default {
        data () {
            return { 
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                cateTotal: 0,
                treeData: [],
            };
        },
        created(){
            this.initTreeData()
        },
        methods: {
            renderContent(h, { node, data, store }) {
                if(node.level == 1 && node.childNodes.length > 0) {
                    return h( 'span', { class: 'custom-tree-node' },
                                [
                                    h('div', { class: "w-10 h-10 rounded-full inline-block" },
                                        [
                                            h('img',{ attrs: { src: data.img,}},),
                                        ]
                                    ),
                                    h('span', { class: 'text-md pl-4' }, node.label)
                                ])
                } else {
                    return h('div', {  
                            class:'flex items-center border-b border-orange-200',
                            on: { 
                                click: () => { this.$router.push(`/shop/cateList/${data.id}?cate=${node.label}&page=1`)
                                }
                            }},
                            [
                                h('p', { class:'pl-16 text-sm md:pl-10'}, node.label),
                                h('img', { attrs: { src: data.img, }, class:'w-10 h-10 ml-4'},)
                            ]
                        )
                }
            },
            async initTreeData() {
                const data = this.$store.state.shop.cateTreeData
                const total = this.$store.state.shop.cateTotalCount
                let arr = data.map( o => {
                    let obj = {}
                    obj.id = o._id
                    obj.pid = o.pid
                    obj.label = o.name
                    obj.img = `${process.env.BASE_URL}/uploads/${o.imageUrl}`
                    if(!this.$_.isEmpty(o.link)) {
                        obj.link = o.link
                    }
                    return obj
                })
                let tree = arr.filter( o => o.pid == '0')
                tree.forEach( o => {
                    o.children = []
                    o.children = arr.filter( c => {
                        return c.pid === o.id
                    })
                })
                this.treeData = tree
                this.$emit('setCateTotal', total)
            }
        },
    }

</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-right: 8px;
}
#cateTree .el-tree-node__content {
    height: 50px !important
}
#cateTree .el-form-item .el-form-item__label {
    border-bottom: 1px solid #959595;
}
</style>