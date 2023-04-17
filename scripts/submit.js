function printResultListener(e) {
  alert (e.target.responseText);
}
document.addEventListener("DOMContentLoaded", () =>{
  msgForm = document.getElementById("contact-msgform"); 
  msgFormHeader = document.getElementById("contact-header");
  msgFormContent = document.getElementById("contact-content");
  msgFormEmail = document.getElementById("contact-email");
  msgFormSubmitBtn = document.getElementById("contact-submit");

  msgFormSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let senderEmail = msgFormEmail.value;
    let senderContent = msgFormContent.value;
    alert (senderEmail);
    submitContactForm(msgFormEmail.value, msgFormContent.value);
  });
});


function submitContactForm (username, content) {
  rr = new XMLHttpRequest();
  rr.open("POST", "services/submit.php");
  rr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  rr.addEventListener("loadend", (e) => {
    if (e.target.status == 200) {
      msgFormHeader.innerHTML = "Message accepted. Thank you!";
      [msgFormEmail, msgFormContent, msgFormSubmitBtn, msgFormSubmitBtn].forEach((elem) =>
        elem.style.setProperty("visibility", "hidden")
      );
    } else {
      alert ("Sorry, something went wrong.");
    }
  });
  
  // rr.onreadystatechange = function() {//Call a function when the state changes.
  //     if(req.readyState == 4 && req.status == 200) {
  //         alert(req.responseText);
  //     }
  // }
  
  rr.send("cemail=" + username 
  + "&ccontent=" + content);
  
}
//Send the proper header information along with the request

