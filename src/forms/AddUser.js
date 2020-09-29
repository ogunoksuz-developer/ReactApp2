import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context'
import axios from 'axios';


const Animation = posed.div({
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display: "none"
        }
    }
});

//9724763
class AddUser extends Component {
    state = {
        visible: true,
        name: "",
        salary: "",
        department: "",
        error: false

    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    validateForm = () => {
        const { name, salary, department } = this.state;
        if (name === "" || salary === "" || department === "") {
            return false;
        }
        return true;
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = async (dispatch, event) => {
        //sayfanın yenilenmesini  engelliyor
        event.preventDefault();
        //inputtaki degerleri stateden alıyoruz.
        const { name, salary, department } = this.state;

        //yeni bir kulllanıcı oluşturyoruz
        const newUser = {

            name: name,
            salary: salary,
            department: department
        }

        if (!this.validateForm()) {
            this.setState({
                error: true

            });
            return;
        }
        const response = await axios.post("http://localhost:3004/users/", newUser)
        dispatch({ type: "ADD_USER", payload: response.data });

        this.props.history.push("/");
    }
    render() {
        const { visible, name, salary, department, error } = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (

                            <div className="col-md-8 mb-4">

                                <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2" >{visible ? "Hide Form" : "Show Form"}</button>

                                <Animation pose={visible ? "visible" : "hidden"}>

                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Add User Form</h4>
                                        </div>

                                        <div className="card-body">
                                            {error ?
                                                <div className="alert alert-danger">Lütfen bilgilerinizi kontrol edin...</div>
                                                : null
                                            }
                                            <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="id"
                                                        placeholder=" Enter Name"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="salary">Salary</label>
                                                    <input
                                                        type="text"
                                                        name="salary"
                                                        id="salaryid"
                                                        placeholder=" Enter Salary"
                                                        className="form-control"
                                                        value={salary}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="department">Department</label>
                                                    <input
                                                        type="text"
                                                        name="department"
                                                        id="departmentid"
                                                        placeholder=" Enter Department"
                                                        className="form-control"
                                                        value={department}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-danger btn-block" >Add User</button>
                                            </form>
                                        </div>
                                    </div>
                                </Animation>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )



    }
}

export default AddUser;
