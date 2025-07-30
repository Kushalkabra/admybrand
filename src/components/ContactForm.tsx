import React from "react";
import { useForm } from "react-hook-form";

// Types for form fields
interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass-card w-full max-w-lg mx-auto p-4 sm:p-8 rounded-2xl shadow-glass backdrop-blur-xl border border-glass-border"
    >
      <div className="text-center mb-6">
        <h2 className="text-4xl sm:text-5xl font-bold mb-2">
          Get in Touch
          <span className="text-gradient block">Contact Our Support Team</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We usually respond within 24 hours.
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-md bg-transparent border pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md bg-transparent border pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-md bg-transparent border pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-md gradient-primary text-white font-semibold shadow-glow transition-opacity disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {isSubmitSuccessful && (
        <p className="text-green-500 text-center mt-2">Message sent!</p>
      )}
    </form>
  );
};

export default ContactForm;