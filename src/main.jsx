import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main';
import Home from './components/Home/Home';
import ChefDetails from './components/ChefDetails/ChefDetails';
import ErrorPage from './components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: async () => {
          const [res1, res2, res3, res4] = await Promise.all([
            fetch("http://localhost:5000/bannerdishes"),
            fetch("http://localhost:5000/chefs"),
            fetch("http://localhost:5000/tips"),
            fetch("http://localhost:5000/healthtips"),
          ]);
          const bannerDishes = await res1.json();
          const chefsSection = await res2.json();
          const tipsAndTricks = await res3.json();
          const healthTips = await res4.json();
          return { bannerDishes, chefsSection, tipsAndTricks, healthTips };
        }
      },
      {
        path: "/recipes/:id",
        element: <ChefDetails></ChefDetails>,
        loader: async ({params}) => {
          const res = await fetch("http://localhost:5000/chefs");
          const data = await res.json();
          const chefDetail = data.find(singleChefDetail => singleChefDetail.id == params.id);
          return chefDetail;
        }
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
