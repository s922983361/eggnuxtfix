<template>
    <div id="order">
        <div class="antialiased sans-serif min-h-screen bg-white">
            <div class="border-t-8 border-gray-700 h-2"></div>
            <el-form ref="form" :model="form">
                <!------------------------------------------------------------------------- Start Wrapper -->
                <div class="container mx-auto py-6 px-4">
                    <div class="flex justify-between">
                        <h2 class="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">訂單資訊</h2>
                        <div>
                            <!-------------------------------------------------------------- Start Print Icon -->
                            <div class="relative mr-4 inline-block">
                                <div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" @click="printInvoice()">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                                        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                                        <rect x="7" y="13" width="10" height="8" rx="2" />
                                    </svg>				  
                                </div>
                                <div v-show="showTooltip" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
                                    Print this invoice!
                                </div>
                            </div><!--End Print Icon -->
                            <!-------------------------------------------------------------- Start Reset Icon -->
                            <div class="relative inline-block">
                                <div class="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" @mouseenter="showTooltip2 = true" @mouseleave="showTooltip2 = false" @click="window.location.reload()">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
                                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
                                    </svg>	  
                                </div>
                                <div v-show="showTooltip2" class="z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs">
                                    Reload Page
                                </div>
                            </div><!--End Reset Icon -->
                        </div>
                    </div>

                    <!----------------------------------------------------------------------- Start Input -->
                    <div class="flex flex-wrap mb-8 ">
                        <div class="w-full md:w-1/2 px-4">
                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice No.</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.name"></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-date-picker
                                        v-model="form.createDate"
                                        type="datetime"
                                        placeholder="選擇時間日期">
                                        </el-date-picker>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due date</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-date-picker
                                        v-model="form.dueDate"
                                        type="datetime"
                                        placeholder="選擇到貨時間">
                                        </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <!------------------------------------------------------------Start PictureInput -->
                        <div class="w-full md:w-1/2 px-4">
                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">送貨地址</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.addr"></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">聯絡人</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.contact "></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">連絡電話</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.tel"></el-input>
                                </div>
                            </div>

                            <div class="mb-2 md:mb-1 md:flex items-center">
                                <label class="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">備註</label>
                                <span class="mr-4 inline-block hidden md:block">:</span>
                                <div class="flex-1">
                                    <el-input v-model="form.addtion"></el-input>
                                </div>
                            </div>
                        </div><!-- End Picture -->
                    </div><!-- End Input -->

                    <div class="flex items-center justify-center">
                        <div class="container">
                            <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg">
                                <thead class="text-white">
                                    <tr 
                                        v-for=" i in cartList.length" :key="i"
                                        class="bg-teal-400 flex flex-col flex-no-wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                                        <th class="p-3 text-left" width="110px">Delete
                                            <fa-layers class="fa-1x text-red-400">
                                                <fa-icon :icon="faTrashAlt"></fa-icon>
                                            </fa-layers>
                                        </th>
                                        <th class="p-3 text-left">品名</th>
                                        <th class="p-3 text-left">規格/顏色</th>
                                        <th class="p-3 text-left" width="110px">數量</th>
                                        <th class="p-3 text-left">單價</th>
                                        <th class="p-3 text-left">折扣 %</th>
                                        <th class="p-3 text-left" width="110px">小計</th>
                                    </tr>                            
                                </thead>
                                <tbody 
                                    class="flex-1 sm:flex-none"  
                                    name="page" 
                                    mode="out-in" 
                                    is="transition-group">
                                    <tr 
                                        v-for="(cart, index) in cartList" :key="cart.id"
                                        class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                                        <td 
                                            class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 cursor-pointer"
                                            @click="removeCartItem(cart.id)"
                                            >
                                            Delete
                                        </td>
                                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                                            <nuxt-link
                                                class="hover:text-blue-400 hover:underline"                                        
                                                :to="`/shop/product/${cart.id.substring(0, 24)}`">
                                                {{ cart.sn + cart.title }}
                                            </nuxt-link>
                                        </td>
                                        <td class="border-grey-light border hover:bg-gray-100 p-3">
                                            <span class="mr-3">{{ cart.attr }}</span>
                                            <div 
                                                class="inline-block w-3 h-3 rounded-full text-gray-300 mr-1" :style="`background-color:${cart.color.value};`"
                                                >
                                                </div>{{ cart.color.name }}
                                        </td>
                                        <td class="border-grey-light border hover:bg-gray-100 p-1">
                                            <el-input-number 
                                                v-model="quantity[index]" 
                                                controls-position="right" 
                                                @change="handleChange($event, index)" 
                                                :min="1" 
                                                :max="999"
                                                >
                                                </el-input-number>
                                        </td>
                                        <td class="border-grey-light border hover:bg-gray-100 p-3">{{ cart.price }}</td>
                                        <td class="border-grey-light border hover:bg-gray-100 p-3">
                                            <span 
                                                v-if="cart.sale > 0"
                                                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1">特價不折扣{{ cart.sale }}</span>
                                            <span 
                                                v-else
                                                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200 uppercase last:mr-0 mr-1">待回復</span>
                                        </td>
                                        <td class="border-grey-light border hover:bg-gray-100 p-3">{{ Math.ceil(cart.count*cart.price) }}</td>                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="py-2 ml-auto mt-5 w-2/4">
                        <div class="flex justify-between mb-3">
                            <div class="text-gray-800 text-right flex-1">未稅額</div>
                            <div class="text-right w-40">
                                <div class="text-gray-800 font-medium">{{ cartListTotal }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between mb-4">
                            <div class="text-sm text-gray-600 text-right flex-1">(5%) incl.</div>
                            <div class="text-right w-40">
                                <div class="text-sm text-gray-600">{{ cartListTotal*5/100}}</div>
                            </div>
                        </div>
                    
                        <div class="py-2 border-t border-b">
                            <div class="flex justify-between">
                                <div class="text-xl text-gray-600 text-right flex-1">總計</div>
                                <div class="text-right w-40">
                                    <div class="text-xl text-gray-800 font-bold">{{ cartListTotal+(cartListTotal*5/100)}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/3 ml-auto rounded-md shadow-sm mt-4">
                            <button @click="onSubmit" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            送出
                            </button>
                        </div>
                    </div>
                    
                </div><!-- End Wrapper -->
            </el-form>            
        </div>
    </div>
</template>

<script>
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
    import { mapGetters } from 'vuex'
    export default {
        layout:'shop',
        data () {
            return {
                showTooltip: false,
                showTooltip2: false,
                form: {
                    name: '',
                    createDate: '',
                    dueDate: '',
                    addr: '',
                    tel: '',
                    contact: '',
                    addtion: '',
                },
                quantity:[]
            };
        },
        created(){
            //同步購物車商品的數量(必須,因無法直接修改store)
            if(this.$store.state.shop.cartList.length > 0 ){
                let count = this.$store.state.shop.cartList.map( item => item.count )
                this.quantity = count
            }
        },
        computed: {
            faTrashAlt() { return faTrashAlt },
            ...mapGetters(['cartList', 'cartListTotal'])
        },
        methods: {
            onSubmit() {
                console.log('submit!')
            },
            //數項改及動態同步購物車
            async handleChange(value, index) {
                let obj = {}
                obj.count = value
                obj.index = index
                try{                    
                    await this.$store.dispatch('shop/changeCartItemCount', obj)
                }catch(err) {
                    console.log(err)
                    this.$toast.error('發生不明錯誤,請聯繫管理員!', {
                        position: 'top-right',
                        duration: 2000,
                        theme: 'bubble',
                    })
                }
            },
            //刪除品項
            async removeCartItem(id) {
                try{                    
                    await this.$store.dispatch('shop/deleteCartItem', id)
                    this.$toast.success('已移除該選單!', {
                        position: 'top-right',
                        duration: 2000,
                        theme: 'bubble',
                    })
                }catch(err) {
                    console.log(err)
                    this.$toast.error('發生不明錯誤,請聯繫管理員!', {
                        position: 'top-right',
                        duration: 2000,
                        theme: 'bubble',
                    })
                }
            },
        },
        components: {},
    }

</script>
<style scoped>
/* @media print {
    .no-printme  {
        display: none;
    }
    .printme  {
        display: block;
    }
    body {
        line-height: 1.2;
    }
}

@page {
    size: A4 portrait;
    counter-increment: page;
} */
</style>