import Header from './components/Header';
import Layout from './components/Layout';
import MapView from './components/MapView';
import PinList from './components/PinList';
import { PinProvider } from './context/PinContext';
import 'leaflet/dist/leaflet.css';
import './App.css'

function App() {
 
  return (
    <PinProvider>
      <Layout>
        <Header />
        <main className="flex flex-col relative lg:gap-4 h-[92vh]">
          <MapView />
          <PinList />
        </main>
      </Layout>
    </PinProvider> 
  );
}

export default App
