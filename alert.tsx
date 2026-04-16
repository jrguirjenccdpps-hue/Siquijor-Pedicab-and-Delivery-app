/* App-specific styles */

/* Smooth transitions for all interactive elements */
button, a, input, textarea, select {
  transition: all 0.2s ease-in-out;
}

/* Card hover effects */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Image hover zoom effect */
.img-zoom {
  overflow: hidden;
}

.img-zoom img {
  transition: transform 0.5s ease;
}

.img-zoom:hover img {
  transform: scale(1.1);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tropical button styles */
.btn-tropical-primary {
  background: linear-gradient(135deg, #14b8a6 0%, #0891b2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-tropical-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(20, 184, 166, 0.4);
}

.btn-tropical-secondary {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-tropical-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
}

/* Wave decoration */
.wave-decoration {
  position: relative;
}

.wave-decoration::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23f0fdfa' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
  background-size: cover;
}

/* Leaf pattern background */
.leaf-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Status badge animations */
@keyframes pulse-status {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.status-pending {
  animation: pulse-status 2s ease-in-out infinite;
}

/* Input focus animations */
input:focus, textarea:focus, select:focus {
  transform: translateY(-1px);
}

/* Loading spinner */
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive typography */
@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }
}

/* Custom scrollbar for webkit browsers */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #14b8a6;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #0d9488;
}

/* Glass morphism enhancement */
.glass-enhanced {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Tropical shadow */
.tropical-shadow {
  box-shadow: 
    0 4px 6px -1px rgba(20, 184, 166, 0.1),
    0 2px 4px -1px rgba(20, 184, 166, 0.06);
}

.tropical-shadow-lg {
  box-shadow: 
    0 10px 15px -3px rgba(20, 184, 166, 0.2),
    0 4px 6px -2px rgba(20, 184, 166, 0.1);
}

/* Form section styling */
.form-section {
  background: linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%);
  border-radius: 24px;
  padding: 2rem;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .mobile-full {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
  }
}
