import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import PublicLayout from './layouts/PublicLayout';
import useScrollAnimation from './hooks/useScrollAnimation';

function ScrollAnimationInit() {
  useScrollAnimation();
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <ScrollAnimationInit />
                <PublicLayout />
              </BrowserRouter>
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
