// imports to implement forms and form validation
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver} from "@hookform/resolvers/yup";
//imports for firebase
import { addDoc, collection} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
// import to navigate page at the end of function
import { useNavigate } from "react-router-dom";

// post form data type declaration as an interface
interface CreateFormData {
    title: string;
    description: string;
}


export const CreateForm = () =>{
    // using auth for current user data
    const [user] = useAuthState(auth);
    // declaring navigate state
    const navigate = useNavigate();
    // using yup to declare the schema to validate form input
    const schema = yup.object().shape({
        title: yup.string().required("*Title is a Required Field"),
        description: yup.string().required("*Description is a Required Field").max(200),
    })
    // form processing
    const { register, handleSubmit, 
        formState: {errors},
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });
    // reference to the posts 
    const postsRef = collection(db,"posts");
    //function to handle form submissions
    const onCreatePost = async (data: CreateFormData) =>{
        addDoc(postsRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        })
        navigate("/");
    }
    // return html components for the form
    return( <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title..."{...register("title")}/>
        <p style = {{color: "red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description..."{...register("description")}/>
        <p style = {{color: "red"}}>{errors.description?.message}</p>
        <input type="submit" className="submitformbutton"/>  
    </form>
    )
    
}