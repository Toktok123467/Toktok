
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreateRemixPage = () => {
  const handleUpload = () => {
    // Mock function for now - would integrate with real upload later
    console.log('Uploading remix...');
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Remix</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Content</CardTitle>
          <CardDescription>
            Upload your original content or fork existing content to remix
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input 
              type="file" 
              accept="audio/*,video/*"
              className="cursor-pointer"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Supported formats: MP3, WAV, MP4
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Remix Details</CardTitle>
          <CardDescription>
            Add information about your remix
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Input placeholder="Title" />
            </div>
            <div>
              <Textarea placeholder="Description" />
            </div>
            <div>
              <Input placeholder="Tags (separated by commas)" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleUpload} className="bg-gradient-to-r from-toktok-purple to-toktok-pink">
          Create Remix
        </Button>
      </div>
    </div>
  );
};

export default CreateRemixPage;
