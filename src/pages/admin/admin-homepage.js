import React from 'react'
import {CustomNavbar} from "../../components/custom-navbar";

class AdminHomepage extends React.Component {
    render() {
        return (
            <div>
                <CustomNavbar/>
                {/*<CustomTable/>*/}
                I'm Admin Homepage and I'm working
            </div>
        )
    }
}

export {AdminHomepage}
