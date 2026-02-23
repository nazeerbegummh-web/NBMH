
import { SiteData } from './types';

export const INITIAL_DATA: SiteData = {
  doctors: [
    // Gynecologists
    { id: 'g1', name: 'Dr. Madiha Batool', specialty: 'Gynecologist', departmentId: 'gynae', qualification: 'MBBS, RMP, FCPS(PAK), MRCOG(2)(UK)', experience: '23 years', image: 'https://lh3.googleusercontent.com/d/1EO8pQDmASG508sSolGL920QDJnclPo03', motto: 'Exceptional quality for every woman.', days: ['Mon', 'Sat'], timings: '8:00 PM - 10:00 PM', fee: '1500/-' },
    { id: 'g2', name: 'Dr. Fahimda Tabassum', specialty: 'Gynecologist', departmentId: 'gynae', qualification: 'MBBS, MRCOG(1)(UK), Diploma in Women Health', experience: '25 years', image: 'https://lh3.googleusercontent.com/d/1-RSweO4jFMFHTNAO-Dvhkx8kgpyMMrTA', motto: 'Advanced clinical excellence.', days: ['Tue', 'Thu'], fee: '1500/-' },
    { id: 'g3', name: 'Dr. Muizza Abbas', specialty: 'Gynecologist', departmentId: 'gynae', qualification: 'MBBS, FCPS', experience: '15 years', image: 'https://lh3.googleusercontent.com/d/120c99ulHpJQNuAHiUsfn63A1QBbqRagV', motto: 'Compassionate care for mothers.', days: ['Wed', 'Fri'], fee: '1500/-' },
    { id: 'g4', name: 'Dr. Noreen Majeed', specialty: 'Gynecologist', departmentId: 'gynae', qualification: 'MBBS, MCPS, FCPS', experience: '28 years', image: 'https://lh3.googleusercontent.com/d/12Q4BQMrtDsI2dXvJDbRMKhxISuKUaAyY', motto: 'Leading with experience.', days: ['Mon', 'Thu'], fee: '1500/-' },
    { id: 'g5', name: 'Dr. Robina Naseem', specialty: 'Gynecologist', departmentId: 'gynae', qualification: 'MBBS, FCPS', experience: '20 years', image: 'https://lh3.googleusercontent.com/d/1zGWa2bJwAGX5Ee-HVgepjv1heub3BUAh', motto: 'Dedicated to women health.', days: ['Sat', 'Sun'], fee: '1500/-' },

    // Child Specialists (Pediatrics)
    { id: 'p1', name: 'Dr. Kamal Mehmood', specialty: 'Child Specialist', departmentId: 'peds', qualification: 'MBBS, DCH, FCPS', experience: '20 years', image: 'https://lh3.googleusercontent.com/d/1AL5upBvBQ103aQa_y_G2Enil_aGrS3Ra', motto: 'Healthy childhood, bright future.', days: ['Mon-Sat'], fee: '1500/-' },
    { id: 'p2', name: 'Maj (R) Dr. M. Amir Ali Khan', specialty: 'Child Specialist', departmentId: 'peds', qualification: 'MBBS, MCPS (Peds)', experience: '25 years', image: 'https://lh3.googleusercontent.com/d/1FRxUmxSLIjKISWSbowqYjD29niIXWfUm', motto: 'Expert care for your little ones.', days: ['Mon-Sat'], fee: '1500/-' },
    { id: 'p3', name: 'Dr. Musfirah Aziz', specialty: 'Child Specialist', departmentId: 'peds', qualification: 'MBBS, FCPS', experience: '12 years', image: 'https://lh3.googleusercontent.com/d/1G_slYAaUZuHjBQm_icgZwOxLLTXEjo_M', motto: 'Nurturing health from birth.', days: ['Tue, Thu, Sat'], fee: '1500/-' },
    { id: 'p4', name: 'Dr. Hira Ahmed', specialty: 'Child Specialist', departmentId: 'peds', qualification: 'MBBS, FCPS', experience: '10 years', image: 'https://lh3.googleusercontent.com/d/1KRRbZQolBOcHNVpFHSTUPsqv5kNM_Z6C', motto: 'Dedicated pediatric care.', days: ['Mon, Wed, Fri'], fee: '1500/-' },
    { id: 'p5', name: 'Dr. M. Ashraf Chishti', specialty: 'Child Specialist', departmentId: 'peds', qualification: 'MBBS, DCH', experience: '45 years', image: 'https://lh3.googleusercontent.com/d/1M7iTcLZvKyRYBTZ6Dkbf5w0qoseN_hLF', motto: 'Decades of pediatric excellence.', days: ['Mon-Sat'], fee: '1500/-' },

    // Dental Surgeons
    { id: 'd1', name: 'Dr. Sheikh Saad Ullah Waleem', specialty: 'Dental Surgeon', departmentId: 'dental', qualification: 'BDS, RDS, C-Implant', experience: '12 years', image: 'https://lh3.googleusercontent.com/d/16-n51Imz-t7KqeejNxuXOzbNjjHGM8jN', motto: 'Precision in every smile.', days: ['Mon-Fri'], fee: '1500/-' },
    { id: 'd2', name: 'Dr. Ammara Zaheer', specialty: 'Dental Surgeon', departmentId: 'dental', qualification: 'BDS, RDS', experience: '10 years', image: 'https://lh3.googleusercontent.com/d/175uFhDXsgfhh3SFkonJH9IkV8T960O7k', motto: 'Gentle dentistry.', days: ['Mon-Sat'], fee: '1500/-' },
    { id: 'd3', name: 'Dr. Mariya Mujib', specialty: 'Dental Surgeon', departmentId: 'dental', qualification: 'BDS, RDS, FCPS', experience: '14 years', image: 'https://lh3.googleusercontent.com/d/17TBtxIe2ASr22vk5Ln_lJB0dNuXVEQv-', motto: 'Advanced aesthetic dentistry.', days: ['Tue, Thu'], fee: '1500/-' },
    { id: 'd4', name: 'Dr. Ayesha Yousaf', specialty: 'Dental Surgeon', departmentId: 'dental', qualification: 'BDS, RDS', experience: '8 years', image: 'https://lh3.googleusercontent.com/d/18dDr22smcvE3dftoB1flQliWk7dSicln', motto: 'Your smile, our priority.', days: ['Mon, Wed, Fri'], fee: '1500/-' },
    { id: 'd5', name: 'Dr. Rida Masood', specialty: 'Dental Surgeon', departmentId: 'dental', qualification: 'BDS, RDS', experience: '9 years', image: 'https://lh3.googleusercontent.com/d/18mhFIyFJssbEW8_uRxx7Kw8QquGHvDu4', motto: 'Comprehensive oral care.', days: ['Sat, Sun'], fee: '1500/-' },

    // Medical Specialists
    { id: 'm1', name: 'Lt. Col (R) Prof Dr. Muhammad Ilyas', specialty: 'Medical Specialist', departmentId: 'medical', qualification: 'MBBS, FCPS (Medicine)', experience: '35 years', image: 'https://lh3.googleusercontent.com/d/1NXWzsGS6OgFdiFf4NJMao9NDQ73Zxt6E', motto: 'Senior clinical expertise.', days: ['Mon-Fri'], fee: '1500/-' },
    { id: 'm2', name: 'Dr. Fariha Kanwal', specialty: 'Medical Specialist', departmentId: 'medical', qualification: 'MBBS, FCPS', experience: '15 years', image: 'https://lh3.googleusercontent.com/d/1ONT7swYaUoEwVF4yzXu6sbvUoK6rVG8_', motto: 'Personalized medical care.', days: ['Tue, Thu, Sat'], fee: '1500/-' },
    { id: 'm3', name: 'Dr. Shafaq Manzoor', specialty: 'Medical Specialist', departmentId: 'medical', qualification: 'MBBS, FCPS', experience: '14 years', image: 'https://lh3.googleusercontent.com/d/1OjA3gtWZ9EvYNcx_5lvJmHrxUOR-31IM', motto: 'Commitment to adult health.', days: ['Mon, Wed, Fri'], fee: '1500/-' },
    { id: 'm4', name: 'Dr. Beenish Adil', specialty: 'Medical Specialist', departmentId: 'medical', qualification: 'MBBS, FCPS', experience: '12 years', image: 'https://lh3.googleusercontent.com/d/1QTEAW2JmziumRrS2dhZrQbWOyzGnmEsR', motto: 'Comprehensive internal medicine.', days: ['Mon, Wed'], fee: '1500/-' },
    { id: 'm5', name: 'Maj (R) Dr. Abdul Majeed', specialty: 'Medical Specialist', departmentId: 'medical', qualification: 'MBBS, MCPS', experience: '30 years', image: 'https://lh3.googleusercontent.com/d/1Re0AdvUkVvUsijF-JEn_dnFGaqIK6Qem', motto: 'Reliable healthcare.', days: ['Daily'], fee: '1500/-' },
    { id: 'm6', name: 'Dr. Syed Moin Uddin Shah', specialty: 'Medical Specialist', departmentId: 'medical', qualification: 'MBBS, FCPS', experience: '22 years', image: 'https://lh3.googleusercontent.com/d/1RsMPnIR1odkLI0TdnNf36W5PBG29R92l', motto: 'Focus on patient wellness.', days: ['Sun'], fee: '1500/-' },

    // General & Trauma Surgeons
    { id: 'gs1', name: 'Dr. Asad Ameer', specialty: 'General Surgeon', departmentId: 'surgery', qualification: 'MBBS, FCPS', experience: '13 years', image: 'https://lh3.googleusercontent.com/d/1g_p4l6XG6KY0G-PY-ZYfcMM9ReFe4Doe', motto: 'Precision surgery.', days: ['Daily'], fee: '1500/-' },
    { id: 'gs2', name: 'Dr. Sana Qaiser', specialty: 'General Surgeon', departmentId: 'surgery', qualification: 'MBBS, FCPS', experience: '12 years', image: 'https://lh3.googleusercontent.com/d/1n0fmK8R6P8XnFwvPoRvzLRGqLOR5727y', motto: 'Compassionate surgical care.', days: ['Daily'], fee: '1500/-' },
    { id: 'gs3', name: 'Prof. Dr. Brig (R) Khalid Ibrahim Akhtar', specialty: 'General Surgeon', departmentId: 'surgery', qualification: 'MBBS, FCPS', experience: '40 years', image: 'https://lh3.googleusercontent.com/d/1nCCXh8HgfgcEoichgaDlG7_0QqThvxOu', motto: 'Leading surgical innovation.', days: ['Tue, Thu'], fee: '2000/-' },
    { id: 'gs4', name: 'Prof. Dr. Muhammad Zubair', specialty: 'General Surgeon', departmentId: 'surgery', qualification: 'MBBS, FCPS', experience: '35 years', image: 'https://lh3.googleusercontent.com/d/1o0zJuXql0WBD0Ctpojh_dnFlnOJDeFdx', motto: 'Expert general surgery.', days: ['Mon, Wed'], fee: '2000/-' },

    // Super Specialists (Gastro, Rheum, Pulmo, etc)
    { id: 's1', name: 'Dr. Sajjad Hussain Chandio', specialty: 'Gastroenterologist', departmentId: 'gastro', qualification: 'MBBS, FCPS (Gastro)', experience: '18 years', image: 'https://lh3.googleusercontent.com/d/1RwqTDAwAvbRelloxRAVLR1bxXpoWbeg_', motto: 'Advanced digestive care.', days: ['Tue, Fri'], fee: '2000/-' },
    { id: 's2', name: 'Dr. M Arshad', specialty: 'Rheumatologist', departmentId: 'rheum', qualification: 'MBBS, FCPS', experience: '20 years', image: 'https://lh3.googleusercontent.com/d/1Thg8GfBTJL2mV7MTQLVub3BkzjwJ9j4N', motto: 'Relief for joint conditions.', days: ['Wed, Sat'], fee: '2000/-' },
    { id: 's3', name: 'Dr. Usman Khalid Ranjha', specialty: 'Pulmonologist', departmentId: 'pulmo', qualification: 'MBBS, FCPS (Pulmo)', experience: '16 years', image: 'https://lh3.googleusercontent.com/d/1UKfCCVxNsZpztubOhlHp5TMMxYuoEjuB', motto: 'Excellence in respiratory health.', days: ['Mon, Thu'], fee: '2000/-' },
    { id: 's4', name: 'Dr. Mansoor Ijaz', specialty: 'Paediatric Urologist', departmentId: 'peds_urology', qualification: 'MBBS, MS (Urology)', experience: '15 years', image: 'https://lh3.googleusercontent.com/d/1WdTM7tGLfbvxkrBDKSw5Jtn-d3TqiUaf', motto: 'Specialized care for children.', days: ['Sat'], fee: '2000/-' },

    // Urology
    { id: 'u1', name: 'Dr. Ashfaq Ahmed', specialty: 'Urologist', departmentId: 'urology', qualification: 'MBBS(KE), MS(Urology)', experience: '45 years', image: 'https://lh3.googleusercontent.com/d/1aJ5K1CDAHh4DnkFF4PTWu61l71s1n0WR', motto: 'Decades of urological care.', days: ['Daily'], fee: '2000/-' },
    { id: 'u2', name: 'Dr. Hassan Rathor', specialty: 'Urologist', departmentId: 'urology', qualification: 'MBBS, FCPS', experience: '12 years', image: 'https://lh3.googleusercontent.com/d/1aJe5E5kNBbELqLvP0K87OwMd287NkVrL', motto: 'Modern urological surgery.', days: ['Mon-Sat'], fee: '1500/-' },

    // ENT & Dermatology
    { id: 'e1', name: 'Dr. Sundas Masood', specialty: 'ENT Specialist', departmentId: 'ent', qualification: 'MBBS, FCPS', experience: '10 years', image: 'https://lh3.googleusercontent.com/d/1ea7J6OVJOBJ6RV43yQ8objUW_Ef1PBJj', motto: 'Expert ENT diagnosis.', days: ['Mon-Sat'], fee: '1800/-' },
    { id: 'sk1', name: 'Dr. Humaira Ayoub', specialty: 'Dermatologist', departmentId: 'dermatology', qualification: 'MBBS, MCPS (Derm)', experience: '15 years', image: 'https://lh3.googleusercontent.com/d/1fdgZA-pYMr6kghag__22GIgLC9rCIdmo', motto: 'Flawless skin care.', days: ['Daily'], fee: '1500/-' },

    // Cardiology
    { id: 'c1', name: 'Brig (R) Dr. Tariq Hussain', specialty: 'Cardiologist', departmentId: 'cardiology', qualification: 'MBBS, FCPS (Cardiology)', experience: '35 years', image: 'https://lh3.googleusercontent.com/d/1gDNmmctXcVUpPbLueoZrlAv4ENWNdaF1', motto: 'Excellence in heart care.', days: ['Mon-Sat'], fee: '2000/-' },

    // Orthopedic
    { id: 'o1', name: 'Assist Prof Dr. Asif Ali Jatoi', specialty: 'Orthopedic Surgeon', departmentId: 'ortho', qualification: 'MBBS, FCPS (Ortho)', experience: '15 years', image: 'https://lh3.googleusercontent.com/d/1oRh9Q8X8a6d_NU5uklXs6frc878xxL4J', motto: 'Mobility restored.', days: ['Mon, Wed, Sat'], fee: '2000/-' },
    { id: 'o2', name: 'Dr. Kashif Abbas', specialty: 'Orthopedic Surgeon', departmentId: 'ortho', qualification: 'MBBS, FCPS', experience: '12 years', image: 'https://lh3.googleusercontent.com/d/1qCMJn4jobfLWQNe62A0bSOMjt-a1dI7p', motto: 'Comprehensive bone health.', days: ['Daily'], fee: '1500/-' },

    // Pain & Psychiatry
    { id: 'pr1', name: 'Brig (R) Dr. Hamid Ali Shah', specialty: 'Pain Relief Specialist', departmentId: 'pain', qualification: 'MBBS, DA, MCPS, FCPS(ANES)', experience: '40 years', image: 'https://lh3.googleusercontent.com/d/1qx5JSHe9Z3CIknXQJzYLwT5sEp58ljF2', motto: 'Freedom from pain.', days: ['Mon-Sat'], fee: '2500/-' },
    { id: 'np1', name: 'Col (R) Nadeem Ahmed Bajwa', specialty: 'Neuro Psychiatrist', departmentId: 'psychiatry', qualification: 'MBBS, FCPS (Psych)', experience: '30 years', image: 'https://lh3.googleusercontent.com/d/1rG_phIQ_LSVj1eiEqewBG5pQUAks2Bzg', motto: 'Mental wellness for all.', days: ['Daily'], fee: '3000/-' },

    // Radiology
    { id: 'r1', name: 'Dr. Ayousha Saher', specialty: 'Radiologist', departmentId: 'radiology', qualification: 'MBBS, FCPS', experience: '10 years', image: 'https://lh3.googleusercontent.com/d/1rLk9SQ77HjSlDmZBFTSCgV8KYzpA6Mxa', motto: 'Precise diagnostic imaging.', days: ['Daily'], fee: 'Contact/-' },
    { id: 'r2', name: 'Dr. Naila Ahmed', specialty: 'Radiologist', departmentId: 'radiology', qualification: 'MBBS, FCPS', experience: '12 years', image: 'https://lh3.googleusercontent.com/d/1rYrvcdad4K1MMkgR9-ZGkT0LfMau3-Yi', motto: 'Accuracy in radiology.', days: ['Daily'], fee: 'Contact/-' },

    // Psychology & Nutrition
    { id: 'ps1', name: 'Mrs. Robina Iqbal', specialty: 'Psychologist', departmentId: 'psychology', qualification: 'M.Phil Psychology', experience: '18 years', image: 'https://lh3.googleusercontent.com/d/1relK0i9c3vnkDyWPoShDvNwMbb92SJ_3', motto: 'Empowering through talk therapy.', days: ['Mon-Fri'], fee: '2000/-' },
    { id: 'ps2', name: 'Miss Zarnain Haider', specialty: 'Psychologist', departmentId: 'psychology', qualification: 'M.Sc Psychology', experience: '5 years', image: 'https://lh3.googleusercontent.com/d/1sKmaIByDHEzaDphdFV8Cy7tGmRq1IUL_', motto: 'Mental support for young adults.', days: ['Mon-Sat'], fee: '1500/-' },
    { id: 'nu1', name: 'Miss Anosh Zafar', specialty: 'Nutritionist', departmentId: 'nutrition', qualification: 'M.Sc Nutrition', experience: '8 years', image: 'https://lh3.googleusercontent.com/d/1w8-0xYsi6ZrdizgpvtVzoRCRgFbX---U', motto: 'Food is medicine.', days: ['Daily'], fee: '1800/-' },

    // Physiotherapy
    { id: 'pt1', name: 'PT Anum Zafar', specialty: 'Physiotherapist', departmentId: 'physio', qualification: 'DPT', experience: '7 years', image: 'https://lh3.googleusercontent.com/d/1zGWa2bJwAGX5Ee-HVgepjv1heub3BUAh', motto: 'Restoring function.', days: ['Daily'], fee: '1500/-' },
    { id: 'pt2', name: 'PT Hassan Khan', specialty: 'Physiotherapist', departmentId: 'physio', qualification: 'DPT', experience: '6 years', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', motto: 'Active recovery.', days: ['Daily'], fee: '1500/-' },
  ],
  departments: [
    { id: 'gynae', name: 'Gynecologist', urduName: 'گائناکولوجسٹ', description: 'Expert maternity care and gynecological surgeries.', icon: 'Baby' },
    { id: 'dental', name: 'Dental Surgeon', urduName: 'ڈینٹسٹ', description: 'Advanced dental surgeries and routine checkups.', icon: 'Stethoscope' },
    { id: 'peds', name: 'Child Specialist', urduName: 'بچوں کا ماہر', description: 'Comprehensive healthcare for infants and children.', icon: 'Baby' },
    { id: 'medical', name: 'Medical Specialist', urduName: 'میڈیکل سپیشلسٹ', description: 'Expert primary care and complex adult medicine.', icon: 'Stethoscope' },
    { id: 'gastro', name: 'Gastroenterologist', urduName: 'معدہ و جگر کا ماہر', description: 'Expert care for digestive tract and liver.', icon: 'Activity' },
    { id: 'rheum', name: 'Rheumatologist', urduName: 'جوڑوں کا ماہر', description: 'Relief for arthritis and autoimmune diseases.', icon: 'Bone' },
    { id: 'pulmo', name: 'Pulmonologist', urduName: 'پھیپھڑوں کا ماہر', description: 'Specialized treatment for respiratory conditions.', icon: 'ShieldCheck' },
    { id: 'peds_urology', name: 'Paediatric Urologist', urduName: 'بچوں کے گردوں کا ماہر', description: 'Specialized urological care for children.', icon: 'Zap' },
    { id: 'urology', name: 'Urologist', urduName: 'ماهر امراض گردہ و مثانہ', description: 'Expert treatment for kidney and bladder issues.', icon: 'Zap' },
    { id: 'ent', name: 'ENT Specialist', urduName: 'ناک کان گلے کا ماہر', description: 'Expert Ear, Nose, and Throat services.', icon: 'Stethoscope' },
    { id: 'dermatology', name: 'Skin/Dermatologist', urduName: 'جلد کا ماہر', description: 'Clinical care for skin and hair conditions.', icon: 'Sparkles' },
    { id: 'cardiology', name: 'Cardiologist', urduName: 'ماهر امراض قلب', description: 'Heart health monitoring and diagnostics.', icon: 'HeartPulse' },
    { id: 'surgery', name: 'General Surgeon', urduName: 'جنرل سرجن', description: 'Advanced open and laparoscopic surgeries.', icon: 'Scissors' },
    { id: 'ortho', name: 'Orthopedic Surgeon', urduName: 'ہڈیوں کا ماہر سرجن', description: 'Care for fractures and joint replacements.', icon: 'Bone' },
    { id: 'pain', name: 'Pain Relief Specialist', urduName: 'درد کا ماہر معالج', description: 'Advanced pain management strategies.', icon: 'Zap' },
    { id: 'psychiatry', name: 'Neuro Psychiatrist', urduName: 'ماهر نفسیات', description: 'Mental health and neuro-behavioral care.', icon: 'Brain' },
    { id: 'radiology', name: 'Radiologist', urduName: 'ریڈیولوجسٹ', description: 'Digital radiology and imaging services.', icon: 'Activity' },
    { id: 'psychology', name: 'Psychologist', urduName: 'سائیکولوجسٹ', description: 'Professional counseling and behavioral health.', icon: 'Users' },
    { id: 'nutrition', name: 'Nutritionist', urduName: 'ماهر غذائیت', description: 'Expert dietary planning and wellness.', icon: 'Pill' },
    { id: 'physio', name: 'Physiotherapist', urduName: 'فزیو تھراپسٹ', description: 'Physical rehabilitation and mobility.', icon: 'Activity' },
  ],
  blogs: [
    {
      id: 'b1',
      title: 'Healthy Pregnancy Tips: A Guide by Dr. Madiha Batool',
      excerpt: 'Expecting a baby? Learn essential health and wellness tips for a smooth maternity journey in Rawalpindi.',
      content: 'Pregnancy is a beautiful journey. Dr. Madiha Batool recommends regular checkups, a balanced diet rich in folic acid, and light exercise. Stay hydrated and ensure you are choosing the best maternity hospital in Bahria Town Rawalpindi for your delivery.',
      author: 'Dr. Madiha Batool',
      date: '15 May 2024',
      image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800',
      category: 'Health Tips'
    }
  ],
  appointments: [],
  messages: [],
  donationAccounts: [
    {
      bankName: 'Bank Al Habib',
      accountTitle: 'Nazeer Begum Memorial Foundation',
      accountNumber: '57420081000268017',
      iban: 'PK98BAHL5742008100026801',
      branchName: 'G/9 Markaz Branch Islamabad',
      logo: 'https://lh3.googleusercontent.com/d/1cbsIJqTv4-phqKNCwFIXgJ_Nk0HjkzFP'
    },
    {
      bankName: 'Summit Bank / Bank Makramah Limited',
      accountTitle: 'Nazeer Begum Memorial Foundation',
      accountNumber: '01992626001714151941',
      iban: 'PK37SUMB9926207140151941',
      branchName: 'BAHRIA TOWN PH 7, ISLAMABAD',
      logo: 'https://lh3.googleusercontent.com/d/12Va9RQFzmZh2rObP0Kmf1tcjzMqsHUQF'
    }
  ],
  paymentConfig: {
    appointment: {
      accountName: "NBMH Registry",
      jazzCashNumber: "0312-5152659",
      easyPaisaNumber: "0312-5152659",
      bankName: "Summit Bank",
      bankIban: "PK37SUMB9926207140151941",
      qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=03125152659"
    },
    donation: {
      accountName: "Nazeer Begum Foundation",
      jazzCashNumber: "0312-5152659",
      easyPaisaNumber: "0312-5152659",
      bankName: "Summit Bank",
      bankIban: "PK37SUMB9926207140151941",
      qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Donation"
    }
  },
  branding: {
    hospitalName: "Nazeer Begum Memorial Hospital",
    tagline: "Serve Humanity - Serve God",
    address: "143-Hub Commercial, In front of Bahria Town Old Head Office, Ph 8 Rawalpindi",
    phone: "(051) 5425152",
    logoUrl: "https://lh3.googleusercontent.com/d/1ZKexjSWUjovRCGsinaqQoBHoYoI2K68m",
    heroSlides: [
      { 
        id: 'h1', 
        title: "24/7 Specialist Emergency", 
        subtitle: "Reliable medical emergency care in Hub Commercial, Bahria Town PH 8 Rawalpindi. Expert consultants available around the clock.", 
        image: "https://lh3.googleusercontent.com/d/1kTeCNuCCgfZzWdXLyjM5_VOK0dHCLxBy", 
        ctaText: "Check Availability", 
        ctaLink: "/appointment" 
      },
      { 
        id: 'h2', 
        title: "Mother & Child Excellence", 
        subtitle: "Specialized pediatric and maternity services led by Dr. Madiha Batool and our expert clinical team.", 
        image: "https://lh3.googleusercontent.com/d/18RP3r6kd3bLG6F_T4cgQk434lCFO3yjc", 
        ctaText: "Meet Specialists", 
        ctaLink: "/doctors" 
      },
      { 
        id: 'h3', 
        title: "Modern Operation Theater", 
        subtitle: "Advanced surgical facility equipped for multi-disciplinary elective and trauma procedures in Rawalpindi.", 
        image: "https://lh3.googleusercontent.com/d/1HpUaEy2ZPQN_Qakw_qhrIYeVikN1lBI7", 
        ctaText: "Our Facilities", 
        ctaLink: "/departments" 
      },
      { 
        id: 'h4', 
        title: "Advanced Clinical Laboratory", 
        subtitle: "Fully automated high-precision diagnostic testing available 24 hours a day for our community.", 
        image: "https://lh3.googleusercontent.com/d/1lx6nx78K2htGaXZ5nyPTFBKG98CCowBe", 
        ctaText: "Book Test", 
        ctaLink: "/contact" 
      },
      { 
        id: 'h5', 
        title: "World-Class Dental Care", 
        subtitle: "Comprehensive oral healthcare and advanced dental surgeries using state-of-the-art technology.", 
        image: "https://lh3.googleusercontent.com/d/1bGR8jHvRwp7hHOv7nfa6OebmwrnL00UI", 
        ctaText: "Consult Dentist", 
        ctaLink: "/appointment" 
      }
    ],
    ceoName: "Dr. Madiha Batool",
    ceoTitle: "CHIEF EXECUTIVE OFFICER",
    ceoQualification: "MBBS, RMP, FCPS(PAK), MRCOG(2)(UK)",
    ceoImage: "https://lh3.googleusercontent.com/d/1EO8pQDmASG508sSolGL920QDJnclPo03",
    ceoMessage: "The healthcare provided at Nazeer Begum Memorial Hospital is all about people. We appreciate the steadfast support of YOUR local hospital as we continue to provide the most up-to-date and compassionate care."
  },
  newsItems: [
    "24/7 Specialist Emergency Services are now fully operational in Hub Commercial, Bahria Phase 8.",
    "Dr. Madiha Batool has been awarded the Excellence in Clinical Care award 2024."
  ]
};
