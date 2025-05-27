'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// This code defines a form for submitting a voice suggestion with validation using Zod and React Hook Form.
const FormSchema = z.object({
  username: z.string().min(5, {
    message: 'نام شما باید حداقل 5 کارکتر باشد.',
  }),
  email: z.string().email({
    message: 'لطفا یک ایمیل معتبر وارد کنید.',
  }),
  title: z.string().min(5, {
    message: 'درخواست شما باید حداقل 5 کارکتر باشد.',
  }),
  description: z.string().min(10, {
    message: 'توضیحات شما باید حداقل 10 کارکتر باشد.',
  }),
});

export function ContactForm() {
  // Initialize the form with Zod validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      title: '',
      description: '',
    },
  });

  // Handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      description: 'درخواست شما ارسال شد ✅',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="xl:w-1/3 lg:w-2/4 md:w-2/3 w-full space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold">نام و نام خانوادگی</FormLabel>
                <FormControl>
                  <Input placeholder="نام خودت را کامل وارد کن" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold">ایمیل</FormLabel>
                <FormControl>
                  <Input placeholder="ایمیل خودت رو بنویس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold">موضوع</FormLabel>
                <FormControl>
                  <Input placeholder="موضوع مورد نظر خودت رو بنویس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold">توضیحات</FormLabel>
                <FormControl>
                  <Input placeholder="توضیحات مورد نظر خودت رو بنویس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">ارسال</Button>
      </form>
    </Form>
  );
}
