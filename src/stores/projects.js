import axios from 'axios'

const api = axios.create({
  baseURL: 'https://681507e7225ff1af162aeb7e.mockapi.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})
/* https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects
   https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks */

function projectList(project) {
  return {
    ...project,
    /*     isActive:
      typeof project.isActive === 'boolean'
        ? project.isActive
        : project.status?.toLowerCase().includes('activo') ||
          project.status?.toLowerCase().includes('active'), */
    status: project.status || (project.isActive ? 'active' : 'inactive'),
  }
}

export const getProjects = async () => {
  const { data } = await api.get('/projects')
  return data.map(projectList)
}

export const createProject = async (project) => {
  const { data } = await api.post('/projects', project)
  return data
}

export const updateProject = async (id, project) => {
  const { data } = await api.put(`/projects/${id}`, project)
  return data
}
