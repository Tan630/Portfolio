document.addEventListener("DOMContentLoaded", () =>{
    let msgForm = document.getElementById("contact-msgform"); 
    let msgFormHeader = document.getElementById("contact-header");
    let msgFormContent = document.getElementById("contact-content");
    let msgFormEmail = document.getElementById("contact-email");
    let msgFormSubmitBtn = document.getElementById("contact-submit");
    
    msgFormSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let senderEmail = msgFormEmail.value;
        let senderContent = msgFormContent.value;
        submitContactForm(msgFormEmail.value, msgFormContent.value
                        , msgFormHeader, msgFormContent
                        , msgFormEmail, msgFormSubmitBtn);
    });
});


function submitContactForm (username, content
                          , msgFormHeader, msgFormContent
                          , msgFormEmail, msgFormSubmitBtn) {
    let rr = new XMLHttpRequest();
    rr.open("POST", "services/submit.php");
    rr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    rr.addEventListener("loadend", (e) => {
        if (e.target.status == 200) {
            msgFormHeader.innerHTML = "Message accepted. Thank you!";
            [msgFormEmail, msgFormContent, msgFormSubmitBtn].forEach((elem) =>
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
    
    rr.send("cemail=" + encodeURIComponent(username) 
    + "&ccontent=" + encodeURIComponent(username));
    
}
//Send the proper header information along with the request

