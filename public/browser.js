
//監聽edit btn
document.addEventListener('click', function(e){
    //尋找向上兩層的dom
    let originalText = e.target.parentElement.parentElement.querySelector('.item-text')

    if(e.target.classList.contains('edit-me')){
        //文字輸入框 ＋ 顯示原來的文字
        let userInput = prompt('請修改事項內容', originalText.innerHTML)//顯示對話框讓使用者輸入資料
        let id = e.target.getAttribute('data-id')
        if (userInput) {
            axios.post('/update-item', {
                text: userInput,
                id: id
            }).then(function(result){
                originalText.innerHTML = userInput
            }).catch(err => {
                console.log(err)
            })
        }
        console.log(userInput)
    }
    if(e.target.classList.contains('delete-me')){
        let id = e.target.getAttribute('data-id')
        console.log('will delete:'+ id)

        if(confirm('are you sure you want to delete this item?')){
            axios.post('/delete-item', {
                id: id
            }).then(function(){
                e.target.parentElement.parentElement.remove()
            }).catch(err => {
                console.log(err)
            })
        }
        
    }
})
