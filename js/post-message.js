async function postMessage(text) {
  const response = await fetch("https://oim.zhili.dev/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Token": "natalienatalie"   // <- your first name, twice
    },
    body: JSON.stringify({ message: text })
  });
  console.log(await response.json());
}
postMessage("Hello from Natalie!");

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('messageForm');
  const status = document.getElementById('status');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.getElementById('messageInput').value.trim();
    if (!message) {
      status.textContent = 'Please enter a message.';
      return;
    }

    status.textContent = 'Sending message...';
    try {
      await postMessage(message);
      status.textContent = 'Message sent. Check the console for the response.';
    } catch (error) {
      status.textContent = 'Failed to send message. See console for details.';
      console.error(error);
    }
  });
});