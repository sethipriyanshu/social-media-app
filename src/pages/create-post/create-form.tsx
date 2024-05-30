import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver} from "@hookform/resolvers/yup";
import { addDoc, collection} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

interface CreateFormData {
    title: string;
    description: string;
}


export const CreateForm = () =>{
        const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("*Title is a Required Field"),
        description: yup.string().required("*Description is a Required Field").max(200),
    })
    const { register, handleSubmit, 
        formState: {errors},
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db,"posts");

    const onCreatePost = async (data: CreateFormData) =>{
        addDoc(postsRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            id: user?.uid,
        })
    }
    return( <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title..."{...register("title")}/>
        <p style = {{color: "red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description..."{...register("description")}/>
        <p style = {{color: "red"}}>{errors.description?.message}</p>
        <input type="submit"/>  
    </form>
    )
}