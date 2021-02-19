import { Switch, Route } from "react-router-dom";
import GlobalStyle from "./globalstyle";
import { useState } from "react";
import Navbar from "./components/navbar";
import Posts from "./pages/posts";
import Societies from "./pages/societies";
import CreateSociety from "./pages/create-society";
import CreatePost from "./pages/create-post";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={`app ${modalOpen ? "stopScroll" : ""}`}>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Posts modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Route>
        <Route path="/societies" exact>
          <Societies />
        </Route>
        <Route path="/add-society" exact>
          <CreateSociety />
        </Route>
        <Route path="/create-post" exact>
          <CreatePost />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
