const express = require('express')
const engine = require('ejs-locals')
const firebase = require('firebase')

const app = express()
app.use(express.static('public'))//靜態檔案的資料夾名稱傳遞給 express.static 中介軟體
// app.use('/static', express.static('public'));//建立虛擬路徑/static
// app.use('/static', express.static(__dirname + '/public'));//利用__dirname設定對路徑
app.use(express.urlencoded({//middleware程式碼，這樣才能抓倒頁面資料
    extended: false
}))
app.use(express.json())

app.engine('ejs',engine)
app.set('views', './views')
app.set('view engine', 'ejs')

firebase.initializeApp({
    databaseURL: "https://myproject-1153b-default-rtdb.asia-southeast1.firebasedatabase.app"
});
var db = firebase.database()

app.get('/', (req,res) => {
    db.ref('todos').once('value', function(snapshot){
        var data = snapshot.val()
        res.render('index',{
            'title': '首頁',
            'todolist': data

            
        })
    })
    


})
app.get('/about', (req,res) => {
    res.render('about', {
        'title': 'About us',
        'subtitle': '關於我們',
        'description': `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quod, corrupti repudiandae omnis voluptates adipisci temporibus aut rem accusamus eum magnam, rerum sit eveniet? Laboriosam quisquam vero magni eum magnam.`
    })
})
app.get('/contact', (req,res) => {
    res.render('contact', {
        'title': 'Contact us',
        'subtitle': '聯絡我們',
        'description': `Something short and leading about the collection below—its contents, the creator, etc.Make it short and sweet, but not too short so folks don’ t simply skip over it entirely.`
    })
})
app.get('/product', (req,res) => {
    res.render('product', {
        'title': 'Products',
        'subtitle': '商品',
        'description': `Something short and leading about the collection below—its contents, the creator, etc.Make it short and sweet, but not too short so folks don’ t simply skip over it entirely.`
    })
})

// app.get('/user', (req,res) => {
//     res.render('user', {
//         'title':'user page'
//     })
// })

app.post('/create-item', function (req, res) {
    console.log(req.body.item)
    let item = req.body.item
    let fireData = firebase.database()//建立子路徑
    let itemRef = fireData.ref('todos').push()//設定Firebase資料庫的路徑 路徑名為todos
    itemRef.set({
        "item": item
    }).then(function(){
        db.ref('todos').once('value', function(snapshot){//once 讀取資料
            res.send(snapshot.val())
            // console.log(snapshot.val())
            
        })
    })
    res.redirect('/')
    // res.send("Thank for submit the form")
})

app.post('/update-item', function(req, res) {
    let id = req.body.id
    let dbRef = db.ref('todos/'+ id)
    dbRef.update({
        item: req.body.text
    })
    console.log(req.body.text)
    res.send('update success')
})

app.post('/delete-item', function(req, res) {
    let id = req.body.id
    let dbRef = db.ref('todos/'+ id)
    dbRef.remove()
    res.send('delete success')
})

const port = 3000
app.listen(port, function() {
    console.log('app is on port 3000')//http://localhost:3000
})

