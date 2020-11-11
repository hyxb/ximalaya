import React from 'react';
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';

class HeaderRightBtn extends React.Component {
  render() {
    return (
      <HeaderButtons>
        <Item title='编辑'/>
      </HeaderButtons>
    );
  }
}

export default HeaderRightBtn;
