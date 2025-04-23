import { LanguageProvider, AuthProvider } from '../../context/context-providers';
import ThemeProvider from '../../components/theme-provider/theme-provider';
import AppView from './app-view';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppView />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
