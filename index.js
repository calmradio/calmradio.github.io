const firebaseConfig = {
  apiKey: "AIzaSyCyTeJ8Jrynxer1qYJ16BVwGcXkhq5ZEVs",
  authDomain: "calm-radio-bfa8b.firebaseapp.com",
  databaseURL: "https://calm-radio-bfa8b-default-rtdb.firebaseio.com",
  projectId: "calm-radio-bfa8b",
  storageBucket: "calm-radio-bfa8b.appspot.com",
  messagingSenderId: "444493245960",
  appId: "1:444493245960:web:79eb5be40b1e6d5cd0ebbd",
  measurementId: "G-3E2KRL3VBC"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const MAX_MESSAGES_DISPLAYED = 25;
const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;

const username = prompt("Please Tell Us Your Name");

document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
  e.preventDefault();

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  messageInput.value = "";

  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messagesContainer = document.getElementById("messages");

  const messages = snapshot.val();
  const message = `<li class=${username === messages.username ? "sent" : "receive"} data-key="${snapshot.key}"><span>${messages.username}: </span>${messages.message}</li>`;
  messagesContainer.innerHTML += message;

  const messageElements = messagesContainer.children;
  if (messageElements.length > MAX_MESSAGES_DISPLAYED) {
    const messagesToRemove = messageElements.length - MAX_MESSAGES_DISPLAYED;

    for (let i = 0; i < messagesToRemove; i++) {
      const oldestMessageElement = messageElements[i];
      const oldestMessageKey = oldestMessageElement.getAttribute("data-key");

      if (oldestMessageKey) {
        oldestMessageElement.remove();
        db.ref("messages/" + oldestMessageKey).remove();
      }
    }
  }

  // Check if the last message is older than 6 hours, and clear the chat if necessary
  const lastMessageTimestamp = messageElements.length > 0 ? parseInt(messageElements[messageElements.length - 1].getAttribute("data-key")) : 0;
  const currentTime = Date.now();

  if (currentTime - lastMessageTimestamp > SIX_HOURS_IN_MS) {
    messagesContainer.innerHTML = "";
    db.ref("messages/").remove();
  }

  messagesContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
});

fetchChat.on("child_removed", function (snapshot) {
  const deletedMessageKey = snapshot.key;
  const messageElement = document.querySelector(`[data-key="${deletedMessageKey}"]`);
  if (messageElement) {
    messageElement.remove();
  }
});
