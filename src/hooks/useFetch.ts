import { useState, useEffect } from 'react'

export const useFetch = (url: string) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function fetchData(url: string) {
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setData(res)
      })
      .catch((e) => {
        setError(e?.message)
      })
  }

  useEffect(() => {
    if (url) {
      fetchData(url)
    }
  }, [])

  return { data, loading, error }
}
