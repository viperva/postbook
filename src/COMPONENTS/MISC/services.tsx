import axios from 'axios';
import { PostType, CommentType, UserType } from './types';


export async function getPosts(){
    const { data } = await axios.get<PostType[]>('https://jsonplaceholder.typicode.com/posts');
    return data;
}

export async function getPost(postId: string | undefined){
    const { data } = await axios.get<PostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return data;
}

export async function getComments(postId: string | undefined){
    const { data } = await axios.get<CommentType[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return data;
}

export async function getUsers(){
    const { data } = await axios.get<UserType[]>('https://jsonplaceholder.typicode.com/users');
    return data;
}

export async function postComment(postId: string | undefined, data: CommentType){
    const comment = await axios.post<CommentType>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, data);
    return comment;
}

export async function postPost(data: PostType){
    const post = await axios.post<PostType>(`https://jsonplaceholder.typicode.com/posts/`, data);
    return post;
}

export async function postUser(data: UserType){
    const user = await axios.post<UserType>(`https://jsonplaceholder.typicode.com/users/`, data);
    return user;
}

export async function getUser(userId: string | undefined){
    const { data } = await axios.get<UserType>(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return data;
}

export async function getUserPosts(userId: string | undefined){
    const { data } = await axios.get<PostType[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return data;
}

export async function deletePost(postId: number){
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

export async function deleteComment(postId: number, commentId: number){
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}/comments?id=${commentId}`);
}
