"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createCategory } from "@/app/actions/category";

const CategorySchema = z.object({
  name: z.string().nonempty({
    message: "Name is required",
  }),
  color: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof CategorySchema>;

const CategoryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      color: "#CCCCCC",
    },
  });

  const onSubmit = (data: CategoryFormValues) => {
    setIsLoading(true);
    createCategory(data)
      .then((category) => {
        console.log("Category created:", category);
        form.reset();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color (optional)</FormLabel>
              <FormControl>
                <Input type="color" {...field} className="h-10 w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
