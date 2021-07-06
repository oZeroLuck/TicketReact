import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Homepage} from "./pages/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {EventPage} from "./pages/event-page";
import {Footer} from "./components/footer";
import {MyCartPage} from "./pages/my-cart-page";
import {CustomNavbar} from "./components/custom-navbar";
import React from 'react'
import {ReservedArea} from "./pages/reserved-area/reserved-area";
import {RegisterPage} from "./pages/reserved-area/register-page";
import {AdminHomepage} from "./pages/admin-homepage";
import {ProfilePage} from "./pages/profile-page";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: "/homepage"
        }
        this.handleLogged = this.handleLogged.bind(this)
    }

    componentDidMount() {
        const currentUser = window.sessionStorage.getItem("currentUser")
        if(currentUser !== null && currentUser.role === "admin") {
            this.setState({route: "/admin/homepage"})
        }
    }

    handleLogged() {
        this.setState(prev => ({
            isLogged: !prev.isLogged
        }))
    }

    debug() {
        console.log("Session Storage: ")
        console.log(window.sessionStorage.getItem("currentUser"))
        console.log("State")
        console.log(this.state)
    }

    debugFlush() {
        console.log("Debug: flushed!")
        window.sessionStorage.clear()
    }

    render() {
        return (
            <div style={{backgroundColor: "transparent"}}>
                <BrowserRouter>
                    <CustomNavbar setLogged={() => this.handleLogged()}/>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={this.state.route}/>
                        </Route>
                        <Route path="/login" component={ReservedArea}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/homepage" component={Homepage}/>
                        <Route path="/event/:type/:id" component={EventPage}/>
                        <Route path="/myCart" component={MyCartPage}/>
                        <Route path="/admin/homepage" component={AdminHomepage}/>
                        <Route path="/profile" component={ProfilePage}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
                <button onClick={() => this.debug()}>Debug</button>
                <button onClick={() => this.debugFlush()}>Flush</button>
            </div>
        );
    }
}

export default App;
