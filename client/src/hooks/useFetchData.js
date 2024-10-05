import axios from 'axios'
import React from 'react'

export const useFetchData = ({
  url,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleGetData = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await axios.get(url)
      setData(result)
      onSuccess(result)
    } catch (error) {
      setError(error)
      onError(onError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    handleGetData()
  }, [])

  return {
    data,
    isLoading,
    error,
  }
}
