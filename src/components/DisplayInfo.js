import React from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'

import AddUserInfo from "./AddUserInfo";
class DisplayInfo extends React.Component {

    constructor(props) {
        console.log("did mount 0");
        super(props);
        this.state = {
            isShowList: true
        }

    }

    componentDidMount() {
        console.log("did mount");
        setTimeout(() => {
            document.title = 'LaDien'
        }, 3000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('did update', this.props, prevProps)
        if (this.props.listUsers !== prevProps.listUsers) {
            if (this.props.listUsers.length === 5) {
                alert('You got 5 users')
            }
        }
    }


    handleShowHide(event) {
        this.setState({
            isShowList: !this.state.isShowList
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('updated');
    }




    render() {
        console.log("render ");
        const { listUsers } = this.props;
        console.log(listUsers)
        return (
            <div className="display-info-container" key={Math.floor((Math.random() * 100) + 1)}>
                {/* <img src={logo} /> */}

                <span onClick={(event) => { this.handleShowHide(event) }}>
                    {this.state.isShowList ? "Hide " : "Show "}  list users:</span>

                {this.state.isShowList &&
                    <>
                        {listUsers.map((user) => {
                            return (
                                // <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                //     <div>
                                //         <div> My name is {user.name} </div>
                                //         <div> My age is {user.age} </div>
                                //     </div>
                                //     <div>
                                //         <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                                //         {/* <UpdateUser
                                //             userInfo={user}
                                //         /> */}
                                //     </div>
                                //     <hr />
                                // </div>
                                <div key={user.id}>
                                    <AddUserInfo key={user.id}
                                        state={user}
                                        handleDeleteUser={this.props.handleDeleteUser}
                                    />

                                    <div key="{user.id}-btn">
                                        <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
                                        {/* <UpdateUser
                                             userInfo={user}
                                         /> */}
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
}


export default DisplayInfo;