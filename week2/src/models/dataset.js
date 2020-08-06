var products = [
  {
      key: 1,
      productId: 1,
      productName: 'table',
      personInCharge: 'liu',
      productIntro: 'a huge table',
      createTime: '2015-07-04',
  },
  {
    key: 2,
    productId: 2,
    productName: 'chair',
    personInCharge: 'liu',
    productIntro: 'a little table',
    createTime: '2015-07-06',
  },
  {
    key: 3,
    productId: 3,
    productName: 'watch',
    personInCharge: 'liu',
    productIntro: 'a pretty watch',
    createTime: '2015-07-08',
  },
]

export default {
    namespace: 'dataset',
    state: {
      products: products,
      showItems: products.concat(),
    },
  
    reducers: {
      delete(state, { payload: productId }) {
        console.log('reducers delete id', productId)
        let result = state.products.filter(item => item.productId !== productId);
        console.log('reducers delete result', result)
        let newshowItems = result.concat()
        return Object.assign({}, state, {products: result, showItems: newshowItems});
      },
  
      addNewItem(state, { payload: newItem}) {
        const nextData = state.products.concat(newItem);
        let newshowItems = nextData.concat()
        return Object.assign({}, state, {products: nextData, showItems: newshowItems});
      },
  
      editItem(state, {payload: editedItem}){
        console.log('editedItem', editedItem);
        let key = state.products.filter(item => item.productId == editedItem.productId)[0].key;
        console.log('key', state.products[key])
        let item = state.products[key-1];
        if(editedItem.productName != null){
          item.productName = editedItem.productName;
        }
        if(editedItem.personInCharge != null){
          item.personInCharge = editedItem.personInCharge;
        }
        if(editedItem.createTime != null){
          item.createTime = editedItem.CreateTime;
        }
        if(editedItem.productIntro != null){
          item.productIntro = editedItem.productIntro;
        }
        let newshowItems = state.products.concat()
        return Object.assign({}, state, {showItems: newshowItems});
      },

      searchItem(state, { payload: keywords}){
        console.log('searchItem keywords', keywords);
        let result = state.products.concat()
        console.log('result 1', result)
        if(keywords.productId != null){
          result = result.filter(item => item.productId == keywords.productId);
          console.log('result 2', result)
        }
        if(keywords.productName != null){
          result = result.filter(item => item.productName == keywords.productName);
          console.log('result 3', result)
        }
        if(keywords.personInCharge != null){
          result = result.filter(item => item.personInCharge == keywords.personInCharge);
          console.log('result 4', result)
        }
        if(keywords.createTime != null){
          result = result.filter(item => item.createTime == keywords.createTime);
          console.log('result 5', result)
        }
        let newshowItems = result.concat()
        return Object.assign({}, state, {showItems: newshowItems});
      },

      reset(state){
        let newshowItems = state.products.concat()
        return Object.assign({}, state, {showItems: newshowItems});
      }
    },
  };