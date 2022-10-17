import React from "react";
import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";

class MyComponent extends React.Component {

    state = {
        listUsers: [
            {
                id: 1,
                name: "La Dien",
                age: "30"
            },
            {
                id: 2,
                name: "La Vu Thanh Dien",
                age: "22"
            },
            {
                id: 3,
                name: "Dien",
                age: "13"
            },
        ]
    }

    //JSX
    render() {
        return (
            <div>
                <UserInfo />
                <br />
                <DisplayInfo listUsers={this.state.listUsers} />


            </div>
        );
    }


}

export default MyComponent;