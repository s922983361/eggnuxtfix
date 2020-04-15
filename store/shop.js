export const state = () => ({ 
    /******************************************************************分類列表 */
    cateTotalCount: 0, //初始化/shop/layout/cateTree 總數   
    cateTreeData: [], //初始化/shop/layout/cateTree 組件數據

    /********************************************************************購物車 */
    cartList:[],
    cartListTotal: 0
})
export const mutations = { 
    /********************************************************************購物車 */
    //添加品項
    ADD_CARTLIST (state, obj) {
        state.cartList.push(obj)
        mutations.UPDATE_CARTLISTTOTAL(state)
    },
    //相同品項(同規格/同顏色)多次點擊,只數量增加
    ADD_CARTITEMCOUNT (state, obj) {        
        let cartItem = state.cartList.find( item => item.id === obj.id)
        cartItem.count = cartItem.count + obj.count
    },
    //刪除品項
    DELETE_CARTITEM (state, id) {
        let cartItem = state.cartList.find( item => item.id === id)
        if(cartItem !== undefined) {
            let index = state.cartList.indexOf(cartItem)
            index > -1 && state.cartList.splice(index, 1)
        }
        mutations.UPDATE_CARTLISTTOTAL(state)
    },
    //更新數量
    CHANGE_CARTITEMCOUNT(state, obj) {        
        state.cartList[obj.index].count = obj.count
        mutations.UPDATE_CARTLISTTOTAL(state)
    },
     //更新總價 
    UPDATE_CARTLISTTOTAL(state) {
        if(state.cartList.length > 0) {
            const reducer = (accumulator, currentValue) => accumulator + currentValue
            let priceArr = state.cartList.map( item => item.count*item.price ).reduce(reducer) 
            return state.cartListTotal = priceArr
        }
        state.cartListTotal = 0
    }
}

export const actions = {
    /********************************************************************購物車 */
    /**添加 */
    async addToCartList({state, commit}, obj) {
        //相同品項(同規格/同顏色)多次點擊,只數量增加
        let cartItem = {}
        cartItem = state.cartList.find( item => item.id === obj.id)
        if(cartItem !== undefined) return commit('ADD_CARTITEMCOUNT', obj)
        commit('ADD_CARTLIST', obj)
    },
    /**刪除 */
    async deleteCartItem({state, commit}, id) {
        commit('DELETE_CARTITEM', id)
    },
    /**數量更動 */
    async changeCartItemCount({commit}, obj) {
        commit('CHANGE_CARTITEMCOUNT', obj)
    }
}