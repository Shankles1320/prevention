import React, { Component } from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";

class App extends Component {
	constructor() {
		super();
		this.state = {
			toggle: false
		};
	}

	toggleSideBar = () => {
		this.setState((prevState) => {
			return {
				toggle: !prevState.toggle
			};
		});
	};

	render() {
		console.log(this.props);
		return (
			<div className="App">
				<header>
					<div className="toolBar">Suicide Prevention</div>
					<button onClick={this.toggleSideBar} className="button">
						{this.state.toggle ? "Menu" : "Menu"}
					</button>
					<nav className={this.state.toggle ? "show" : ""}>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/location">Locations</Link>
							</li>
							<li>
								<Link to="/hotLine">Hot Line</Link>
							</li>
							<li>
								<Link to="/email">Email</Link>
							</li>
							<li>
								<button
									onClick={() => {
										axios.post("/api/goodbye").then((res) => {
											console.log("Logged Out");
											this.props.setUser(null);
											this.props.history.push("/");
										});
									}}
								>
									Log Out
								</button>
							</li>
						</ul>
					</nav>
				</header>
				<Switch>
					<Route exact path="/" component={authComponent} />
					{this.props.user && (
						<>
							<Route
								path="/locations"
								render={() => {
									return (
										<div className="background">
											<Locations />
										</div>
									);
								}}
							/>
							<Route
								path="/hotline"
								render={() => {
									return (
										<div className="background">
											<Training />
										</div>
									);
								}}
							/>
							<Route
								path="/email"
								render={() => {
									return (
										<div>
											<Adoption />
										</div>
									);
								}}
							/>
						</>
					)}
				</Switch>
			</div>
		);
	}
}
function mapStateToProps(reduxState) {
	return reduxState;
}
const mapDispatchToProps = {
	setUser
};
const invokedConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(invokedConnect(App));
