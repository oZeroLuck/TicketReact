import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {Homepage} from "./pages/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {EventPage} from "./pages/event-page";
import {Footer} from "./components/footer";
import {MyCartPage} from "./pages/my-cart-page";
import {CustomNavbar} from "./components/custom-navbar";
import React from 'react'
import {ReservedArea} from "./pages/reserved-area";
import {RegisterPage} from "./pages/register-page";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
        this.handleLogged = this.handleLogged.bind(this)
    }

    componentDidMount() {
        if(window.sessionStorage.getItem("currentUser") !== null) {
            this.setState({isLogged: true})
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
                            <Redirect to="/homepage"/>
                        </Route>
                        <Route path="/login" component={ReservedArea}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/homepage" component={Homepage}/>
                        <Route path="/event/:type/:id" component={EventPage}/>
                        <Route path="/myCart" component={MyCartPage}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}

export default App;
