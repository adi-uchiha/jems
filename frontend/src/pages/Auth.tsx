import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { POSTLoginUser } from '@/services/apiCalls';
import { Label } from '@radix-ui/react-label';
import {LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BMCLogo from '@/assets/BMCLogo.png';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const { login, user } = useAuth();

  if (user) {
    navigate('/dashboard');
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const handleLogin = async () => {
    console.log('Login clicked');
    const res = await POSTLoginUser({ email, password });
    console.log(res);
    if (res.userdata.token) {
      login(res.userdata);
      console.log(user)
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className='w-[400px]'>
        <CardHeader>
        <CardTitle>
            <img src={BMCLogo} alt="logo" className="h-12 mx-auto" />
        </CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>

        <CardContent>
        <form
          className='flex flex-col space-y-4'
          onSubmit={onSubmit}
        >

          
          <div>
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
            autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className=""
            />
          </div>
          <div>
            <Label htmlFor="password" className="">
              Password
            </Label>
            <Input
              id='password'
              type="password"
              placeholder="Password"
              value={password}
              autoCapitalize='none'
              autoComplete='current-password'
              autoCorrect='off'
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              className=""
            />
          </div>
        </form>

        </CardContent>
        <CardFooter>

          <Button
            variant={"default"}
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-2 px-4 "
          >
            {isLoading ? (
              <LoaderCircle className='animate-spin mr-2 h-4 w-4' />
            ) : 'Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;