# 🤖 FinBot - AI-Powered Financial Assistant

A sophisticated Next.js application featuring an intelligent financial chatbot with advanced chat management, authentication, and modern UI design.

## ✨ Features

### 🔐 Authentication System
- **Secure Login/Signup** with real-time validation
- **Protected Routes** for chatbot access
- **Session Management** with localStorage persistence
- **Admin Demo Account**: `admin@gmail.com` / `Admin@123`

### 🤖 AI-Powered Chatbot
- **Google Gemini Integration** for intelligent financial advice
- **Real-time Responses** with typing indicators
- **Financial Expertise** in budgeting, investments, and planning
- **Context-Aware Conversations** with chat history

### 💬 Advanced Chat Management
- **Terminal-Style Commands** for power users
- **Persistent Chat Storage** per user account
- **Auto-Save Functionality** with 2-second delay
- **Chat Organization** with custom naming

#### Available Commands:
```bash
/help           # Show all available commands
/nc             # Start a new chat
/save "name"    # Save current chat with custom name
/load "name"    # Load a previously saved chat
/list           # List all saved chats
/delete "name"  # Delete a saved chat
/clear          # Clear current chat
```

### 🎨 Modern UI/UX
- **Glass Morphism Design** with backdrop blur effects
- **Dark/Light Theme Support** with system detection
- **Responsive Layout** optimized for all devices
- **Command Menu (⌘K)** for quick navigation
- **Auto-Growing Text Input** with smooth animations
- **Portfolio-Style Landing Page** with hero sections

### 🧭 Navigation Features
- **Command Palette** with keyboard shortcuts
- **Saved Chat History** in command menu
- **Theme Switching** (Light/Dark/System)
- **Authentication-Aware Navigation**
- **Screen Border Lines** for visual depth

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Google Gemini API key (or OpenAI API key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GodXSpell/FinBot_Vanilla.git
   cd finbot_chatbot_vanilla/finbot_nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini API Key (recommended)
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
   
   # Alternative: OpenAI API Key
   # NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Setup

### Google Gemini (Recommended)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` as `NEXT_PUBLIC_GEMINI_API_KEY`

### OpenAI (Alternative)
1. Go to [OpenAI API](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env.local` as `NEXT_PUBLIC_OPENAI_API_KEY`

## 🏗️ Project Structure

```
finbot_nextjs/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── chatbot/         # Protected chatbot page
│   │   ├── login/           # Authentication pages
│   │   └── signup/
│   ├── auth/                # Authentication system
│   │   ├── components/      # Login/signup forms
│   │   ├── hooks/           # useAuth hook
│   │   └── lib/             # Auth utilities
│   ├── components/
│   │   ├── layout/          # Navigation components
│   │   ├── sections/        # Landing page sections
│   │   └── ui/              # Reusable UI components
│   └── lib/                 # Utilities and configurations
├── .env.local              # Environment variables
└── README.md
```

## 🎯 Usage Guide

### Demo Account
- **Email**: `admin@gmail.com`
- **Password**: `Admin@123`

### Chat Commands
1. **Start chatting** with financial questions
2. **Use commands** like `/save "Investment Planning"`
3. **Navigate easily** with ⌘K command menu
4. **Switch themes** via command menu or settings

### Features Walkthrough
1. **Landing Page** - Modern design with hero section
2. **Authentication** - Secure login with validation
3. **Chatbot Interface** - Clean, distraction-free chat
4. **Command System** - Terminal-style chat management
5. **Chat History** - Persistent storage and quick access

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with OKLCH colors
- **AI Integration**: Google Gemini / OpenAI APIs
- **Authentication**: Custom auth with JWT-style tokens
- **State Management**: React hooks and localStorage
- **UI Components**: Custom components with shadcn/ui
- **Theme System**: next-themes with system detection
- **Icons**: Lucide React

## 🔧 Configuration

### Theme Customization
Modify `src/app/globals.css` to customize colors and styling.

### AI Model Configuration
The app automatically detects your API key type and uses the appropriate model:
- **Gemini**: `gemini-2.0-flash`
- **OpenAI**: `gpt-3.5-turbo`

## 📱 Responsive Design

- **Mobile-First** approach
- **Adaptive Navigation** for different screen sizes
- **Touch-Friendly** interface elements
- **Optimized Performance** on all devices

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Other Platforms
The app can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Docker containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Google** for Gemini AI capabilities
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for component inspiration

---

Built with ❤️ using Next.js and modern web technologies.
