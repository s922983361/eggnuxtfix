<template>
    <div id="register" class="font-sans">
        <div class="w-3/4 mx-auto px-2 md:px-6">
            <div class="relative flex flex-wrap px-2 md:px-10 rounded-lg overflow-hidden">
                <span class="absolute top-0 left-0 w-full h-full opacity-50 bg-white"></span>
                <div class="w-full relative">
                    <div class="mt-6">
                        <div class="text-center font-semibold text-black text-xl md:text-4xl">
                            WELCOME TO JOIN US 
                        </div>
                        
                        <div class="flex flex-wrap justify-center">
                            <p class="text-md md:text-2xl">歡迎您的加入
                                <a  href="#" 
                                    class="text-black text-sm font-normal border-b-2 border-gray-200 hover:border-teal-500"
                                    @click.prevent="$emit('changeComName', 'login')"
                                    >已經註冊過了?
                                    <span class="text-black font-semibold">直接登入Login</span>
                                </a>
                            </p>
                        </div>
                        
                        <div class="mt-6">
                            <el-form :model="regiForm" :rules="rules" ref="regiForm" status-icon>
                                <div class="flex flex-wrap">
                                    <div class="w-full md:w-1/2 px-2">
                                        <span class="px-2 text-sm text-black font-semibold">公司名稱</span>
                                        <el-form-item prop="company">
                                            <el-input 
                                                v-model="regiForm.company"
                                                autocomplete="off">
                                                </el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="w-full md:w-1/2 px-2">
                                        <span class="px-2 text-sm text-black font-semibold">統一編號</span>
                                        <el-form-item prop="taxid">
                                            <el-input 
                                                maxlength="8" 
                                                show-word-limit 
                                                v-model="regiForm.taxid"
                                                ></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="w-full md:w-1/2 px-2">
                                        <span class="px-2 text-sm text-black font-semibold">聯絡人</span>
                                        <div class="flex items-center">
                                            <div>
                                                <el-form-item prop="name">
                                                    <el-input v-model="regiForm.name"></el-input>
                                                </el-form-item>
                                            </div>
                                            <div>
                                                <el-switch
                                                    style="display: block"
                                                    v-model="regiForm.gender"
                                                    active-color="#6bcdff"
                                                    inactive-color="#f98b8b"
                                                    active-text="先生"
                                                    active-value="male"
                                                    inactive-text="小姐"
                                                    inactive-value="female"
                                                    >
                                                    </el-switch>
                                            </div>
                                        </div>
                                    </div>                                
                                    <div class="w-full md:w-1/2 px-2">
                                        <span class="px-2 text-sm text-black font-semibold">電子信箱</span>
                                        <el-form-item prop="email">
                                            <el-input v-model="regiForm.email"></el-input>
                                        </el-form-item>                                    
                                    </div>

                                    <div class="w-full p-1">
                                        <span class="px-1 text-sm text-black font-semibold">地址</span>
                                        <div class="flex flex-wrap">
                                            <div class="mb-2 w-full md:w-1/4 md:pr-2">
                                                <el-form-item prop="cityName">
                                                    <el-select 
                                                        v-model="regiForm.cityName"
                                                        placeholder="請選擇城市" 
                                                        @change="districtName">
                                                        <el-option
                                                            v-for="(city, i) in cities" :key="i"
                                                            :label="city"
                                                            :value="i+'-'+city"
                                                        >
                                                        <span style="float: left">{{ city }}</span>
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </div>
                                            <div class="mb-2 w-full md:w-1/4 md:pr-2">
                                                <el-form-item prop="district">
                                                    <el-select v-model="regiForm.district"  placeholder="請選擇地區">
                                                        <el-option
                                                            v-for="(district, i) in districts" :key="i"
                                                            :label="district.zip +' '+district.name"
                                                            :value="district.zip+district.name"
                                                        >
                                                        <span style="float: left">{{district.zip +' '+district.name}}</span>
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </div>
                                            <div class="mb-2 w-full md:w-1/2">
                                                <el-form-item prop="addr">
                                                    <el-input v-model="regiForm.addr" placeholder="請輸入地址..."></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>                                        
                                    </div>

                                    <div class="w-full md:w-1/2 px-2">
                                        <span class="px-2 text-sm text-black font-semibold">聯絡電話</span>
                                        <el-form-item prop="tel">
                                            <el-input v-model="regiForm.tel"></el-input>
                                        </el-form-item>
                                    </div>

                                    <div class="w-full md:w-1/2 px-2">
                                        <span class="px-2 text-sm text-black font-semibold">供應商代號</span>
                                        <el-form-item prop="vendorCode">
                                            <el-input v-model="regiForm.vendorCode">
                                                <template slot="append">
                                                    <el-popover
                                                        placement="top"
                                                        width="300"
                                                        trigger="click"
                                                        content="邀請您註冊的供應商會提供一組代號, 若有問題請點選右下方連結與管理員聯繫"
                                                        popper-class='bg-black text-md text-white rounded-lg'
                                                        class='text-blue-700 text-lg'
                                                        >
                                                        <el-button slot="reference" icon="el-icon-question"></el-button>
                                                    </el-popover>
                                                </template>
                                            </el-input>
                                        </el-form-item>
                                    </div>

                                    <div class="w-full md:w-1/2 px-2">                                        
                                        <div class="flex">
                                            <div class="w-1/2 pr-2">
                                                <span class="px-2 text-sm text-black font-semibold">輸入密碼</span>
                                                <el-form-item prop="password">
                                                    <el-input type="password" v-model="regiForm.password"></el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="w-1/2 pr-2">
                                                <span class="px-2 text-sm text-black font-semibold">確認密碼</span>
                                                <el-form-item prop="confirmPassword">
                                                    <el-input type="password" v-model="regiForm.confirmPassword"></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>                                    
                                    </div>

                                    <div class="w-full md:w-1/2 px-2">
                                        <span class="px-1 text-sm text-black font-semibold">輸入驗證碼</span>
                                        <div class="flex">
                                            <div class="w-1/2 pr-2">
                                                <el-form-item prop="validCode">
                                                    <el-input v-model="regiForm.validCode"></el-input>
                                                </el-form-item>
                                            </div>
                                            <button
                                                class="w-1/2 h-10 ml-2 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 bg-blue-200 hover:bg-blue-500 hover:text-white shadow-md py-2 px-2 inline-flex items-center transition duration-700 ease-in-out"
                                                @click.prevent="getValidCode"
                                                >
                                                <countdown 
                                                    :time="timer"
                                                    ref="countdown" 
                                                    :auto-start="false"
                                                    class="mx-auto"
                                                    @end="countDownEnd"
                                                    >
                                                    <template slot-scope="props">
                                                        <span>{{ timeStart ? `${props.totalSeconds} sec.`: '取得驗證碼' }}</span>
                                                    </template>                                                
                                                </countdown>                                            
                                            </button>
                                        </div>                                    
                                    </div>
                                </div>

                                <div class="flex justify-start">
                                    <label class="block text-gray-500 font-bold my-2 flex items-center">
                                        <input class="leading-loose text-pink-600 top-0" type="checkbox"/>
                                        <span class="ml-2 text-sm py-2 text-gray-600 text-left">我同意以下
                                            <a href="#"
                                                class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">使用條款
                                            </a>和
                                            <a href="#"
                                                class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                                                the information data policy.</a>
                                        </span>
                                    </label>
                                </div>
                                <button 
                                    class="my-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black transition duration-700 ease-in-out"
                                    @click.prevent="submitForm('regiForm')"
                                    >
                                    Register
                                </button>                                
                            </el-form> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import addrJson from '@/plugins/libs/addr.json'
    import { _MSG, _TITLE, _MSGINKOA } from '@/plugins/mixins/admin/statusCode'

    export default {
        name:'',
        data () {
            return {                               
                regiForm:{
                    company:'',                    
                    taxid: '',
                    name: '',
                    gender: 'female',
                    email: '',
                    cityName: '',
                    district: '',
                    tel:'',
                    addr:'',
                    vendorCode:'',
                    validCode: '',
                    password:'',
                    confirmPassword:''
                },                
                rules: {
                    company: [
                        { required: true, message: '尚未輸入公司名稱' },
                        { max: 50, message: '最多50個字', trigger: 'blur' }
                    ],
                    taxid: [
                        { required: true, message: '尚未輸入統一編號' },
                        { pattern: /^\d{8}$/, message: '統一編號格式有錯', trigger: 'blur'}
                    ],
                    email: [
                        { required: true, message: '尚未輸入信箱號' }, 
                        { max: 100, message: '最多100個字', trigger: 'blur' },                       
                        { pattern: /^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/, message: '信箱格式有錯', trigger: 'blur'}
                    ],
                    name: [
                        { required: true, message: '尚未輸入聯絡人' },
                        { max: 50, message: '最多50個字', trigger: 'blur' }
                    ],
                    cityName: [
                        { required: true, message: '尚未選擇城市' },
                    ],
                    district: [
                        { required: true, message: '尚未選擇地區' },
                    ],
                    addr: [
                        { required: true, message: '尚未輸入地址' },
                        { max: 100, message: '最多100個字', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '尚未輸入連絡電話' },
                        { max: 20, message: '最多20個字', trigger: 'blur' }
                    ],
                    vendorCode: [
                        { required: true, message: '尚未輸入供應商代號' },
                        { pattern: /^[a-zA-Z0-9]{5}$/, message: '供應商代號格式有錯', trigger: 'blur'}
                    ],
                    validCode: [
                        { required: true, message: '尚未輸入驗證碼' },
                        { pattern: /^\d{6}$/, message: '驗證碼格式有錯', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '尚未密碼' },
                        { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '至少八個字，至少一个字母和一个數字：', trigger: 'blur'}
                    ],
                    confirmPassword :[
                        { validator: (rule, value, callback)=>{
                                if (value === '') {
                                    callback(new Error('尚未輸入確認密碼'));
                                } else if (value !== this.regiForm.password) {
                                    callback(new Error('兩次輸入密碼不一致!'));
                                } else {
                                    callback();
                                }
                            }
                        ,trigger:'blur'}
                    ]
                },
                timer: 300*1000,
                timeStart: false, //控制倒數樣式以及時間內不可重複發送
                value2: true,
                addrJson,//郵遞區號json
                cities:[],//縣市數據
                districts:[],//各縣市地區
            };
        },
        mounted(){
            this.cityName()
        },
        computed: {},
        methods: {
            cityName(){
                this.cities = this.addrJson.map( item => item.name)                
            },
            districtName(value) {
                let index = value.split('-')
                this.districts = [],
                this.regiForm.district = ''
                this.districts = this.addrJson[index[0]].districts
            },
            
            async getValidCode(){ 
                //沒輸入信箱?               
                if(this.$_.isEmpty(this.regiForm.email)) {
                    return this.$toast.error('還沒填寫信箱!',{
                        position: 'top-right',
                        duration: 6000,
                        theme: 'bubble',
                        action : {
                            text : 'Cancel',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        },
                    })
                }
                //郵件已經寄發了
                if(this.timeStart === true) {
                    return this.$toast.info('郵件已經送出, 請稍後片刻!',{
                        position: 'top-right',
                        duration: 6000,
                        theme: 'bubble',
                        action : {
                            text : 'Cancel',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        },
                    })
                }
                
                this.timeStart = true
                this.$refs.countdown.start()
                try{
                    const res = await this.$axios.$post(`${process.env.BASE_URL}/api/member/validCode`, {email: this.regiForm.email})
                    this.$toast.success(`${res}, 請留意是否在垃圾信件夾`, {
                        position: 'top-right',
                        duration: 6000,
                        theme: 'bubble',
                        action : {
                            text : 'Cancel',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        },
                    })
                }catch(err) {
                    this.$toast.error('發生不明錯誤!',{
                        position: 'top-right',
                        duration: 6000,
                        theme: 'bubble',
                        action : {
                            text : 'Cancel',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        },
                    })
                }
            },
            countDownEnd(){
                if(this.$_.isEmpty(this.regiForm.validCode)) {
                    this.$toast.error('請檢查垃圾信件或輸入您可接收信件的電子信箱!',{
                        position: 'top-right',
                        duration: 6000,
                        theme: 'bubble',
                        action : {
                            text : 'Cancel',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            }
                        },
                    })
                }                
                this.regiForm.validCode = ''
                this.timeStart = false
                this.$refs.countdown.totalMilliseconds = this.timer
            },
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.memberRegister()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            async memberRegister() {
                //將供應商代號放進array
                this.regiForm.vendor = []
                this.regiForm.vendor.push(this.regiForm.vendorCode)
                //分割城市名稱(只要城市名不要編號)
                let ADDR = this.regiForm.cityName.split('-')
                this.regiForm.address = ADDR[1]+this.regiForm.district+this.regiForm.addr

                const res = await this.$axios.$post(`${process.env.BASE_URL}/api/member/checkValidCodeAndtaxId`, this.regiForm)

                if(res.resCode !== 230200) {
                    res.resCode === 800400 && this.resetForm('regiForm')
                    res.resCode === 801400 && this.resetForm('regiForm')
                    if (res.resCode === 802400) {
                        this.regiForm.company = '' 
                        this.regiForm.taxid = ''
                    }                    
                    return this.$toast.error( _MSGINKOA[res.resCode] ,{
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
                this.$toast.success(_TITLE[res.resCode],{
                    position: 'top-right',
                    duration: 6000,
                    theme: 'bubble',
                    action : {
                        text : 'Cancel',
                        onClick : (e, toastObject) => {
                            toastObject.goAway(0);
                        }
                    },
                })
                this.resetForm('regiForm')
                this.$emit('changeComName', 'login')
            }
        },
        components: {},
    }

</script>
<style>
</style>