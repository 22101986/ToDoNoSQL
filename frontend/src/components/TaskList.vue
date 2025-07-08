<template>
  <v-card>
    <v-card-title>Mes tâches</v-card-title>
    <v-card-text>
      <v-list two-line>
        <v-list-item v-for="task in tasks" :key="task._id">
          <v-list-item-content>
            <v-list-item-title>
              <b>{{task.title}}</b>
              <span v-if="task.completed" class="ml-2">
                <v-chip color="success" small>Terminée</v-chip>
              </span>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{task.description}}<br>
              <small>Assignée à : {{ (task.assignedTo && task.assignedTo.username) ? task.assignedTo.username : 'Moi' }}</small>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn v-if="!task.completed" icon color="success" @click="completeTask(task._id)">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteTask(task._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

// This component displays the list of tasks and allows users to complete or delete them
export default {
  props: ['tasks', 'token'],
  methods: {
    async completeTask(id) {
      await axios.patch(`http://localhost:5000/api/tasks/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.$emit('update');
    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.$emit('update');
    }
  }
}
</script>