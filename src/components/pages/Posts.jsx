import React, {useEffect, useState} from "react";
import '../../styles/App.css';
import {usePosts} from "../../hooks/usePosts";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import {getPagesCount} from "../utils/pages";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/MyModal/MyModal";
import PostForm from "../PostForm";
import PostFilter from "../PostFilter";
import PostList from "../PostList";
import Pagination from "../UI/pagination/Pagination";
import Loader from "../UI/Loader/Loader";


function Posts() {

    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)



    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: '20px'}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} setVisible={setModal}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Произошла ошибка: ${postError}</h1>}
            {isPostsLoading
                ? <div style={{display:'flex', justifyContent:'center', marginTop:50}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов 1'/>
            }
            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>

        </div>
    );
}

export default Posts;
