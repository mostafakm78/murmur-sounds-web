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
  voice: z.string().min(2, {
    message: 'درخواست شما باید حداقل 2 کارکتر باشد.',
  }),
});

export function SuggestForm() {
  // Initialize the form with Zod validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      voice: '',
    },
  });

  // Handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
                  <Input type="text" placeholder="نام خودت را کامل وارد کن" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold">درخواست صدا</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="صدای مورد نظر خودت رو بنویس" {...field} />
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
