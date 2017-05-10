/**
 * Created by Administrator on 2017/5/10.
 */
import React from "react";
import SInput from "../../BaseUIWidget/SInput";
import { isEmpty } from "../../util/variable";

class SInputTest extends React.Component {

	constructor(props){
		super(props);
		this.checkOnEnd = this.checkOnEnd.bind(this);
	}

	checkOnEnd(value){
		return isEmpty(value);
	}

	render(){
		return (
			<div>
				<SInput
					checkOnEnd = {this.checkOnEnd}
					checkOnEndMsg = {"数据为空!"}
				/>
				<SInput
					checkOnEnd = {this.checkOnEnd}
					checkOnEndMsg = {"数据为空!"}
				/>
			</div>
		)
	}
}

export default SInputTest;