export const state = () => ({    
    hiddenCateList: true, //for page of store to control category list open or not in mobile
})

export const mutations = {   
    SET_HIDDENCATELIST (state) {
        state.hiddenCateList = !state.hiddenCateList
    },    
}

export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
    cartList(state) {
        return state.shop.cartList
    },
    cartListTotal(state) {
        return state.shop.cartListTotal
    }
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
}