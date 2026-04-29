// NihoNova v10 – logique simple + mode dialogue

document.addEventListener('DOMContentLoaded', () => {
  initDialogue();
});

function initDialogue() {
  const form = document.getElementById('dialogue-form');
  const input = document.getElementById('dialogue-input');
  const messages = document.getElementById('dialogue-messages');

  if (!form || !input || !messages) return;

  // Message d’accueil
  addBotMessage(messages,
    "Salut ! Je suis ton partenaire de dialogue NihoNova 🌸\n" +
    "Écris une phrase en français ou en japonais, et je te réponds."
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(messages, text);
    input.value = '';

    setTimeout(() => {
      const reply = generateReply(text);
      addBotMessage(messages, reply);
      scrollToBottom(messages);
    }, 500);

    scrollToBottom(messages);
  });
}

function addUserMessage(container, text) {
  const row = document.createElement('div');
  row.className = 'bubble-row bubble-row--user';

  const bubble = document.createElement('div');
  bubble.className = 'bubble bubble--user';
  bubble.textContent = text;

  row.appendChild(bubble);
  container.appendChild(row);
}

function addBotMessage(container, text) {
  const row = document.createElement('div');
  row.className = 'bubble-row bubble-row--bot';

  const avatar = document.createElement('div');
  avatar.className = 'bubble-avatar';
  avatar.textContent = 'に';

  const bubble = document.createElement('div');
  bubble.className = 'bubble bubble--bot';
  bubble.textContent = text;

  row.appendChild(avatar);
  row.appendChild(bubble);
  container.appendChild(row);
}

function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

// Réponses très simples, juste pour le feeling
function generateReply(userText) {
  const t = userText.toLowerCase();

  if (t.includes('bonjour') || t.includes('salut')) {
    return "こんにちは！😊\nOn peut commencer par une salutation simple :\n« こんにちは » = Bonjour.";
  }

  if (t.includes('merci')) {
    return "Super !\n« ありがとう » (arigatō) = merci.\nTu peux répondre : « どういたしまして » (dōitashimashite) = de rien.";
  }

  if (t.includes('hiragana') || t.includes('あ') || t.includes('a ')) {
    return "Pour les hiragana de base :\nあ (a) · い (i) · う (u) · え (e) · お (o)\nTu veux qu’on les révise un par un ?";
  }

  if (t.includes('voyage') || t.includes('train') || t.includes('gare')) {
    return "Pour le voyage :\n駅 (eki) = gare\n電車 (densha) = train\n切符 (kippu) = billet.\nEssaie de faire une phrase avec un de ces mots.";
  }

  if (t.match(/[ぁ-んァ-ン一-龯]/)) {
    return "Joli, tu utilises déjà du japonais ! 🇯🇵\nOn peut améliorer ta phrase petit à petit.\nPour l’instant, continue à écrire comme ça.";
  }

  return "Bonne phrase 👍\nOn peut la transformer en japonais petit à petit.\nEssaie de me dire quelque chose que tu ferais au Japon (manger, visiter, etc.).";
}
