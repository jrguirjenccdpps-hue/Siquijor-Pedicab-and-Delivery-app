@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Tropical Color Palette */
    --background: 160 60% 97%;
    --foreground: 160 40% 15%;
    --card: 0 0% 100%;
    --card-foreground: 160 40% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 160 40% 15%;
    --primary: 168 76% 32%;
    --primary-foreground: 0 0% 100%;
    --secondary: 45 90% 55%;
    --secondary-foreground: 160 40% 15%;
    --muted: 160 30% 92%;
    --muted-foreground: 160 20% 45%;
    --accent: 25 85% 55%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 160 30% 85%;
    --input: 160 30% 90%;
    --ring: 168 76% 32%;
    --radius: 0.75rem;
    
    /* Custom Tropical Colors */
    --tropical-teal: 168 76% 32%;
    --tropical-coral: 15 85% 55%;
    --tropical-sand: 45 50% 90%;
    --tropical-ocean: 195 80% 45%;
    --tropical-sunset: 25 90% 55%;
    --tropical-leaf: 140 60% 35%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}

/* Custom Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes wave {
  0% { transform: translateX(0) translateZ(0) scaleY(1); }
  50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
  100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.3); }
  50% { box-shadow: 0 0 40px rgba(20, 184, 166, 0.6); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-wave {
  animation: wave 8s linear infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

/* Glass Effect */
.glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Gradient Backgrounds */
.bg-tropical-gradient {
  background: linear-gradient(135deg, 
    hsl(168, 76%, 32%) 0%, 
    hsl(160, 60%, 45%) 50%, 
    hsl(140, 60%, 35%) 100%);
}

.bg-sunset-gradient {
  background: linear-gradient(135deg, 
    hsl(25, 90%, 55%) 0%, 
    hsl(15, 85%, 55%) 50%, 
    hsl(350, 70%, 50%) 100%);
}

.bg-ocean-gradient {
  background: linear-gradient(180deg, 
    hsl(195, 80%, 55%) 0%, 
    hsl(195, 80%, 45%) 50%, 
    hsl(210, 70%, 35%) 100%);
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(160, 30%, 92%);
}

::-webkit-scrollbar-thumb {
  background: hsl(168, 76%, 32%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(168, 76%, 28%);
}

/* Form Focus States */
input:focus, textarea:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
}

/* Button Hover Effects */
.btn-tropical {
  @apply transition-all duration-300 transform;
}

.btn-tropical:hover {
  @apply scale-105 shadow-lg;
}

.btn-tropical:active {
  @apply scale-95;
}
