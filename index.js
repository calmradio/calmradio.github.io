// Your existing Firebase config here
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the database
const db = firebase.database();

// Get user's data
const username = prompt("Please Tell Us Your Name");

// Submit form
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Send message to db
function sendMessage(e) {
  e.preventDefault();

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  messageInput.value = "";

  document.getElementById("messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// Display the messages
const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${username === messages.username ? "sent" : "receive"} data-key="${snapshot.key}"><span>${messages.username}: </span>${messages.message}</li>`;
  document.getElementById("messages").innerHTML += message;
});

fetchChat.on("child_removed", function (snapshot) {
  const deletedMessageKey = snapshot.key;
  const messageElement = document.querySelector(`[data-key="${deletedMessageKey}"]`);
  if (messageElement) {
    messageElement.remove();
  }
});

// Your existing code continues here
// ... (any additional code you have)
