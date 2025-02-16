import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import List from './components/list/List.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReduxProvider from './store/ReduxProvider.tsx'
import FormPage from './components/formPage/FormPage.tsx'
import Item from './components/item/Item.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <List />,
  },
  {
    path: '/form',
    element: <FormPage />
  },
  {
    path: 'item',
    element: <Item />,
    children: [
      {
        element: <Item />,
        path: ':id',
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>,
)
