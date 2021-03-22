<template>
  <div class="modal">
    <div class="form">
      <button class="exit" @click="exit">x</button>
      <h4 class="form-title">Add Todo</h4>
      <div class="input-box">
        <label>Text</label>
        <textarea class="add-todo" v-model="text"></textarea>
      </div>
      <div class="button">
        <button @click="addTodo">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      id: "",
      text: ""
    };
  },
  methods: {
    exit() {
      this.$emit("exitAddTodoModal", false);
    },
    addTodo() {
      if(localStorage.getItem("todos")) {
        const todos = JSON.parse(localStorage.getItem("todos"));
        const user = JSON.parse(localStorage.getItem("todo-app"));
        this.id = todos.reverse()[0].id + 1;
        todos.forEach((todo, index) => {
          if(this.id == todo.id) {
            this.id = todos.reverse()[0].id + 1 + index;
          }
        })
        if(this.id > 0 && this.text.length > 0){
          todos.push({
            id: this.id,
            text: this.text,
            user: user[0].username
          });
          localStorage.setItem("todos", JSON.stringify(todos));
          this.text = "";
          this.exit();
        }
      } else {
        const user = JSON.parse(localStorage.getItem("todo-app"));
        const todos = [
          { id: 1, text: this.text, user: user[0].username }
        ]
        localStorage.setItem("todos", JSON.stringify(todos));
        this.text = "";
        this.exit();
      }
      this.$store.dispatch("fetchTodos");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
