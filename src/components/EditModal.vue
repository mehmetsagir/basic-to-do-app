<template>
  <div class="modal" v-if="todo">
    <div class="form">
      <button class="exit" @click="exit">x</button>
      <h4 class="form-title">Edit Todo</h4>
      <div class="input-box">
        <label>ID</label>
        <input type="text" v-model="todo.id" readonly />
      </div>
      <div class="input-box">
        <label>Text</label>
        <textarea v-model="editTodoText"></textarea>
      </div>
      <div class="button">
        <button @click="editTodo">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      editTodoText: this.todo.text,
    };
  },
  props: {
    todo: {
      required: true
    }
  },
  methods: {
    exit() {
      this.$emit("exitEditModal", false);
    },
    editTodo() {
      const todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach(oldTodo => {
        if(this.todo.id == oldTodo.id) {
          oldTodo.text = this.editTodoText;
        }
      })
      localStorage.setItem("todos", JSON.stringify(todos));
      this.editTodoText = "";
      this.$store.dispatch("fetchTodos");
      this.exit();
    }
  }
};
</script>
