import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Réponses génériques
const genericResponses = {
  greeting: [
    "Bonjour! Comment puis-je vous aider aujourd'hui?",
    "Salut! Je suis là pour répondre à vos questions.",
    "Bonjour! En quoi puis-je vous être utile?"
  ],
  default: [
    "Je comprends. Pouvez-vous me donner plus de détails?",
    "Intéressant. Que souhaitez-vous savoir de plus?",
    "Je peux vous aider avec ça. Que voulez-vous savoir exactement?"
  ],
  farewell: [
    "Au revoir! N'hésitez pas si vous avez d'autres questions.",
    "Merci de votre visite! Passez une excellente journée!",
    "Au revoir! J'espère avoir pu vous aider."
  ]
};

const isGreeting = (message: string): boolean => {
  const greetings = ['bonjour', 'salut', 'hello', 'hi', 'hey'];
  return greetings.some(greeting => message.toLowerCase().includes(greeting));
};

const isFarewell = (message: string): boolean => {
  const farewells = ['au revoir', 'bye', 'adieu', 'ciao'];
  return farewells.some(farewell => message.toLowerCase().includes(farewell));
};

export const getChatResponse = async (message: string): Promise<string> => {
  // Pour les salutations et au revoir, utiliser les réponses génériques
  if (isGreeting(message)) {
    const responses = genericResponses.greeting;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  if (isFarewell(message)) {
    const responses = genericResponses.farewell;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Pour tous les autres messages, utiliser l'IA
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Tu es un assistant virtuel professionnel et amical. Réponds de manière concise et pertinente."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || genericResponses.default[0];
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    const responses = genericResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  }
};