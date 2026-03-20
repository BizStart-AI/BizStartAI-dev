# BizStartAI: Your AI-Powered Business Paddy.

BizStartAI is a premium, AI-driven platform designed to empower aspiring entrepreneurs and business owners. It acts as a comprehensive "Business Paddy," providing expert mentorship, detailed market insights, and a structured journey from initial idea to a full-fledged business plan. By leveraging advanced generative AI (Google Gemini), BizStartAI simplifies the complexities of starting a business, making professional guidance accessible to everyone.

## 1. Project Overview
BizStartAI is a personalized roadmap for entrepreneurs. It allows users to validate ideas, explore industries, learn through tailored courses, and ultimately generate a professional business plan. The target audience includes first-time founders, small business owners in Africa (specifically targeting the Nigerian market with "Business Paddy" local context), and anyone needing a structured approach to building a company.

## 2. Key Features & Challenges
- **AI Business Mentorship**: A real-time chat interface powered by Google Gemini that provides strategic advice and brainstorming.
- **Dynamic Course Recommendations**: An intelligent system that suggests learning paths based on the user's business idea and stage.
- **Automated Business Plan Generation**: A high-impact feature that synthesizes user inputs into a structured, professional document.

### Technical Challenges Overcome
1.  **Backend-Frontend Synchronization**: Managing complex chat history and user progress across a decoupled React frontend and Node.js backend required careful mapping of API payloads and response structures.
2.  **UI/UX Standardization**: Moving from a collection of hardcoded hex codes and inconsistent emojis to a unified design system using Tailwind CSS 4 and professional React Icons.
3.  **Security Integration**: Securing a multi-provider authentication system (Local + Google OAuth) and ensuring API keys are never leaked to the client.

## 3. Technologies Used
- **Frontend**: React 19, Vite, Tailwind CSS 4, Lucide React, React Icons, React Hot Toast, Axios.
- **Backend**: Node.js, Express.js, Sequelize ORM.
- **Database**: TiDB (MySQL compatible).
- **AI Integration**: Google Generative AI (Gemini 2.5/2.0).
- **Authentication**: JWT (JSON Web Tokens), Google OAuth 2.0.

## 4. Architecture Overview
BizStart AI follows a modern client-server architecture:
- **Client**: A Single Page Application (SPA) built with React 19. It uses a centralized API utility for all communications.
- **Server**: A Node.js/Express REST API structured into Controllers, Models, and Utils. It handles AI orchestration and database interactions.
- **State Management**: Uses React state hooks and `localStorage` for session persistence (e.g., `userAccount` and `token`).

## 5. Technical Decisions
1.  **TiDB (NewSQL)**: Chosen over traditional MySQL for its horizontal scalability, ensuring the platform can grow without downtime while maintaining 100% MySQL compatibility.
2.  **Tailwind CSS 4**: Used for its superior performance and modern utility-first approach, allowing for a premium UI with minimal bundle size.
3.  **Google Gemini 2.5 Flash**: Selected for its speed and reasoning capabilities, balanced with lower latency for high-quality real-time AI mentorship.

## 6. Setup & Installation

### Prerequisites
- Node.js (v18+)
- MySQL or TiDB instance
- Google Cloud Console Project (for AI API and OAuth)

### Steps
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/BizStart-AI/BizStartAI-dev.git
    cd BizStartAI-dev
    ```
2.  **Backend Setup**:
    ```bash
    cd bizstart-backend
    npm install
    # Create .env and fill in: DB_URL, JWT_SECRET, GOOGLE_API_KEY
    npm start
    ```
3.  **Frontend Setup**:
    ```bash
    cd ../bizstart-frontend
    npm install
    # Create .env and fill in: VITE_API_BASE_URL, VITE_GEMINI_API_KEY
    npm run dev
    ```

## 7. Usage
1.  **Sign Up / Login**: Create an account or use Google to sign in.
2.  **Onboarding**: Select your business stage (Idea, Early, Growth).
3.  **AI Lab**: Chat with your "Business Paddy" to refine your ideas.
4.  **Learning**: Follow recommended courses to improve your business knowledge.
5.  **Generate Plan**: Enter your business details and generate a PDF roadmap.

## 8. Folder Structure
```text
├── bizstart-backend
│   ├── src
│   │   ├── controllers    # Request/Response logic
│   │   ├── models         # Sequelize schemas
│   │   ├── routes         # API endpoint definitions
│   │   └── utils          # Shared helpers (AppError, verifyToken)
├── bizstart-frontend
│   ├── src
│   │   ├── api            # Centralized API config & endpoints
│   │   ├── components     # Reusable UI (BottomNav, PrimaryButton)
│   │   ├── pages          # Top-level screen components
│   │   └── utils          # Global helpers (errorHandler)
```

## 9. API Integration
- **Google Gemini API**: Used for AI Mentorship and Industry suggestions.
- **Google OAuth**: Secure authentication via `@react-oauth/google`.
- **Internal REST API**: Custom backend endpoints for user data and plan management.

## 10. Testing
- **API Testing**: Manual verification via Postman/Thunder Client.
- **Linting**: Strict ESLint rules to ensure code quality.
- **Build Verification**: Every release is validated using `npm run build`.

## 11. Performance & Accessibility
- **Performance**: Optimized using Tailwind 4's high-speed JIT compiler and React 19's improved rendering.
- **Accessibility**: ARIA labels on interactive elements and high-contrast brand colors.
- **Experience**: Success/Error toasts provide immediate user feedback on all critical actions.

## 12. License & Support
Distributed under the MIT License. For support, please reach out to the BizStart AI dev team.

---
*Built with ❤️ by the BizStartAI Team.*
