import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider, AuthProvider } from '../../store/context-providers';
import ThemeProvider from '../../components/theme-provider/theme-provider';
import { AlertProvider } from '../../store/alert-context/alert-provider';
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
        <AuthProvider>
          <LanguageProvider>
            <AlertProvider>
              <AppView />
            </AlertProvider>
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
