<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
    <div class="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
      <h3>{{ project ? 'Editar projecto' : 'New Project' }}</h3>
      <form @submit.prevent="save" class="space-y-4">
        <div>
          <label>
            Name:
            <input
              v-model="form.name"
              type="text"
              required
              placeholder="Nombre"
              class="w-full rounde-md border border-gray-300"
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              v-model="form.description"
              placeholder="Description"
              class="w-full rounde-md border border-gray-300"
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select v-model="form.status">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
            {{ project ? 'Update' : 'Create' }}
          </button>
          <button @click="$emit('close')" type="button" class="ml-2 bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createProject, updateProject } from '@/stores/projects'

const props = defineProps({
  project: Object,
})

const emit = defineEmits(['close'])

const form = ref({
  name: props.project ? props.project.name : '',
  description: props.project ? props.project.description : '',
  status: props.project ? props.project.status : 'active',
})

async function save() {
  if (props.project) {
    // Update existing project logic
    await updateProject(props.project.id, form.value)
  } else {
    // Create new project logic
    await createProject(form.value)
  }

  emit('close')
}
</script>

<style lang="scss" scoped></style>
