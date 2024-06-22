import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { FaUser, FaLaptopCode } from "react-icons/fa";
import { MdLeaderboard, MdWork } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwtToken from "../../api/jwtToken";
import './style.scss';
import './style.css';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = jwtToken !== undefined;

  const logOut = () => {
    Cookies.remove("jwtToken");
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* {(location.pathname === "/" || location.pathname === "/forgot") && (
        <div className="bg-container shadow ps-4 pe-4 p-2">  
          <img src="" className="logo" alt="Logo"/>
          <img src="/assets/images/MlrLogo.png" alt="MLRIT" className="logo text-center"/>
        </div>
        //will check later
      )}     */}
      
      {isLoggedIn && (
        <Navbar className="bg-color sticky shadow" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand as={Link} to="/leaderboard"><img src=""></img>CodeSense</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto me-auto" style={{ gap: "7vw", fontSize: "1.1rem" }}>
                <Nav.Link as={Link} to="/leaderboard" className="text-white">
                  <div style={{ textAlign: "center" }}>
                    <MdLeaderboard />
                    <br />
                    <div>Leaderboard</div>
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/courses" className="text-white">
                  <div style={{ textAlign: "center" }}>
                    <IoBookOutline />
                    <br />
                    <div>Courses</div>
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/jobs" className="text-white">
                  <div style={{ textAlign: "center" }}>
                    <MdWork />
                    <br />
                    <div>Jobs</div>
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/contests" className="text-white">
                  <div style={{ textAlign: "center" }}>
                    <FaLaptopCode />
                    <br />
                    <div>Contests</div>
                  </div>
                </Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown 
                  id="nav-dropdown-dark-example"
                  title={<FaUser />}
                  menuVariant="dark"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">

                    <Image 
                      roundedCircle
                      style={{ width: "40px", height: "40px", marginRight: "10px" }}
                      alt="Profile"
                      src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                      //temporarily using this image

                    />
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/personal">
                    Edit my profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/" onClick={logOut}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavBar;
