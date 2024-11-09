import { useState } from 'react'
import axios from 'axios'

const apiUrl = 'https://rebo-work.uz/api/histories' // Replace with your actual API URL

// Define the History interface
interface History {
  worker_id: string
  qr_code_text: string
  work_place_name: string
  scan_time: string
}

// Hook for creating a history
export const useCreateHistory = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState(null) // You can define the data type based on your API response

  const createHistory = async (history: History) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(apiUrl, history)
      setData(response.data)
    } catch {
      setError('An error occurred while creating history')
    } finally {
      setLoading(false)
    }
  }

  return {
    createHistory,
    loading,
    error,
    data
  }
}
