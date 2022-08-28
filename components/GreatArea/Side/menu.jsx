import React from 'react'
import styled from 'styled-components'
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

const Block = styled.div`
    border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    width: 100%;
    padding: 0.3rem;
    padding-left: 2rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    transition: 0.2s all ease-in-out;

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`


const Span = styled.span`
    /* color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"}; */
    color: ${props => !props.active && props.theme.textColor};
    font-size: 1rem;
    margin-right: 1rem;
`

const Title = styled.h1`
    font-size: 0.9rem;
    font-weight: 300;
    color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"};
`

const MenuLink = ({ title, active, icon,link }) => {
    // console.log(icon);
    const router=useRouter()
    return (
        <Block active={active}>
            <Span active={active} className="iconify" data-inline="false" onClick={()=>router.push(link)}>
                <ViewInArIcon/>
            </Span>
            <Title active={active}>{title}</Title>
        </Block>
    )
}



const Container = styled.div`
    margin-top: 2rem;
    width: 100%;
`

export const Menu = () => {
    const router=useRouter()
    const menuItems = [
  { id: 1, label: "Home", icon: ViewInArIcon, link: `/${router.query.user}` },
  { id: 2, label: "Tweets", icon: "", link: `` },
  { id: 3, label: "Visualize", icon: "", link: `/${router.query.user}/${router.query.departments}/Visualize` },
  { id: 4, label: "Chat Rooms", icon: "", link: `/${router.query.user}/${router.query.departments}/ChatRooms` },
];
    return (
        <Container>
            {menuItems.map((i)=>{
                return(
                    <MenuLink title={i.label} icon={i.icon} link={i.link}/>
                )
            })}
        </Container>
    )
}




// export MenuLink