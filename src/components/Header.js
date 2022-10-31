import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailField } = this.props;
    return (
      <div>
        <p
          data-testid="email-field"
        >
          {emailField}
        </p>
        <p
          data-testid="total-field"
        >
          0
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailField: state.user.email,
});

Header.propTypes = {
  emailField: PropTypes.any,
}.isRequired;

export default connect(mapStateToProps)(Header);
