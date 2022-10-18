import React, { useState } from "react";
import DisplayInfo from "./DisplayInfo";
import AddUserInfo from "./AddUserInfo";

// class MyComponent extends React.Component {

//     state = {
//         listUsers: [
//             {
//                 id: 1,
//                 name: "La Dien",
//                 age: "30"
//             },
//             {
//                 id: 2,
//                 name: "La Vu Thanh Dien",
//                 age: "22"
//             },
//             {
//                 id: 3,
//                 name: "Dien",
//                 age: "13"
//             },
//         ]
//     }

//     handleAddNewUser = (userObj) => {
//         this.setState({
//             listUsers: [userObj, ...this.state.listUsers]
//         })
//         console.log(userObj);
//     }

//     handleDeleteUser = (userId) => {
//         let listUsersClone = [...this.state.listUsers]
//         this.setState({
//             listUsers: listUsersClone.filter(item => item.id !== userId)
//         })
//     }



//     //JSX
//     render() {
//         return (
//             <>
//                 <div className="my-component">
//                     <AddUserInfo
//                         handleAddNewUser={this.handleAddNewUser}
//                     // state={this.state.listUsers[1]}
//                     />
//                     <br />
//                     <DisplayInfo listUsers={this.state.listUsers}
//                         handleDeleteUser={this.handleDeleteUser}

//                     />


//                 </div>
//             </>
//         );
//     }


// }

const MyComponent = () => {
    //     //JSX
    const [listUsers, setListUsers] = useState([
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
    ]);
    const handleAddNewUser = (userObj) => {
        setListUsers([userObj, ...listUsers])
        console.log(userObj);
    }

    const handleDeleteUser = (userId) => {
        let listUsersClone = [...listUsers]
        setListUsers(listUsersClone.filter(item => item.id !== userId))

    }
    return (
        <>
            <div className="my-component">
                <AddUserInfo
                    handleAddNewUser={handleAddNewUser}
                // state={this.state.listUsers[1]}
                />
                <br />
                <DisplayInfo listUsers={listUsers}
                    handleDeleteUser={handleDeleteUser}

                />


            </div>
        </>
    );


}

export default MyComponent;