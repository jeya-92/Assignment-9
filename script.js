const nameInput = document.getElementById("name")
const phoneInput = document.getElementById("phone")
const form = document.getElementById("form-input")
const output = document.getElementById("output-control")

 const API = "https://6890f531944bf437b597e153.mockapi.io/PhoneBook"


 async function uploaddata(){
    const response =await fetch(API)
    const data=await response.json()

    output.innerHTML=''
    data.forEach((mobiledata)=>{
        const newdata=document.createElement("div")
        newdata.setAttribute("class", "row p-3 d-flex align-items-center")
        newdata.innerHTML= `<h4 class="col-5">${mobiledata.name}</h4>
                           <h4 class="col-5">${mobiledata.phone}</h4>
                           <h4 class ="col-2"  onclick="del(${mobiledata.id})"><i class="bi bi-x justify-content-center"></i></h4>`
        output.appendChild(newdata)
    })
 }

 form.addEventListener("submit", async(event)=>{
    event.preventDefault()
    const newcontact={
        name:nameInput.value,
        phone:phoneInput.value,
    }
    await fetch(API,{
        method:'POST',
        headers:{'Content-Type' : 'Application/JSON'},
        body:JSON.stringify(newcontact)
    })
    nameInput.value=''
    phoneInput.value=''
    uploaddata()
 })

 async function del(id){
    await fetch(`${API}/${id}`,{
        method:'DELETE'
    })
    uploaddata()
 }
 uploaddata()
