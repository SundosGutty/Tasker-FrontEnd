<template>
  <section class="login-page main-app">
    <nav class="login-nav">
      <div class="logo-section">
        <img class="logo-img" :src="require(`@/pics/favicon-32x32.png`)" />
        <div class="logo-home">tasker.com</div>
      </div>
    </nav>
    <div class="input-container flex" v-if="loginPage">
      <div class="header">
        <h1><span>Log</span>In</h1>
      </div>
      <div class="submit-section">
        <form @submit.prevent="login">
          <div class="input">
            <div class="input-fullname">
              <div class="labels fullname-label">
                <label class="label" for="fullname">Full Name</label>
              </div>
              <div class="fullname-container">
                <input
                  id="fullname"
                  class="fullname"
                  v-model="userCreds.fullname"
                  type="text"
                />
              </div>
            </div>
            <div class="input-password">
              <div class="labels">
                <label class="label" for="password">Password</label>
              </div>
              <div>
                <input
                  id="password"
                  class="password"
                  v-model="userCreds.password"
                  type="password"
                />
              </div>
            </div>
            <input class="btn-login-page" type="submit" />
            <!-- <router-link class="btn-login-page" to="/home"
              >Log in<i class="fas fa-arrow-right"></i
            ></router-link> -->
          </div>
        </form>
      </div>
      <div class="sign-in">
        <div class="line">___________<span>______________</span></div>
        <div class="register">Or Sign-in here</div>
        <div class="line">___________<span>______________</span></div>
      </div>
      <button class="btn-signin-page" @click="signinPage">
        Sign in<i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <div class="input-container flex" v-else>
      <div class="header">
        <h1><span>Sign</span>In</h1>
      </div>
      <div class="submit-section">
        <form @submit.prevent="signup">
          <div class="input">
            <div class="input-fullname">
              <div class="labels fullname-label">
                <label class="label" for="fullname">Fullname</label>
              </div>
              <div class="fullname-container">
                <input
                  class="fullname"
                  v-model="userCreds.fullname"
                  type="txt"
                />
              </div>
            </div>
            <div class="input-email">
              <div class="labels email-label">
                <label class="label" for="email">Email</label>
              </div>
              <div class="email-container">
                <input class="email" v-model="userCreds.email" type="email" />
              </div>
            </div>
            <div class="input-password">
              <div class="labels">
                <label class="label" for="password">Password</label>
              </div>
              <div>
                <input
                  class="password"
                  v-model="userCreds.password"
                  type="password"
                />
              </div>
            </div>
            <input class="btn-login-page" type="submit" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      loginPage: true,
      userCreds: {
        fullname: "",
        password: "",
        email: "",
      },
    };
  },
  created() {
    console.log("hello");
  },
  methods: {
    signinPage() {
      this.loginPage = false;
    },
    async signup() {
      console.log(this.userCreds);
      try {
        await this.$store.dispatch({
          type: "signup",
          user: this.userCreds,
        });
        this.clearInput();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async login() {
      console.log("this.userCreds");
      try {
        await this.$store.dispatch({
          type: "login",
          user: this.userCreds,
        });
        console.log(this.userCreds);
        this.clearInput();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    clearInput() {
      console.log(this.userCreds);
      this.userCreds = { fullname: "", email: "", password: "" };
      this.$router.push(`home`);
    },
  },
};
</script>