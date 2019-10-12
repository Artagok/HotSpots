import React, { useState, Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./Button.css";

class Button extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  /*handleClick(eventname) => {
      //IMPLEMENTAR CLICK HANDLER
  }*/

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Select incident</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.handleClick}>Robatori</DropdownItem>
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
}

export default Button;
