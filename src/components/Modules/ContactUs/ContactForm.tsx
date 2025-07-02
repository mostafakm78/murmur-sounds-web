'use client';

import { BiLoaderCircle } from 'react-icons/bi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// تعریف شمای اعتبارسنجی فرم با Zod
const FormSchema = z.object({
  username: z.string().min(5, {
    message: 'نام شما باید حداقل ۵ کاراکتر باشد.',
  }),
  email: z.string().email({
    message: 'لطفاً یک ایمیل معتبر وارد کنید.',
  }),
  title: z.string().min(5, {
    message: 'موضوع باید حداقل ۵ کاراکتر باشد.',
  }),
  description: z.string().min(10, {
    message: 'توضیحات باید حداقل ۱۰ کاراکتر باشد.',
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      title: '',
      description: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await fetch('/api/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast({ description: '✅ درخواست شما با موفقیت ارسال شد.' });
      form.reset();
    } else {
      toast({
        description: '❌ خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-3/4 lg:w-2/4 xl:w-1/3 space-y-6" aria-label="فرم تماس با ما">
        {/* فیلد نام و نام خانوادگی */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username" className="font-bold">
                نام و نام خانوادگی
              </FormLabel>
              <FormControl>
                <Input id="username" type="text" placeholder="نام خود را کامل وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* فیلد ایمیل */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="font-bold">
                ایمیل
              </FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="ایمیل خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* فیلد موضوع */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title" className="font-bold">
                موضوع
              </FormLabel>
              <FormControl>
                <Input id="title" type="text" placeholder="موضوع درخواست را بنویسید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* فیلد توضیحات */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="description" className="font-bold">
                توضیحات
              </FormLabel>
              <FormControl>
                <Textarea id="description" placeholder="توضیحات خود را وارد کنید" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* دکمه ارسال */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <BiLoaderCircle className="animate-spin ml-2 text-lg" />
              در حال ارسال...
            </>
          ) : (
            'ارسال'
          )}
        </Button>
      </form>
    </Form>
  );
}
