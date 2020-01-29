import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/players'>Player</Link>
        <Link to='/contact'>Contact Us</Link>
      </nav>
    </div>
  )
}

export default Navigation;
