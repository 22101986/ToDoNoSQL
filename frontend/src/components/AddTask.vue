<template>
  <v-card class="mb-4">
    <v-card-title>Ajouter une tâche</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addTask">
        <v-text-field v-model="title" label="Titre" required />
        <v-text-field v-model="description" label="Description" />
        <v-btn color="primary" type="submit" block>Ajouter</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

// This component allows users to add new tasks to the ToDo application
export default {
  props: ['token'],
  data() {
    return { title: '', description: '' }
  },
  methods: {
    async addTask() {
      await axios.post('http://localhost:5000/api/tasks', {
        title: this.title,
        description: this.description
      }, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.title = '';
      this.description = '';
      this.$emit('taskAdded');
    }
  }
}
</script>