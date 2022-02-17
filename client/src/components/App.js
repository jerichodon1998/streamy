import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamList from "./streams/StreamList";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";

const App = () => {
	return (
		<div className="ui container">
			<Router>
				<Header />
				<Routes>
					<Route path="/" exact element={<StreamList />} />
					<Route path="/streams/new" exact element={<StreamCreate />} />
					<Route path="/streams/edit/:id" exact element={<StreamEdit />} />
					<Route path="/streams/delete/:id" exact element={<StreamDelete />} />
					<Route path="/streams/show/:id" exact element={<StreamShow />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
