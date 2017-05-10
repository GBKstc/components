/**
 * Created by Administrator on 2017/5/7.
 */
import React from "react";
import { render } from "react-dom";
import { Row, Col } from "antd";
import "./utilTest/variable_test";

class HelloWorld extends React.Component{
	render(){
		return (
			<div>
				<Row>
					<Col span={2}>Holle World!</Col>
				</Row>
			</div>
		);
	}
}

render(<HelloWorld/>,document.getElementById("content"));
