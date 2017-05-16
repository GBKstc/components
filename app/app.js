/**
 * Created by Administrator on 2017/5/7.
 */
import React from "react";
import { render } from "react-dom";
import { Row, Col, Button } from "antd";
import "./test/variable_test";
import SInputTest from "./test/SInput_test";

class HelloWorld extends React.Component{
	render(){
		return (
			<div>
				<Row>
					<Col span={2}><SInputTest/></Col>
					<Col span={2}>
						<Button
							type="primary"
							size="small"
						>按键</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

render(<HelloWorld/>,document.getElementById("content"));
