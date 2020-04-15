<template>
    <div id="product" class="">
        <div class="flex flex-wrap">
            <section class="imgList w-full lg:w-7/12 xl:w-1/2 p-4 hover:bg-gray-200">                
                <client-only>               
                    <slick ref="slick" class="slider-for" style="width: 95%; margin-left:1rem;" :options="slickOptions">
                        <img class="h-100 bg-gray-200 w-full object-cover" :src="`${imgPath}${item.imageUrl}`" :alt="`${item.title}`">
                        <img 
                            v-for=" img in prodImgs" :key="img._id"
                            class="h-100 bg-gray-200 w-full object-cover" 
                            :src="`${imgPath}${img.url}`" :alt="`${item.title}`"/>                    
                    </slick>
                </client-only>
                <client-only>               
                    <slick ref="slick" class="slider-nav mt-4" style="width: 95%; margin-left:1rem;" :options="thumbSlickOptions">                    
                        <img class="h-32 bg-gray-200 w-full object-cover cursor-pointer" :src="`${imgPath}${item.imageUrl}`" :alt="`${item.title}`">
                        <img 
                            v-for=" img in prodImgs" :key="img._id"
                            class="h-32 bg-gray-200 w-full object-cover cursor-pointer"
                            :src="`${imgPath}${img.url}`" :alt="`${item.title}`"/>
                    </slick>
                </client-only>
            </section>
            <section class="detail relative py-8 px-4 w-full lg:w-5/12 xl:w-1/2">
                <!-----------------------------------------------------------------start tags wrapper -->
                <div class="absolute top-0 right-0 -mt-4 text-right">
                    <span v-if="item.is_new === 1" class=" inline-block text-md bg-red-600 text-white px-2 py-1 rounded-full shadow-lg"> New !</span>
                    <span v-if="item.is_onSale === 1" class=" inline-block text-md bg-pink-600 text-white px-2 py-1 rounded-full shadow-lg"> Off {{ ((1-(item.special_price/ item.market_price))*100).toFixed(1) }} %</span>
                    <span class=" inline-block text-md bg-orange-300 text-orange-700 px-2 py-1 rounded-full shadow-lg"> Hot !</span>
                </div><!-- End tags wrapper -->
                
                <!------------------------------------------------------------start Goods_title wrapper -->
                <div class="">
                    <h1 v-show="false">{{ item.goods_sn }} {{ item.title }}</h1>
                    <!------------------------------------------------------------ start Goods_sn--> 
                    <span class="px-4 py-1 bg-teal-500 rounded-full text-white font-sans font-bold text-2xl">{{ item.goods_sn }}</span>
                    <!-----------------------------------------------------------  start Goods_title -->
                    <span class="text-2xl font-yen text-teal-500 ml-2">{{ item.title }}</span>
                    
                </div><!-- End Goods_title wrapper --> 

                <!----------------------------------------------------------------start sub_title wrapper -->
                <div class="mt-4 pb-4">                    
                    <!--------------------------------------------------------------- start sub_title -->
                    <span class="text-black font-yen text-lg">{{ item.sub_title }}</span>
                    
                    <div class="flex items-center mt-4">
                        <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= item.rating ? 'text-teal-500' : 'text-gray-400'" class="h-4 w-4 fill-current">   
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                        </svg>
                        <span class="border-l-2 border-gray-500 ml-4 pl-4 text-teal-500">
                            {{ item.click_count }}
                            <fa-layers class="fa-1x ml-2">
                                <fa-icon :icon="faEye"></fa-icon>
                            </fa-layers>
                        </span>
                        <span class="border-l-2 border-gray-500 ml-4 pl-4 text-teal-500">
                            {{ item.click_count }}
                            <fa-layers class="fa-1x ml-2">
                                <fa-icon :icon="faShoppingBag"></fa-icon>
                            </fa-layers>
                        </span>
                    </div>
                </div><!-- End sub_title wrapper -->

                <!----------------------------------------------------------------start version wrapper -->
                <div 
                    v-if="prodVersions.length != 0 "
                    class="flex flex-wrap mt-4">
                    <div class="text-md text-black w-full mb-2">
                        <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇其他版本/包裝:</label>                        
                    </div>
                    <!--------------------------------------------------------------- start version -->
                    <div 
                        v-for="version in prodVersions" :key="version._id"
                        class="w-1/2 md:w-1/3 lg:w-1/2 p-2 cursor-pointer" @click="$router.push(`/shop/product/${version._id}`)">
                        <div 
                            class="border border-gray-500 px-6 py-3 text-sm font-sans hover:border-orange-500 hover:text-orange-500"
                            style="transition: all .3s ease"
                            >
                            <span>{{ version.goods_sn }}</span>
                            <span>{{ version.title }}</span>
                            <span>NT.{{ version.market_price}}</span>
                        </div>                        
                    </div>                    
                </div><!-- End version wrapper --> 

                <!----------------------------------------------------------------start color & size wrapper -->
                <div class="flex flex-wrap mt-4">
                    <div 
                        v-if="prodColors.length != 0"
                        class="w-full md:w-1/2 lg:w-full mb-4">
                        <div class="text-md text-black w-full mb-2"> 
                            <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇商品顏色:</label>
                        </div>
                        <!---------------------------------------------------------------start color -->
                        <div 
                            v-for="color in prodColors" :key="color._id"
                            class="inline-block cursor-pointer p-1">
                            <div 
                                class="flex items-center justify-center w-10 h-10 border-2 rounded-full"
                                :class="colorSelected[color._id] ? 'border-black': 'border-white hover:border-black' "                                
                                style="transition: all .3s ease"
                                @click="selectColor(color)"
                                >
                                <div class="w-8 h-8 rounded-full " :style="`background-color:${color.value}`"></div>
                            </div> 
                        </div> 
                    </div>
                    <div 
                        v-if="item.goods_attrs.length > 0"
                        class="w-full md:w-1/2 lg:w-full mb-4">
                        <div class="text-md text-black w-full mb-2">                            
                            <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇尺寸/規格:</label>                        
                        </div>
                        <!--------------------------------------------------------------- start Size -->
                        <div 
                            v-for=" (attr, index) in item.goods_attrs" :key="index"
                            class="inline-block p-1 cursor-pointer">
                            <div 
                                class="border border-gray-500 px-4 py-2 text-sm font-sans text-center rounded-lg"
                                :class="attrSelected[`${index}-${attr}`] ? 'bg-gray-800 text-white ': 'hover:bg-gray-800 hover:text-white '"
                                style="transition: all .3s ease"
                                @click="selectAttr(attr, index)"
                                >
                                <span>{{ attr }}</span>
                            </div>
                        </div>
                    </div><!-- End size wrapper -->
                </div><!-- End color & size wrapper -->

                <!------------------------------------------------------------start count & price wrapper -->
                <div class="flex flex-wrap mt-4">                    
                    <!----------------------------------------------------------------start count wrapper -->
                    <div class="w-1/2">
                        <div class="text-md text-black w-full mb-2"> 
                            <label class="py-1  border-b-2 border-teal-500 text-black font-yen text-lg">選擇數量:</label>
                        </div>
                        <!--------------------------------------------------------------- start count -->
                        <div class="flex flex-row h-10 w-2/3 rounded-lg relative bg-transparent mt-1">
                            <el-input-number 
                                v-model="count_cart" 
                                controls-position="right" 
                                @change="handleChange" 
                                :min="1" 
                                :max="999"
                                >
                                </el-input-number>
                        </div>                        
                    </div><!-- End size wrapper -->
                    <!----------------------------------------------------------------start price wrapper -->
                    <div class="w-1/2 mb-4">                       
                        <!--------------------------------------------------------------- start price -->
                        <div class="text-gray-600 font-yen pt-4">
                            <span>
                                <p class="inline-block text-md">建議售價:</p >&nbsp;
                                <del v-if="item.is_onSale === 1" class="inline-block text-xl">{{ item.market_price }}</del>
                                <p v-if="item.is_onSale === 0" class="inline-block text-4xl text-teal-500">{{ item.market_price }}</p>
                            </span> 
                            <span v-if="item.is_onSale === 1">
                                <p class="inline-block text-red-600 text-xl">特價:</p> 
                                <p class="inline-block text-red-600 text-5xl font-black">{{ item.special_price }}</p>
                            </span>
                        </div>
                    </div><!-- End price wrapper -->
                </div>
                <!-- End size & count wrapper -->

                <!------------------------------------------------------------start cart Button wrapper -->
                <div class="flex flex-wrap mt-4 md:justify-end" @click="addToCart">
                    <button class="w-full md:w-1/2 lg:w-full text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-md text-center px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                        <fa-layers class="fa-1x mr-2">
                            <fa-icon :icon="faShoppingCart"></fa-icon>
                        </fa-layers> 加入採購清單
                    </button>
                </div><!-- End cart Button wrapper -->
            </section>
            <section class="desc container mx-auto p-4 w-full">
                <!------------------------------------------------------- start Goods description wrapper  -->
                <el-tabs type="card">
                    <el-tab-pane label="商品介紹">
                        <div class="border border-gray-300 rounded-lg p-4" v-html="item.editor_content"></div>
                    </el-tab-pane>
                    <el-tab-pane label="商品規格參數">
                        <div class="p-4">                            
                            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div class="flex px-4 py-5 border-b border-gray-200 sm:px-6">
                                    <div class="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 md:w-14 md:h-14">
                                        <fa-layers class="text-teal-600 text-md md:text-xl">
                                            <fa-icon :icon="faCogs"></fa-icon>
                                        </fa-layers>
                                    </div>
                                    <div class="inline-block ml-4 mt-2">
                                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                                        商品規格以及其他特殊參數
                                        </h3>
                                        <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                                        Personal details and application.
                                        </p>
                                    </div>                                    
                                </div>
                                <div>
                                    <dl v-for="(attrId, i ) in prodAttrIdList" :key="attrId._id">
                                        <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-blue-100">
                                            <dt class="text-sm leading-5 font-medium text-gray-500">
                                            {{ attrId.name }}</dt>
                                            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">{{item.attr_value_list[i]}}</dd>
                                        </div>
                                        <!-- <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-blue-100">
                                            <dt class="text-sm leading-5 font-medium text-gray-500">夾具</dt>
                                            <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">文書夾</dd>
                                        </div> -->
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="評價(1)">                       
                        <div class="flex flex-wrap border border-gray-300 rounded-lg p-4">
                            <!------------------------------------------------------ start review warpper -->
                            <div class="w-full md:w-1/2">
                                <div class="lg:text-center mt-4">
                                    <p class="mt-4 max-w-2xl text-xl leading-7 text-black lg:mx-auto">
                                        使用者評價
                                    </p>
                                </div>
                                
                                <div class="p-4">
                                    <!------------------------------------------start User rates-->
                                    <div class="flex items-center">
                                        <img class="w-10 h-10 rounded-full mr-4" src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink">
                                        <div class="text-sm">
                                            <p class="inline text-black leading-none">Jonathan Reinink</p>
                                            <p class="inline text-grey-dark">Aug 18</p>

                                            <div class="flex items-center mt-1">
                                                <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= item.rating ? 'text-teal-500' : 'text-gray-400'" class="h-4 w-4 fill-current">   
                                                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                                                </svg>
                                            </div>
                                        </div>                                        
                                    </div><!--End User rates-->
                                    <!------------------------------------------start User content -->
                                    <div class="border border-gray-300 rounded-lg p-4 mt-2">
                                        <p class="text-base leading-6 text-black">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                                    </div><!--End User content -->
                                </div>
                            </div><!-- End review warpper -->
                            <!------------------------------------------------------ start rate warpper -->
                            <div class="w-full md:w-1/2">
                                <div class="lg:text-center my-4">                                    
                                    <p class="mt-2 max-w-2xl text-xl leading-7 text-indigo-600 lg:mx-auto">
                                        您的評價是我們改進及創新的最大動力
                                    </p>
                                </div>
                                <!----------------------------------------------------start My rate warpper -->
                                <div class="mb-4">
                                    <label class="text-lg font-yen">我的評分:</label>
                                    <div class="inline-block ml-2">                                    
                                        <el-rate
                                            v-model="start"
                                            :show-text="true"
                                            :texts="['不好用', '勉強可以用', '普通', '品質滿意', '持續愛用']"
                                            :colors="startColors">
                                        </el-rate>
                                    </div>
                                </div> <!--End My rate warpper -->
                                <!--------------------------------------------------start My review warpper -->
                                <div class="mb-4">                                    
                                    <label class="text-lg font-yen">我的評論:</label>
                                    <div class="mt-4">
                                        <el-input 
                                            type="textarea"
                                            :rows="3"
                                            maxlength="50"
                                            :show-word-limit="true"
                                            v-model="assess"
                                            >
                                            </el-input>
                                    </div>
                                </div><!--End My review warpper -->
                                <!-----------------------------------------start send review Button wrapper -->
                                <div class="flex flex-wrap mt-4 justify-end" @click="sendReview">
                                    <button class="w-1/4 text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-md text-center px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                                        <fa-layers class="fa-1x mr-2">
                                            <fa-icon :icon="faShoppingCart"></fa-icon>
                                        </fa-layers>送出
                                    </button>
                                </div><!-- End cart Button wrapper -->
                            </div><!-- End rate warpper -->                            
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </section>
            <section class="mayLike container mx-auto p-4 w-full">
                <div class="flex item-cemter justify-center my-4 border-b border-gray-300 pb-4 mx-auto">
                    <div class="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 md:w-14 md:h-14">
                        <fa-layers class="text-indigo-600 text-md md:text-xl">
                            <fa-icon :icon="faThumbsUp"></fa-icon>
                        </fa-layers>
                    </div>
                    <div class="ml-4 mt-3">
                        <p class="max-w-3xl text-xl leading-7 text-black">
                        你也許會喜歡</p>
                    </div> 
                </div>
                <!----------------------------------------------------------- strat Like product wrapper -->
                <div >
                    <client-only>               
                        <slick ref="slick" class="slider-nav" style="margin-left:1rem;" :options="likeSlickOptions">
                            <!-----------------------------------------------------------strat Like product-->
                            <div
                                class="bg-white shadow-lg rounded-lg overflow-hidden my-6 p-2"
                                >
                                <div class="px-4 py-2">
                                    <p class="text-gray-900 font-bold text-3xl uppercase">NIKE AIR</p>
                                    <p class="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur adipisicing voluptatibus</p>
                                </div>
                                <img class="h-56 w-full object-cover mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="NIKE AIR">
                                <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                                    <p class="text-gray-200 font-bold text-xl">$129</p>
                                    <button
                                        @click="$router.push(`/store/product/id`)"
                                        class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded"
                                        >查看詳情
                                        </button>
                                </div>
                            </div>
                            
                            <!-- strat Like product-->
                        </slick>
                    </client-only>
                </div><!-- strat Like product wrapper -->
            </section>
        </div>
    </div>
