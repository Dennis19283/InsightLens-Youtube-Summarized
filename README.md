
# 🧠 InsightLens: AI-Powered YouTube Video Summarizer

**InsightLens** is a modern web application that leverages the power of the Google Gemini API to deconstruct complex topics from YouTube videos into simple, digestible concepts. It goes beyond surface-level summaries by using the Feynman Technique and First-Principles Thinking to provide deep insights.

## ✨ Core Features

-   **AI-Powered Analysis**: Utilizes the `gemini-2.5-flash` model to generate high-quality, structured summaries from a YouTube video link.
-   **Feynman Technique Explanation**: Breaks down the core concept of the video into simple terms that a beginner can easily understand.
-   **First-Principles Thinking**: Identifies and explains the most fundamental truths or elements discussed in the video.
-   **Key Takeaways & Analogies**: Extracts a bulleted list of key points and simple analogies to aid comprehension and retention.
-   **Modern & Responsive UI**: Built with React and Tailwind CSS for a clean, intuitive, and accessible user experience on any device.
-   **Copy-to-Clipboard**: Easily copy individual sections of the summary to share or take notes.
-   **Robust Error Handling**: Provides clear feedback to the user if the API call fails or the input is invalid.

## 🛠️ How It Works

The application operates on a simple yet powerful premise. Since the AI model cannot directly access external URLs like YouTube, we use a clever prompting strategy:

1.  **User Input**: The user provides a YouTube video URL.
2.  **Prompt Engineering**: The URL is sent to the Gemini API within a carefully crafted prompt. The prompt instructs the AI to act as an expert analyst and **infer the likely content** of the video based on a typical video found at such a URL.
3.  **Structured JSON Output**: The AI is instructed to return its analysis in a strict JSON format, defined by a `responseSchema`. This ensures the data is consistent and easy to parse on the frontend.
4.  **Frontend Rendering**: The React frontend receives the structured JSON from the API.
5.  **Dynamic Display**: The application then dynamically renders the summary in distinct, beautifully formatted cards for each section: Core Concept, First Principles, Key Takeaways, and Analogies.

## 🚀 Tech Stack

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
-   **AI Model**: [Google Gemini API (`gemini-2.5-flash`)](https://ai.google.dev/)
-   **Module Loading**: ES Modules with `esm.sh` for dependency management directly in the browser.

## 📦 Getting Started

To run this project locally, follow these steps:

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/insightlens.git
cd insightlens
```

**2. Set up your Environment Variables:**

This project requires a Google Gemini API key.

-   Create a file named `.env` in the root of the project.
-   Add your API key to this file:

```
API_KEY=your_google_gemini_api_key
```
*Note: The application is configured to read this key via `process.env.API_KEY`. You will need a build tool like Vite or Create React App that supports environment variables to run this locally.*

**3. Install Dependencies & Run:**

Assuming you have a local development server that can handle React, TypeScript, and environment variables (e.g., Vite):

```bash
# Install dependencies (if you have a package.json)
npm install

# Start the development server
npm run dev
```
If you are running this as a static site, you will need to replace `process.env.API_KEY` in `services/geminiService.ts` with your actual key for testing, but **do not commit this to version control.**

## 📂 Project Structure

```
/
├── components/
│   ├── ErrorDisplay.tsx   # Renders API/user errors
│   ├── Header.tsx         # The main page header
│   ├── ScriptDisplay.tsx  # Displays the generated summary
│   └── Spinner.tsx        # Loading indicator
├── services/
│   └── geminiService.ts   # Logic for interacting with the Gemini API
├── App.tsx                # Main application component
├── index.html             # HTML entry point
├── index.tsx              # React root renderer
├── metadata.json          # App metadata
├── README.md              # This file
└── types.ts               # TypeScript type definitions
```

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

