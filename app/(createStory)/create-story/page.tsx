"use client"
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import axios from 'axios';
import toast from "react-hot-toast";



const formSchema = z.object({
  story: z.string().min(10, {
    message: "story must be at least 10 characters.",
  }),
  sideCharacter: z.string(),
  moral: z.string(),
})


const CreateStoryPage = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: "",
      sideCharacter: "",
      moral: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {

      const response = await axios.post("/api/create-story", values)
      // const response = await axios.get("/api/create-story")
      toast.success("Successfully story created")
      console.log(response)

    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="story"
            render={({ field }) => (
              <FormItem>
                <FormLabel>This story is about</FormLabel>
                <FormControl>
                  <Textarea placeholder="rough story plot" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sideCharacter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>The main characters friends are - optional</FormLabel>
                <FormControl>
                  <Input placeholder="side character" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="moral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>The moral of the story is - optional</FormLabel>
                <FormControl>
                  <Input placeholder="moral" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateStoryPage