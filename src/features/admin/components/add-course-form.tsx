"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusCircle, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { CourseCreateSchema } from "../actions/add-course-action/schema";
import { InputTypeCreateCourse } from "../actions/add-course-action/types";
import {

  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarHeader } from "@/components/ui/sidebar";
import { useTransition } from "react";
import { useAction } from "@/hooks/use-action";
import { createCourseAction } from "../actions/add-course-action";
import { toast } from 'sonner';

export function AddCourseForm() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition()

  const { execute, fieldErrors } = useAction(createCourseAction, {
    onSuccess: () => {
      toast("course created");
      form.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  function onSubmit(values: InputTypeCreateCourse) {
    startTransition(async () => {
      execute(values);
      setOpen(false);
    });
  }

  const form = useForm<InputTypeCreateCourse>({
    resolver: zodResolver(CourseCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      bannerImage: "",
      openToEveryone: false,
      price: 0,
    },
  });



  return (
    <Sheet open={open} onOpenChange={setOpen} >
      <SheetTrigger asChild>
        <Button variant="default" size="sm" onClick={() => setOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Add Course
        </Button>
      </SheetTrigger>

      <SheetContent className=""
        side="page"
        onPointerDownOutside={(e) => e.preventDefault()
        }
        onEscapeKeyDown={(e) => e.preventDefault()}
      >

        <ScrollArea className="h-screen">
          <SidebarHeader className="relative px-6 pt-4 ">
            <SheetTitle className="font-bold text-xl">Create Course </SheetTitle>
            <Button
              onClick={() => {
                form.reset()
                setOpen(false)
              }}
              className="ring-offset-background focus:ring-ring  absolute top-4 right-6 rounded-xs   focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none h-4 w-4 opacity-80"
              size='icon'
            >
              <XIcon className="size-4" />
            </Button>
          </SidebarHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-10 mt-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Intro to AI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bannerImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What is this course about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openToEveryone"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel>Open to Everyone</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (INR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1000"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="absolute  bottom-3 " type="submit" disabled={isPending}>
                {isPending ? <LoaderCircle /> : <>   Create Course  <PlusCircle /></>}
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent >
    </Sheet >
  );
}

