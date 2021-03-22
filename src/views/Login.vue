<template>
  <div class="login">
    <div class="container">
      <h3>Login</h3>
      <form @submit.prevent="login">
        <div class="error-message" v-if="errorMessage !== null">
          {{ errorMessage }}
        </div>
        <div class="input-box">
          <input type="text" v-model="username" required />
          <label>Username</label>
        </div>
        <div class="input-box">
          <input type="password"  v-model="password" required />
          <label>Password</label>
        </div>
        <div class="button">
          <button>Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      errorMessage: null,
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.username.length > 0 && this.password.length > 0) {
        const users = require("../../fake-api/accountjson.json").accounts;

        users.filter((user) => {
          if ( user.username == this.username && user.password == this.password ) {
            this.errorMessage = null;
            const userdata = [
              { username: this.username, password: this.password },
            ];
            localStorage.setItem("todo-app", JSON.stringify(userdata));
            this.$router.push("/");
          }
        });
      } else {
        this.errorMessage = "Please fill in all the blanks!";
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;

  .container {
    width: 500px;
    padding: 50px;
    border-radius: 10px;
    background: #fff;

    h3 {
      font-size: 35px;
      text-align: center;
    }

    form {
      margin-top: 60px;
      .input-box {
        position: relative;
        height: 40px;
        border: 1px solid #ccc;

        &:not(:first-child) {
          margin-top: 20px;
        }

        label {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          pointer-events: none;
          background: #fff;
          padding: 0 5px;
          transition: 300ms;
        }

        input {
          width: 100%;
          height: 100%;
          padding: 0 10px;
          border: none;
          outline: none;

          &:focus + label,
          &:valid + label {
            top: -2px;
            font-size: 14px;
          }
        }
      }
      .button {
        margin-top: 20px;
        text-align: right;
        button {
          border: none;
          outline: none;
          padding: 8px 45px;
          font-size: 15px;
          border-radius: 3px;
          background: #194cdd;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
