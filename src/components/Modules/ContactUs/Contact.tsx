import { JSX } from 'react';
import { ContactForm } from './ContactForm';

export default function Contact(): JSX.Element {
  return (
    <div className="mx-auto container">
      <section className="dark:bg-black/20 bg-white/20 backdrop-blur-md rounded-sm p-6 gap-10 flex flex-col items-center px-10 relative">
        <ContactForm />
      </section>
    </div>
  );
}
