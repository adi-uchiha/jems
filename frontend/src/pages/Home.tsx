import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">JEMS</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl">
            Revolutionizing job matching with AI-powered precision. Connect with your perfect career opportunity today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="default" size="lg" className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors">
              Find Your Dream Job
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 transition-colors">
              For Employers
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">AI-Powered Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our advanced algorithms ensure the perfect fit between candidates and job openings.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Seamless Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Intuitive interface for both job seekers and employers, making the hiring process effortless.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Data-Driven Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Leverage real-time market data to make informed decisions about your career or hiring strategy.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home