import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../types/Post';

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

// Async thunks
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get(`${BACKEND_URL}/api/v1/post/AllPosts`, {
        headers: { Authorization: token },
      });
      return response.data.posts;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const fetchMyPosts = createAsyncThunk(
  'posts/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
        headers: { Authorization: token },
      });
      return response.data.posts;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
        headers: { Authorization: token },
      });
      return response.data.post;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/create',
  async ({ title, content }: { title: string; content: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');
      
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/post/`,
        { title, content },
        { headers: { Authorization: token, 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');
      
      await axios.delete(`${BACKEND_URL}/api/v1/post/delete/${id}`, {
        headers: { Authorization: token },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete post');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch my posts
      .addCase(fetchMyPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
