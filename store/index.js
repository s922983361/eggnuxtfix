export const state = () => ({    
    hiddenCateList: true, //for page of store to control category list open or not in mobile
    cartList:[],
    cartListTotal: 0
})

export const mutations = {   
    SET_HIDDENCATELIST (state) {
        state.hiddenCateList = !state.hiddenCateList
    },
    ADD_CARTLIST (state, obj) {
        state.cartList.push(obj)
        mutations.UPDATE_CARTLISTTOTAL(state)
    },
    ADD_CARTITEMCOUNT (state, obj) {
        //相同品項(同規格/同顏色)多次點擊,只數量增加
        let cartItem = state.cartList.find( item => item.id === obj.id)
        cartItem.count = cartItem.count + obj.count
    },
    DELETE_CARTITEM (state, id) {

        let cartItem = state.cartList.find( item => item.id === id)
        if(cartItem !== undefined) {
            let index = state.cartList.indexOf(cartItem)
            index > -1 && state.cartList.splice(index, 1)
        }
        mutations.UPDATE_CARTLISTTOTAL(state)
    },
    CHANGE_CARTITEMCOUNT(state, obj) {
        //更新數量
        state.cartList[obj.index].count = obj.count
        mutations.UPDATE_CARTLISTTOTAL(state)
    },
    UPDATE_CARTLISTTOTAL(state) {
        //更新總價        
        if(state.cartList.length > 0) {
            const reducer = (accumulator, currentValue) => accumulator + currentValue
            let priceArr = state.cartList.map( item => item.count*item.price ).reduce(reducer) 
            return state.cartListTotal = priceArr
        }
        state.cartListTotal = 0
    }
}

export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
}

export const actions = {
    async nuxtServerInit({ state, commit }, { app }) {
        /**初始化cateTree 組件數據 */
        if(!state.route.path.startsWith('/admin')){
            try{
                const { data, total } = await app.$axios.$get(`${process.env.EGG_API_URL}/shop/cateTreeData`)
                state.shop.cateTotalCount = total
                state.shop.cateTreeData = data
            }catch(err) {
                console.log(err)
            }
        }
    },
    async showCateListBar({commit}) {
        commit('SET_HIDDENCATELIST')
    },
    async addToCartList({state, commit}, obj) {
        //相同品項(同規格/同顏色)多次點擊,只數量增加
        let cartItem = {}
        cartItem = state.cartList.find( item => item.id === obj.id)
        if(cartItem !== undefined) return commit('ADD_CARTITEMCOUNT', obj)
        commit('ADD_CARTLIST', obj)
    },
    async deleteCartItem({state, commit}, id) {
        commit('DELETE_CARTITEM', id)
    },
    async changeCartItemCount({commit}, obj) {
        commit('CHANGE_CARTITEMCOUNT', obj)
    } 
}