</template>

<script>
    import { faEye, faShoppingCart, faShoppingBag, faCogs, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
    import '~/node_modules/slick-carousel/slick/slick.css'
    import '~/node_modules/slick-carousel/slick/slick-theme.css'

    export default {
        layout: 'shop',
        scrollToTop: true,
        data () {
            return {
                /**購物車所需數據*/
                count_cart: 1,
                color_cart: {},
                attr_cart: '',
                /**使用者操作數據 */
                assess: '',
                start: null,
                startColors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
                colorSelected: {},//動態顏色選擇控制
                attrSelected: {},//動態規格選擇控制

                /**渲染頁面數據*/
                imgPath: `${process.env.BASE_URL}/uploads/`,                
                slickOptions: {
                    slidesToShow: 1,//顯示幾張
                    //slidesToScroll: 1,//一次滑行幾張
                    arrows:false,
                    fade: true,
                    asNavFor: '.slider-nav'
                },
                thumbSlickOptions: {
                    slidesToShow: 3,//顯示幾張
                    slidesToScroll: 1,//一次滑行幾張
                    dots:true,
                    centerMode: true,
                    focusOnSelect: true,
                    asNavFor: '.slider-for',
                },
                likeSlickOptions:{
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots:true,
                    arrows: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    centerMode: true,
                    responsive: [                        
                        {
                            breakpoint: 1280,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        },
                    ],
                }
            };
        },
        async asyncData({ app, route }) {            
            try {
                const { item, images, colors, versions, attrIdList } = await app.$axios.$get(`${process.env.EGG_API_URL}/shop/product/${route.params.prodId}`)
                
                return {
                    item,
                    prodImgs: images,
                    prodColors: colors,
                    prodVersions: versions,
                    prodAttrIdList: attrIdList
                }
            }catch(err) {
                console.log(err)
            } 
        },
        mounted() {
            this.$nextTick(() => {
                this.$_.isEmpty(this.prodColors) && this.$set(this.color_cart, 'name', '無顏色可選')
                if(!this.$_.isEmpty(this.prodColors)){
                    if(this.prodColors.length === 1) {
                        this.$set(this.colorSelected, this.prodColors[0]._id, true)
                        this.$set(this.color_cart, 'name', this.prodColors[0].name)
                        this.$set(this.color_cart, 'value', this.prodColors[0].value)
                    }
                    if(this.prodColors.length > 1) {
                        this.initColorSelected()
                    }
                }
                if(!this.$_.isEmpty(this.item.goods_attrs)) {
                    if(this.item.goods_attrs.length === 1) {
                        this.$set(this.attrSelected, `0-${this.item.goods_attrs[0]}`, true)
                        this.attr_cart = this.item.goods_attrs[0]
                    }
                    if(this.item.goods_attrs.length > 1){
                        this.initAttrSelected()
                    }
                }else {
                    this.attr_cart = '無規格可選'
                }
            })
        },
        computed: {
            faCogs() { return faCogs },
            faEye() { return faEye },
            faThumbsUp() { return faThumbsUp },
            faShoppingBag() { return faShoppingBag },
            faShoppingCart() { return faShoppingCart },
        },
        methods: {
            next() {
                this.$refs.slick.next();
            },
            prev() {
                this.$refs.slick.prev();
            },    
            reInit() {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },
            async initColorSelected() {
                if(!this.$helper.isEmpty(this.colorSelected)) {
                    for(let key in this.colorSelected) {
                        delete this.colorSelected[key]
                    }
                }
                for(let color of this.prodColors) {
                    this.$set(this.colorSelected, color._id, false)
                }
            },
            async selectColor(color) {
                await this.initColorSelected()
                this.colorSelected[color._id] = true
                this.$set(this.color_cart, 'name', color.name)
                this.$set(this.color_cart, 'value', color.value)
            },
            async initAttrSelected() {
                if(!this.$helper.isEmpty(this.attrSelected)) {
                    for(let key in this.attrSelected) {
                        delete this.attrSelected[key]
                    }
                }
                this.item.goods_attrs.forEach((item, index) => {
                    this.$set(this.attrSelected, `${index}-${item}`, false)
                })
            },
            async selectAttr(attr, index) {
                await this.initAttrSelected()
                this.attrSelected[`${index}-${attr}`] = true
                this.attr_cart = attr
            },
            async addToCart() {
                if(this.prodColors.length > 1 && this.$helper.isEmpty(this.color_cart)) {
                    return this.$toast.error('忘記選顏色了!' ,{
                        position: 'top-right',
                        duration: 5000,
                        theme: 'bubble',
                        action : {
                            text : 'Cancel',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        },
                    })
                }
                if(this.item.goods_attrs.length > 1 && this.$helper.isEmpty(this.attr_cart)) {
                    return this.$toast.error('忘記選規格了!',{
                        position: 'top-right',
                        duration: 5000,
                        theme: 'bubble',
                        action : {
                            text : 'Cancel',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        },
                    })
                }
                let cart = {}
                cart.id = this.$route.params.prodId + this.attr_cart + this.color_cart.name
                cart.title = this.item.title
                cart.sn = this.item.goods_sn
                cart.attr = this.attr_cart
                cart.color = Object.assign({},this.color_cart)
                cart.price = this.item.market_price
                cart.sale = this.item.special_price
                cart.count = this.count_cart
                
                try{
                    await this.$store.dispatch('shop/addToCartList', cart)
                    this.$toast.success('成功加入採購清單!', {
                        position: 'top-right',
                        duration: 2000,
                        theme: 'bubble',
                    })
                    this.count_cart = 1
                }catch(err) {
                    //this.$toast.global.my_error() //Using custom toast
                    console.log(err)
                    this.$toast.error('Error while authenticating')
                }
            },            
            async sendReview() {
                alert(send)
            },
            handleChange(value) {
            }
        },
        components: {},
    }

</script>
<style>
</style>