"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type FormCardProps = {
  id?: string;
};

function FormCard({ id }: FormCardProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'formCard',
        }),
      });

      const data = await response.json();
      console.log('Form submission response:', data);

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setErrorMessage('');
        setFormData({ name: '', email: '', phone: '' });
        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        const errorMsg = data.error || data.whatsappError || data.details || 'Error submitting form. Please try again.';
        setErrorMessage(errorMsg);
        console.error('Form submission error:', data);
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={id} className="w-full md:w-[45%]  h-fit flex justify-center items-center">
      <div className="flex w-full items-center justify-center z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-b from-[#1c1f48] via-[#3b3e61] to-[#1c7872] flex items-center flex-col rounded-md w-[95%] sm:w-[70%] md:w-[100%] lg:w-full py-6 md:pb-8 md:pt-4 lg:pb-10 lg:pt-4 lg:h-[500px]"
        >
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('formCard.emailPlaceholder')}
            type="email"
            className="my-4 md:my-3 lg:my-6 py-3 md:py-3.5 lg:py-4 w-[90%] bg-transparent text-white border-0 outline-none border-b border-white transition-all duration-300 hover:bg-[#383B5F] rounded-md px-2"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t('formCard.phonePlaceholder')}
            type="tel"
            required
            className="my-4 md:my-3 lg:my-6 py-3 md:py-3.5 lg:py-4 w-[90%] bg-transparent text-white border-0 outline-none border-b border-white transition-all duration-300 hover:bg-[#444668] rounded-md px-2"
          />
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t('formCard.namePlaceholder')}
            type="text"
            required
            className="my-4 md:my-3 lg:my-6 py-3 md:py-3.5 lg:py-4 w-[90%] bg-transparent text-white border-0 outline-none border-b border-white transition-all duration-300 hover:bg-[#485871] rounded-md px-2"
          />
          {submitStatus === 'success' && (
            <p className="text-green-400 text-sm mb-2">{t('formCard.successMessage') || 'Submitted successfully!'}</p>
          )}
          {submitStatus === 'error' && (
            <div className="text-red-400 text-sm mb-2 px-2 text-center">
              <p className="font-semibold">{t('formCard.errorMessage') || 'Error submitting form'}</p>
              {errorMessage && (
                <p className="text-xs mt-1 opacity-90">{errorMessage}</p>
              )}
            </div>
          )}
          <button
            className="h-11 md:h-12 lg:h-12 w-[90%] mt-6 md:mt-8 lg:mt-12 bg-[#04cf9c] text-white rounded-md border-0 text-base md:text-base lg:text-xl transition-all duration-300 cursor-pointer shadow-[0_0_10px_#04cf9c,0_0_10px_#04cf9c] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (t('formCard.submitting') || 'Submitting...') : t('formCard.button')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCard
