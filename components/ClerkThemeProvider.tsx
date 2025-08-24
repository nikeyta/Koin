'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function ClerkThemeProvider({
  children,
}: ClerkThemeProviderProps) {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: theme === 'dark' ? '#10b981' : '#059669', // emerald
          colorBackground: theme === 'dark' ? '#05241d' : '#EBEDE8',
          colorInputBackground: theme === 'dark' ? '#0d3328' : '#ffffff',
          colorInputText: theme === 'dark' ? '#EBEDE8' : '#05241d',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: theme === 'dark' ? '#10b981' : '#059669',
            color: '#ffffff',
            fontWeight: '600',
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#059669' : '#047857',
            },
          },
          card: {
            backgroundColor: theme === 'dark' ? '#073127' : '#ffffff',
            color: theme === 'dark' ? '#EBEDE8' : '#05241d',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            border:
              theme === 'dark'
                ? '1px solid rgba(235, 237, 232, 0.1)'
                : '1px solid rgba(5, 36, 29, 0.1)',
          },
          headerTitle: {
            color: theme === 'dark' ? '#EBEDE8' : '#05241d',
            fontWeight: '700',
          },
          headerSubtitle: {
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          },
          socialButtonsBlockButton: {
            border:
              theme === 'dark'
                ? '1px solid rgba(235, 237, 232, 0.1)'
                : '1px solid rgba(5, 36, 29, 0.1)',
            backgroundColor:
              theme === 'dark' ? 'rgba(16,185,129,0.1)' : 'rgba(5,150,105,0.1)',
            color: theme === 'dark' ? '#EBEDE8' : '#05241d',
            fontWeight: '500',
          },
          dividerLine: {
            backgroundColor:
              theme === 'dark'
                ? 'rgba(235, 237, 232, 0.1)'
                : 'rgba(5, 36, 29, 0.1)',
          },
          formFieldInput: {
            backgroundColor:
              theme === 'dark'
                ? 'rgba(13, 51, 40, 0.9)'
                : 'rgba(235, 237, 232, 0.9)',
            color: theme === 'dark' ? '#EBEDE8' : '#05241d',
            border:
              theme === 'dark'
                ? '1px solid rgba(235, 237, 232, 0.1)'
                : '1px solid rgba(5, 36, 29, 0.1)',
            borderRadius: '0.5rem',
            padding: '0.5rem 0.75rem',
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
