import axios from 'axios'

export async function getPeriodData(period: string) {
  const { data } = await axios.get(`/api/period/${period}`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  })
  return data
}
