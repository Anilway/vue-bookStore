import * as Types from './mutations-type';
const mutations={
    [Types.ADD_CART](state,book){
        // book是添加的一本书，如果有这本书累加的是数量，如果没有数量则为1，放在carList中
        let product=state.carList.find(item=>item.bookId===book.bookId);
        if(product){
            product.bookCount+=1;
            state.carList=[...state.carList];
        }else{
        // 在操作vuex改变状态，一定要修改掉原来的数据，或者替换
        /*
        * 像start.carList[0].id=1这种操作就不可以
        * start.carList.length-=1,这样也不行
        *
        * start.carList.push(book)这样可以
        * */
            book.bookCount=1;
            // 用新数组替换老数组
            state.carList=[...state.carList,book];
        }
    },
    [Types.REMOVE_CART](state,book){
        let product=state.carList.find(item=>item.bookId===book.bookId);
        if(product){
            product.bookCount-=1;
            if(product.bookCount<=1)product.bookCount=1;
            state.carList=[...state.carList];
        }else{
            return;
        }
    },
    [Types.CLEAR_CART](state,book){
        // let product=state.carList.find(item=>item.bookId===book.bookId);
        state.carList=state.carList.filter(item=>item.bookId!==book.bookId);
    },
    [Types.PAY_CART](state,book){
        state.carList=[];
    }
};

export default mutations;