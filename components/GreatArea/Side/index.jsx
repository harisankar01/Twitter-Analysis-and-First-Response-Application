import React from 'react'
import styled from 'styled-components'
import { Menu } from './menu'
import Profile from './Side'
import ToggleSwitch from './Toggle'

const Container = styled.div`
    background-color: ${({ theme }) => theme.secondary};
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;


`

const Sidebar = ({value2}) => {

    return (
        <Container>
            <Profile value2={value2}/>
            <Menu />
            <ToggleSwitch />
        </Container>
    )
}

export default Sidebar