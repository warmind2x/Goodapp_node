export const state = () =>({
    auth:null,
    projects:[],
    requisitions:[],

});

export const mutations = {
    setAuth(state, auth){
        state.auth = auth;
    },

    setProjects(state, projects){
        state.projects = projects;
    },

    setRequisitions(state, requisitions){
        state.requisitions = requisitions;
    },

};

export const actions = {
    readToken(){
        let auth = null;
        try {
            auth = JSON.parse(localStorage.getItem("auth"))
        } catch (error) {
            console.error(error);
        }
        this.commit("setAuth", auth)
    },

    

};