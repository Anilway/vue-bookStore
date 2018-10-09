import axios from 'axios';

// 增加默认路径
axios.defaults.baseURL="http://localhost:3000";

// 获取轮播图数据，返回的是一个promise对象
// export let getSliders=function(){
//     return axios.get('/sliders');
// };

// 获取热门图书
// export let getHotBook=()=>{
//     return axios.get('/hot');
// };

// 获取轮播图数据和热门图书数据
let getSliders=function(){
    return axios.get('/sliders');
};

let getHotBook=()=>{
    return axios.get('/hot');
};

let getNewBook=()=>{
    return axios.get('/news');
};

let getRecommendBook=()=>{
    return axios.get('/recommend');
};

export let getAll=()=>{
    return axios.all([getSliders(),getHotBook(),getNewBook(),getRecommendBook()]);
};


// 获取所有图书
export let getBooks=()=>{
    return axios.get('/book')
};

// 删除某一本图书
export let removeBook=(id)=>{
    return axios.delete(`/book?id=${id}`);
};

// 获取谋一本书
export let findOneBook=(id)=>{
    return axios.get(`/book?id=${id}`);
};

// 修改图书
/**
 * @param id 编号
 * @param data 数据 请求体发送
 * @returns {AxiosPromise<T>}
* */
export let updateBook=(id,data)=>{
    return axios.put(`/book?id=${id}`,data);
};

// 添加图书
export let addBook=(data)=>{
    return axios.post('/book',data);
};

// 下拉加载
// 根据偏移量，返回对应的数据 5 => 5-10
export let pagination=(offset)=>{
    return axios.get(`/page?offset=${offset}`);
}