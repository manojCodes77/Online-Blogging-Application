import axios from "axios";
import { useEffect, useState } from "react";

export interface Author {
    name: string | null;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    author: Author;
}


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8787/api/v1/post/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('authToken') || '',
                },
            })
            .then((response) => {
                setPost(response.data.post);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const deletePost = async (): Promise<void> => {
        try {
            await axios.delete(`http://localhost:8787/api/v1/post/delete/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('authToken') || '',
                },
            });
            setPost(null); // Remove the post from state
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return {
        loading,
        post,
        deletePost, // Expose deletePost method
    };
};
