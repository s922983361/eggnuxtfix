/**
 * @desc common notify function mixin use element-ui
 */
import { Notification } from 'element-ui'
import { _MSG, _TITLE } from '@/plugins/mixins/admin/statusCode'

export default {    
    methods: {
        /**
         * @desc elememt-ui notify function
         * @param {*} res Obj: dbData
         * @param {*} type string['success','error','warning']
         * @param {*} customClass string['bg-green-200','bg-red-200','bg-yellow-200']
         */
        async notifyFunc(resCode) { 
            const CODE = resCode.toString()
            let type = 'error'
            let customClass = 'bg-red-200'
            
            if(CODE.endsWith('200')) { type = 'success' }
            if(CODE.endsWith('200')) { customClass = 'bg-green-200' }
            if(CODE.endsWith('400')) { type = 'warning' }
            if(CODE.endsWith('400')) { customClass = 'bg-yellow-200' }
            
            Notification({
                title: _MSG[resCode],
                message: _TITLE[resCode],
                type,
                customClass
            })
            if(CODE.endsWith('200')) this.$router.push(`/admin/${this.config.afterSavePushTo}`)
        }
    }
}