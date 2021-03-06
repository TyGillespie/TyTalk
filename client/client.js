"use strict";

const name = window.prompt("Enter your name.");
const connection = new WebSocket('ws://localhost:8080');
const button = document.querySelector('#send');

connection.onopen = (event) => {
  const data = "<p>" + name + " has connected.</p>";
  connection.send(data);
};

connection.onclose = (event) => {
  const data = "<p>" + name + " has disconnected.</p>";
  connection.send(data);
};

connection.onerror = (event) => {
  console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  const chat = document.querySelector('#chat');
  chat.innerHTML += event.data;
};

button.addEventListener("click", () => {
  const message = document.querySelector('#message');
  const data = "<p>" + name + ": " + message.value + "</p>";
  connection.send(data);
  message.value = '';
});
