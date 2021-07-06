const express = require('express')
const app = express()//create an Express application

let port = 3000
let engine = require('ejs-locals')

app.use(express.urlencoded({//執行Middleware 讓post被解讀
    extended: false
}))

//設定EJS引擎
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');


//get
app.get('/',(req,res) => {
    res.render('index', {
        'title': '首頁',
        'title2': '<h2>subtitle</h2>',
        'show': false,
        'food': ['apple', 'banana', 'watermelon']
    })
    // res.send(`
    // <form action="/answer" method="POST">
    // <p>猜猜看，我喜歡什麼食物？</p>
    // <input name="preferFood" autocomplete="off">
    // <button>送出</button>
    // </form>
    // `)
    //autocomplete = off 避免瀏覽器自動填入資料
})
//user路由
app.get('/user', (req,res) => {
    res.render('user')
})
//post
app.post('/answer', function(req,res){
    if(req.body.preferFood === '火鍋'){
        res.send(`
        <p>太了解我了!</p>
        <a ='/'>回上一頁</a>`)
    } else {
        res.send(`
        <p>猜錯了...</p>
        <a href="/">回上一頁</a>`)
    }
    res.send("感謝送出表單")
})

app.listen(port, function() {
    console.log('app is on port 3000')//http://localhost:3000
})

