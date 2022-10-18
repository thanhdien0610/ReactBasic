import React from "react";
import DisplayInfo from "./DisplayInfo";
import AddUserInfo from "./AddUserInfo";

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

    handleAddNewUser = (userObj) => {
        this.setState({
            listUsers: [...this.state.listUsers, userObj]
        })
        console.log(userObj);
    }

    //JSX
    render() {
        return (
            <>
                <div>
                    <AddUserInfo
                        handleAddNewUser={this.handleAddNewUser}
                    />
                    <br />
                    <DisplayInfo listUsers={this.state.listUsers}

                    />


                </div>
            </>
        );
    }


}

export default MyComponent;