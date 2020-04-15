<template> 
    <div class="relative container max-w-full mx-auto py-8" style="min-height:100vh">
        <client-only>
        
        <div class="absolute top-0 w-full h-full bg-center bg-cover" v-lazy:background-image="'http://localhost:3000/loginBgimage.jpg'" >
            <span id="blackOverlay" class="w-full h-full absolute opacity-25 bg-black"></span>
        </div>
        </client-only>
        <transition mode="out-in">
            <login v-show="comName==='login'" @changeComName="changeComName"></login>            
        </transition>
        <transition mode="out-in">            
            <register v-show="comName==='register'" @changeComName="changeComName"></register>
        </transition>             
    </div>
</template>

<script>
    const login = () => ({ component: import(/* webpackChunkName: "login"*/ "@/components/member/login")})
    const register = () => ({ component: import(/* webpackChunkName: "register"*/ "@/components/member/register")})
    export default {
        data () {
            return {
                comName: 'register'
            };
        },
        computed: {},
        methods: {
            changeComName(value) {
                this.comName = value
            }
        },
        components: {
            login,
            register
        },
    }

</script>
<style scoped>
.v-enter,.v-leave-to{
    opacity: 0;transform: translateX(200px);
}
.v-enter-active,.v-leave-active{
    transition: all 0.5s ease;
}
</style>