const id = (x) => {
    return document.getElementById(x);
}
let input = id('input');
let addBtn = id('add_btn');
let listContainer = id('item_list_container');
let itemList = localStorage.itemList ? JSON.parse(localStorage.itemList) : [];
let editId,
  isEditTask = false;
  



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
    let value = input.value.trim() ;
    if (value.length > 0) {
        itemList.push(value);
        input.value = "";
        // if (!isEditTask) {
        //     itemList = !itemList ? [] : itemList;
        //     let taskInfo = { name: value };
        //     itemList.push(taskInfo);
        //   } else {
        //     isEditTask = false;
        //     itemList[editId].name = value;
        //   }
        
    }
    
    else {
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

// const editItem = (index)=>{
//     let item = itemList[index];
//     input.value=item;
//     if(item != undefined){
//         let ask=`${item}`
//         if(ask.length > 0){
//             itemList[index] = ask;
//             localStorage.itemList = JSON.stringify(itemList);
//             renderList();
//         }
//     }else{
//         alert("Item not available in list.");
//     }
// }
function editItem(index) {
    //to save edit item we insert input hidden in html and now we get here
    let saveindex =document.getElementById('saveindex');

    let addbtn =document.getElementById('add_btn');
    let savebtn =document.getElementById('save_btn');
    let webtask=localStorage.getItem("itemList");
    let taskObj=JSON.parse(webtask);
    saveindex.value=index;

  
    input.value = taskObj[index];
    addbtn.style.display="none";
    savebtn.style.display="block";

 
 
  }
  // for save buton
  let savebtn =document.getElementById('save_btn');
  let addbtn =document.getElementById('add_btn');
  savebtn.addEventListener("click",function(){
    // get items from local storage
    let webtask=localStorage.getItem("itemList");
    let taskObj=JSON.parse(webtask);


    addbtn.style.display="block";
    savebtn.style.display="none";
    
    let saveindex =document.getElementById('saveindex').value;
    itemList[saveindex]=input.value;
    localStorage.itemList = JSON.stringify(itemList);
    renderList();
    input.value=""
    console.log(itemList)

  })


addBtn.addEventListener("click", (e) => {

   
    addEvent();
    renderList();
  
})
renderList();

