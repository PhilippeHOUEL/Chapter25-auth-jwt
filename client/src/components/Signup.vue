<template>
  <div class="container d-flex flex-column p-3 justify-content-center align-items-center">
    <h1>Signup</h1>
    <form @submit="trySubmit" class="text-left">
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" v-model="form.email" type="text" />
      </div>
      <div class="form-group">
        <label>Username</label>
        <input class="form-control" v-model="form.username" type="text" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input class="form-control" v-model="form.password" type="password" />
      </div>
      <ul v-if="formErrors.length">
        <li class="text-danger" v-for="error in formErrors" :key="error">{{ error }}</li>
      </ul>
      <button class="btn btn-primary" :class="{ 'disabled': isLoading }">signup</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      formErrors: [],
      form: {
        email: "",
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["isLoading", "errors"])
  },
  // pour retourner le getters errors et le mettre dans formErrors
  watch: {
    errors(newValue) {
      this.formErrors = newValue;
    }
  },
  methods: {
    trySubmit(e) {
      // enleve la comportement par défaut de l'execution du formulaire par le comportemnt normal de HTML
      e.preventDefault();
      // le this.isLoading evite d'appuyer plusieurs sur le bouton submit
      // isLoading à false pour que le dispatch sur l'action du starte s'exécute
      // le isLoading peut etre un mgif d'attente...
      if (this.isValid() && !this.isLoading) {
        console.log(this.form);
        // setTimeout(()=> {
        //   this.$store.dispatch("user/trySignup", this.form);
        // }, 3000);
        this.$store.dispatch("user/trySignup", this.form);

      }
    },
    isValid() {
      this.formErrors = [];
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.form.email
        )
      ) {
        this.formErrors.push("email non valide");
      }
      return this.formErrors.length === 0;
    }
  }
};
</script>

<style scoped>
</style>
