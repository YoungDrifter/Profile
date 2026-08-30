export type Locale = "en" | "zh";

type Localized = Record<Locale, string>;

export type TimelineItem = {
  period: string;
  title: Localized;
  subtitle: Localized;
  description?: Localized;
  descriptionItems?: Localized[];
};

export type SkillGroup = {
  label: Localized;
  items: string[];
};

export type RecognitionItem = {
  period: string;
  title: Localized;
  subtitle: Localized;
};

export type Project = {
  period: string;
  role: Localized;
  title: Localized;
  description: Localized;
  technologies: string[];
  repository?: string;
};

export type Publication = {
  year: string;
  venue: Localized;
  title: Localized;
  authors: string;
  pdf?: string;
};

export const profile = {
  name: "Yuhang Yang",
  displayName: {
    en: "Yuhang Yang",
    zh: "阳宇航"
  },
  role: {
    en: "Undergraduate Student",
    zh: "本科生"
  },
  institution: {
    en: "Nanjing University",
    zh: "南京大学"
  },
  location: {
    en: "Nanjing, China",
    zh: "中国 · 南京"
  },
  study: {
    en: "Information and Computing Science · Expected 2028",
    zh: "信息与计算科学 · 预计 2028 年毕业"
  },
  description: {
    en: "Focused on understanding mathematics and AI",
    zh: "专注数学与 AI 理解"
  },
  email: "yuhangyang@smail.nju.edu.cn",
  avatar: "/avatar.png",
  cv: "/cv/yuhang_yang_cv.pdf",
  motto: {
    en: "Search the World and Find Myself",
    zh: "看世界也找自己"
  },
  intro: {
    en: [
      "I am a third-year undergraduate in Information and Computational Science at the School of Mathematics, Nanjing University. My primary academic interest lies in large language models and deep learning, and I am currently in the early stages of building a systematic understanding of the field, both in theory and in practice.",
      "In learning the field, I aim to connect mathematical foundations with hands-on model development: understanding the principles behind models through linear algebra, probability, and optimization, while testing that understanding through reading, derivation, and implementation. Rather than stopping at high-level concepts, I am particularly interested in why a method works, how it is implemented, and how it behaves in practice.",
      "I am motivated by precision and intellectual rigor, and I bring consistent initiative and curiosity to problems I find worth pursuing."
    ],
    zh: [
      "我是南京大学数学学院信息与计算科学专业大三本科生，主要学术兴趣在于大语言模型与深度学习，目前正处于系统学习这一领域理论与实践的入门阶段。",
      "在学习过程中，我希望将数学基础与模型实践结合起来：既从线性代数、概率论与优化的角度理解模型背后的原理，也通过阅读、推导与代码实现检验自己的理解。相比于停留在概念层面，我更关心一个方法为何成立、如何实现，以及它在实际训练中如何表现。",
      "我在学习与研究中注重严谨与精确，具有较强的主观能动性，并对值得深入的问题保持持续的探索兴趣。"
    ]
  },
  socials: [
    { label: "GitHub", url: "https://github.com/YoungDrifter" },
    { label: "X", url: "https://x.com/Yuhangar" },
    { label: "Zhihu", url: "https://www.zhihu.com/people/emrysyang" },
    { label: "Xiaohongshu", url: "https://www.xiaohongshu.com/user/profile/6a0dd2930000000001007000" }
  ],
  interests: [
    { en: "Optimization Theory", zh: "优化理论" },
    { en: "NLP", zh: "自然语言处理" },
    { en: "LLMs", zh: "大语言模型" }
  ]
};

export const education: TimelineItem[] = [
  {
    period: "2024 – Present",
    title: {
      en: "Nanjing University",
      zh: "南京大学"
    },
    subtitle: {
      en: "Undergraduate",
      zh: "本科生"
    },
    descriptionItems: [
      {
        en: "Studying computational mathematics and building on this foundation to explore the theory and practice of AI in greater depth.",
        zh: "系统学习计算数学相关课程，并在此基础上深入开展对 AI 理论与实践的学习。"
      },
      {
        en: "Degree GPA 4.45/5.0 · Rank 1/15",
        zh: "学位学分绩 4.45/5.0 · 专业排名 1/15"
      }
    ]
  },
  {
    period: "2021 – 2024",
    title: {
      en: "Hengyang No. 8 High School",
      zh: "衡阳市第八中学"
    },
    subtitle: {
      en: "High School Student",
      zh: "高中生"
    },
    descriptionItems: [
      {
        en: "Developed consistent study habits and an independent, rigorous approach to thinking during this period.",
        zh: "在这一阶段逐步形成稳定的学习习惯，并培养了独立、严谨的思维方式。"
      }
    ]
  }
];

export const technicalSkills: SkillGroup[] = [
  {
    label: { en: "Languages", zh: "编程语言" },
    items: ["Python", "C++"]
  },
  {
    label: { en: "Frameworks", zh: "框架" },
    items: ["PyTorch"]
  },
  {
    label: { en: "Tools", zh: "工具" },
    items: ["LaTeX", "Git", "Weights & Biases (W&B)"]
  }
];

export const internships: TimelineItem[] = [
  {
    period: "TBD",
    title: {
      en: "Internship Experience",
      zh: "实习经历"
    },
    subtitle: {
      en: "Position TBD",
      zh: "职位待补充"
    },
    descriptionItems: [
      {
        en: "Reserved for future research, industry, or academic internship experiences once they are ready to present.",
        zh: "预留给未来可以正式展示的科研、企业或学术实习经历。"
      }
    ]
  }
];

export const honors: RecognitionItem[] = [
  {
    period: "2025.12",
    title: {
      en: "Nanjing University People's Scholarship — Second Prize (Top 20%)",
      zh: "南京大学人民奖学金二等奖（前 20%）"
    },
    subtitle: {
      en: "Nanjing University",
      zh: "南京大学"
    }
  }
];

export const competitions: RecognitionItem[] = [
  {
    period: "2025.11",
    title: {
      en: "National College Student Mathematics Competition (Jiangsu) - Second Prize",
      zh: "全国大学生数学竞赛江苏赛区二等奖"
    },
    subtitle: {
      en: "Chinese Mathematical Society",
      zh: "中国数学会"
    }
  },
  {
    period: "2025.10",
    title: {
      en: "National College Student Mathematical Modeling Competition (Jiangsu) - Third Prize",
      zh: "全国大学生数学建模竞赛江苏赛区三等奖"
    },
    subtitle: {
      en: "CSIAM",
      zh: "中国工业与应用数学学会"
    }
  }
];

export const projects: Project[] = [
  {
    period: "2026.08",
    role: {
      en: "Independent Project",
      zh: "个人项目"
    },
    title: {
      en: "min-GPT: A Handwritten Conversational GPT",
      zh: "min-GPT：手写对话式 GPT"
    },
    description: {
      en: "Implemented and fine-tuned a GPT-2-compatible conversational language model from core components. Full-test perplexity decreased from 42.34 to 14.28 after fine-tuning.",
      zh: "从核心组件出发，实现并微调了兼容 GPT-2 的对话语言模型；微调后 Full-test perplexity 从 42.34 降至 14.28。"
    },
    technologies: ["PyTorch", "GPT-2", "DailyDialog", "W&B"],
    repository: "https://github.com/YoungDrifter/min-GPT"
  }
];

export const publications: Publication[] = [
  {
    year: "2026",
    venue: {
      en: "Venue TBD",
      zh: "发表地点待定"
    },
    title: {
      en: "Publication Placeholder",
      zh: "论文占位"
    },
    authors: "Yuhang Yang"
  }
];
