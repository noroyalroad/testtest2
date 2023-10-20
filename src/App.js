import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./page/list";
import Moviedetail from "./page/Moviedetail";
import MovieList from "./page/MovieList";
import Title from "./page/Title";
import Fltest from "./page/Fltest";
import Header from "./nav/Header";

import NewMovie from "./new/NewMovie 2";
import Search from "./nav/Search";
import Footer from "./footer/Footer";
import Searchlist from "./search/Searchlist";
import SignUpPage from "./register/SignUpPage";
import Sign from "./view/Authentication/SignIn";
import SignUp from "./view/Authentication/SignUp";
import Genreslist from "./genres/Genreslist";
import Getdetail from "./detail/Getdetail";
import NicknameChange from "./view/Authentication/MyPage/NicknameChange";
import PasswordChange from "./view/Authentication/MyPage/PasswordChange";
import PreferenceChange from "./view/Authentication/MyPage/PreferenceChange";
import MyPage from "./view/Authentication/MyPage";
import Roadscroll from "./scrolltop/Roadscroll";
import Withmovie from "./withmovie/Withmovie";
import Newlist from "./new/Newlist";
import Moviedetailinfo from "./detail/Moviedetailinfo";

function App() {
  return (
    <BrowserRouter>
      {/* <Roadscroll /> */}
      <Routes>
        <Route path="/list" element={<List />}></Route>
        {/* <Route path="/list/detail/:movie_id" element={<Moviedetail />}></Route> */}
        <Route path="/list2" element={<MovieList />}></Route>
        <Route path="/title" element={<Title />}></Route>
        <Route path="/fl" element={<Fltest />}></Route>
        <Route path="/movies/list/:genres" element={<Genreslist />}></Route>
        <Route path="/movies/list/genres/list" element={<Genreslist />}></Route>
        <Route path="/movies/list/newlsit" element={<NewMovie />}></Route>
        <Route path="/movies/list/serach" element={<Search />}></Route>
        <Route path="/movies/detail" element={<Moviedetailinfo />}></Route>

        <Route path="/search/research/:search" element={<Searchlist />}></Route>
        <Route path="/login" element={<Sign />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/nicknamechange" element={<NicknameChange />}></Route>
        <Route path="/passwordchange" element={<PasswordChange />}></Route>
        <Route path="/preferencechagne" element={<PreferenceChange />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/withmovie" element={<Newlist />}></Route>

        <Route path="/detail/:movie_id" element={<Getdetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
