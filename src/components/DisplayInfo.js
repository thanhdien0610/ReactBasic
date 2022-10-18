import React from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'

import AddUserInfo from "./AddUserInfo";

//stateful
// class DisplayInfo extends React.Component {

//     render() {
//         console.log("render ");
//         const { listUsers } = this.props;
//         console.log(listUsers)
//         return (
//             <div className="display-info-container" key={Math.floor((Math.random() * 100) + 1)}>

//                 {true &&
//                     <>
//                         {listUsers.map((user) => {
//                             return (

//                                 <div key={user.id}>
//                                     <AddUserInfo key={user.id}
//                                         state={user}
//                                         handleDeleteUser={this.props.handleDeleteUser}
//                                     />

//                                     <div key="{user.id}-btn">
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                     </div>

//                                     <hr key="{user.id}-br" />
//                                 </div>
//                             )
//                         })
//                         }
//                     </>}
//             </div>
//         )
//     }
// }

//stateless
const DisplayInfo = (props) => {
    const { listUsers } = props;

    console.log(listUsers)
    return (
        <div className="display-info-container" key={Math.floor((Math.random() * 100) + 1)}>

            {true &&
                <>
                    {listUsers.map((user) => {
                        return (

                            <div key={user.id}>
                                <AddUserInfo key={user.id}
                                    state={user}
                                    handleDeleteUser={props.handleDeleteUser}
                                />

                                <div key="{user.id}-btn">
                                    <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                                </div>

                                <hr key="{user.id}-br" />
                            </div>
                        )
                    })
                    }
                </>}
        </div>
    )
}


export default DisplayInfo;