<template>
  <v-app :style="{ backgroundColor: '#f5f5f5' }">
    <v-main>
      <v-container class="py-5">
        <v-row justify="center" v-if="!token">
          <v-col cols="12" md="5">
            <Login @login="onLogin" />
          </v-col>
          <v-col cols="12" md="5">
            <Register @register="onRegister" />
          </v-col>
        </v-row>
        <div v-else>
          <v-row>
            <v-col cols="12" class="d-flex justify-end align-center mb-2">
              <span class="mr-2">Connecté en tant que <strong>{{username}}</strong></span>
              <v-btn color="error" outlined small @click="logout">Déconnexion</v-btn>
            </v-col>
          </v-row>
          <v-row justify="center"> 
            <v-col cols="12" md="6">
              <AddTask :token="token" @taskAdded="reloadTasks" class="mb-0"/>
            </v-col>
            <v-col cols="12" md="6">
              <TaskList :tasks="tasks" :token="token" @update="reloadTasks" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from 'axios'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import TaskList from './components/TaskList.vue'
import AddTask from './components/AddTask.vue'

// This is the main Vue component for the ToDo application
export default {
  components: { Login, Register, TaskList, AddTask },
  data() {
    return {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
      tasks: []
    }
  },
  created() {
    if (this.token) this.reloadTasks();
  },
  methods: {
    async reloadTasks() {
      if (!this.token) return;
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.tasks = res.data;
    },
    onLogin({ token, username }) {
      this.token = token;
      this.username = username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      this.reloadTasks();
    },
    onRegister() {
      alert("Inscription réussie, connectez-vous !");
    },
    logout() {
      this.token = '';
      this.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.tasks = [];
    }
  }
}
</script>