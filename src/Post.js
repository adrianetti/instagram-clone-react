import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from 'firebase';


function Post({user, postId, imageUrl, caption, username}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const postComment =  (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setComment('');

    }

    useEffect(() => {   
        let unsubscribe;
        if(postId){
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }

        return () => {
            unsubscribe();
        }

    }, [postId]);


    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                className="post__avatar"
                alt={username} 
                src="/static/images/avatar/1.jpg"
            />
                <p><strong>{username}</strong></p>
            </div>
            

            <img className="post__image" alt="" src={imageUrl}/>
            {/* image */}

            <p className="post__text"><strong>{username}</strong> {caption} </p>
            {/* username + caption */}

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>   
            )}
            
            
        </div>
    )
}

export default Post
