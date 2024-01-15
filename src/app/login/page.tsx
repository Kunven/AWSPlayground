'use client'
import {Card, CardBody, Input, CardFooter, Divider, Button,Tabs, Tab} from "@nextui-org/react";
import { useState } from "react";
import { Amplify } from 'aws-amplify';
import config from '../../amplifyconfiguration.json';
import { signUp, confirmSignUp, type ConfirmSignUpInput, autoSignIn, signIn, type SignInInput } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation'
Amplify.configure(config);
export default function Login() {
  const router = useRouter()
  const loginBtn = async () =>{
    try {
      const { isSignedIn, nextStep } = await signIn({ username:email, password:pass });
      router.push('/')
    } catch (error) {
      console.log('error signing in', error);
    }
  }
  const signupBtn = async () =>{    
     try {
       const { isSignUpComplete, userId, nextStep } = await signUp({
         username:newuser,
         password: passconf,
         options: {
           userAttributes: {
             email: newuser,
             phone_number: newphone // E.164 number convention
           },
           // optional
           autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
         }
       });
       console.log(userId);
       setEmailFlag(true)
     } catch (error) {
       console.log('error signing up:', error);
     }
  }
  const confirmEmail = async () =>{
    try {
      //const signInOutput = await autoSignIn();
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username:newuser,
        confirmationCode:emailcode
      });
      router.push('/login')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }
  //login vars
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  //singup vars  
  const [newuser,setNewUser] = useState('');
  const [newpass,setNewPass] = useState('');
  const [passconf,setPassConf] = useState('');
  const [newphone,setNewPhone] = useState('');
  const [emailcode,setEmailCode] = useState('');
  //other vars
  const [emailflag,setEmailFlag] = useState(false);
  return (    
    <div className="flex h-screen">
      <div className="m-auto">
        <Card className="min-w-72">
          <div className="flex justify-center my-10">HERE GOES THE LOGO</div>
          <Tabs className="flex justify-center" size="lg">
            <Tab key="login" title="Login">
              <CardBody>
                <div className=" grid grid-rows-2 grid-cols-1 space-y-1">              
                  <Input type="email" label="Email" value={email}  onChange={e => setEmail(e.target.value)}/>
                  <Input label="Password" type="password" value={pass}  onChange={e => setPass(e.target.value)}/>
                </div>            
              </CardBody>
              <Divider/>
              <CardFooter>
                <Button color="primary" className="min-w-72" onClick={loginBtn}>
                  Login
                </Button>
              </CardFooter>
            </Tab>
            <Tab key="register" title="Register">
              {emailflag ?                
                <div>
                  <CardBody>
                    <div className=" grid grid-rows-1 grid-cols-1 space-y-2">
                      <h3 className="text-default-500 text-small">Enter the code sent to your mail</h3>
                      <Input type="text" label="Email Code" value={emailcode}  onChange={e => setEmailCode(e.target.value)}/>
                    </div>
                  </CardBody>
                  <Divider/>
                  <CardFooter>
                    <Button color="primary" className="min-w-72" onClick={confirmEmail}>
                      Confirm Email
                    </Button>
                  </CardFooter>
                </div>
                :
                <div>
                <CardBody>
                  <div className=" grid grid-rows-1 grid-cols-1 space-y-2">
                    <Input type="text" label="Email" value={newuser}  onChange={e => setNewUser(e.target.value)}/>
                    <Input label="Password" type="password" value={newpass}  onChange={e => setNewPass(e.target.value)}/>
                    <Input label="Confirm Password" type="password" value={passconf}  onChange={e => setPassConf(e.target.value)}/>
                    <Input type="text" label="Phone" value={newphone}  onChange={e => setNewPhone(e.target.value)}/>
                  </div>            
                </CardBody>
                <Divider/>
                <CardFooter>
                  <Button color="primary" className="min-w-72" onClick={signupBtn}>
                    Register
                  </Button>
                </CardFooter>
              </div>
              }
            </Tab>
          </Tabs>          
        </Card>
      </div>
  </div>
  )
}
