import {createStore} from 'vuex';
const store = createStore({
  state:{
    user:{
      data:{name:'Adrian'},
      token:null
    }
  },
  getters:{},
  actions:{
    registerMember({commit},user){
      return fetch(`http://localhost:8000/api/register`,{
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
        },
        method:"POST",
        body:JSON.stringify(user)
      })
      .then((res)=>res.json())
      .then((res)=>{
        // commit("setUser",res)
        return res
      })
    }
  },
  mutations:{
    setUser:(state,userData)=>{
      state.user.token = userData.token;
      state.user = userData.user;
      sessionStorage.setItem('TOKEN',userData.token)
    }
  },
  modules:{}
})

export default store;
