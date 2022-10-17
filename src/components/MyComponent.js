import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'Dien',
        address: 'Moscow',
        age: 22
    };

    handleClick = (event) => {

        console.log("Click me");

        this.setState({
            name: 'Ladien',
            age: Math.floor((Math.random() * 100) + 1)
        })
        console.log("My name is ", this.state.name);
    }

    handleOnMouseOver(event) {
        console.log(event.target);
    }

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    //JSX
    render() {
        return (
            <div> my first component {this.state.name} and {this.state.age}

                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input type="text" onChange={(event) => { this.handleOnChangeInput(event) }} />
                    <button> Submit</button>
                </form>
            </div>
        );
    }


}

export default MyComponent;