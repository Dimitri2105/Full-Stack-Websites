//  USING CRUD 
{/* <script src ="https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.3/axios.min.js"></script> */}

let myForm = document.querySelector('#my-form')
let  nameInput  = document.querySelector('#name')
let emailInput = document.querySelector('#email')
let phoneInput = document.querySelector('#phonenumber')
let itemInput = document.querySelector('#users')

myForm.addEventListener('submit',saveToStorage)


function addItem(obj){

    let user = obj.name
    let emailID = obj.email
    let phoneNumber = obj.phoneNumber

    let li = document.createElement('li');
    li.className='items';
    li.textContent =  li.textContent + obj.name + '    ' + obj.email + '    ' + obj.phoneNumber
    itemInput.append(li)

    let deletebtn = document.createElement('button')
    deletebtn.style.width='50px'
    deletebtn.className = 'btn btn-success'
    deletebtn.appendChild(document.createTextNode('X'))
    li.append(deletebtn)

    deletebtn.onclick = (e) => deleteUser(e,obj.id) 

    let editbtn = document.createElement('button')
    editbtn.appendChild(document.createTextNode('Edit'))
    editbtn.className = 'btn'
    editbtn.style.width='50px'
    li.appendChild(editbtn)

    editbtn.onclick = (e) => updateUser(e,obj,obj._id)
    myForm.reset()
}

function saveToStorage(e)
{
    e.preventDefault()
    let user = nameInput.value
    let emailID = emailInput.value
    let phoneNumber = phoneInput.value

    let obj = {user,emailID,phoneNumber}

    axios
    .post(`http://localhost:3000/add-user`,obj)
    .then( (response) =>{
        // console.log(response.data.newUserDetail);
        addItem(response.data.newUserDetail)
        
    })
    .catch( (error) => {
        document.body.innerHTML =  document.body.innerHTML + "<h3> Something Went Wrong </h3>"
        console.log(error)
    })

}


window.addEventListener("DOMContentLoaded",()=>{

    axios
    .get('http://localhost:3000/get-users')
    .then( (response) => {
      console.log(response)

        for( var i = 0;i<response.data.length;i++){
            addItem(response.data[i])
        }
        

    })
    .catch( (error) => {
        document.body.innerHTML =  document.body.innerHTML + "<h3> Something Went Wrong </h3>"
        console.log(error)
    })
})


function deleteUser(e,obj_id){   
    const deletedItem = e.target.parentElement
    itemInput.removeChild(deletedItem)
    axios.delete(`http://localhost:3000/delete-users/${obj_id}`)
    .then( (response) =>{
        console.log("inside axios delete function")
    })
    .catch( (error) => {
        document.body.innerHTML =  document.body.innerHTML + "<h3> Something Went Wrong </h3>"
        console.log(error)
        
    })
    myForm.reset()

    }


// function updateUser(e, obj, obj_id) {
//   nameInput.value = obj.user;
//   emailInput.value = obj.emailID;
//   phoneInput.value = obj.phoneNumber;

//   itemInput.removeChild(e.target.parentElement)

//   myForm.removeEventListener("submit", saveToStorage); // disable adding new items while updating

//   myForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     let updatedObj = {
//       user: nameInput.value,
//       emailID: emailInput.value,
//       phoneNumber: phoneInput.value,
//     };

//     axios
//       .put(`${CRUDLINK}/${CRUDKEY}/${CRUDRESOURCE}/${obj_id}`,updatedObj)
//       .then((response) => {
//         addItem(updatedObj)
//         myForm.removeEventListener('submit', arguments.callee);
//         myForm.addEventListener('submit',saveToStorage)
//       })
//       .catch((error) => {
//         document.body.innerHTML =
//           document.body.innerHTML + "<h3> Something Went Wrong </h3>";
//         console.log(error);
//       });
//   });
// }
