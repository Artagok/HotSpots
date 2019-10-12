import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Button = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const divStyle = {
    position: 'fixed',
    bottom: 100,
    right: 100,
    zIndex:100,
  };

  return (
    <ButtonDropdown style={divStyle} isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Button Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Robatori</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Accident de trànsit</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Button;