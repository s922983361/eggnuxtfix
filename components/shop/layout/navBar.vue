<template>
    <div id="navBar">
        <nav 
            class="top-0 z-50 w-full flex items-center justify-between px-2 py-3 navbar-expand-lg bg-indigo-700">
            <!--------------------------------------------------------------------- Start Nav Wrapper -->
            <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <!------------------------------------------------------------------start Nav left content -->
                <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <!--------------------------------------------------------------------start Logo -->
                    <nuxt-link to="/" class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white hover:text-black transition duration-300 ease-in-out">Tailwind Starter Kit
                    </nuxt-link><!--End Logo-->

                    <div class="flex items-center px-4 lg:hidden">
                        <ul class="flex items-center list-none mr-auto">
                            <li 
                                class="relative mr-4 mb-2 cursor-pointer" 
                                @click="$emit('showShoppingCart')"
                                >
                                <fa-layers class="fa-1x text-xl text-indigo-700 mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-300 hover:bg-indigo-100 transition duration-300 ease-in-out">
                                    <fa-icon :icon="faShoppingCart"></fa-icon>
                                </fa-layers>
                                
                                <div class="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 rounded-full bg-pink-500 text-center text-white text-xs flex justify-center items-center">{{ $store.state.shop.cartList.length }}</div>
                            </li>
                            <li class="mr-3 cursor-pointer">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link">
                                        <fa-layers class="fa-1x text-xl mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-300 hover:bg-indigo-100 transition duration-300 ease-in-out">
                                            <fa-icon :icon="faUserCheck" class="text-teal-600"></fa-icon>
                                        </fa-layers>
                                        <!-- <fa-layers class="text-xl text-white hover:text-orange-400">
                                            <fa-icon :icon="faUserTimes"></fa-icon>
                                        </fa-layers> -->
                                        
                                    </span>                                
                                    
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-user-solid">個人中心</el-dropdown-item>
                                        <nuxt-link to="/member">
                                            <el-dropdown-item icon="el-icon-success">LOGIN</el-dropdown-item>
                                        </nuxt-link>                                        
                                        <el-dropdown-item icon="el-icon-error">LOGOUT</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </li>
                            <!-------------------------------------------------------------------- start toggle -->
                            <li class="mr-4 mb-2 cursor-pointer" @click="showNavMenu = !showNavMenu">
                                <fa-layers class="fa-1x text-xl text-indigo-700 mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-300 hover:bg-indigo-100 transition duration-300 ease-in-out">
                                    <fa-icon :icon="faBars" ></fa-icon>
                                </fa-layers>                                
                            </li><!-- End toggle -->
                        </ul>
                    </div>
                </div><!-- End Nav left content -->

                <!-------------------------------------------------------------------- start Nav Items -->
                <div 
                    class="lg:flex flex-grow items-center bg-gray-600 lg:bg-transparent lg:shadow-none rounded-lg"
                    :class="{'hidden': !showNavMenu, 'block': showNavMenu }"
                    >
                    <ul class="flex flex-col lg:flex-row items-center list-none mr-auto">
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg transition duration-300 ease-in-out"
                            :class="$route.path.startsWith('/shop')? 'bg-pink-500': ''"
                            @click="$router.push('/shop?page=1')"
                            >
                            <fa-layers class="fa-1x">
                                <fa-icon :icon="faShoppingBag"></fa-icon>
                            </fa-layers>&nbsp;找商品
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg transition duration-300 ease-in-out"
                            :class="$route.path === '/shop/new' || $route.path === '/shop/new/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/new')"
                            >
                            <fa-layers class="fa-1x">
                                <fa-icon :icon="faRunning"></fa-icon>
                            </fa-layers>&nbsp;找新品
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg transition duration-300 ease-in-out"
                            :class="$route.path === '/shop/onSale' || $route.path === '/shop/onSale/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/onSale')"
                            >
                            <fa-layers class="fa-1x">
                                <fa-icon :icon="faHandHoldingUsd"></fa-icon>
                            </fa-layers>&nbsp;找特價
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg transition duration-300 ease-in-out"
                            :class="$route.path === '/shop/activity' || $route.path === '/shop/activity/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/activity')"
                            >
                            <fa-layers class="fa-1x">
                                <fa-icon :icon="faCommentsDollar"></fa-icon>
                            </fa-layers>&nbsp;找活動
                        </li>
                        <li 
                            class="inline-block my-2 text-sm text-white cursor-pointer px-3 py-1 border border-pink-500 lg:border-indigo-700 hover:bg-pink-500 rounded-lg"
                            :class="$route.path === '/shop/article' || $route.path === '/shop/article/'? 'bg-pink-500': ''"
                            @click="$router.push('/shop/article')"
                            >
                            <fa-layers class="fa-1x">
                                <fa-icon :icon="faRssSquare"></fa-icon>
                            </fa-layers>&nbsp;新動態
                        </li>
                    </ul>

                    <ul class="hidden lg:flex items-center list-none ml-auto">
                        <li 
                            class="relative mr-6 cursor-pointer" 
                            @click="$emit('showShoppingCart')"
                            >
                            <fa-layers class="fa-1x text-xl text-indigo-700 mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-300 hover:bg-indigo-100 transition duration-300 ease-in-out">
                                <fa-icon :icon="faShoppingCart"></fa-icon>
                            </fa-layers>
                            
                            <div class="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 rounded-full bg-pink-500 text-center text-white text-xs flex justify-center items-center">{{ $store.state.shop.cartList.length }}</div>
                        </li>
                        <li class="mr-6 mt-1 cursor-pointer">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    <fa-layers class="fa-1x text-xl text-indigo-700 mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-300 hover:bg-indigo-100 transition duration-300 ease-in-out">
                                        <fa-icon :icon="faUserCheck" class="text-teal-600"></fa-icon>
                                    </fa-layers>
                                    <!-- <fa-layers class="fa-1x text-xl text-indigo-700 mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-300 hover:bg-indigo-100 transition duration-300 ease-in-out">
                                        <fa-icon :icon="faUserTimes" class="text-pink-300"></fa-icon>
                                    </fa-layers> -->                                    
                                </span>                                
                                
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-user-solid">個人中心</el-dropdown-item>
                                    <nuxt-link to="/member">
                                        <el-dropdown-item icon="el-icon-success">登入</el-dropdown-item>
                                    </nuxt-link>
                                    <el-dropdown-item icon="el-icon-error">登出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <!-------------------------------------------------------------------- start toggle -->
                        <li class="mr-6 cursor-pointer lg:hidden" @click="showNavMenu = !showNavMenu">
                            <fa-layers class="fa-1x text-xl text-white hover:text-pink-300">
                                <fa-icon :icon="faBars"></fa-icon>
                            </fa-layers>
                        </li><!-- End toggle -->
                    </ul>

                </div><!--End Nav Items -->
            </div><!-- End Nav Wrapper -->
            </nav>            
    </div>
</template>

<script>
    import { faUserCheck, faUserTimes, faShoppingCart, faBars, faShoppingBag , faRunning, faCommentsDollar, faHandHoldingUsd, faRssSquare } from '@fortawesome/free-solid-svg-icons'
    // import { faShopify, } from '@fortawesome/free-brands-svg-icons'
    export default {        
        data () {
            return {
                showNavMenu: false,
                dropdownPopoverShow: false
            };
        },
        props:[''],
        computed: {
            faShoppingBag() { return faShoppingBag },
            faRunning() { return faRunning },
            faCommentsDollar() { return faCommentsDollar },
            faHandHoldingUsd() { return faHandHoldingUsd },
            faRssSquare() { return faRssSquare },
            faBars() { return faBars },
            faUserCheck() { return faUserCheck },
            faUserTimes() { return faUserTimes },
            faShoppingCart() { return faShoppingCart }
        },
        methods: {
        },
        components: {},
    }

</script>
<style scoped>
/**tranition */
.page-enter,.page-leave-to {
    opacity: 0;
}
.page-enter-active, .page-leave-active { 
    transition: all 0.5s ease; 
}
</style>