"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createTags } from "@/app/actions/tags";

const TagSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required",
  }),
});

type TagFormValues = z.infer<typeof TagSchema>;

const TagForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TagFormValues>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: TagFormValues) => {
    setIsLoading(true);
    createTags(values)
      .then((tag) => {
        console.log("Tag created:", tag);
        form.reset();
      })
      .catch((error) => {
        console.error("Error creating tag:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter tag name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoading ? "Creating..." : "Create Tag"}
        </Button>
      </form>
    </Form>
  );
};

export default TagForm;
