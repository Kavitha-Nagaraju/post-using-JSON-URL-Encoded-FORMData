import React, { useRef, useState } from 'react'

function SignupForm() {
    let firstNameInputRef  = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef  = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let [selectImage,setSelectImage] = useState("./images/noImage.png");

    let postDataToServer =async()=>{
      
        let dataToSend={
         firstName:firstNameInputRef.current.value,
         lastName :lastNameInputRef.current.value,
         age:ageInputRef.current.value,
         email:emailInputRef.current.value,
         password:passwordInputRef.current.value,
         mobileNo:mobileNoInputRef.current.value,
         profile:profilePicInputRef.current.value,

        }
        
        

        console.log(dataToSend);

        let dataToSendJSON = JSON.stringify(dataToSend);

         console.log(dataToSendJSON);

         let myHeaders = new Headers();
        myHeaders.append("content-type","application/json");

      let reqOptions={
         method:"POST",
         body:dataToSendJSON,
         headers:myHeaders,
      };
     
        let JSONData = await fetch("http://localhost:3345/signup",reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
   

    }  ;


let signupUsingURLEncoding=async()=>{

   let dataToSend=new URLSearchParams();

   dataToSend.append("firstName",firstNameInputRef.current.value);
   dataToSend.append("lastName",lastNameInputRef.current.value);
   dataToSend.append("age",ageInputRef.current.value);
   dataToSend.append("email",emailInputRef.current.value);
   dataToSend.append("password",passwordInputRef.current.value);
   dataToSend.append("mobileNo",mobileNoInputRef.current.value);
   dataToSend.append("profile",profilePicInputRef.current.value);

   let myHeaders = new Headers();
   myHeaders.append("content-type","application/x-www-form-urlencoded");
   
   let reqOptions={
      method:"POST",
      body:dataToSend,
      headers:myHeaders,
   };
  
      let JSONData = await fetch("http://localhost:3345/signup",reqOptions);
      let JSOData = await JSONData.json();
      alert(JSOData.msg);
      console.log(JSOData);
  

};

      
     let signupUsingFormData=async()=>{
      let dataToSend = new FormData();
      dataToSend.append("firstName",firstNameInputRef.current.value);
      dataToSend.append("lastName", lastNameInputRef.current.value);
      dataToSend.append("age",ageInputRef.current.value);
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",passwordInputRef.current.value);
      dataToSend.append("mobileNo",mobileNoInputRef.current.value);
     

      for(let i=0;i<=profilePicInputRef.current.files.length;i++){
         dataToSend.append("profile",profilePicInputRef.current.files[i]);
      }
     
      let reqOptions={
         method:"POST",
         body:dataToSend,
      };
     
         let JSONData = await fetch("http://localhost:3345/signup",reqOptions);
         let JSOData = await JSONData.json();
         alert(JSOData.msg);
         console.log(JSOData);
   
   };

  return (
    <div>
        <form>
         <label>FirstName</label>
         <input ref={firstNameInputRef}></input>
         <label>LastName</label>
         <input ref={lastNameInputRef}></input>
         <label>Age</label>
         <input ref={ageInputRef}></input>
         <label >Email</label>
         <input ref={emailInputRef}></input>
         <label>Password</label>
         <input ref={passwordInputRef}></input>
         <label>MobileNo</label>
         <input ref={mobileNoInputRef}></input>
         <label>ProfilePic</label>
         <input type="file" onChange={(e)=>{
            let selectedImageURL = URL.createObjectURL(e.target.files[0]);
            setSelectImage(selectedImageURL);
         }}  ref={profilePicInputRef}></input>

         <br></br>

         <img src={selectImage}></img>
        <div>

        <button type="button" onClick={()=>{
            postDataToServer();
        }}>SignUp(JSON)</button>

        <button type="button" onClick={()=>{
          signupUsingURLEncoding();
        }}>URL Encoding</button>

        <button type="button" onClick={()=>{
              signupUsingFormData();
        }}>signup(Form Data)</button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
