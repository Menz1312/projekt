import React, { Component, ReactNode } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

// Definiujemy interfejs dla propsów, mówiąc, że mogą zawierać children
interface LayoutProps {
  children?: ReactNode;
}

export class Layout extends Component<LayoutProps> {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}