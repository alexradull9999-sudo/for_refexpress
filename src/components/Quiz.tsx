import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QUIZ_QUESTIONS } from "../data";
import { QuizAnswers, LeadFormValues } from "../types";
import { trackGoal, getUtmParams } from "../utils/analytics";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Form states
  const [formValues, setFormValues] = useState<LeadFormValues>({
    name: "",
    phone: "",
    email: "",
    contactMethod: "Telegram"
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [utmTags, setUtmTags] = useState<Record<string, string>>({});

  useEffect(() => {
    // Collect UTM search tags on mount
    setUtmTags(getUtmParams());
  }, []);

  const handleSelectOption = (questionId: string, optionId: string) => {
    // Trigger quiz_start on first interaction
    if (!hasStarted) {
      trackGoal("quiz_start");
      setHasStarted(true);
    }

    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);

    // Auto-advance to the next step, with a slight visual delay for better feedback
    setTimeout(() => {
      goToNextStep(updatedAnswers);
    }, 280);
  };

  const goToNextStep = (currentAnswers: Partial<QuizAnswers> = answers) => {
    if (currentStep < QUIZ_QUESTIONS.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Track step conversion goals in Yandex Metrika
      if (nextStep === 1) trackGoal("quiz_step_2");
      if (nextStep === 2) trackGoal("quiz_step_3");
      if (nextStep === 3) trackGoal("quiz_step_4");
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Basic French/Russian style mask formatting for Phone: +7 (999) 999-99-99
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    
    // If it starts with 7 or 8, slice it to keep just the digits
    if (input.startsWith("7") || input.startsWith("8")) {
      input = input.substring(1);
    }
    
    // limit length
    input = input.substring(0, 10);

    let formattedValue = "";
    if (input.length > 0) {
      formattedValue += "+7 (";
      formattedValue += input.substring(0, 3);
    }
    if (input.length >= 4) {
      formattedValue += ") " + input.substring(3, 6);
    }
    if (input.length >= 7) {
      formattedValue += "-" + input.substring(6, 8);
    }
    if (input.length >= 9) {
      formattedValue += "-" + input.substring(8, 10);
    }

    setFormValues({ ...formValues, phone: formattedValue });
    if (formErrors.phone) {
      setFormErrors({ ...formErrors, phone: "" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formValues.name.trim()) {
      errors.name = "Пожалуйста, введите ваше имя";
    }
    
    // Validate Russian format length: check if digits count is 11 (including +7 prefix)
    const digitsOnly = formValues.phone.replace(/\D/g, "");
    if (!formValues.phone) {
      errors.phone = "Введите номер телефона";
    } else if (digitsOnly.length < 11) {
      errors.phone = "Введите корректный номер телефона (11 цифр)";
    }

    if (formValues.email && !/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Неверный формат e-mail адреса";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulated API call (Webhook / CRM transmission)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      trackGoal("quiz_submit", {
        answers,
        form: formValues,
        utm: utmTags
      });
    }, 1200);
  };

  const isCurrentStepAnswered = () => {
    if (currentStep >= QUIZ_QUESTIONS.length) return true;
    const currentQuestionKey = QUIZ_QUESTIONS[currentStep].id;
    return !!answers[currentQuestionKey as keyof QuizAnswers];
  };

  const progressPercentage = Math.round(
    ((currentStep) / QUIZ_QUESTIONS.length) * 100
  );

  return (
    <section id="quiz" className="py-20 bg-brand-blue text-white relative overflow-hidden">
      {/* Absolute decorative styling for maritime/shipping atmosphere */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-0 w-80 h-80 bg-blue-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-white/10 text-amber-300 border border-amber-300/20 font-display font-extrabold text-xs uppercase tracking-wider rounded-md mb-3">
            Интерактивный опрос
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight mb-4 uppercase">
            Подберите контейнер за 1 минуту
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Ответьте на 4 простых вопроса, и мы пришлём PDF-каталог с ценами, реальными фотографиями и информацией о наличии на терминалах сегодня.
          </p>
        </div>

        {/* Outer Quiz Frame */}
        <div className="bg-brand-white text-brand-dark rounded-xl shadow-2xl p-6 md:p-10 border border-gray-100 relative">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="quiz_flow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header info (only active if not final lead page / step 4) */}
                {currentStep < QUIZ_QUESTIONS.length ? (
                  <div className="mb-8">
                    <div className="flex justify-between items-center text-xs font-semibold text-brand-grey mb-2">
                      <span className="uppercase tracking-slate font-display text-brand-blue">
                        Шаг {currentStep + 1} из {QUIZ_QUESTIONS.length}: {QUIZ_QUESTIONS[currentStep].stepName}
                      </span>
                      <span className="text-brand-orange font-bold font-mono">
                        {progressPercentage}% выполнено
                      </span>
                    </div>

                    {/* Custom progress bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-brand-orange"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-8">
                    <div className="flex justify-between items-center text-xs font-semibold text-brand-grey mb-2">
                      <span className="uppercase tracking-slate font-display text-brand-orange">
                        Опрос пройден! Финальный шаг
                      </span>
                      <span className="text-green-600 font-bold font-mono">100% готово</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-full" />
                    </div>
                  </div>
                )}

                {/* Question Area */}
                {currentStep < QUIZ_QUESTIONS.length ? (
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold mb-6 text-brand-blue">
                      {QUIZ_QUESTIONS[currentStep].question}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {QUIZ_QUESTIONS[currentStep].options.map((option) => {
                        const questionKey = QUIZ_QUESTIONS[currentStep].id;
                        const isSelected = answers[questionKey as keyof QuizAnswers] === option.id;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelectOption(questionKey, option.id)}
                            className={`flex items-start text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border-brand-orange bg-amber-50/40 shadow-sm"
                                : "border-gray-200 hover:border-brand-blue hover:bg-gray-50/50"
                            }`}
                          >
                            {option.icon && (
                              <span className="text-2xl mr-4 leading-none select-none">
                                {option.icon}
                              </span>
                            )}
                            <div className="flex-1">
                              <span className="font-semibold block text-brand-blue text-sm md:text-base">
                                {option.label.split(" — ")[0]}
                              </span>
                              {option.label.includes(" — ") && (
                                <span className="text-xs text-brand-grey block mt-1">
                                  {option.label.split(" — ")[1]}
                                </span>
                              )}
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 self-center ml-2 ${
                                isSelected
                                  ? "border-brand-orange bg-brand-orange text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={goToPrevStep}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded transition ${
                          currentStep === 0
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-brand-blue hover:text-brand-orange"
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4" /> Назад
                      </button>

                      {isCurrentStepAnswered() && (
                        <button
                          type="button"
                          onClick={() => goToNextStep()}
                          className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-2.5 rounded font-display font-semibold text-sm transition shadow-sm cursor-pointer"
                        >
                          Далее <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* FINAL STEP - LEAD FORM */
                  <div className="max-w-2xl mx-auto">
                    <div className="mb-5">
                      <h3 className="text-xl md:text-2xl font-display font-extrabold text-brand-blue tracking-tight leading-tight">
                        Заберите ваш PDF-каталог
                      </h3>
                      <p className="text-xs text-brand-grey mt-1">
                        Заполните контактную информацию. Никакого телефонного спама — вышлем только запрошенные файлы.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-brand-blue mb-1 uppercase tracking-wide">
                            Ваше имя <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            placeholder="Иван Петров"
                            className={`w-full px-3 py-2.5 rounded border text-sm focus:outline-none transition ${
                              formErrors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-brand-orange"
                            }`}
                          />
                          {formErrors.name && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-brand-blue mb-1 uppercase tracking-wide">
                              Номер телефона <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formValues.phone}
                              onChange={handlePhoneChange}
                              placeholder="+7 (999) 999-99-99"
                              className={`w-full px-3 py-2.5 rounded border text-sm focus:outline-none transition ${
                                formErrors.phone ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-brand-orange"
                              }`}
                            />
                            {formErrors.phone && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-brand-blue mb-1 uppercase tracking-wide">
                              Эл. почта <span className="text-gray-400">(опционально)</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formValues.email}
                              onChange={handleInputChange}
                              placeholder="example@mail.ru"
                              className={`w-full px-3 py-2.5 rounded border text-sm focus:outline-none transition border-gray-300 focus:border-brand-orange`}
                            />
                            {formErrors.email && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-brand-blue mb-1 uppercase tracking-wide">
                            Куда прислать готовый каталог?
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {["WhatsApp", "Telegram", "Email"].map((method) => {
                              const isSelected = formValues.contactMethod === method;
                              const colors = {
                                WhatsApp: "border-green-400 bg-green-50/10 text-green-700 hover:bg-green-50/30",
                                Telegram: "border-sky-400 bg-sky-50/10 text-sky-700 hover:bg-sky-50/30",
                                Email: "border-brand-blue bg-brand-light text-brand-blue"
                              };

                              return (
                                <button
                                  key={method}
                                  type="button"
                                  onClick={() => setFormValues({ ...formValues, contactMethod: method as any })}
                                  className={`py-2 px-3 rounded-md text-xs font-bold border-2 text-center transition cursor-pointer select-none ${
                                    isSelected
                                      ? "bg-brand-blue text-white border-brand-blue"
                                      : "bg-white text-brand-dark border-gray-300 hover:bg-gray-50"
                                  }`}
                                >
                                  {method}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Hidden input values tracking UTM-parameters explicitly inside DOM for any potential tracker parses */}
                        <input type="hidden" name="utm_source" value={utmTags.utm_source || ""} />
                        <input type="hidden" name="utm_medium" value={utmTags.utm_medium || ""} />
                        <input type="hidden" name="utm_campaign" value={utmTags.utm_campaign || ""} />

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-display font-extrabold uppercase py-3.5 px-6 rounded-md shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Формирование каталога...
                            </>
                          ) : (
                            <>Получить каталог бесплатно</>
                          )}
                        </button>

                        <div className="text-[11px] text-brand-grey text-center space-y-1">
                          <p>
                            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                          </p>
                          <p className="font-semibold text-brand-blue">
                            Никакого спама — только каталог и индивидуальный подбор
                          </p>
                        </div>
                      </form>
                    </div>
                )}
              </motion.div>
            ) : (
              /* SUCCESS STATE (THANK YOU SCREEN) */
              <motion.div
                key="thank_you"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8 px-4"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8" strokeWidth={3} />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-brand-blue mb-4">
                  Каталог успешно забронирован!
                </h3>
                <p className="text-brand-dark max-w-lg mx-auto text-base md:text-lg mb-8 leading-relaxed">
                  Мы начали формировать подборку. PDF-каталог с актуальным наличием и ценами на сегодня будет выслан на ваш 
                  <strong className="text-brand-blue"> {formValues.contactMethod}</strong> в течение 10-15 минут.
                </p>

                <div className="bg-brand-light rounded-lg p-6 max-w-xl mx-auto border border-gray-200">
                  <p className="text-sm text-brand-grey font-semibold mb-4">
                    Ускорьте процесс! Откройте чат напрямую для мгновенной консультации:
                  </p>
                  <div className="flex gap-4 justify-center items-center">
                    <a
                      href="https://wa.me/79500022306"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#22c35e] text-white flex items-center justify-center shadow-md transition-all hover:scale-110 select-none cursor-pointer shrink-0"
                      title="WhatsApp (Макс)"
                    >
                      <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.871-6.956C16.611 1.93 14.14 .912 11.52.912 6.082.912 1.655 5.337 1.652 10.781c-.001 1.745.469 3.447 1.359 4.951l-1.02 3.722 3.817-.999zM18.17 14.9c-.334-.167-1.977-.975-2.28-1.085-.303-.11-.524-.167-.745.167-.221.332-.857 1.085-1.05 1.306-.192.221-.385.247-.719.08-1.536-.77-2.527-1.282-3.535-3.003-.266-.452.266-.42.76-1.416.08-.167.04-.313-.02-.48-.06-.167-.524-1.262-.719-1.728-.19-.456-.385-.393-.524-.4l-.448-.006c-.156 0-.41.058-.624.293-.215.234-.818.8-.818 1.95 0 1.15.836 2.262.95 2.417.114.156 1.644 2.512 4.022 3.486.565.233 1.008.371 1.353.481.568.181 1.085.155 1.493.094.455-.068 1.48-.605 1.688-1.162.208-.557.208-1.034.146-1.14-.06-.104-.22-.167-.556-.334z" stroke="none" />
                      </svg>
                    </a>

                    <a
                      href="https://express.ms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#24A1DE] to-[#8E24C2] hover:brightness-110 text-white flex items-center justify-center shadow-md transition-all hover:scale-110 select-none cursor-pointer shrink-0"
                      title="Написать в мессенджер МАКС"
                    >
                      <svg className="w-6.5 h-6.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 3c-4.97 0-9 4.03-9 9 0 1.78.51 3.44 1.4 4.85l-1.24 3.72a.5.5 0 00.63.63l3.72-1.24A8.95 8.95 0 0012 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 13.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
                      </svg>
                    </a>
                    <a
                      href="https://t.me/Refexpress25_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#0088cc] hover:bg-[#007fb3] text-white flex items-center justify-center shadow-md transition-all hover:scale-110 select-none cursor-pointer"
                      title="Telegram bot"
                    >
                      <svg className="w-5.5 h-5.5 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M24 2.22c-.15.93-4.57 19.34-5.32 22.38-.11.45-.44.75-.89.79-.05.01-.1.01-.15.01-.4 0-.77-.19-1-.53l-6.28-5.34-3.13 2.91c-.24.23-.57.35-.91.32-.4-.03-.74-.29-.87-.67L2.1 12.39c-.58-.19-.94-.74-.86-1.35.08-.6 1-.95 1.55-1.15L22.62.06c.64-.23 1.34.02 1.54.67.09.28.09.58.01.86l-.17.63zm-4.3 2.11L3.92 11.23l2.84 1.83 11.33-7.2c.11-.07.24-.03.3.08.06.11.02.24-.08.31L7.54 13.91l6.19 3.99 3.65-13.31c.01-.06.01-.12 0-.17-.03-.1-.1-.13-.15-.13-.05 0-.09.01-.13.03z" stroke="none" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(0);
                      setAnswers({});
                      setIsSubmitted(false);
                      setHasStarted(false);
                      setFormValues({ name: "", phone: "", email: "", contactMethod: "Telegram" });
                    }}
                    className="text-xs text-brand-blue hover:text-brand-orange underline font-semibold cursor-pointer"
                  >
                    Пройти опрос заново
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
