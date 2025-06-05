'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// تعریف شِمای اعتبارسنجی فرم با Zod
const FormSchema = z.object({
  username: z.string().min(5, {
    message: 'نام شما باید حداقل 5 کارکتر باشد.',
  }),
  voice: z.string().min(2, {
    message: 'درخواست شما باید حداقل 2 کارکتر باشد.',
  }),
});

export function SuggestForm() {
  // مقداردهی اولیه فرم و اتصال به شِمای اعتبارسنجی
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      voice: '',
    },
  });

  // تابعی که هنگام ارسال فرم اجرا می‌شود
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // نمایش پیام موفقیت با داده‌های ارسال شده (برای تست)
    toast({
      title: 'مقادیر ارسال شده:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    // فرم اصلی با کنترل کامل توسط React Hook Form
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
              {/* نمایش پیام خطا */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* فیلد درخواست صدا */}
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">درخواست صدا</FormLabel>
              <FormControl>
                <Input type="text" placeholder="صدای مورد نظر خودت رو بنویس" {...field} />
              </FormControl>
              {/* نمایش پیام خطا */}
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
