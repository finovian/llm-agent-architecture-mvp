# LLM Agent Architecture MVP
This project is a hands-on implementation of a tool-using AI agent built from scratch using Node.js and TypeScript.

The goal of this project is to understand how modern AI agents work internally, without relying heavily on frameworks like LangChain.

---

## 🧠 What This Project Demonstrates

- LLM tool/function calling
- Agent execution loop (think → act → observe)
- Tool registry and execution layer
- Multi-step interaction between LLM and external APIs
- Basic agent architecture design

---

## ⚙️ How It Works

The agent follows a simple loop:

User Input  
↓  
LLM decides whether a tool is needed  
↓  
Tool is executed via backend function  
↓  
Result is passed back to LLM  
↓  
Final response is generated  

---

## 🧩 Features

- Tool-based architecture
- Multiple API integrations:
  - Country information
  - Crypto prices
  - Weather data
  - Geolocation (city → coordinates)
- Dynamic tool selection via LLM
- Iterative execution loop

---

## 🛠 Tech Stack

- Node.js (Express)
- TypeScript
- LLM API (OpenAI-compatible)
- External APIs (REST)

---

## 📌 Example Queries

- "What is the price of Bitcoin in USD?"
- "Get weather data for a city"
- "Tell me about a country"
- "Convert city to coordinates and fetch weather"

---


## 🧠 Key Takeaways

This project helps understand:
- How LLMs interact with tools
- How agent loops are implemented
- Why orchestration frameworks exist

---

## 🚀 Future Improvements (Optional)

- Add validation layer
- Introduce structured logging
- Implement memory (DB)
- Add workflow control (LangGraph-style)
- Improve tool schemas

---

## 📄 License

MIT
