import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ header, content, actions, onModalDismiss }) => {
	return ReactDOM.createPortal(
		<div className="ui dimmer modals visible active" onClick={onModalDismiss}>
			<div
				className="ui standard modal visible active"
				onClick={(e) => e.stopPropagation() /* to stop bubbling up */}
			>
				<div className="header">{header}</div>
				<div className="content">{content}</div>
				<div className="actions">{actions}</div>
			</div>
		</div>,
		document.querySelector("#modal")
	);
};

export default Modal;
