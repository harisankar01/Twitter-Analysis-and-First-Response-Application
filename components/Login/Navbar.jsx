import Image from "next/image";
import React from "react";
import { useEffect,useState } from "react";
import styled from "styled-components";
import logo from "../../public/static/india-svgrepo-com.svg";
import Input from "./Container";
import { location,states } from "./states";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import { useRouter } from 'next/router';
const Sidebar = () => {
    const [locations, setlocations] = useState("")
    const [Districts, setDistricts] = useState("")
    const [Temp, setTemp] = useState([])
    const router=useRouter()
  const handleChange = (event) => {
    // console.log(event.target.value);
    setlocations(event.target.value);
    setTemp(location.loc.filter((item)=>item.state_id==event.target.value))
  };
   const handleChange2 = (event) => {
    setDistricts(event.target.value);
  };
  const Logger=()=>{
    const user_name=location.loc.find((item)=>item.city_id==Districts)
    router.push(`/${user_name.city_name}`);
  }

  return (
    <Container>
      <LogoWrapper>
        <Image src={logo} alt=""/>
      </LogoWrapper>
      <Texter>
        <h3>
          News Alert <span>/Flash</span>
        </h3>
        </Texter>
      <Form>
      <FormControl sx={{ m: 1, minWidth: 190 }}>
        <InputLabel id="states">State</InputLabel>
        <Select
          labelId="states"
          value={locations}
          onChange={handleChange}
          autoWidth
          label="State"
        >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {states.states.map(
          (item) => {
            return(
           <MenuItem value={item.state_id}>{item.state_name}</MenuItem>
            )
          }
        )}
        </Select>
        </FormControl>
       <Box sx={{ m: 0.5 }} />
       <FormControl sx={{ m: 1, minWidth: 190 }}>
       <InputLabel id="District">Location</InputLabel>
        <Select
          labelId="District"
          value={Districts}
          onChange={handleChange2}
          autoWidth
          label="Location"
        >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Temp.map(
          (item) => {
            return(
                <MenuItem value={item.city_id}>{item.city_name}</MenuItem>
            )
          }
        )}
        </Select>
        </FormControl>
        <button onClick={Logger}>Log In</button>
      </Form>
      <div>

      </div>
    </Container>
  );
};



const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    margin-right: 25px;
    color: #666666;
    margin-bottom: 2rem;
  }

  button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 2rem 1rem 1rem;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const LogoWrapper = styled.div`

/* width: 100px; */
`;

const Texter=styled.div`
    h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 22px;
  }

  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 18px;
  }
`

const Container = styled.div`
  min-width: 400px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
    margin-top: 2rem;

    span {
      color: #ff8d8d;
      cursor: pointer;
    }
  }
`;

export default Sidebar;