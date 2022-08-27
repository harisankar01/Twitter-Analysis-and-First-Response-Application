import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../src/service/db';

const Container = styled(animated.div)`
display: inline-block;
padding: 3em;
justify-content: center;
align-items: center;
background: #C7D2FE66;
border-radius: 10px;
z-index: 1;
position: relative;
backdrop-filter: blur(10px);
border: 2px solid transparent;
background-clip: border-box;
cursor: pointer;
width: 800px;
height: 300px;
margin-left: 150px;
margin-top: 40px;
`;



const StyledH1 = styled.h1`
    line-height: 1.5;
    letter-spacing: 1.5;
    font-family: "Gilroy";
`;

const StyledH3 = styled.h3`
    line-height: 1.5;
    letter-spacing: 1.15;
    font-family: "Gilroy";
    font-size: 20px;
`;

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const GlassCard = ({val}) => {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}))
    return (
      <div>
        <Container
            onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            style={{
                transform: props.xys.to(trans)
            }}
        >
            <StyledH1> {val.tweet}</StyledH1>
            <StyledH1>{val.Time_of_tweet}</StyledH1>
            <StyledH3>{val.department}</StyledH3>
        </Container>
        </div>
    );
}

export default GlassCard;


export const getServerSideProps=async(context)=>{
  let id=context.query.chat_room
  let ob_id=new ObjectId(id)
  let db=await connectToDatabase(); 
  let val= JSON.parse(JSON.stringify(await db.collection("tweets").findOne(
    {_id:ob_id})));
    // console.log(val);
return {
    props:{
      val
    }
}
}