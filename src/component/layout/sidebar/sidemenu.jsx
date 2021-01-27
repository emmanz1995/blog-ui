import React, {Component} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledSideMenu = styled.div`
    
`

class sidemenu extends Component {
    render() {
        return (
            <StyledSideMenu>
                <ul>
                    <Link></Link>
                </ul>
            </StyledSideMenu>
        )
    }
}

export default sidemenu
