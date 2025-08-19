let translateButton = document.querySelector("#translate-button");
translateButton.addEventListener("click", async() => {
    let inputText = document.querySelector("#inputText");
  //value
  let text = inputText.value.trim();

  //language
  let targetLang = document.querySelector("#targetLang").value;

  if (!text) {
    // manejar el caso en que no hay valor
    return false;
  }
  const userMessage = document.createElement("div");
  userMessage.className = "chat-message chat-message--user";
  userMessage.textContent = text;

  // meter mensaje del usuario a caja de mensajes
  const messagesContainer = document.querySelector(".chat-messages");
  messagesContainer.appendChild(userMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  //peticion al backend
  try {
    const response =await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        targetLang
      })
    });

    const data = await response.json();
    const botMessage = document.createElement("div");
    botMessage.className = "chat-message chat-message--bot";
    botMessage.textContent = data.translation;
    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } catch (e) {
    console.log("Error: ", e);
  }

  //agregar mensaje de ia al chat

  //vaciar input
    inputText.value = "";
});
