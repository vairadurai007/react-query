import './App.css';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import DisablingPausingQueries from './Disabling/Pausing Queries';

const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <DisablingPausingQueries/>
        <ReactQueryDevtools position={'bottom-left'} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
