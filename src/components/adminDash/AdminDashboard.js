import React, { useEffect } from "react";
import { connect } from "react-redux";
import { checkUser } from "../../redux/userReducer";
// import { Link } from "react-router-dom";
import KidRegister from "../Register/KidRegister";
import "./adminDashboard.scss";

function AdminDashboard(props) {
  useEffect(() => {
    if (!props.user.parentsId) props.history.push("/");
  }, [props.user, props.history]);

  return (
    <div className="admin-dash-main">
      Admin Dash Comp
      <div className="link-kid-register">
        {/* <Link to="/kidregister">Register a Kid</Link> */}
        <KidRegister />
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => {
  const { user } = reduxState.user;
  return {
    user,
  };
};

export default connect(mapStateToProps, { checkUser })(AdminDashboard);
