import React, { Component } from "react";
import axios from "axios";
import "./contactUs.scss";

class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      message: "",
      email: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  nodeMail = () => {
    axios
      .post(`/api/mailer`, {
        name: this.state.name,
        message: this.state.message,
        email: this.state.email,
      })
      .then((res) => {
        alert("Thank you for contacting us, we will reply shortly");
      });
  };

  render() {
    return (
      <div className="contact-main">
        <div className="contact-title">
          <h3>Contact Us</h3>
        </div>
        <form className="contact-form" onSubmit={() => this.nodeMail()}>
          <div className="name-area">
            <label className="message-name" htmlFor="message-name">
              Your Name:
            </label>
            <input
              onChange={this.handleInput}
              name="name"
              className="message-input"
              type="text"
              placeholder="Your Name"
              value={this.state.name}
              required
            />
          </div>

          <div className="email-area">
            <label className="message-email" htmlFor="message-email">
              Your Email:
            </label>
            <input
              onChange={this.handleInput}
              name="email"
              className="message-input"
              type="email"
              placeholder="you@email.com"
              required
              value={this.state.email}
            />
          </div>

          <div className="message-area">
            <label className="message-label" htmlFor="message-input">
              Your Message:
            </label>
            <textarea
              onChange={this.handleInput}
              name="message"
              className="message-box"
              type="text"
              placeholder="Please write your message here"
              value={this.state.message}
              required
            />
          </div>

          <div className="submit-button-container">
            <button type="submit" className="submit-contact-button">
              Send Message
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;
