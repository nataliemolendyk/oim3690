const STORAGE_KEY = 'ai-chat-history';
const messagesEl = document.getElementById('messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const apiKey = window.OPENAI_API_KEY || '';

let messages = loadMessages();

function loadMessages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn('Could not load chat history:', error);
    return [];
  }
}

function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function renderMessages() {
  if (!messagesEl) return;

  messagesEl.innerHTML = '';

  if (messages.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'message assistant';
    emptyState.innerHTML = '<span class="label">assistant</span>Start a conversation and I will keep every reply here.';
    messagesEl.appendChild(emptyState);
  } else {
    messages.forEach((message) => {
      const bubble = document.createElement('div');
      bubble.className = `message ${message.role}`;
      bubble.innerHTML = `<span class="label">${message.role}</span>${escapeHtml(message.text)}`;
      messagesEl.appendChild(bubble);
    });
  }

  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createReply(text) {
  const prompt = text.toLowerCase().trim();

  if (prompt.includes('hello') || prompt.includes('hi')) {
    return 'Hello! I am your chat assistant. Ask me anything and I will keep the whole conversation visible.';
  }

  if (prompt.includes('name')) {
    return 'I am your chat assistant for this demo page.';
  }

  if (prompt.includes('help')) {
    return 'I can help you with ideas, summaries, or simple questions. Just type something and I will respond.';
  }

  return `You said: “${text}”. I’ll keep this message in the chat history so the newest reply stays at the bottom.`;
}

async function getAssistantReply(text) {
  if (!apiKey) {
    return createReply(text);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages.slice(-12).map((message) => ({
          role: message.role === 'assistant' ? 'assistant' : 'user',
          content: message.text || message.content || ''
        })),
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || createReply(text);
  } catch (error) {
    console.warn('Falling back to local reply:', error);
    return createReply(text);
  }
}

function appendMessage(role, text) {
  messages.push({ role, text });
  saveMessages();
  renderMessages();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';

  const reply = await getAssistantReply(text);
  appendMessage('assistant', reply);
});

renderMessages();
input.focus();
