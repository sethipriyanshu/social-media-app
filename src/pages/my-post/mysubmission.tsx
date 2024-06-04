import {getDocs, collection} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { StringLiteral } from "typescript";
import { MyPost } from "./my-post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}


export const MySubmission = () =>{
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db,"posts");
    const getPosts = async () =>{
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(),id: doc.id})) as Post[]) ;
    }

    useEffect(()=>{
        getPosts();
    },[])
    
    return <div>
        {postsList?.map((post) =>(<MyPost post = {post} />))}
    </div>
}