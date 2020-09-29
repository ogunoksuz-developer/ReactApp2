import React from 'react'
import {Link} from "react-router-dom";



import PropTypes from 'prop-types';

function Navbar(props) {
  return (
    <div>
     <h3>{props.title}</h3>
     <ul>
       <li>
         <Link to="/">Home</Link>
       </li>
       <li>
       <Link to="/adduser">Add User</Link>
       </li>
     </ul>
    </div>
  )
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired
};
Navbar.defaultProps = {
  title: 'Default Props'
};
export default Navbar;