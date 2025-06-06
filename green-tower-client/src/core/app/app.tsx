import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BackgroundProvider from '../../components/background-provider/background-provider';
import ThemeProvider from '../../components/theme-provider/theme-provider';

import { AlertProvider } from '../../store/alert-context/alert-provider';
import { AuthProvider, LanguageProvider } from '../../store/context-providers';
import AppView from './app-view';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: Infinity },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BackgroundProvider>
          <AuthProvider>
            <LanguageProvider>
              <AlertProvider>
                <AppView />
              </AlertProvider>
            </LanguageProvider>
          </AuthProvider>
        </BackgroundProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
