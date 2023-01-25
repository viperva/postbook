import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { PostType, UserType } from "./COMPONENTS/MISC/types";

interface EditPost {
  userId: number;
  id: string;
  title: string;
  body: string;
  newTitle: string;
  newBody: string;
}

interface PostsSliceState {
  posts: PostType[];
}

interface UsersSliceState {
  users: UserType[];
}

const initialPostsState: PostsSliceState = {
  posts: [],
};

const initialUsersState: UsersSliceState = {
  users: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<PostType>) => {
      state.posts = [
        ...state.posts,
        {
          userId: action.payload.userId,
          id: (state.posts.length + 1).toString(),
          title: action.payload.title,
          body: action.payload.body,
        },
      ];
    },
    removePost: (state, action: PayloadAction<PostType>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    editPost: (state: PostsSliceState, action: PayloadAction<EditPost>) => {
      const editedPost = {
        ...action.payload,
        title: action.payload.newTitle,
        body: action.payload.newBody,
      };
      console.log(state.posts.slice(0, Number(action.payload.id) - 1));
      state.posts = [
        ...state.posts.slice(0, Number(action.payload.id) - 1),
        editedPost,
        ...state.posts.slice(Number(action.payload.id), state.posts.length),
      ];
    },
  },
});

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<UserType>) => {
      state.users = [
        {
          id: state.users.length + 1,
          name: action.payload.name,
          username: action.payload.username,
          email: action.payload.email,
          address: action.payload.address,
          phone: action.payload.phone,
          website: action.payload.website,
          company: action.payload.company,
        },
        ...state.users,
      ];
    },
  },
});

export const { addPost, removePost, editPost, setPosts } = postsSlice.actions;

export const { addUser, setUsers } = usersSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectUsers = (state: RootState) => state.users.users;

export default store;
