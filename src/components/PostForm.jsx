import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            id: Date.now(),
            ...post
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                placeholder={'Название поста'}
                type="text"/>
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                placeholder={'Описание поста'}
                type="text"/>
            <MyButton onClick={addNewPost}>Добавить</MyButton>
        </form>
    );
};

export default PostForm;