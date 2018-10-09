let getters={
    count:(state)=>state.carList.reduce((prev,next)=>{
        return prev+next.bookCount;
    },0),
    allPrice:(state)=>state.carList.reduce((prev,next)=>{
        return prev+next.bookCount*next.bookPrice;
    },0)
};

export default getters;