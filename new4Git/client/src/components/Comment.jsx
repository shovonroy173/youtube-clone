import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const {currentUser} = useSelector(state => state.user);
  const {currentVideo} = useSelector(state => state.video);
  const [open, setOpen] = useState(false);
  const [setData, setSetData] = useState(false);

console.log(currentVideo);
  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`http://localhost:5000/api/users/find/${comment.userId}`, {
        headers:{
          token: currentUser.accessToken
        }
      });
      setChannel(res.data)
    };
    fetchComment();
  }, [comment?.userId]);
  console.log(comment.desc);
  const comm = comment.desc;
const handleDelete = async()=>{
  await axios.delete(
    `http://localhost:5000/api/comments/${currentVideo?._id}`  , {comm}
       
  );
}
const switchFunc = ()=>{
  setOpen((prevState)=>!prevState);
}
  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel.name} <Date>1 day ago</Date>
        </Name>
        <Text onClick={switchFunc  }  >{comment.desc}</Text>
        {open ? <Button onClick={handleDelete}>Delete</Button> : ""}
      </Details>
    </Container>
  );
};

export default Comment;