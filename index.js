const express = require('express')
const engine = require('ejs-locals')
const app = express()
app.use(express.static('public'))//靜態檔案的資料夾名稱傳遞給 express.static 中介軟體
// app.use('/static', express.static('public'));//建立虛擬路徑/static
// app.use('/static', express.static(__dirname + '/public'));//利用__dirname設定對路徑

app.engine('ejs',engine)
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    res.render('index',{
        'title': '首頁',
        'subtitle': '<h2>subtitle</h2>',
        'show': false,
        'food': ['apple', 'banana', 'watermelon']
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

const port = 3000
app.listen(port, function() {
    console.log('app is on port 3000')//http://localhost:3000
})

