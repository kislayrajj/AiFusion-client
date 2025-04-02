import mistralAiLogo from "../../assets/logos/mistral-color.png"
import gemmaAiLogo from "../../assets/logos/gemini-color.png"
import metaAiLogo from "../../assets/logos/meta-ai-logo.png"
import fastGptAiLogo from "../../assets/logos/fast-gpt-ai.png"
import EleutherAINeo from "../../assets/logos/eleutherai-logo-neo.png"
const bots = [
  {
    name: "Mistral Chat",
    title: "Mistral AI",
    icon: "fa-solid fa-brain",
    route: "/ai-bots/mistral",
    provider: "Mistral AI",
    description: "A smart and efficient AI model for conversations and tasks.",
    api_url: "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
    logo: mistralAiLogo
  },
  {
    name: "Meta AI Chat",
    title: "LLaMA 2",
    icon: "fa-solid fa-hippo",
    route: "/ai-bots/llama",
    provider: "Meta AI",
    description: "An AI chatbot by Meta, designed for engaging and informative conversations.",
    api_url: "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
    logo: metaAiLogo
  },
  {
    name: "Google AI Chat",
    title: "Gemma AI",
    icon: "fa-solid fa-comments",
    route: "/ai-bots/gemma",
    provider: "Google DeepMind",
    description: "A conversational AI model by Google for smart and helpful responses.",
    api_url: "https://api-inference.huggingface.co/models/google/gemma-2b",
    logo: gemmaAiLogo
  },
  {
    name: "Fast GPT Chat",
    title: "GPT-2",
    icon: "fa-solid fa-comments",
    route: "/ai-bots/distilgpt2",
    provider: "OpenAI (Distilled Version)",
    description: "A lightweight AI chatbot for quick and simple conversations.",
    api_url: "https://api-inference.huggingface.co/models/distilgpt2",
    logo: fastGptAiLogo
  },
  {
    name: "Neo Chatbot",
    title: "GPT-Neo",
    icon: "fa-solid fa-users",
    route: "/ai-bots/gpt-neo",
    provider: "EleutherAI",
    description: "An open-source AI chatbot for general conversations and text generation.",
    api_url: "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B",
    logo: EleutherAINeo
  }
];

export default bots;
