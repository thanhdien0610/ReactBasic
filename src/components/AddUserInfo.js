import React, { useState } from "react";

// class AddUserInfo extends React.Component {

//     state = {
//         name: this.props.state?.name ? this.props.state.name : 'Dien',
//         address: this.props.state?.address ? this.props.state.address : 'Moscow',
//         age: this.props.state?.age ? this.props.state.age : 22,
//         id: this.props.state?.id ? this.props.state.id : 0,
//     };

//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }

//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }

//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         //console.log(this.state);
//         this.props?.handleAddNewUser?.({
//             id: Math.floor((Math.random() * 100) + 1) + '-random',
//             name: this.state.name,
//             age: this.state.age
//         });
//     }


//     render() {
//         return (
//             <div key={this.state.id} className={+this.state.age > 18 ? "green" : "red"}>
//                 <div key={this.state.name} className="name"> My name is {this.state.name}</div>
//                 <div key={this.state.age} className="age"> My age is {this.state.age}</div>

//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <input
//                         key={this.state.name}
//                         placeholder="name"
//                         value={this.state.name}
//                         type="text"
//                         onChange={(event) => { this.handleOnChangeInput(event) }} />
//                     <input
//                         key={this.state.age}
//                         placeholder="age"
//                         value={this.state.age}
//                         type="text"
//                         onChange={(event) => { this.handleOnChangeAge(event) }} />
//                     <button key={this.state.id}> Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserInfo = (props) => {
    const { state } = props;
    const [name, setName] = useState(state?.name ? state?.name : 'Dien')
    const [address, setAddress] = useState(state?.address ? state?.address : 'Moscow')
    const [age, setAge] = useState(state?.age ? state?.age : 22)
    const [id, setId] = useState(state?.id ? state?.id : 0)

    const handleOnChangeInput = (event) => {
        setName(event.target.value)
    }

    const handleOnChangeAge = (event) => {
        setAge(event.target.value)
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        //console.log(this.state);
        props?.handleAddNewUser?.({
            id: Math.floor((Math.random() * 100) + 1) + '-random',
            name: name,
            age: age
        });
    }

    return (
        <div key={id} className={+age > 18 ? "green" : "red"}>
            <div key={name} className="name"> My name is {name}</div>
            <div key={age} className="age"> My age is {age}</div>

            <form onSubmit={(event) => { handleOnSubmit(event) }}>
                <input

                    placeholder="name"
                    value={name}
                    type="text"
                    onChange={(event) => { handleOnChangeInput(event) }} />
                <input

                    placeholder="age"
                    value={age}
                    type="text"
                    onChange={(event) => { handleOnChangeAge(event) }} />
                <button> Submit</button>
            </form>
        </div>
    )
}

export default AddUserInfo;