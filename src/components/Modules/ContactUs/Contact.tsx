import { JSX } from 'react';
import { ContactForm } from './ContactForm';

export default function Contact(): JSX.Element {
  return (
    <section className="mx-auto container">
      <div className="dark:bg-black/20 bg-white/20 p-6 gap-10 flex flex-col items-center px-10 relative">
        <ContactForm />
      </div>
    </section>
  );
}
