import "../App.css";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import AllClassrooms from "../Component/AllClassrooms";
import AddClassroom from "../Component/AddClassroom";
import EditClassroom from "../Component/EditClassroom";
import NavBar from "../Component/NavBar";
import NotFound from "../Component/NotFound";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import logo from "../Assets/Images/logo/webscript.png";
import SideMenu, { menuItems } from "../components/SideMenu";
import DecodeJwt from "jwt-decode";

const Dashboard = () => <h1>Dashboard</h1>;
const Content = () => <h1>Content</h1>;
const Courses = () => <h1>Content/Courses</h1>;
const Videos = () => <h1>Content/Videos</h1>;
const Design = () => <h1>Design</h1>;
const Content2 = () => <h1>Content2</h1>;
const Courses2 = () => <h1>Content/Courses 2</h1>;
const Videos2 = () => <h1>Content/Videos 2</h1>;
const Design2 = () => <h1>Design 2</h1>;

function LoginPage() {
  const [inactive, setInactive] = useState(false);

  const adminUser = {
    email: "mohab.alfarra@medtech.tn",
    password: "admin1234",
  };

  const [user, setUser] = useState({ role: "user", name: "", email: "" });

  const Logout = () => {
    setUser({ role: "", name: "", email: "" });
    Cookies.remove("access_token");
    console.log(Cookies.get("access_token"));
  };

  const decodeJwt = (token) => {
    var decodedToken = DecodeJwt(token);
    return decodedToken.role;
  };
  return (
    <div>
      {Cookies.get("access_token") != undefined &&
      Cookies.get("access_token") ? (
        <div className="welcome">
          <div>
            {decodeJwt(Cookies.get("access_token")) != "admin" ? (
              <BrowserRouter>
                <SideMenu
                  onCollapse={(inactive) => {
                    console.log(inactive);
                    setInactive(inactive);
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "inherit",
                    alignItems: "inherit",
                  }}
                >
                  <div className={`container ${inactive ? "inactive" : ""}`}>
                    {/* improvememt, not recorded in video, its just looping through menuItems
          instead of hard coding all the routes */}
                    {menuItems.map((menu, index) => (
                      <>
                        <Route
                          key={menu.name}
                          exact={menu.exact}
                          path={menu.to}
                        >
                          <h1>{menu.name}</h1>
                        </Route>
                        {menu.subMenus && menu.subMenus.length > 0
                          ? menu.subMenus.map((subMenu, i) => (
                              <Route key={subMenu.name} path={subMenu.to}>
                                <h1>{subMenu.name}</h1>
                              </Route>
                            ))
                          : null}
                      </>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="button-logout"
                    onClick={Logout}
                  >
                    Logout
                  </button>
                </div>
              </BrowserRouter>
            ) : (
              <BrowserRouter>
              <NavBar />
             
                <Switch>
                  <Route exact path="/all" component={AllClassrooms} />
                  <Route exact path="/add" component={AddClassroom} />
                  <Route exact path="/edit/:id" component={EditClassroom} />
                </Switch>
                <div> 
                <button  type="button" className="button-logout-admin" onClick={Logout}>Logout</button>
                </div>
              </BrowserRouter>
            )}
          </div>
        </div>
      ) : (
        <div className="App">
          <div className="logo-img">
            <img src={logo} alt="webscript" />
          </div>
          <LoginForm />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
