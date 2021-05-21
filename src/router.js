
import {createRouter, createWebHashHistory} from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import PostPage from './components/PostPage'
import Subreddit from './components/Subreddit'

const routes = [
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/profile', component: Profile},
    {path: '/r/subname/posts/id', component: PostPage},
    {path: '/r/subname', component: Subreddit},
    {path: '/', component: Home},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;