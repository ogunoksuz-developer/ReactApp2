import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context'
import axios from 'axios';

import {Link} from "react-router-dom";

class User extends Component {
    state = {
        isVisible: false
    }
    static defaultProps = {
        name: 'Default Ad',
        salary: 'Default Salary',
        department: 'Default department'
    };
    onClickEvent(e) {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
   async onDeleteUser (dispatch,e) {
        const {id}=this.props;

        await axios.delete(`http://localhost:3004/users/${id}`)

        dispatch({type:"DELETE_USER",payload:id});

    }
    render() {
        //destructing
        const { id,name, salary, department } = this.props;
        const { isVisible } = this.state;

        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="col-md-8 mb-4" >
                                <div className="card" style={isVisible ? {backgroundColor:"#62848d",color:"white"}: null}>
                                    <div className="card-header d-flex justify-content-between">
                                        <h4 className="d-inline" onClick={this.onClickEvent.bind(this)} >{name}</h4>
                                        <i onClick={this.onDeleteUser.bind(this, dispatch)} className="fa fa-trash-o" style={{ cursor: "pointer" }}></i>
                                    </div>

                                    {isVisible ? <div className="card-body ">
                                        <p className="card-text">Maaş: {salary}</p>
                                        <p className="card-text">Departman: {department}</p>
                                        <Link to={`edituser/${id}`} className="btn btn-dark btn-block">Update User</Link>
                                    </div>
                                        : null}


                                </div>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }
}
User.propTypes = {
    name: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired
};


export default User;