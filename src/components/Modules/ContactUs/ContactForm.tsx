'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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

  // تابع ارسال فرم که پس از تایید اعتبار اجرا می‌شود
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // اینجا می‌توانید داده‌ها را به سرور ارسال کنید یا پردازش لازم را انجام دهید
    console.log(data);

    // نمایش پیام موفقیت پس از ارسال فرم
    toast({
      description: 'درخواست شما ارسال شد ✅',
    });
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
                <Input placeholder="نام خودت را کامل وارد کن" {...field} />
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
                <Input placeholder="ایمیل خودت رو بنویس" {...field} />
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
                <Input placeholder="موضوع مورد نظر خودت رو بنویس" {...field} />
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
                <Input placeholder="توضیحات مورد نظر خودت رو بنویس" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* دکمه ارسال فرم */}
        <Button type="submit">ارسال</Button>
      </form>
    </Form>
  );
}
