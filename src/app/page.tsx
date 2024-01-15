'use client'
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import config from '../amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';
import { useRouter } from 'next/navigation'
Amplify.configure(config);
export default function Home() {
  const router = useRouter()
  const [isLoggedIn,setLoginFlag] = useState(false)  
  useEffect(() => {    
    (async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();        
        setLoginFlag(true)        
      } catch (err) {
        console.log(err);
        router.push('/login')
      }
    })();

  },[]);
  return (
    <div>
      {isLoggedIn ? <span>Here goes the app!</span>: <span>Redirect to login</span>}      
    </div>
  )
}
