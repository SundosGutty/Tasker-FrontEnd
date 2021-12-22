import { userService } from "../../services/user.service.js";

export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
    },

    getters: {
        getUsers({ users }) {
            return users
        },

        loggedinUser(state) {
            return state.loggedinUser
        },
    },

    mutations: {
        setLoggedinUser(state) {
            state.loggedinUser = userService.getLoggedinUser()
        },
        setUsers(state, { users }) {
            state.users = users;
        },
    },
    actions: {
        async login({ commit }, { user }) {
            try {
                const loggedinUser = await userService.login(user);
                commit({ type: 'setLoggedinUser', user: loggedinUser })
                return loggedinUser;
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { user }) {
            try {
                const loggedinUser = await userService.signup(user)
                commit({ type: 'setLoggedinUser', user: loggedinUser })
                return loggedinUser;
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            try {
                const users = await userService.getUsers();
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            } ''
        },
        async loadAndWatchUser({ commit }, { userId }) {
            try {
                const user = await userService.getById(userId);
                commit({ type: 'setWatchedUser', user })
                socketService.emit('set-user-socket', userId)
                console.log('user socket sended');
                socketService.off(SOCKET_EVENT_USER_UPDATED)
                socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
                    commit({ type: 'setWatchedUser', user })
                })
            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err)
                throw err
            }
        },
        async updateUserLog({ commit }, { user }, { taskInfo }) {
            try {
                user = await userService.update(user);
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
    }
}


