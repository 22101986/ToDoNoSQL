<template>
  <v-card class="mb-3">
    <v-card-title>Connexion</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field v-model="username" label="Nom d'utilisateur" required />
        <v-text-field v-model="password" label="Mot de passe" type="password" required />
        <v-btn color="primary" type="submit" block>Se connecter</v-btn>
        <v-alert v-if="error" type="error" dense class="mt-2">{{error}}</v-alert>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

// This component handles user login for the ToDo application
export default {
  data() {
    return { username: '', password: '', error: '' }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.username,
          password: this.password
        });
        this.$emit('login', { token: res.data.token, username: res.data.username });
      } catch (e) {
        this.error = (e.response && e.response.data && e.response.data.error) 
          ? e.response.data.error 
          : 'Erreur de connexion';
      }
    }
  }
}
</script>