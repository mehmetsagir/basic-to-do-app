import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    getTodo(state, todo) {
      state.todos.push(todo);
    }
  },
  actions: {
    fetchTodos(context) {
      context.state.todos = [];
      if(localStorage.getItem("todos")) {
        const todos = JSON.parse(localStorage.getItem("todos"));
        const user = JSON.parse(localStorage.getItem("todo-app"));
        todos.forEach(todo => {
          if(user[0].username === todo.user) {
            context.commit("getTodo", todo);
          }
        })
      }
    }
  },
  getters: {
    todos(state) {
      return state.todos.reverse();
    }
  },
});
