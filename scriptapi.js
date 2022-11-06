let saveBtn=document.querySelector('.save_btn');

const id = (x) => {
    return document.getElementById(x);
}
let input = id('input');
let addBtn = id('add_btn');
let listContainer = id('item_list_container');
// let itemList = localStorage.itemList ? JSON.parse(localStorage.itemList) : [];
let itemList=[];



const renderList = (itemList) => {
    // if(input.value.trim() !=0){
    listContainer.innerHTML = ``;
    for (let i =0;i<itemList.length;i++) {
        listContainer.innerHTML += `
        
            <div class="todolist appear" data-id=${itemList[i].id} >
           
                <div class="itemname">${itemList[i].title}</div>
                <div class="item-actions">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
                    <button ><i class="fa fa-pencil"aria-hidden="true" id="edit-btn" ></i></button>
                    <button class="delete"id="delete-btn" onclick="deleteItem(${i})">X</button>
                    
                </div>
            </div>
        `;
        document.getElementById("count").innerHTML=listContainer.childElementCount;
      
    }
   
}


/// FETHC API
// api fetch
fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((json) => {
    itemList=json;
    renderList(itemList);

    
    
  
});


/// FETCH API ENDS HERE


console.log(itemList)

const addEvent = (value) => {
     value = input.value.trim() ;
   
    
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({

            id:itemList.length +1,
          title: value,
          completed: true,
          
          
         
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
            itemList.push(json)
            renderList(itemList)

        });
        // .then((json) => console.log(json));
       
    input.value = "";
   
   


    document.getElementById("count").innerHTML=listContainer.childElementCount;
    console.log(itemList)
 
}


function deleteItem(index){
   
   
    
    let item = itemList[index];
    if(item != undefined){
       
        
        itemList.splice(index, 1);
       
        fetch(`https://jsonplaceholder.typicode.com/todos/${item.id}`,{
            method:"DELETE",
        })
    }else{
        alert("Item has already been deleted.");
    
    }
   
        renderList(itemList);
            document.getElementById("count").innerHTML=listContainer.childElementCount;
        console.log(item)
       
}







// 
  // for save buton
//   let savebtn =document.getElementById('save_btn');
//   let addbtn =document.getElementById('add_btn');
//   savebtn.addEventListener("click",function(){
//     // get items from local storage
//     let webtask=localStorage.getItem("itemList");
//     let taskObj=JSON.parse(webtask);


//     addbtn.style.display="block";
//     savebtn.style.display="none";
    
//     let saveindex =document.getElementById('saveindex').value;
//     itemList[saveindex]=input.value;
//     localStorage.itemList = JSON.stringify(itemList);
//     renderList();
//     input.value=""
//     console.log(itemList)

//   })


listContainer.addEventListener('click',(e)=>{
    // console.log(e.target.id)
    e.preventDefault();
    let delButtonIsPressed=e.target.id=='delete-btn'
    let editButtonIsPressed=e.target.id=='edit-btn'  ;


    let id1=e.target.parentElement.parentElement.dataset.id;

    if(editButtonIsPressed){
        let parent=e.target.parentElement.parentElement.parentElement;
        let titleContent=parent.querySelector('.itemname').textContent;
        console.log(titleContent);

        input.value=titleContent;
        addBtn.style.display='none';
        saveBtn.style.display='block';
        
    }
  


    saveBtn.addEventListener('click',()=>{

        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({
    title: input.value,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
   
  })
    
  addBtn.style.display='block';
  saveBtn.style.display='none';
  });
 
    
})








addBtn.addEventListener("click", (e) => {

    e.preventDefault();
    addEvent();
   
  
})
renderList(itemList);



