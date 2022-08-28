import { Divider } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import LaunchIcon from '@mui/icons-material/Launch';
import { useRouter } from "next/router";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0 2rem 18rem;
    border-bottom: 1px solid rgba(190,190,190,0.22);
    cursor: pointer;
    background-color: ${({ theme }) => theme.primary};
    transition: all ease-in-out 300ms;
    &:hover {
        background-color: ${({ theme }) => theme.secondary};
    }
`

const Text = styled.h1`
    font-size: 1.1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
    margin: 0;
`

const Subtitle = styled(Text)`
    display: inline-flex;
    align-items: flex-start;
    font-size: 0.8rem;
    color: #B2BFE1;
    margin-top: 2px;
`



const TweetDisplay = ({ data }) => {
    const router=useRouter()
    const { asPath } = useRouter()
    return (
        <>
        {data.map((item)=>{
            return(
                <>
        <Container key={item._id}>
            <Text>
            {item.tweet}
            </Text>
            <Subtitle>Time of tweet: {item.Time_of_tweet}</Subtitle>
            <Subtitle>Tweet associated with {item.tweet_associated_place}</Subtitle>
            <Subtitle>Tweeted By: {item["User name"]}</Subtitle>
            <LaunchIcon onClick={()=>{router.push(`/${asPath}/${item._id}`)}} />
        </Container>
        <Divider light />
        </>
            )
        })}
        </>
    )
}

export default TweetDisplay