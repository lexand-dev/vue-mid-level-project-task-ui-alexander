<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProjects } from '@/stores/projects'

import ProjectForm from '@/components/ProjectForm.vue'

const projects = ref([])
const showForm = ref(false)
const selectedProject = ref(null)
const filters = ref({
  name: '',
  active: '',
})

const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    const matchName = p.name.toLowerCase().includes(filters.value.name.toLowerCase())
    const matchActive = filters.value.active === '' || String(p.isActive) === filters.value.active

    return matchName && matchActive
  })
})

const openForm = (project = null) => {
  selectedProject.value = project
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedProject.value = null
  loadProjects() // Reload projects after closing the form
}

const loadProjects = async () => {
  try {
    const response = await getProjects()
    projects.value = response
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

onMounted(loadProjects())
</script>

<template>
  <h1 class="bg-amber-200 text-center h-16 py-8">Project Management App</h1>
  <p class="py-4 text-center">Create Projects, assign tasks, and track progress with ease.</p>
  <div>
    <input
      v-model="filters.name"
      type="text"
      placeholder="Filter by name"
      class="border p-2 mb-4"
    />
    <select v-model="filters.active">
      <option value="">All</option>
      <option value="true">Active</option>
      <option value="false">Inactive</option>
    </select>
    <button @click="openForm()" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      crear projecto
    </button>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Project Name</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in filteredProjects" :key="project.id">
          <td class="border px-4 py-2">{{ project.name }}</td>
          <td class="border px-4 py-2">{{ project.description }}</td>
          <td class="border px-4 py-2">{{ project.status }}</td>
          <!--   <td class="border px-4 py-2">{{ project.due_date }}</td> -->
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">Error: {{ error }}</div>

    <ProjectForm v-if="showForm" :project="selectedProject" @close="closeForm" />
  </div>
</template>

<style scoped></style>
