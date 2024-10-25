import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { IWorker } from '../types/worker'
import { workerCrudApi } from '../api/worker-api'

// Fetch all workers
export const useWorkers = () => {
  return useQuery<IWorker[], Error>({
    queryKey: ['workers'],
    queryFn: () => workerCrudApi.getWorkers(),
  })
}

// Fetch a specific worker by ID
export const useWorker = (id: string) => {
  return useQuery<IWorker, Error>({
    queryKey: ['worker', id],
    queryFn: () => workerCrudApi.getWorker(id),
  })
}

// Create a new worker
export const useCreateWorker = () => {
  const queryClient = useQueryClient()
  return useMutation<IWorker, Error, IWorker>({
    mutationFn: (newWorker: IWorker) => workerCrudApi.createWorker(newWorker),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] })
    },
    onError: (error) => {
      console.error('Error creating worker:', error.message)
    },
  })
}

// Define the argument type for update mutation
type UpdateWorkerVariables = {
  id: string
  worker: Partial<IWorker>
}

// Update a worker
export const useUpdateWorker = () => {
  const queryClient = useQueryClient()
  return useMutation<IWorker, Error, UpdateWorkerVariables>({
    mutationFn: ({ id }: UpdateWorkerVariables) =>
      workerCrudApi.updateWorker(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['worker', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['workers'] })
    },
    onError: (error) => {
      console.error('Error updating worker:', error.message)
    },
  })
}

// Delete a worker
export const useDeleteWorker = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => workerCrudApi.deleteWorker(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] })
    },
    onError: (error) => {
      console.error('Error deleting worker:', error.message)
    },
  })
}