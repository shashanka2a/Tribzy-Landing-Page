import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowLeft,
  GraduationCap,
  Mail,
  CheckCircle,
  Clock,
  RefreshCw,
  AlertCircle
} from "lucide-react"

export default function VerifyOTP() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const otpString = otp.join('')
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, accept any 6-digit code
      if (otpString.length === 6) {
        router.push('/dashboard')
      } else {
        setError('Invalid verification code. Please try again.')
      }
    }, 2000)
  }

  const handleResend = () => {
    setTimeLeft(300)
    setCanResend(false)
    setError('')
    // Simulate resending OTP
  }

  return (
    <div>
      <Head>
        <title>Verify Email - Tribzy</title>
        <meta name="description" content="Verify your email address" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-6 text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-600">We've sent a verification code to your .edu email</p>
          </div>

          {/* Verification Form */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-xl">Enter Verification Code</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Input */}
                <div>
                  <Label className="text-center block mb-4">6-digit verification code</Label>
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-bold border-2 focus:border-indigo-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-600">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Timer */}
                <div className="text-center">
                  {!canResend ? (
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Code expires in {formatTime(timeLeft)}</span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      Didn't receive the code?{' '}
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        Resend code
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3"
                  disabled={isLoading || otp.join('').length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                </Button>
              </form>

              {/* Help Text */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500">
                  Check your spam folder if you don't see the email
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
