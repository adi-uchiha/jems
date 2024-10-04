'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function PdfUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
    } else {
      alert('Please select a PDF file.')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file first.')
      return
    }
    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append('pdf', selectedFile)
    try {
      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        alert('PDF uploaded successfully!')
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading PDF:', error)
      alert('Failed to upload PDF. Please try again.')
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Upload PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-upload">Select PDF File</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={triggerFileInput}
                  variant="outline"
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose PDF
                </Button>
              </div>
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Embed
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}