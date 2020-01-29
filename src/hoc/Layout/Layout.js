import React from 'react';

import Aux from './../Aux/Aux'
import Navigation from './../../components/Navigation/Navigation';

function Layout(props) {
  return (
    <Aux>
      <Navigation />
      <main>
        {props.children}
      </main>
    </Aux>
  )
}

export default Layout;
