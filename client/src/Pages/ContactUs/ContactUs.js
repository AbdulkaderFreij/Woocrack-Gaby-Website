import React, { Component } from "react";
import styles from '../../page.module.scss'
import "./Contact.css";
class ContactUs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contactus: [],
      nameChosen: "",
      email: "",
      message: ""
    };
  }

//   async componentDidMount() {
//     fetch("/contacts")
//       .then(res => res.json())
//       .then(contactus =>
//         this.setState({ contactus }, () => console.log("users fetched..", contactus))
//       );
//   }


  nameChosen = e => {
    e.preventDefault();
    this.setState({ nameChosen: e.target.value });
  };


  email = e => {
    e.preventDefault();
    this.setState({ email: e.target.value });
  };

  message = e => {
    e.preventDefault();
    this.setState({ message: e.target.value });
  };


//   addContact() {
//     let newList = this.state.contactus;
//     if (this.state.nameChosen === "" || this.state.email === "" || this.state.message === "") {
//       return "error";
//     }

//     fetch(
//       `/contacts/add?id=${this.state.id}&nameChosen=${this.state.nameChosen}&email=${this.state.email}&message=${this.state.message}`
//     )
//       .then(res => res.json())
//       .then(contactus => {
//         newList.push(contactus);
//         this.setState({ contactus: newList, nameChosen: "", email: "", message: ""  });
//       });
//       alert("Successfully sent")
//   }

  render() {
    return (
      <div className="ContactUs">
        <div className="container">
          <form id="contact" action method="post" onSubmit={event => {
            event.preventDefault();
          }}>
            <h3>Quick Contact</h3>
            <h4>Contact us today, and get reply with in 24 hours!</h4>
            <fieldset>
              <input value={this.state.nameChosen}
            onChange={e => this.nameChosen(e)}
                placeholder="Your name"
                type="text"
                tabIndex={1}
                required
                autofocus
              />
            </fieldset>
            <fieldset>
              <input value={this.state.email}
            onChange={e => this.email(e)}
                placeholder="Your Email Address"
                type="email"
                tabIndex={2}
                required
              />
            </fieldset>
            <fieldset>
              <textarea value={this.state.message}
            onChange={e => this.message(e)}
                placeholder="Type your Message Here...."
                tabIndex={5}
                required
                defaultValue={""}
              />
            </fieldset>
            <fieldset>
              <button
                className={styles.loginbutton}
                name="submit"
                type="submit"
                id="contact-submit"
                data-submit="...Sending"
                onClick={ e => this.addContact()
                }
              >
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default ContactUs;
