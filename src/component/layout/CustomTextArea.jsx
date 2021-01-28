import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class CustomTextArea extends Component {
    render() {
        return(
            <div>
                <Form>
                    <Form.Group>
                        <Form.Control
                            as={this.props.as}
                            rows={this.props.rows}
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            onChange={this.props.onChange}
                            name={this.props.name}
                        />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default CustomTextArea
