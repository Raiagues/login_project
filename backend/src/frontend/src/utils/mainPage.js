/* global emailjs */   

export function sendEmail(event) {
  event.preventDefault(); 

  var form = document.getElementById("signup-form");
  var params = {
    from_name: form.name.value,
    email_id: form.email.value,
    message: form.message.value
  };

  emailjs.send("service_ubzp5kb", "template_pez9ddl", params)
    .then(function () {
      showPopup("Sua mensagem foi enviada com sucesso!");
      form.reset(); 
    })
    .catch(function (err) {
      showPopup("Falha ao enviar a mensagem: " + err.text);
    });
}

export function showPopup(message) {
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup").style.display = "flex";
}

export function closePopup() {
  document.getElementById("popup").style.display = "none";
}