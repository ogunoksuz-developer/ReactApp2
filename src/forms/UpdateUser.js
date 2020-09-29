import React, { Component } from 'react'
import UserConsumer from '../context'
import axios from 'axios';



class UpdateUser extends Component {
    state = {
        name: "",
        salary: "",
        department: "",
        error: false
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;

        const response = await axios.get(`http://localhost:3004/users/${id}`);

        const { name, salary, department } = response.data;
        this.setState({
            name: name,
            salary: salary,
            department: department

        });

    }
    validateForm = () => {
        const { name, salary, department } = this.state;
        if (name === "" || salary === "" || department === "") {
            return false;
        }
        return true;
    }

    handleSubmit = async (dispatch, event) => {
        //sayfanın yenilenmesini  engelliyor
        event.preventDefault();

        const { name, salary, department } = this.state;
        const { id } = this.props.match.params;
        const updatedUser = {
            name: name,
            salary: salary,
            department: department
        };

        if (!this.validateForm()) {
            this.setState({
                error: true

            });
            return;
        }
        const response = await axios.put(`http://localhost:3004/users/${id}`, updatedUser)

        dispatch({ type: "UPDATE_USER", payload: response.data });

        this.props.history.push("/");
    }
    render() {
        const { name, salary, department, error } = this.state;
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (

                            <div className="col-md-8 mb-4">

                                <div className="card">
                                    <div className="card-header">
                                        <h4>Update User Form</h4>
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
                                            <button type="submit" className="btn btn-danger btn-block" >Update User</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                }
            </UserConsumer>
        )

    }
}

export default UpdateUser;
