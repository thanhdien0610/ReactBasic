import React from "react";

class UserInfo extends React.Component {

    state = {
        name: 'Dien',
        address: 'Moscow',
        age: 22
    };

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }


    render() {
        return (
            <div>
                My name is {this.state.name} and {this.state.age}

                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input
                        placeholder="name"
                        value={this.state.name}
                        type="text"
                        onChange={(event) => { this.handleOnChangeInput(event) }} />
                    <input
                        placeholder="age"
                        value={this.state.age}
                        type="text"
                        onChange={(event) => { this.handleOnChangeAge(event) }} />
                    <button> Submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfo;