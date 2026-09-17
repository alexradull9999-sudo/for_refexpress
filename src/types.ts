export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export interface QuizAnswers {
  containerType: string;
  containerSize: string;
  containerQuantity?: string;
  containerCondition?: string;
  purchaseTimeline: string;
  [key: string]: string | undefined;
}

export interface LeadFormValues {
  name: string;
  phone: string;
  email: string;
  contactMethod: "WhatsApp" | "Telegram" | "Email";
}

export interface QuizQuestionOption {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  stepName: string;
  options: QuizQuestionOption[];
}
