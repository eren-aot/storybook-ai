"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReceipesCreationSchema } from '@/schemas/schemas'
import { z } from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Separator } from '@/components/ui/separator'

type ReceipeInput = z.infer<typeof ReceipesCreationSchema>

const CreateReceipes = () => {

  const router = useRouter();

  const form = useForm<ReceipeInput>({
    resolver: zodResolver(ReceipesCreationSchema),
    defaultValues: {
      theme: "",
      ingredients: "",
      restriction: "",
      cookingTime: "10min",
      numberOfIngredients: "5",
      levelOfDifficulty: "medium",

    }
  })

  const onSubmit = async (data: ReceipeInput) => {

    console.log(data);

    try {
      console.log("Hi there")
      const response = await axios.post('/api/generate-recipes', data);
      console.log(response);
      form.reset();
    } catch (error) {

      console.log(error);
    } finally {

    }

  }

  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card className='bg-primary-200'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Generate Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='theme'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Halloween cookies, dinosaur nuggets, etc' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ingredients'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Ingredient - optional</FormLabel>
                    <FormControl>
                      <Input placeholder='Chocolate chips, cheese, cherry tomatoes, etc.' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-0">
                <Button
                  variant={
                    form.getValues("cookingTime") === "10min" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-l-lg px-2"
                  onClick={() => {
                    form.setValue("cookingTime", "10min");
                  }}
                >
                  Quick (10 minutes)
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("cookingTime") === "25min" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none px-2"
                  onClick={() => {
                    form.setValue("cookingTime", "25min");
                  }}
                >
                  Medium (20 - 30 minutes)
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("cookingTime") === "30min" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-r-lg px-2"
                  onClick={() => {
                    form.setValue("cookingTime", "30min");
                  }}
                >
                  Longer (30+ minutes)
                </Button>
              </div>

              <FormField
                control={form.control}
                name='restriction'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Restrictions - optional</FormLabel>
                    <FormControl>
                      <Input placeholder='Gluten-free, dairy-free,vegetraian,vegan,nut-free etc.' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-0">
                <Button
                  variant={
                    form.getValues("numberOfIngredients") === "5" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-l-lg px-2"
                  onClick={() => {
                    form.setValue("numberOfIngredients", "5");
                  }}
                >
                  less than 5 ingredients
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("numberOfIngredients") === "7" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none px-2"
                  onClick={() => {
                    form.setValue("numberOfIngredients", "7");
                  }}
                >
                  5 - 10 ingredients
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("numberOfIngredients") === "10" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-r-lg px-2"
                  onClick={() => {
                    form.setValue("numberOfIngredients", "10");
                  }}
                >
                  10+ ingredients
                </Button>
              </div>
              <div className="flex justify-between gap-0">
                <Button
                  variant={
                    form.getValues("levelOfDifficulty") === "easy" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-l-lg px-2"
                  onClick={() => {
                    form.setValue("levelOfDifficulty", "easy");
                  }}
                >
                  Easy
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("levelOfDifficulty") === "medium" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none px-2"
                  onClick={() => {
                    form.setValue("levelOfDifficulty", "medium");
                  }}
                >
                  Medium
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("levelOfDifficulty") === "hard" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-r-lg px-2"
                  onClick={() => {
                    form.setValue("levelOfDifficulty", "hard");
                  }}
                >
                  Hard
                </Button>
              </div>
              <Button type="submit">
                Generate Receipes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateReceipes