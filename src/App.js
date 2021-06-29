import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Homepage} from "./pages/homepage";
import {Films} from "./pages/film-list";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div>
          <BrowserRouter>
              <Switch>
                <Route exact path="/">
                    <Redirect to="/homepage"/>
                </Route>
                  <Route path="/homepage" component={Homepage}/>
                  <Route path="/film" component={Films}/>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
