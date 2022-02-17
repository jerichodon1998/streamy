import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../redux/actions";

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId: process.env.REACT_APP_CLIENT_ID,
					scope: "profile email",
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSigninButton = () => {
		this.auth.signIn();
	};
	onSignOutButton = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.onSignOutButton}>
					<i className="google icon" />
					Signout
				</button>
			);
		} else {
			return (
				<button className="ui blue google button" onClick={this.onSigninButton}>
					<i className="google icon" />
					Signin with Google
				</button>
			);
		}
	}

	render() {
		return this.renderAuthButton();
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {
	signIn,
	signOut,
})(GoogleAuth);
