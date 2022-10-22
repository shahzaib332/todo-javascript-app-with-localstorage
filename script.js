const id = (x) => {
    return document.getElementById(x);
}
let input = id('input');
let addBtn = id('add_btn');
let listContainer = id('item_list_container');
let itemList = localStorage.itemList ? JSON.parse(localStorage.itemList) : [];


const renderList = () => {
    // if(input.value.trim() !=0){
    listContainer.innerHTML = ``;
    for (let i = itemList.length - 1; i > 0; i--) {
        listContainer.innerHTML += `
        
            <div class="todolist appear">
                <div class="itemname  ">
                    ${itemList[i]}
                </div>
                <div class="item-actions">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
                    <button onclick="editItem(${i})"><i class="fa fa-pencil"aria-hidden="true"></i></button>
                    <button class="delete"onclick="deleteItem(${i})">X</button>
                </div>
            </div>
        `;
        document.getElementById("count").innerHTML=listContainer.childElementCount;
    }
}
// editBtn.addEventListener('click',()=>{
//     input.value=li.innerText;

// })
// const addEvent=()=>{
//     let value=input.value;
//     if(value.length >0){
//         itemList.push(value);
//     }else{
//         alert("eneter something")
//     }
//     console.log(itemList)

// }
// delete  item from list
// task.addEventListener('click',(e)=>{
//     if(e.target.classList.contains('fa-trash-o')){
//         e.target.parentElement.parentElement.remove();
//         newItem.classList.add('todolist');
        
    
        
//     }

// })

const addEvent = () => {
    let value = input.value;
    if (value.length > 0) {
        itemList.push(value);
        input.value = "";
    } else {
        alert("Please specify a name for your task");
    }
    localStorage.itemList = JSON.stringify(itemList);
    document.getElementById("count").innerHTML=listContainer.childElementCount;
    renderList();
}

const deleteItem = (index)=>{
    let item = itemList[index];
    if(item != undefined){
        itemList.splice(index, 1);
        localStorage.itemList = JSON.stringify(itemList);
        document.getElementById("count").innerHTML=listContainer.childElementCount;
        renderList();
    }else{
        alert("Item has already been deleted.");
    }
}

const editItem = (index)=>{
    let item = itemList[index];
    if(item != undefined){
        let ask = prompt(`Change "${item}" to : `);
        if(ask.length > 0){
            itemList[index] = ask;
            localStorage.itemList = JSON.stringify(itemList);
            renderList();
        }
    }else{
        alert("Item not available in list.");
    }
}

addBtn.addEventListener("click", (e) => {

    e.preventDefault();
    addEvent();
})

renderList();