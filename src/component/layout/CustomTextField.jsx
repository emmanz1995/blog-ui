import React, {Component} from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'

export const StyledTextField = styled(Form)`
  width: 100%;
  margin: 0 5px;
`

class CustomTextField extends Component {
    render() {
        return(
            <StyledTextField>
                <Form.Group>
                    <Form.Control
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        name={this.props.name}
                    />
                    <Form.Text>{this.props.text}</Form.Text>
                </Form.Group>
            </StyledTextField>
        )
    }
}



export default CustomTextField




