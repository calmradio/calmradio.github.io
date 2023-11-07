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

// Initialize database
const db = firebase.database();

// Get user's data
const username = prompt("Please Tell Us Your Name");

// Submit form
// Listen for submit event on the form and call the sendMessage function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Send message to db
function sendMessage(e) {
  e.preventDefault();

  // Get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // Clear the input box
  messageInput.value = "";

  // Auto-scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // Create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// Display the messages
// Reference the collection created earlier
const fetchChat = db.ref("messages/");

// Check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // Append the message on the page
  document.getElementById("messages").innerHTML += message;
});

// Get a reference to the 'userCount' node in the database
const userCountRef = db.ref('userCount');

// Increment the user count when a user visits the website
userCountRef.transaction((currentCount) => {
  // If the currentCount is null, it means no data exists yet, so set it to 1
  if (currentCount === null) {
    return 1;
  } else {
    // Increment the current count by 1
    return currentCount + 1;
  }
});

// Display the live user count
const userCountElement = document.getElementById('userCount');

// Listen for changes in the user count
userCountRef.on('value', (snapshot) => {
  const userCount = snapshot.val();
  userCountElement.innerText = userCount;
});
