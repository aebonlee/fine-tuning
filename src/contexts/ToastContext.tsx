import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Toast {
  id: number;
  message: string;
  type: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: string, duration?: number) => void;
  removeToast: (id: number) => void;
  success: (msg: string) => void;
  error: (msg: string) => void;
  warning: (msg: string) => void;
  info: (msg: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((msg: string) => addToast(msg, 'success'), [addToast]);
  const error = useCallback((msg: string) => addToast(msg, 'error'), [addToast]);
  const warning = useCallback((msg: string) => addToast(msg, 'warning'), [addToast]);
  const info = useCallback((msg: string) => addToast(msg, 'info'), [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
      {children}
      <div className="toast-container" role="status" aria-live="polite" aria-atomic="false">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`} role="alert">
            <span className="toast-icon" aria-hidden="true">
              {toast.type === 'success' ? '\u2713' : toast.type === 'error' ? '\u2715' : toast.type === 'warning' ? '\u26A0' : '\u2139'}
            </span>
            <div className="toast-content">
              <span className="toast-message">{toast.message}</span>
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)} aria-label="Close notification">{'\u00D7'}</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
