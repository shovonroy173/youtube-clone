const express = require("express");
const router = express.Router();
const { addVideo, subscribed, trend, random, addView, updateVideo, deleteVideo, getVideo, getByTag, search, latest, likes, dislikes } = require("../controllers/video");
const verifyToken = require("../verifyToken");
 
// create a video
router.post("/" , verifyToken , addVideo );
router.put("/:id" , verifyToken , updateVideo );
router.delete("/:id" , verifyToken , deleteVideo );
router.get("/find/:id" , getVideo );
router.put("/view/:id" , addView );
router.get("/trend" , trend );
router.get("/random" , random );
router.get("/sub" , verifyToken ,  subscribed );
router.get("/tags" , getByTag );
router.get("/search" ,search ); 
router.get("/latest" ,latest ); 
router.get("/likes" , verifyToken , likes ); 
router.get("/dislikes" , verifyToken, dislikes ); 


module.exports = router; 