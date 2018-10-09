let http = require('http');
let fs = require('fs');
let url = require('url');

// 获取轮播图 /sliders
let sliders = require('./sliders.js');

function read(cb){ // 用来读取数据
    fs.readFile('./book.json','utf8',function(err,data){
        if(err || data.length===0){
            cb([]); // 如果有错误，或者文件没长度，就是空数组
        }else{
            cb(JSON.parse(data)); // 将读出来的内容转化成对象
        }
    })
}
/*
* read(function(books){ // books代表所有图书
*   console.log(books);
* })
* */


function write(data,cb){
    fs.writeFile('./book.json',JSON.stringify(data),cb);
}
// write({},function(){
//     console.log('写入成功')
// });

let pageSize=5; // 每页显示5条数据

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1');
    if (req.method === "OPTIONS") return res.end();
    /*让options请求快速返回*/

    let {pathname, query} = url.parse(req.url,true);// true 把query转换成对象

    if(pathname==='/page'){
        let offset=parseInt(query.offset)||0;// 拿到当前前端传递的值
        read(function(books){
          let result = books.reverse().slice(offset,offset+pageSize);// 数据倒序
            let hasMore=true;//默认有更多
            if(books.length<=offset+pageSize){// 已经显示的数目，大于了总共的条数
                hasMore=false;
            }
            res.setHeader('Content-type', 'application/json;charset=utf8');
            setTimeout(function(){
                res.end(JSON.stringify({hasMore,books:result}));
            },500);
            // res.end(JSON.stringify({hasMore,books:result}));
        });

        return;
    }

    if (pathname === '/sliders') {
        res.setHeader('Content-type', 'application/json;charset=utf8');
         return res.end(JSON.stringify(sliders));
    }

    if(pathname==='/hot'){
        res.setHeader('Content-type', 'application/json;charset=utf8');
        read(function(books){
           let hot=books.reverse().slice(0,6);
           setTimeout(function(){
               res.end(JSON.stringify(hot));
           },500);

           // res.end(JSON.stringify(hot));
        });
        return
    }

    if(pathname==='/recommend'){
        res.setHeader('Content-type', 'application/json;charset=utf8');
        read(function(books){
            let recommend=books.reverse().slice(12,18);
            // setTimeout(function(){
            //     res.end(JSON.stringify(news));
            // },500);

            res.end(JSON.stringify(recommend));
        });
        return
    }

    if(pathname==='/news'){
        res.setHeader('Content-type', 'application/json;charset=utf8');
        read(function(books){
            let news=books.reverse().slice(6,12);
            // setTimeout(function(){
            //     res.end(JSON.stringify(news));
            // },500);

            res.end(JSON.stringify(news));
        });
        return
    }

    if(pathname==='/book'){// 对书的增删改查
        let id=parseInt(query.id);
        switch(req.method){
            case 'GET':
                if(!isNaN(id)){ // 查询一个
                    read(function(books){
                       let book=books.find(item=>item.bookId===id);
                       if(!book)book={};// 如果没有找到则是undefined
                        res.setHeader('Content-type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(book));

                    });
                }else{ // 获取所有图书
                    read(function(books){
                        res.setHeader('Content-type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(books.reverse()));
                    });
                }
                break;
            case 'POST':
                let str='';
                req.on('data',chunk=>{
                    str+=chunk;
                });
                req.on('end',()=>{
                    let book=JSON.parse(str);
                    read(function (books){//添加id
                        book.bookId=books.length>0?books[books.length-1].bookId+1:1;
                        books.push(book);// 将数据放到books中，books现在还存在内存中
                        write(books,function(){// 将books写入books.json文件中
                            res.end(JSON.stringify(book));
                        })
                    });
                });
                break;
            case 'PUT':
                if(id){ // 获取当前要修改的id
                    let str='';
                    req.on('data',chunk=>{
                        str+=chunk;
                    });
                    req.on('end',()=>{
                        let book =JSON.parse(str); // book要改成什么样子
                        read(function(books){
                            books=books.map(item=>{
                                if(item.bookId===id){ // 找到id相同的那本书
                                    return book;
                                }
                                return item; // 其他书正常返回即可
                            });
                            write(books,function(){ // 将数据写回JSON中
                                res.end(JSON.stringify(book));
                            });
                        });
                    });
                }
                break;
            case 'DELETE':
                read(function(books){
                    books=books.filter(item=>item.bookId!==id);
                    write(books,function(){
                        res.end(JSON.stringify({}));// 删除返回空对象
                    });
                });
                break;
        }
       return;
    }

    // 读取一个路径
    // fs.stat('.'+pathname,function(err,stats){
    //     if(err){
    //         // res.statusCode=404;
    //         // res.end("NOT FOUND");
    //         fs.createReadStream('index.html').pipe(res);
    //     }else{ // 如果是目录会报错
    //         if(stats.isDirectory()){
    //            let p=require('path').join('.'+pathname,'./index.html');
    //             fs.createReadStream(p).pipe(res);
    //         }else{
    //             fs.createReadStream('.'+pathname).pipe(res);
    //         }
    //
    //     }
    // });
}).listen(3000);