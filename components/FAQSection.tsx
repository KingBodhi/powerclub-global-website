"use client";

import { Disclosure } from "@headlessui/react";
import { Plus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection({ faqs = [] }: { faqs?: FAQ[] }) {
  if (!faqs || faqs.length === 0) {
    return null; // Don't render anything if no FAQs are provided
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h3 className="text-4xl lg:text-5xl font-semibold text-[#ae904c] mb-16 text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="group">
              {({ open }) => (
                <div className="overflow-hidden rounded-2xl border border-[#ae904c]/50 hover:border-[#ae904c]/40 transition-all duration-300">
                  <Disclosure.Button className="flex w-full items-center justify-between px-8 py-5 text-left transition-all duration-300">
                    <span className="text-lg font-medium text-white group-hover:text-[#ae904c] transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`transform transition-all duration-300 ${
                        open ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      <Plus className="w-6 h-6 text-[#ae904c]" />
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="animate-accordion-down px-8 pb-6 text-base text-white/70">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
