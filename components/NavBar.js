import React from "react";
import { Anchor, Box, Grommet, Header, Nav, Menu, ResponsiveContext, Text } from "grommet";
import styles from '../styles/NavBar.module.css';

export class NavBar extends React.Component {
  render() {
    return (
      <Grommet plain>
        <Header background="accent-4" pad="x-small">
          <div className={styles.bungeeShade}>
          <Box direction="row" align="center" gap="small">
          QuickEatz <div className={styles.hello}> hello </div>
          </Box>
          </div>
          
          <ResponsiveContext.Consumer>
            {(responsive) =>
              responsive === "small" ? (
                <Menu
                  label="Menu"
                  items={[
                    { label: "Trending", onClick: () => {} },
                    { label: "Login", onClick: () => {} },
                    { label: "Create Account", onClick: () => {} },
                  ]}
                />
              ) : (
                <Nav direction="row">
                  <Anchor href="#" label="Trending" />
                  <Anchor href="#" label="Login" />
                  <Anchor href="#" label="Create Account" />
                </Nav>
              )
            }
          </ResponsiveContext.Consumer>
        </Header>
      </Grommet>
    );
  }
}

export default NavBar;
