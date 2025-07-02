import { JSX } from 'react';
import { ContactForm } from './ContactForm';

export default function Contact(): JSX.Element {
  return (
    <section aria-labelledby="contact-title" className="mx-auto container px-4 md:px-10">
      <div className="dark:bg-black/20 bg-white/20 backdrop-blur-md rounded-sm p-6 gap-10 flex flex-col items-center relative">
        <ContactForm />
      </div>
    </section>
  );
}
