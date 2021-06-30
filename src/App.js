import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Homepage} from "./pages/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {EventPage} from "./pages/event-page";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Switch>
                <Route exact path="/">
                    <Redirect to="/homepage"/>
                </Route>
                  <Route path="/homepage" component={Homepage}/>
                  <Route path="/event/:type/:id" component={EventPage}/>
              </Switch>
          </BrowserRouter>
      </div>
  );
}

export default App;
