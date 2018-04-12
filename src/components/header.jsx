import React from 'react';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isExpanded: false};
    this.handleHeaderToggle = this.handleHeaderToggle.bind(this);
  }
  handleHeaderToggle(evt) {
    this.setState({isExpanded: !this.state.isExpanded});
    evt.preventDefault();
  }
  render() {
    return (
      <header>
        <div className={`bg-dark collapse ${this.state.isExpanded ? 'show' : ''}`} id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">Okezie Okpara</h4>
                <p className="text-muted">My submission to the take home assessment by Creatella.</p>
              </div>
              <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Contact</h4>
                <ul className="list-unstyled">
                  <li><a href="https://www.linkedin.com/in/okezieokpara" className="text-white">LinkedIn</a></li>
                  <li><a href="https://github.com/okezieokpara" className="text-white">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark box-shadow">
          <div className="container d-flex justify-content-between">
            <a href="#" className="navbar-brand d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <strong>Face Shop</strong>
            </a>
            <button className="navbar-toggler" type="button" onClick={this.handleHeaderToggle} data-toggle="collapse" aria-controls="navbarHeader" aria-expanded={this.setState.isExpanded} aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>
          </div>
        </div>
      </header>
    );
  }
}
