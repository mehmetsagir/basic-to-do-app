<template>
  <div class="home">
    <AddTodoModal @exitAddTodoModal="addTodoModal = $event" v-if="addTodoModal" />
    <div class="todo-list">
      <div class="todo-list-header">
        <h2 class="title">To-do App</h2>
        <div class="actions">
          <button class="add-todo" @click="addTodoModal = true">Add Todo</button>
          <button class="logout" @click="logout">Logout</button>
        </div>
      </div>
      <div class="todo-search">
        <input type="search" v-model="searchText" placeholder="Search..." />
      </div>
      <div v-if="!todos.length > 0" class="error-message">
        I couldn't find anything on the to-do list.
      </div>
      <div class="todo-list-item" v-for="todo in todos" :key="todo.id">
        <span class="id">{{ todo.id }}</span>
        <div class="text">
          {{ todo.text }}
        </div>
        <div class="actions">
          <button class="update-todo-btn" @click="editModal = true; editTodo = todo;">Update</button>
          <button class="delete-todo-btn" @click="removeModal = true; deleteTodo = todo;">Delete</button>
        </div>
        <EditModal @exitEditModal="editModal = $event" :todo="editTodo" v-if="editModal" />
        <RemoveModal @exitEditModal="removeModal = $event" :todo="deleteTodo" v-if="removeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import EditModal from "@/components/EditModal";
import RemoveModal from "@/components/RemoveModal";
import AddTodoModal from "@/components/AddTodoModal";
export default {
  name: "Home",
  data() {
    return {
      editModal: false,
      removeModal: false,
      addTodoModal: false,
      searchText: "",
      editTodo: null,
      deleteTodo: null
    };
  },
  components: { AddTodoModal, RemoveModal, EditModal },
  created() {
    this.$store.dispatch("fetchTodos");
  },
  computed: {
    todos() {
      const filteredTodos = [];
      this.$store.getters.todos.forEach(todo => {
        if(todo.text.toLowerCase().includes(this.searchText.toLowerCase().trim().replace(/\s+/g, ' ')) || todo.id == this.searchText){
          filteredTodos.push(todo)
        }
      });
      return filteredTodos;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("todo-app");
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  padding: 50px;
  .todo-list {
    max-width: 100vw;
    border-radius: 10px;
    background: #ffff;
    &-header {
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      border-bottom: 1px solid rgba(#ccc, 0.5);
      .title {
        font-size: 30px;
      }
      .actions {
        button {
          border: none;
          outline: none;
          padding: 10px 30px;
          font-size: 16px;
          border-radius: 3px;
          cursor: pointer;
          color: #f4f6f9;
          &.add-todo {
            background: #194cdd;
            margin-right: 15px;
          }
          &.logout {
            background: #e40017;
          }
        }
      }
    }
    .todo-search {
      height: 50px;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid rgba(#ccc, 0.3);
        width: 100%;
        height: 100%;
        background: none;
        padding: 0 15px;
        font-size: 16px;
      }
    }
    &-item {
      height: auto;
      padding: 30px;
      display: flex;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(#ccc, 0.2);
      }
      .id {
        font-weight: bold;
        margin-right: 5px;
        opacity: 0.5;
      }
      .actions {
        min-width: max-content;
        margin-left: auto;
        button {
          padding: 10px 25px;
          outline: none;
          background: transparent;
          cursor: pointer;
          border-radius: 3px;
          transition: 250ms;
          &:hover,
          &:focus{
            color: white;
            &.update-todo-btn {
              background: #194cdd;
            }
            &.delete-todo-btn {
              background: #721c24;
            }
          }
          &.update-todo-btn {
            border: 2px solid #194cdd;
            margin-right: 10px;
          }
          &.delete-todo-btn {
            border: 2px solid #721c24;
          }
        }
      }
    }
  }
}

@media (max-width: 630px) {
  .home {
    padding: 50px 20px;
    .todo-list {
      &-header {
        padding: 20px 0;
        flex-direction: column;
        .title {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
