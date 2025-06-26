# 🥫 PantryPal

A modern, AI-powered meal planning and grocery assistant built with Next.js, Genkit, MySQL, and more.

---

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set up your environment**
   - Create a `.env.local` file with your API keys:
     ```env
     GEMINI_API_KEY=your_gemini_api_key
     ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:9002](http://localhost:9002).

---

## ✨ Features

- **AI Recipe Generation:** Generate creative recipes using Genkit AI.
- **Meal Prep Planner:** Add dishes to your meal plan and automatically generate a comprehensive grocery list using AI.
- **Interactive Grocery List:** Add, remove, and manage grocery items, all stored in a MySQL database.
- **Grocery Mapping:** Visualize and manage your grocery list with map integration.
- **Modern UI:** Built with Radix UI, Tailwind CSS, and custom components for a beautiful experience.
- **Cloud Ready:** Firebase and MySQL integration for real-time and persistent data.

---

## 📂 Project Structure

```
/ (root)
├── src/
│   ├── ai/           # AI flows and Genkit integration
│   ├── app/          # Next.js app directory
│   ├── components/   # UI and feature components
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utility functions and database
├── public/           # Static assets
├── package.json      # Project metadata and scripts
└── ...
```

---

## 🛠️ Useful Scripts

| Command             | Description                       |
|---------------------|-----------------------------------|
| `npm run dev`       | Start development server          |
| `npm run build`     | Build for production              |
| `npm run start`     | Start production server           |
| `npm run lint`      | Lint codebase                     |
| `npm run typecheck` | Type-check TypeScript             |

---

## 📖 Learn More

- Main entry: [`src/app/page.tsx`](src/app/page.tsx)
- [Next.js Documentation](https://nextjs.org/docs)
- [Genkit Documentation](https://genkit.dev/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 💡 Contributing

Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

MIT
