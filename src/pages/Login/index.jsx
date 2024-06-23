import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import Cookies from "js-cookie";
import jwtToken from "../../api/jwtToken";
import './style.css'
import "./style.scss"

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBFooter,
  MDBIcon
} from "mdb-react-ui-kit";

const LoginPage = () => {
  useEffect(() => {
    if (jwtToken() !== undefined) {
      navigate("/contests", { replace: true });
    }
  });

  const navigate = useNavigate();
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const [rollno, setRollno] = useState("");
  const [password, setPass] = useState("");

  const submitClicked = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const userDetails = { rollno, password };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await api.post('/authenticate', userDetails, options);
      const data = res.data;
      console.log(res)

      if (res.status === 200) {
        submitSuccess(data.jwtToken);
      } else {
        setIncorrectCredentials(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitSuccess = (jwtToken) => {
    Cookies.set("jwtToken", jwtToken, {
      expires: 30,
      path: "/",
    });
    navigate("/leaderboard", { replace: true });
  };

    
  return (
    <>
     
        <div className="bg-container shadow ps-4 pe-4 p-2">  
          <img src="/assets/images/Logo.png" className="logo" alt="Logo"/>
          <img src="/assets/images/MlrLogo.png" alt="MLRIT" className="logo text-center"/>
        </div>
 
    <div style={{ display: "flex",flexDirection:"column"}}>
      <MDBCard style={{width: "100%" }}>
        <form onSubmit={submitClicked}>
          <MDBCardBody style={{ paddingTop: "8%",backgroundColor: "#8C52FF" }}>
            <MDBContainer fluid className=" h-custom">
              <MDBRow>
                <MDBCol
                  col="10"
                  md="6"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: "10%",
                    }}
                  >
                  {/* <Animation/> */}
                  </div>
                </MDBCol>

                {/* login card */}

                <MDBCol col="4" md="6" >
                  <div style={{ padding: "5%" }}>
                    <h1 className="mb-3 text-start" style={{ fontSize:"50px", color:"black" }}>
                      Go Ahead
                    </h1>

                    <MDBInput
                      wrapperClass="mb-5 mt-5 custom-input"
                      label="Username"
                      id="formControlLg"
                      type="text"
                      size="lg"
                      style={{ backgroundColor: "white" }}
                      onChange={(e) => setRollno(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass="mb-2 custom-input"
                      label="Password"
                      id="formControlLg"
                      type="password"
                      size="lg"
                      style={{ backgroundColor: "white" }}
                      onChange={(e) => setPass(e.target.value)}
                    />


                    {loading ? ( // Conditional rendering based on loading state
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <>
                        {incorrectCredentials && (
                          <p className="text-danger">
                            Wrong Credentials. Please try again.
                          </p>
                        )}

                        <div className='mb-3 d-flex justify-content-between'>
                          <label className="custom-checkbox-label">
                            <input type="checkbox" className="custom-checkbox-input" />
                            Remember me
                          </label>
                          <p className="pb-lg-2 pt-4">
                            <a className="fw-bold custom-link" href="/forgot">
                              Forgot Password?
                            </a>
                          </p>
                        </div>

                          <MDBBtn type="submit" className="btn wide-btn">Login</MDBBtn>

                      </>
                    )}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
        </form>
      </MDBCard>
      
      <MDBCard style={{width: "100%" }}>
        <MDBCardBody style={{ paddingTop: "2  %",backgroundColor: "black" }}>
          <MDBContainer fluid className=" h-custom">
            <MDBRow>
              <MDBCol className="ctcs" md="3">
                <p className="ctc">45LPA</p>
                <p>Highest CTC</p>
              </MDBCol>
              <MDBCol className="ctcs" md="6">
                <p className="ctc">6000+</p>
                <p>Students Upskilled</p>
              </MDBCol>
              <MDBCol className="ctcs-last" md="3">
                <p className="ctc">-100</p>
                <p className="ps-4">Average number of students placed per year</p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="companies text-center">
              <MDBCol className="ms-auto me-auto">
              <p className="header">TOP COMPANIES</p>
              <img src = "/assets/faang-2.png" className="fang-logo"/>
              <p className="desc"></p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>

      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      <div className='me-5 d-none d-lg-block'>
        <h4>Get connected with us on social networks:</h4>
      </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' size="2x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' size="2x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' size="2x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' size="2x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' size="2x" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' size="2x" />
          </a>
        </div>

      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Code Sense
              </h4>
              <p>
                kuch bhi likhde
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>Support</h4>
              <p>
                <a href='#!' className='text-reset'>
                  Provacy policy
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Terms and Conditions
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  FAQ's
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h4 className='text-uppercase fw-bold mb-4'>Contact</h4>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                MLRIT, Dundigal, Telangana
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                rajsekharsir@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> +91 123456789
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          CodeSense.com
        </a>
      </div>
      </MDBFooter>
    </div>
    </>
  );
};

export default LoginPage;