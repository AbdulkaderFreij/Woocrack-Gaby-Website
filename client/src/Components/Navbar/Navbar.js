import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "../../page.module.scss";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home",
    };
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const { activeItem } = this.state;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ height: 100, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item
                  as={Link}
                  to="/"
                  name="home"
                  active={activeItem === "home" || activeItem === "logo"}
                  onClick={this.handleItemClick}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/themes"
                  name="themes"
                  active={activeItem === "themes"}
                  onClick={this.handleItemClick}
                >
                  Themes
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/plugins"
                  name="plugins"
                  active={activeItem === "plugins"}
                  onClick={this.handleItemClick}
                >
                  Plugins
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/membership"
                  name="membership"
                  active={activeItem === "membership"}
                  onClick={this.handleItemClick}
                >
                  Membership
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/ngoform"
                  name="ngoform"
                  active={activeItem === "ngoform"}
                  onClick={this.handleItemClick}
                >
                  NGO Form
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/contactus"
                  name="contactus"
                  active={activeItem === "contactus"}
                  onClick={this.handleItemClick}
                >
                  Contact Us
                </Menu.Item>
                {this.props.isLoggedIn ? (
                  <Menu.Item position="right">
                    <Button
                      as="a"
                      inverted={!fixed}
                      onClick={() => this.props.handleLogout()}
                    >
                      Logout
                    </Button>
                    <Button
                      as={Link}
                      to="/donate"
                      inverted={!fixed}
                      primary={fixed}
                      className={styles.button}
                      style={{
                        marginLeft: "0.5em",
                        backgroundColor: "#2185d0",
                      }}
                    >
                      Donate
                    </Button>
                  </Menu.Item>
                ) : (
                  <Menu.Item position="right">
                    <Button as={Link} to="/login" inverted={!fixed}>
                      Login
                    </Button>
                    <Button
                      as={Link}
                      to="/donate"
                      inverted={!fixed}
                      primary={fixed}
                      className={styles.button}
                      style={{
                        marginLeft: "0.5em",
                        backgroundColor: "#2185d0",
                      }}
                    >
                      Donate
                    </Button>
                  </Menu.Item>
                )}
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home",
    };
  }

  // async componentDidMount() {
  // 	const response = await fetch(`http://localhost:5000/verify?token=${localStorage.getItem('cool-jwt')}`);
  // 	const result = await response.json();
  // 	if (result.status === 200) {
  // 		this.setState({
  // 			isLoggedIn: true
  // 		})
  // 	}
  // }

  // handleLogout() {
  // 	localStorage.removeItem('cool-jwt');
  //   window.location.reload();
  //   this.setState({isLoggedIn:false})
  // }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;
    const { activeItem } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/themes"
            name="themes"
            active={activeItem === "themes"}
            onClick={this.handleItemClick}
          >
            Themes
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/plugins"
            name="plugins"
            active={activeItem === "plugins"}
            onClick={this.handleItemClick}
          >
            Plugins
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/membership"
            name="membership"
            active={activeItem === "membership"}
            onClick={this.handleItemClick}
          >
            Membership
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/ngoform"
            name="ngoform"
            active={activeItem === "ngoform"}
            onClick={this.handleItemClick}
          >
            NGO Form
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/contactus"
            name="contactus"
            active={activeItem === "contactus"}
            onClick={this.handleItemClick}
          >
            Contact Us
          </Menu.Item>
          {this.props.isLoggedIn ? (
            <Menu.Item onClick={() => this.props.handleLogout()}>Logout</Menu.Item>
          ) : (
            <>
              <Menu.Item>Login</Menu.Item>
              <Menu.Item>Register</Menu.Item>
            </>
          )}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 250, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                {this.props.isLoggedIn ? (
                  <Menu.Item position="right">
                    <Button as="a" onClick={() => this.handleLogout()}>
                      Logout
                    </Button>
                    <Button as="a" style={{ marginLeft: "0.5em" }}>
                      Donate
                    </Button>
                  </Menu.Item>
                ) : (
                  <Menu.Item position="right">
                    <Button as={Link} to="/login">
                      {" "}
                      Login
                    </Button>
                    <Button
                      as={Link}
                      to="donate"
                      style={{ marginLeft: "0.5em" }}
                    >
                      Donate
                    </Button>
                  </Menu.Item>
                )}
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const Navbar = ({ children , ...props}) => (
  <div>
    <DesktopContainer {...props}>{children}</DesktopContainer>
    <MobileContainer {...props}>{children}</MobileContainer>
  </div>
);

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
