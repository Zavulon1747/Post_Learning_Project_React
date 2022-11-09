import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPosts] = useState({})
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPosts(response.data)
    })

    useEffect(() => {
        fetchPostById()
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id} {post.title}</div>
            }

        </div>
    );
};

export default PostIdPage;