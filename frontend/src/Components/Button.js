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
        <DropdownItem divider />
        <DropdownItem>Voluntary manslaughter</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Burglary</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Rape</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Homicide</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Theft</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Shoplifting</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Vandalism</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Sexual assault</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Drug trafficking</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Fraud</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Public intoxication</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Disturbing the peace</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Extortion</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Justificable homicide</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Drug possession</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Button;