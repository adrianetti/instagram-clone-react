import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { db, storage } from './firebase';
import firebase from 'firebase';
import './ImageUpload.css'
import ProgressBar from './ProgressBar';
import PublishIcon from '@material-ui/icons/Publish';

function ImageUpload({username}) {
    const [image, setImage] = useState('null');
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    }
                    )
            }
        )
    };

    return (
        <div className="imageupload">
            <ProgressBar progress={progress}/>
            <input 
            className="imageupload__input"
            type="text" 
            placeholder="Enter a caption..."
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            />
            
            
            <div className="imageupload__submit">
                <input
                    className="imageupload__file"
                    id="files"
                    type="file" 
                    onChange={handleChange}
                />
                
                <Button>
                   <label for="files">Select file</label> 
                </Button>
                
                
                
                <Button
                    className="imageupload__button" 
                    onClick={handleUpload}
                >
                <PublishIcon/>
                </Button>  
            </div>
            

        </div>
    )
}

export default ImageUpload
