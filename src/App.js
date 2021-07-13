import './App.css';
import {BrowserRouter, Route, Switch, Redirect, Link} from "react-router-dom";
import {Homepage} from "./pages/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {EventPage} from "./pages/event-page";
import {Footer} from "./components/footer";
import {MyCartPage} from "./pages/my-cart-page";
import React from 'react'
import {ReservedArea} from "./pages/reserved-area/reserved-area";
import {AdminHomepage} from "./pages/admin/admin-homepage";
import {ProfilePage} from "./pages/profile-page";
import {ReceiptPage} from "./pages/receipt-page";
import {OrderSuccessPage} from "./pages/order-success-page";
import {EventListPage} from "./pages/event-list-page";

class App extends React.Component {

    componentDidMount() {
        window.sessionStorage.setItem("currentCart", JSON.stringify({tickets: []}))
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/homepage"/>
                        </Route>
                        <Route path="/event/all" component={EventListPage}/>
                        <Route path="/login/:register?" component={ReservedArea}/>
                        <Route path="/homepage" component={Homepage}/>
                        <Route path="/event/:id" component={EventPage}/>
                        <Route path="/myCart" component={MyCartPage}/>
                        <Route path="/admin/homepage" component={AdminHomepage}/>
                        <Route path="/profile" component={ProfilePage}/>
                        <Route path="/receipt/:code" component={ReceiptPage}/>
                        <Route path="/success/:code" component={OrderSuccessPage}/>
                    </Switch>
                </BrowserRouter>
                <footer>
                    <Footer/>
                </footer>
            </div>
        );
    }
}

export default App;
