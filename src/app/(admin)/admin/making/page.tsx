"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Grid, List, MoreVertical, Trash, Edit, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the form schema using zod
const courseFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  openToEveryone: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

// Sample course data (in a real app, you'd fetch this from an API)
const dummyCourses = [
  {
    id: 1,
    title: "Introduction to React",
    imageUrl: "/api/placeholder/400/200",
    description: "Learn the basics of React.js and build your first application",
    openToEveryone: true,
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    imageUrl: "/api/placeholder/400/200",
    description: "Master advanced JavaScript concepts and design patterns",
    openToEveryone: false,
  },
  {
    id: 3,
    title: "CSS Grid & Flexbox Mastery",
    imageUrl: "/api/placeholder/400/200",
    description: "Become a layout expert with CSS Grid and Flexbox",
    openToEveryone: true,
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    imageUrl: "/api/placeholder/400/200",
    description: "Build robust backends with Node.js, Express, and MongoDB",
    openToEveryone: false,
  },
  {
    id: 5,
    title: "Full Stack Web Development",
    imageUrl: "/api/placeholder/400/200",
    description: "Learn to build complete web applications from front to back",
    openToEveryone: true,
  },
  {
    id: 6,
    title: "TypeScript for React Developers",
    imageUrl: "/api/placeholder/400/200",
    description: "Add type safety to your React applications with TypeScript",
    openToEveryone: false,
  },
];

export default function AdminCoursePage() {
  const [courses, setCourses] = useState(dummyCourses);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<null | typeof dummyCourses[0]>(null);


  // Form setup
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      openToEveryone: false,
    },
  });

  // Handle form submission
  const onSubmit = (data: CourseFormValues) => {
    if (editingCourse) {
      // Update existing course
      setCourses(courses.map(course =>
        course.id === editingCourse.id ? { ...course, ...data } : course
      ));
    } else {
      // Add new course
      const newCourse = {
        id: Math.max(...courses.map(c => c.id)) + 1,
        ...data,
      };
      setCourses([...courses, newCourse]);
    }

    handleCloseDialog();
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingCourse(null);
    form.reset();
  };

  // Handle edit course
  const handleEditCourse = (course: typeof dummyCourses[0]) => {
    setEditingCourse(course);
    form.reset({
      title: course.title,
      imageUrl: course.imageUrl,
      description: course.description,
      openToEveryone: course.openToEveryone,
    });
    setIsAddDialogOpen(true);
  };

  // Handle delete course
  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));

  };

  return (
    <div className="">
      <div className="|||||">
        <Tabs defaultValue="preview">
          <div className="flex items-center justify-between p-4 border-b">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  form.reset();
                  setIsAddDialogOpen(true);
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </div>
          </div>

          <TabsContent value="preview" className="p-0">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-6">Courses</h2>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditCourse(course)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {course.description}
                        </p>
                        {course.openToEveryone && (
                          <div className="mt-2">
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Open to Everyone
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Access
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={course.imageUrl}
                                  alt={course.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {course.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {course.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${course.openToEveryone
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                              }`}>
                              {course.openToEveryone ? "Public" : "Restricted"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditCourse(course)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="code">
            <div className="p-4">
              ho no

            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            <DialogDescription>
              {editingCourse
                ? "Update the course details below."
                : "Fill out the form below to add a new course."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
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
                      <Textarea
                        placeholder="Enter course description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openToEveryone"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Open to Everyone</FormLabel>
                      <p className="text-sm text-gray-500">
                        Make this course available to all users without restrictions
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button variant="outline" type="button" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCourse ? "Update Course" : "Add Course"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
