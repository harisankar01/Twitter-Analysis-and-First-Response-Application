import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';
const Container = styled.div`
    margin-top: 5rem;
`

const ProfileName = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
`

const Profile = () => {
    const Image="https://res.cloudinary.com/aaapp/image/upload/v1648914122/profile_images/profile_hvxqfr.png"
    return (
        <Container>
            <Avatar  sx={{width:70, height:70}} />
            {/* src={Image} */}
            <ProfileName>POlice</ProfileName>
        </Container>
    )
}

export default Profile