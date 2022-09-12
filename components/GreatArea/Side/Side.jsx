import React from 'react'
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';

const Container = styled.div`
    margin-top: 5rem;
`

const ProfileName = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
`

const Profile = ({value2}) => {
    const Router=useRouter()
    // const Image=value2.image_url
    return (
        <Container>
            <Avatar  sx={{width:70, height:70}} />
            {/* src={Image} */}
            <ProfileName>{Router.query.user}</ProfileName>
        </Container>
    )
}

export default Profile