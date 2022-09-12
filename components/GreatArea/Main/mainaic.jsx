import { Avatar, Divider } from '@mui/material'
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



const TweetDisplay = ({ data,tweets }) => {
    const router=useRouter()
    const { asPath } = useRouter()
    return (
        <>
        <Container key={data.id}>
            <Avatar src={data.avatar}/>
            <Text>
        BIo:
            {data.bio}
            </Text>
            <Subtitle>Joined date: {data.join_date}</Subtitle>

            <Subtitle>Number of tweet: {data.tweets}
            </Subtitle>
        </Container>
        <Divider light />
      {tweets.map((item)=>{
            return(
                <>
        <Container key={item.id}>
            <Text>
            {item.tweet}
            </Text>
            <Subtitle>Time of tweet: {item.Time_of_tweet}</Subtitle>
            <Subtitle>Tweet associated with {item.tweet_associated_place}</Subtitle>
        </Container>
        <Divider light />
        </>
            )
        })}
        </>
    )
}
export default TweetDisplay