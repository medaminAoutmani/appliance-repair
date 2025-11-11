"use client";
import React, { useState } from 'react';
import { MotionDiv } from '@/lib/framer-motion';
import { useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

function SeventhSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const control = useAnimation();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isInView) {
      control.start({
        opacity: 1,
        y: 0
      });
    }
  }, [isInView, control]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          source: 'seventhSection',
        }),
      });

      const data = await response.json();
      console.log('Form submission response:', data);

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setErrorMessage('');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        const errorMsg = data.error || data.whatsappError || data.details || 'Error submitting form. Please try again.';
        setErrorMessage(errorMsg);
        console.error('Form submission error:', data);
        setTimeout(() => {
          setSubmitStatus('idle');
          setErrorMessage('');
        }, 8000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full h-full bg-white flex flex-col items-center justify-center pt-20 px-4 sm:pt-24 sm:px-6 md:pt-36 md:px-8 lg:pt-20 lg:px-0 xl:pt-24">
      <div
        ref={ref}
        className="relative h-full w-full max-w-[95%] sm:max-w-[90%] md:w-full lg:w-[90%] xl:w-[79%] flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 md:gap-12 lg:gap-12 xl:gap-16"
      >
        {/* Left Column - Promotional Text and Location (on large screens) */}
        <div className="w-full lg:w-[50%] flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={control}
            transition={{ duration: 0.6 }}
            className="relative w-full flex flex-col items-start justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6"
          >
            {/* Tag */}
            <div className="inline-block bg-[#aaff00] text-[#1c1f48] px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm rounded-md font-lato font-semibold">
              {t('contact.tag')}
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-lato font-extrabold text-[#33334d] leading-tight sm:leading-tight">
              {t('contact.heading')}
            </h2>

            {/* Descriptive Paragraph */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#555555] font-roboto font-normal leading-relaxed max-w-full sm:max-w-xl">
              {t('contact.description')}
            </p>
          </MotionDiv>

          {/* Location Section - Visible on large screens under left column */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={control}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex w-full flex-col items-start justify-center"
          >
            <div className="w-full bg-gradient-to-br from-[#1c1f48] via-[#3b3e61] to-[#1c7872] rounded-xl sm:rounded-2xl shadow-xl shadow-gray-200/50 p-4 sm:p-6 md:p-8 overflow-hidden">
              {/* Location Header */}
              <div className="w-full flex flex-col items-start justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#04cf9c] rounded-full animate-pulse"></div>
                  <span className="text-[#04cf9c] text-xs sm:text-sm font-lato font-semibold uppercase tracking-wider">
                    {t('contact.location.subtitle')}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-lato font-extrabold text-white">
                  {t('contact.location.title')}
                </h3>
              </div>

              {/* Location Description */}
              <p className="text-sm sm:text-base text-white/90 font-roboto font-normal leading-relaxed mb-4 sm:mb-5">
                {t('contact.location.description')}
              </p>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#04cf9c]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#04cf9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-lato font-semibold text-base sm:text-lg mb-1">
                    {t('contact.location.address')}
                  </span>
                  <span className="text-white/70 font-roboto text-sm sm:text-base">
                    {t('header.location')}
                  </span>
                </div>
              </div>

              {/* Map Container */}
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden border-2 border-[#04cf9c]/30 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3222.223208587301!2d-6.816674924286512!3d33.98279997318335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDU4JzU4LjEiTiA2wrA0OCc1MC44Ilc!5e1!3m2!1sen!2sma!4v1762859874019!5m2!1sen!2sma"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                  title={t('contact.location.title')}
                ></iframe>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Right Column - Contact Form */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={control}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col items-start justify-center"
        >
          <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-gray-200/50 p-4 sm:p-6 md:p-8 lg:p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-start justify-center gap-4 sm:gap-5 md:gap-6"
            >
              {/* Form Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-lato font-extrabold text-[#33334d] mb-1 sm:mb-2">
                {t('contact.contactUs')}
              </h3>

              {/* Name Input */}
              <div className="w-full flex flex-col gap-1.5 sm:gap-2">
                <label htmlFor="name" className="text-xs sm:text-sm font-roboto font-medium text-[#33334d]">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border border-[#e0e0e0] bg-white text-[#33334d] font-roboto text-sm sm:text-base outline-none focus:border-[#04cf9c] focus:ring-2 focus:ring-[#04cf9c]/20 transition-all duration-200"
                  placeholder={t('contact.enterName')}
                />
              </div>

              {/* Email Input */}
              <div className="w-full flex flex-col gap-1.5 sm:gap-2">
                <label htmlFor="email" className="text-xs sm:text-sm font-roboto font-medium text-[#33334d]">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border border-[#e0e0e0] bg-white text-[#33334d] font-roboto text-sm sm:text-base outline-none focus:border-[#04cf9c] focus:ring-2 focus:ring-[#04cf9c]/20 transition-all duration-200"
                  placeholder={t('contact.enterEmail')}
                />
              </div>

              {/* Phone Input */}
              <div className="w-full flex flex-col gap-1.5 sm:gap-2">
                <label htmlFor="phone" className="text-xs sm:text-sm font-roboto font-medium text-[#33334d]">
                  {t('contact.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border border-[#e0e0e0] bg-white text-[#33334d] font-roboto text-sm sm:text-base outline-none focus:border-[#04cf9c] focus:ring-2 focus:ring-[#04cf9c]/20 transition-all duration-200"
                  placeholder={t('contact.enterPhone')}
                />
              </div>

              {/* Choose Services Input */}
              <div className="w-full flex flex-col gap-1.5 sm:gap-2">
                <label htmlFor="service" className="text-xs sm:text-sm font-roboto font-medium text-[#33334d]">
                  {t('contact.chooseServices')}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border border-[#e0e0e0] bg-white text-[#33334d] font-roboto text-sm sm:text-base outline-none focus:border-[#04cf9c] focus:ring-2 focus:ring-[#04cf9c]/20 transition-all duration-200 cursor-pointer"
                >
                  <option value="">{t('contact.selectService')}</option>
                  <option value="refrigerator-repair">{t('services.refrigeratorRepair')}</option>
                  <option value="washer-repair">{t('services.washerRepair')}</option>
                  <option value="air-conditioner-repair">{t('services.airConditionerRepair')}</option>
                  <option value="freezer-repair">{t('services.freezerRepair')}</option>
                  <option value="dishwasher-repair">{t('services.dishwasherRepair')}</option>
                  <option value="dryer-repair">{t('services.dryerRepair')}</option>
                  <option value="oven-repair">{t('services.ovenRepair')}</option>
                  <option value="stove-range-repair">{t('services.stoveRangeRepair')}</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="w-full flex flex-col gap-1.5 sm:gap-2">
                <label htmlFor="message" className="text-xs sm:text-sm font-roboto font-medium text-[#33334d]">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg border border-[#e0e0e0] bg-white text-[#33334d] font-roboto text-sm sm:text-base outline-none focus:border-[#04cf9c] focus:ring-2 focus:ring-[#04cf9c]/20 transition-all duration-200 resize-none"
                  placeholder={t('contact.enterMessage')}
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="w-full bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base">
                  {t('contact.successMessage') || 'Form submitted successfully! We will contact you soon.'}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm sm:text-base">
                  <p className="font-semibold">{t('contact.errorMessage') || 'Error submitting form'}</p>
                  {errorMessage && (
                    <p className="text-xs mt-1 opacity-90 break-words">{errorMessage}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#33334d] text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-roboto font-semibold text-sm sm:text-base md:text-lg hover:bg-[#1c1f48] transition-all duration-300 shadow-md hover:shadow-lg mt-1 sm:mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (t('contact.submitting') || 'Submitting...') : t('contact.submit')}
              </button>
            </form>
          </div>

          {/* WhatsApp Section - After form (Elfsight Widget) */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={control}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full flex flex-col items-end justify-center mt-6 sm:mt-8"
          >
            <div className="w-full flex justify-end">
              {/* Elfsight WhatsApp Chat Widget */}
              {language === 'en' ? (
                <div
                  className="elfsight-app-a70e2b2d-1308-457d-9bf3-fec1933960ce"
                  data-elfsight-app-lazy
                />
              ) : (
                <div
                  className="elfsight-app-569e23f8-9d47-4db7-b30e-9dad75cc7ba8"
                  data-elfsight-app-lazy
                />
              )}
            </div>
          </MotionDiv>

          {/* Location Section - Visible on md and smaller screens under form */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={control}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:hidden w-full flex flex-col items-start justify-center mt-6 sm:mt-8"
          >
            <div className="w-full bg-gradient-to-br from-[#1c1f48] via-[#3b3e61] to-[#1c7872] rounded-xl sm:rounded-2xl shadow-xl shadow-gray-200/50 p-4 sm:p-6 md:p-8 overflow-hidden">
              {/* Location Header */}
              <div className="w-full flex flex-col items-start justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#04cf9c] rounded-full animate-pulse"></div>
                  <span className="text-[#04cf9c] text-xs sm:text-sm font-lato font-semibold uppercase tracking-wider">
                    {t('contact.location.subtitle')}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-lato font-extrabold text-white">
                  {t('contact.location.title')}
                </h3>
              </div>

              {/* Location Description */}
              <p className="text-sm sm:text-base text-white/90 font-roboto font-normal leading-relaxed mb-4 sm:mb-5">
                {t('contact.location.description')}
              </p>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#04cf9c]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#04cf9c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-lato font-semibold text-base sm:text-lg mb-1">
                    {t('contact.location.address')}
                  </span>
                  <span className="text-white/70 font-roboto text-sm sm:text-base">
                    {t('header.location')}
                  </span>
                </div>
              </div>

              {/* Map Container */}
              <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden border-2 border-[#04cf9c]/30 shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3222.223208587301!2d-6.816674924286512!3d33.98279997318335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDU4JzU4LjEiTiA2wrA0OCc1MC44Ilc!5e1!3m2!1sen!2sma!4v1762900180833!5m2!1sen!2sma"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                  title={t('contact.location.title')}></iframe>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}

export default SeventhSection;

