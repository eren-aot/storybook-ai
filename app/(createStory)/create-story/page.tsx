"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StoryCreationSchema } from '@/schemas/schemas'
import { set, z } from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import LoadingPage from '@/components/LoadingPage'

type StoryInput = z.infer<typeof StoryCreationSchema>

const CreateStory = () => {

  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finsishedLoading, setFinishedLoading] = React.useState(false);


  const form = useForm<StoryInput>({
    resolver: zodResolver(StoryCreationSchema),
    defaultValues: {
      story: "",
      sideCharacter: "",
      moralStory: "",
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: StoryInput) => {

    // console.log(data);

    try {
      setShowLoader(true);
      const response = await axios.post('/api/create-story', data);
      console.log(response);
      form.reset();
    } catch (error) {

      console.log(error);
    } finally {
      setShowLoader(false);
      setFinishedLoading(true);
    }

  }

  if (showLoader) {
    return <LoadingPage finished={finsishedLoading} />
  }


  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card className='bg-primary-200'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Create a Story</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='story'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>This story is about</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Tell me about the story...' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sideCharacter'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>The main character friends are - optional</FormLabel>
                    <FormControl>
                      <Input placeholder='Tell me about the story...' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='moralStory'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>The moral of the story is - optional</FormLabel>
                    <FormControl>
                      <Input placeholder='Tell me about the story...' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">
                Generate Story
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateStory