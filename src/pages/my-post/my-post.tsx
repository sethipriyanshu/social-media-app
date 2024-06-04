import { Post as Ipost } from "../main/main";
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props{
    post: Ipost;
}

interface Like{
    likeId: string;
    userId: string;
}

export const MyPost = (props: Props) =>{
    const {post} = props
    const [user] = useAuthState(auth);
    const postsRef = collection(db,"posts");
    const postsDoc = query(postsRef, where("title","==",post.title))
    const likesRef = collection(db,"likes");
    const likesDoc = query(likesRef, where("postId","==",post.id))

    const deletePost = async () =>{
        const postToDeletequery = query(postsRef, where("title","==",post.title), where("userId","==",user?.uid))
        const postToDeleteData = await getDocs(postToDeletequery);
        const postToDelete = doc(db,"posts",postToDeleteData.docs[0].id);
        await deleteDoc(postToDelete);
        // 
        const likeToDeletequery = query(likesRef, where("postId","==",post.id))
        const likeToDeleteData = await getDocs(likeToDeletequery);
        const likeToDelete = doc(db,"likes",likeToDeleteData.docs[0].id);
        await deleteDoc(likeToDelete);

    }


     return <div className="temp-div"><div className="post-card">
        <div className="title">
            <h1>
                {auth.currentUser?.displayName == post.username ? post.title : null}
            </h1>
        </div>
        <div className="body">
            <p>
                {auth.currentUser?.displayName == post.username ? post.description: null}
            </p>
        </div>
         <div className="footer"><p>
            <button onClick={deletePost}>Delete Post</button>
            </p>
        </div> 

    </div>
    </div>
    
    
}  