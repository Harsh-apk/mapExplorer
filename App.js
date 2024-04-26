import { useContext } from 'react';
import MainScreen from './components/MainScreen';
import { ExplorerContext, ExplorerProvider } from './context/context';

export default function App() {
  return (
    <ExplorerProvider>
    <MainScreen />
    </ExplorerProvider>
  );
}
