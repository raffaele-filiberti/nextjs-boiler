import React from 'react';
import Scrollbar from '~/components/Scrollbar';
import Animate from '~/components/Animate';
import animations from '~/animations';

const Layout: React.FC = ({ children }) => (
  <Scrollbar>
    <Animate variants={animations.fade}>
      {children}
    </Animate>
  </Scrollbar>
);

export default Layout;
