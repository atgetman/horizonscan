import { RouterProvider } from 'react-router';
import { router } from './routes';
import { WorkspaceNavigationProvider } from './contexts/WorkspaceNavigationContext';
import { CitationProvider } from './contexts/CitationContext';
import { MonitoringProvider } from './contexts/MonitoringContext';

// Main application component
export default function App() {
  return (
    <MonitoringProvider>
      <WorkspaceNavigationProvider>
        <CitationProvider>
          <RouterProvider router={router} />
        </CitationProvider>
      </WorkspaceNavigationProvider>
    </MonitoringProvider>
  );
}