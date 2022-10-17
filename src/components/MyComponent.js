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

    //JSX
    render() {
        return (
            <div> my first component {this.state.name} and {this.state.age}
                <button onMouseOver={this.handleOnMouseOver}> Hover me</button>
                <button onClick={(event) => { this.handleClick(event) }}> Click me</button>
            </div>
        );
    }


}

export default MyComponent;