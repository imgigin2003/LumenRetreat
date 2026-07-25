import { Toaster as HotToaster } from 'react-hot-toast';

/** App-wide toast host, themed to the glass aesthetic. */
export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 3800,
        style: {
          background: 'rgb(22 28 38 / 0.85)',
          color: 'rgb(237 240 245)',
          border: '1px solid rgb(148 163 184 / 0.14)',
          borderRadius: '14px',
          padding: '12px 16px',
          fontSize: '14px',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 12px 40px -12px rgb(0 0 0 / 0.6)',
          maxWidth: '360px',
        },
        success: {
          iconTheme: { primary: '#3fb89e', secondary: '#0d1117' },
        },
        error: {
          iconTheme: { primary: '#f87171', secondary: '#0d1117' },
        },
      }}
    />
  );
}
