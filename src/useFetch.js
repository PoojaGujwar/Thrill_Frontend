import { useEffect, useState } from "react"

const useFetch =(url)=>{
    const [data, setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true)
            const token = localStorage.getItem('loginToken')
            console.log(token)
            const headers ={
                "Content-Type":"application/json",
            }
            if(token){
                headers.Authorization = `${token}`
            }
            console.log(token,url)
            const response = await fetch(url,{headers:headers})
            if(!response.ok){
                throw new Error("Failed to fetch data")
            }
            console.log(response,"Response")
            const result = await response.json()
            setData(result)
        }catch (error) {
            setError(error.message);
            console.error('Fetch error:', error);
        }finally{
            setLoading(false)}
    }
        fetchData()
    },[url])
    return {data,loading, error}
}
export default useFetch;