
import {createRouter, createWebHashHistory} from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import PostPage from './components/PostPage'
import Subreddit from './components/Subreddit'
import SearchResults from "./components/SearchResults";

const routes = [
    {path: '/login', component: Login, meta: {requiresAuth: false}},
    {path: '/register', component: Register, meta: {requiresAuth: false}},
    {path: '/profile', component: Profile, meta: {requiresAuth: true}},
    {path: '/r/:subname/posts/:id', component: PostPage, meta: {requiresAuth: true}},
    {path: '/r/:subname', component: Subreddit, meta: {requiresAuth: true}},
    {path: '/', component: Home, meta: {requiresAuth: true}, },
    {path: '/search/:query', name: 'search', component: SearchResults, meta: {requiresAuth: true}, props: true },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({path: "/login", query: {redirect: to.fullPath}})
        }
    }
    next();
});


export default router;