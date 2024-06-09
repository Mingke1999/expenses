import { Routes, Route, Navigate } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import TransactionPage from "./pages/TransactionPage"
import NotFound from "./pages/NotFound"
import Header from "./components/UI/Header"
import { useQuery } from "@apollo/client"
import { GET_AUTH_USER } from "./graphql/queires/user.query.js"
import { Toaster } from "react-hot-toast"

function App() {
  //const authUser = true;
  const {loading,data} = useQuery(GET_AUTH_USER);
  if (loading) return null;
  // console.log("Loading:", loading);
  // console.log("AuthUser:", data);
  // console.log("Error", error)

  return (
    <>
    { data.authUser && <Header/> }
      <Routes>
        <Route path='/signup' element={!data.authUser?<SignUpPage />:<Navigate to="/"/>} />
				<Route path='/' element={data.authUser ? <HomePage />:<Navigate to="/login"/>} />
				<Route path='/login' element={!data.authUser?<LoginPage />:<Navigate to="/"/>} />
				<Route path='/transaction/:id' element=<TransactionPage /> />
				<Route path='*' element={<NotFound />} />
			</Routes>
      <Toaster/>
    </>
  )
}

export default App
