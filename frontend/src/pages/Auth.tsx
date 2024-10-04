import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
// import { POSTLoginUser } from '@/services/apiCalls';
import { Label } from '@radix-ui/react-label';
// import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoBig from '@/assets/logo-big.svg';
import GoogleIcon from '@/assets/google-icon.svg';
import GithubIcon from '@/assets/github-icon.svg';

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Auth: React.FC = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const { user } = useAuth();

  if (user) {
    navigate('/dashboard');
  }

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault()
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 3000)
  // }

  // const handleLogin = async () => {
  //   console.log('Login clicked');
  //   const res = await POSTLoginUser({ email, password });
  //   console.log(res);
  //   if (res.userdata.token) {
  //     login(res.userdata);
  //     console.log(user)
  //     navigate('/dashboard');
  //   }
  // };



  return (
    <div className="flex items-center justify-center min-h-screen ">
        
      <Card className='min-w-96'>
      <CardHeader className="space-y-1">
      <CardTitle>
            <img src={logoBig} alt="logo" className="h-12 mx-auto" />
        </CardTitle>
        
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <div className='mr-2 h-4 w-4'>
            <img src={GithubIcon} alt="Github" />
            </div>
            GitHub
          </Button>
          <Button variant="outline">
            <div className="mr-2 h-4 w-4">
            <img src={GoogleIcon} alt="Google" />
            </div>
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>
    </div>
  );
};

export default Auth;