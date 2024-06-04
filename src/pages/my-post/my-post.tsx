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
    const likesRef = collection(db,"likes");
    const likesDoc = query(likesRef, where("postId","==",post.id))
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null);

    const getLikes = async () =>{
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})));
    }
    const addLike = async () =>{
        try{
        const newDoc = await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id
        })
        if(user){
        setLikes((prev) => prev ?[...prev, {userId: user?.uid,likeId: newDoc.id}] : [{userId: user?.uid,likeId: newDoc.id}]);
        }
    }
    catch(err){
        console.log(err);
    }
    }

    const removeLike = async () =>{
        try{
            const likeToDeletequery = query(likesRef, where("postId","==",post.id), where("userId","==",user?.uid))
            const likeToDeleteData = await getDocs(likeToDeletequery);
            const likeToDelete = doc(db,"likes",likeToDeleteData.docs[0].id);
            await deleteDoc(likeToDelete);
        if(user){
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id));
        }
    }
    catch(err){
        console.log(err);
    }
    }

    const hasUserLiked = likes?.find((like) => like.userId == user?.uid);
    useEffect(()=>{
        getLikes();
    },[])


     return <div className="temp-div"><div className="post-card">
        <div className="title">
            <h1>
                {auth.currentUser?.displayName == post.username && post.title}
            </h1>
        </div>
        <div className="body">
            <p>
                {auth.currentUser?.displayName == post.username && post.description}
            </p>
        </div>
        <div className="footer"><p>
            <button>Delete Post</button>
            </p>
        </div>

    </div>
    </div>
    
    
}  