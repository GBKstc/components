import React from 'react'
const classnames = require('classnames');
require('../../css/panel.css');

class Panel extends React.Component {
	constructor (props) {
		super(props);
	}
	render() {
		let panelClassName = classnames(
			this.props.panelClassName,
			"rct-panel"
		);
		let headClassName = classnames(
			this.props.headClassName,
			"rct-panel-header"
		);
		let contentClassName = classnames(
			this.props.contentClassName,
			"rct-panel-content"
		);

		const title_div = (
			<div className={headClassName} style={{height:'auto',color:"black"}}>
				{this.props.title}
			</div>
		);

		const foot = (
			<div className={headClassName} style={{color:"black"}}>
                {this.props.foot}
			</div>
		);

		return (
			<div className={panelClassName}>
				{this.props.title ? title_div : ""}
				<div className={contentClassName}  style={{height:this.props.height ? this.props.height + "px" : "auto"}}>
					{this.props.children}
				</div>
				{this.props.foot ? foot : ""}
			</div>
		)
	}
}

export default Panel