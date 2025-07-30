# Glassmorphic Canvas – Modern SaaS Landing Page

A visually stunning, glassmorphic SaaS landing page built with React, Vite, Tailwind CSS, shadcn/ui, and Framer Motion. Includes advanced UI components, beautiful gradients, and a modern dark/light design system.

---

## ✨ Features

- **Glassmorphic & Gradient UI**: Modern frosted-glass effects, gradients, and soft shadows throughout.
- **Responsive Design**: Fully mobile-friendly and adapts to all screen sizes.
- **Animated Hero & Backgrounds**: Eye-catching hero section and animated mesh backgrounds.
- **Feature Highlights**: Showcase of AI-powered marketing features with icons and motion.
- **Logo Scroller**: Animated, horizontally scrolling brand logos.
- **Testimonials & Pricing**: Modern testimonial carousel and pricing cards.
- **FAQ Section**: Expandable accordion for common questions.
- **Contact Form**:  
  - Opens in a glassmorphic modal when "Contact Support" is clicked in the FAQ.
  - Built with `react-hook-form` for validation.
  - Fields: Name, Email, Message (all required, email validated).
  - Error messages and success feedback.
  - Sends POST request to `/api/contact` (logs data to console).
- **Dark & Light Modes**: Toggleable via class, with custom HSL color system.
- **Reusable UI Components**: Buttons, dialogs, cards, alerts, and more from shadcn/ui.
- **Framer Motion Animations**: Smooth transitions and interactive effects.
- **Radix UI Primitives**: Accessible dialogs, accordions, and more.

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
git clone <your-repo-url>
cd glassmorphic-canvas
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

---

## 🛠️ Tech Stack

- **React 18**
- **Vite** (blazing fast dev/build)
- **TypeScript**
- **Tailwind CSS** (with custom config and design tokens)
- **shadcn/ui** (Radix UI + utility components)
- **Framer Motion** (animations)
- **react-hook-form** (form state/validation)
- **Lucide React** (icons)
- **@radix-ui/react-*:** (dialogs, accordions, etc.)

---

## 📁 Project Structure

```
src/
  components/      # UI and page components
  pages/           # Page components and API routes
  hooks/           # Custom React hooks
  lib/             # Utilities
  index.css        # Tailwind and design tokens
  App.tsx          # Main app entry
  main.tsx         # Vite entry
public/            # Static assets
tailwind.config.ts # Tailwind config
```

---

## 📬 Contact & Support

- Use the **Contact Support** button in the FAQ section to open the contact form modal.
- All form submissions are logged to the console via the `/api/contact` endpoint (customize as needed for your backend).

---

## 📝 Customization

- **Design tokens** (colors, gradients, shadows) are in `src/index.css` and `tailwind.config.ts`.
- **UI components** are in `src/components/ui/` and are easily reusable.
- **API routes** (for contact form, etc.) are in `src/pages/api/`.

---

## 📄 License

MIT 

---


