import { LanguageProvider, AuthProvider } from '../../context/context-providers';
import ThemeProvider from '../../components/theme-provider/theme-provider';
import { AlertProvider } from '../../context/alert-context/alert-provider';
import AppView from './app-view';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AlertProvider>
            <AppView />
          </AlertProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
