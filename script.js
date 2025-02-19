const socket = io();

// Sign-up function
function signup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(res => res.json()).then(data => alert(data.message));
}

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    }).then(res => res.json()).then(data => {
        if (data.message === "Login successful") {
            document.getElementById("auth").style.display = "none";
            document.getElementById("chat").style.display = "block";
        } else {
            alert(data.message);
        }
    });
}

// Send chat message
function sendMessage() {
    const message = document.getElementById("messageInput").value;
    socket.emit("message", message);
}

// Receive chat message
socket.on("message", (message) => {
    const messages = document.getElementById("messages");
    messages.innerHTML += `<p>${message}</p>`;
});
