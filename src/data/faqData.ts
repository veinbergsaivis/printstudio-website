// src/data/faqData.ts

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    questionKey: 'faq.q1.question',
    answerKey: 'faq.q1.answer',
  },
  {
    id: 'faq-2',
    questionKey: 'faq.q2.question',
    answerKey: 'faq.q2.answer',
  },
  {
    id: 'faq-3',
    questionKey: 'faq.q3.question',
    answerKey: 'faq.q3.answer',
  },
   {
    id: 'faq-4',
    questionKey: 'faq.q4.question',
    answerKey: 'faq.q4.answer',
  },
     {
    id: 'faq-5',
    questionKey: 'faq.q5.question',
    answerKey: 'faq.q5.answer',
  },
     {
    id: 'faq-6',
    questionKey: 'faq.q6.question',
    answerKey: 'faq.q6.answer',
  },
  // Pievieno reālus jautājumus un atbildes šeit
];

export default faqData;