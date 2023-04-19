import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { Button } from "@mui/material";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {

  const  {currentUser}  = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [addComments, setAddComments] = useState("");

  useEffect(() => { 
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`
        // , {
        //   headers:{
        //     token: currentUser.accessToken
        //   }
        // }
        );
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const handleComment = async()=>{
   
    await axios.post(
      `http://localhost:5000/api/comments/`  , {
         videoId , desc:addComments  }
    );
    console.log(addComments , videoId);
    setAddComments("");
  }
 useEffect(()=>{
  handleComment();
 } , [])


  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." value={addComments}  onChange={(e)=>{setAddComments(e.target.value)}} />
        <Button onClick={handleComment} >Comment</Button>
      </NewComment>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
        
      ))}
    </Container>
  );
};

export default Comments;