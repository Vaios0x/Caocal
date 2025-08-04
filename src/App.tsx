import React from 'react';
import { SWRConfig } from 'swr';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from '@/router';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(res => res.json()),
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      <RouterProvider router={AppRouter} />
    </SWRConfig>
  );
}

export default App; 