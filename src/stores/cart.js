import { defineStore } from 'pinia'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    /**
     * All the items in the cart
     * @param {Array} productItems
     */
    productItems: []
  }),
  getters: {
    cartItemsSize: (state) => {
      const totalQty = []
      let result = 0
      state.productItems.map((item) => {
        totalQty.push(item.qty)
      })
      // Sum the total quantity by product item
      if (totalQty.length) {
        result = totalQty.reduce((a, b) => a + b)
      }
      return result
    }
  },
  actions: {
    /**
     * Add item to the cart
     * @param {Object} obj
     */
    addItem(obj) {
      this.productItems.push(obj)
    }
  }
})
