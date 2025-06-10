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
  // مقداردهی اولیه فرم و اتصال به شمای اعتبارسنجی
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

  // تابع ارسال فرم که پس از تایید اعتبار اجرا می‌شود
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await fetch('/api/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast({ description: '✅درخواست شما با موفقیت ارسال شد.' });
      form.reset();
    } else {
      toast({ description: '❌خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.', variant: 'destructive' });
    }
  }

  return (
    // فرم اصلی با کنترل فرم توسط React Hook Form
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="xl:w-1/3 lg:w-2/4 md:w-2/3 w-full space-y-6">
        {/* فیلد نام و نام خانوادگی */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input type="text" placeholder="نام خودت را کامل وارد کن" {...field} />
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
              <FormLabel className="font-bold">ایمیل</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ایمیل خودت رو بنویس" {...field} />
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
              <FormLabel className="font-bold">موضوع</FormLabel>
              <FormControl>
                <Input type="text" placeholder="موضوع مورد نظر خودت رو بنویس" {...field} />
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
              <FormLabel className="font-bold">توضیحات</FormLabel>
              <FormControl>
                <Textarea placeholder="توضیحات مورد نظر خودت رو بنویس" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* دکمه ارسال فرم */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">
                <BiLoaderCircle />
              </span>
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
