<template>
  <div class="modal" @click.self="exit">
    <div class="form">
      <button class="exit" @click="exit">x</button>
      <h4 class="form-title">Delete Todo</h4>
      <div class="input-box">
        <p>Are you sure you want to delete Todo <b>{{ todo.id }}</b>?</p>
      </div>
      <div class="button">
        <button @click="deleteTodo" class="delete-todo-btn">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    todo: {
      required: true
    }
  },
  methods: {
    exit() {
      this.$emit("exitEditModal", false);
    },
    deleteTodo() {
      if (JSON.parse(localStorage.getItem("todos")).length > 1) {
        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo, index) => {
          if (todo.id == this.todo.id) {
            todos.splice(index, 1)
          }
        })
        localStorage.setItem("todos", JSON.stringify(todos));
      } else {
        localStorage.removeItem("todos");
      }
      this.$store.dispatch("fetchTodos");
      this.exit();
    }
  }
};
</script>
