import React from "react";

class DisplayInfo extends React.Component {

    state = {
        isShowList: true
    }

    handleShowHide(event) {
        this.setState({
            isShowList: !this.state.isShowList
        })
    }

    render() {
        const { listUsers } = this.props;
        console.log(listUsers)
        return (
            <div>
                <div>
                    <span onClick={(event) => { this.handleShowHide(event) }}>
                        {this.state.isShowList ? "Hide " : "Show "}  list users:</span>
                </div>
                {this.state.isShowList &&
                    <div>
                        {listUsers.map((user) => {
                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div> My name is {user.name} </div>
                                    <div> My age is {user.age} </div>
                                    <hr />
                                </div>
                            )
                        })
                        }
                    </div>}
            </div>
        )
    }
}


export default DisplayInfo;