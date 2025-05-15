import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './components/Register.tsx'
import Layout from './components/Layout.jsx'
import NotFound from './components/NotFound.tsx';
import Login from './components/Login.tsx';
import Films from './components/Films/Films.tsx';
import FilmDetails from './components/Films/FilmDetails.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "films", element: <Films /> },
      { path: "film/:id", element: <FilmDetails /> },
      {path: "*", element: <NotFound />}
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
