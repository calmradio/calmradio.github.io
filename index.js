// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const username = prompt("Enter Username");

// Submit form
// Listen for the submit event on the form and call the sendMessage function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Send message to the database
function sendMessage(e) {
  e.preventDefault();

  // Get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // Clear the input box
  messageInput.value = "";

  // Create a database collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });

  // Display the message immediately
  displayMessage(username, message);

  // Auto-scroll to bottom
  scrollToBottom();
}

// Function to display the message
function displayMessage(username, message) {
  const messagesList = document.getElementById("messages");
  const messageElement = document.createElement('li');
  messageElement.classList.add(username === username ? 'sent' : 'receive');
  messageElement.innerHTML = `<span>${username}: </span>${message}`;
  messagesList.appendChild(messageElement);
}

// Function to scroll to the bottom of the chat
function scrollToBottom() {
  const messagesList = document.getElementById("messages");
  messagesList.scrollTop = messagesList.scrollHeight;
}

// Display the messages
// Reference the collection created earlier
const fetchChat = db.ref("messages/");

// Check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  displayMessage(messages.username, messages.message);
  scrollToBottom();
});
