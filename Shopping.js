/*---------------THÊM SẢN PHẨM VÀO GIỎ HÀNG--------------------*/

const selecButton= document.querySelectorAll("button")/*querySelectorAll: chọn tất cả các phần tử có trong ("...")*/
selecButton.forEach(function (button,index){/*forEach:là một phương thức có sẵn của array, để duyệt qua mỗi phần tử của
    mảng và thực hiện một hành động nào đó*/
    button.addEventListener("click",function (event){/*addEventListener: là một phương thức được tích hợp sẵn vào các đối tượng HTML
        thông qua cơ chế DOM. Khi sử dụng addEventListener thì bạn có thể bổ sung rất nhiều hành động
        vào sự kiện tại nhiều thời điểm khác nhau.*/
        let btnProduct = event.target
        let product = btnProduct.parentElement/* parentElement: trả về phần tử cha của phần tử được chỉ định*/
        let productImg = product.querySelector("img").src/*querySelector: trả về phần tử đầu tiên phù hợp với các
             bộ chọn được chỉ định trong (..)*/
        let productName = product.querySelector("h4").innerText
        let productPrice = product.querySelector("span").innerText
        //console.log(productImg,productName,productPrice)
        addCart(productImg,productName,productPrice)
    })
})
function addCart(productImg,productName,productPrice){
    let addTr = document.createElement("tr")
    let trContent = '<tr>\n' +
        '                    <td><img style="width: 70px" src="'+productImg+'"></td>\n' +
        '                    <td><span style="font-weight: bold">'+productPrice+'</span><sup>đ</sup></td>\n' +
        '                    <td><span style="font-weight: bold;font-size: 18px">'+productName+'</span></td>\n' +
        '                    <td><input type="number" value="1" max="10" min="1" style="width: 35px"></td>\n' +
        '                    <td style="cursor: pointer"><span class="deleteproduct">Xóa</span></td>\n' +
        '                   </tr>'
    addTr.innerHTML = trContent
    let cartTable = document.querySelector("tbody")
    cartTable.append(addTr)

    cartTotal()
    DeleteProduct()
}
/*==============TÍNH TỔNG TIỀN HÀNG============================*/
function cartTotal(){
    let countItem = document.querySelectorAll("tbody tr")
    let totalPrice =0;
    for (let i=0;i<countItem.length;i++){
        let inputNum = countItem[i].querySelector("input").value
        let priceProduct = countItem[i].querySelector("span").innerText
        let sumPrice = priceProduct*inputNum
        totalPrice = totalPrice+sumPrice
    }
    let displayTotalPrice = document.querySelector(".sum-price span")
    displayTotalPrice.innerHTML = totalPrice
    ChangeNumber()
}

/*===================Xóa SP======================*/

function DeleteProduct(){
    let countItem = document.querySelectorAll("tbody tr")
    for (let i=0;i<countItem.length;i++){
        let findDelete = document.querySelectorAll(".deleteproduct")
        findDelete[i].addEventListener("click",function (event){
            let deleteSP = event.target
            let deleteProduct = deleteSP.parentElement.parentElement
            deleteProduct.remove()
            cartTotal()
        })
    }
}

function ChangeNumber(){
    let countItem = document.querySelectorAll("tbody tr")
    for (let i=0;i<countItem.length;i++){
        let changeValue = countItem[i].querySelector("input")
        changeValue.addEventListener("change",function (){
            cartTotal()
        })
    }
}

const closeCart = document.querySelector(".close")
const showCart = document.querySelector(".showcart")
showCart.addEventListener("click",function (){
    //console.log(showCart)
    document.querySelector(".cart").style.right = "0";
})
closeCart.addEventListener("click",function (){
    document.querySelector(".cart").style.right = "-100%";
})