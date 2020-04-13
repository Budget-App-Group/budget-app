import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { checkUser } from "../../redux/userReducer";
import axios from 'axios'
// import { Link } from "react-router-dom";
// import KidRegister from "../Register/KidRegister";
import Transaction from '../Transaction/transaction'
import "./adminDashboard.scss";

function AdminDashboard(props) {
  const [kids, setKids] = useState([])
  useEffect(() => {
    if (!props.user.parentsId) props.history.push("/");
    if (props.user.parentsId) getKid(props.user.parentsId)
  }, [props.user, props.history]);

  const getKid = parents_id => {
    axios.get(`/api/kids/${parents_id}`).then(res => {
      setKids(res.data)
    }).catch(err => console.log(err))
  }

  const kid = kids.map(kid => {
    return (
      <Transaction key={kid.kid_id} kidId={kid.kid_id} firstName={kid.first_name} pic={kid.pic} />
    )
  })

  return (
    <div className="admin-dash-main">
      Admin Dash Comp
      <div className="link-kid-register">
        {/* <Link to="/kidregister">Register a Kid</Link> */}
        {kid}
        {/* <KidRegister /> */}
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
