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

export type Publication = {
  year: string;
  venue: Localized;
  title: Localized;
  authors: string[];
  pdf?: string;
  code?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type PersonalSection = {
  life: Localized;
  collaboration: Localized;
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
  affiliation: {
    en: "School of Mathematics · Nanjing University",
    zh: "数学学院 · 南京大学"
  },
  location: {
    en: "Nanjing, China",
    zh: "中国 · 南京"
  },
  description: {
    en: "Focused on Math & AI",
    zh: "专注数学与 AI"
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
  primarySocials: [
    { label: "GitHub", url: "https://github.com/YoungDrifter" },
    { label: "Zhihu", url: "https://www.zhihu.com/people/emrysyang" }
  ],
  interests: [
    { en: "Optimization Theory", zh: "优化理论" },
    { en: "NLP", zh: "自然语言处理" },
    { en: "LLMs", zh: "大语言模型" }
  ]
};

export const personal: PersonalSection = {
  life: {
    en: "Outside academics, I enjoy documenting what I learn and experience, exploring new ideas, and staying attentive to everyday life. I value curiosity, clarity, and the freedom to keep discovering both the world and myself.",
    zh: "学习之外，我喜欢记录学习与生活、接触新的想法，并在日常经验中保持观察和思考。我珍视好奇、清晰与持续探索的自由，也希望在认识世界的过程中更好地认识自己。"
  },
  collaboration: {
    en: "I am open to conversations and collaborations around mathematics, deep learning, large language models, open-source learning projects, and other thoughtful ideas. If our interests overlap, feel free to reach out by email.",
    zh: "我期待围绕数学、深度学习、大语言模型、开源学习项目，以及其他值得认真讨论的想法展开交流与合作。如果我们的兴趣有所交集，欢迎通过邮件联系我。"
  }
};

export const personalLinks: SocialLink[] = [
  { label: "Email", url: "mailto:yuhangyang@smail.nju.edu.cn" },
  { label: "WeChat", url: "#wechat" },
  { label: "GitHub", url: "https://github.com/YoungDrifter" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/yuhangar/" },
  { label: "Zhihu", url: "https://www.zhihu.com/people/emrysyang" },
  { label: "YouTube", url: "https://www.youtube.com/@Yuhangar" },
  { label: "X", url: "https://x.com/Yuhangar" },
  { label: "Xiaohongshu", url: "https://www.xiaohongshu.com/user/profile/6a0dd2930000000001007000" }
];

export const education: TimelineItem[] = [
  {
    period: "2024 – Present",
    title: {
      en: "Nanjing University",
      zh: "南京大学"
    },
    subtitle: {
      en: "B.Sc. in Computational Mathematics",
      zh: "计算数学专业理学学士"
    },
    descriptionItems: [
       {
        en: "GPA 4.45/5.0 · Rank 1/15",
        zh: "GPA 4.45/5.0 · 专业排名 1/15"
      },
      {
        en: "Studying computational mathematics and, building on this foundation, exploring the theory and practice of large language models and deep learning.",
        zh: "系统学习计算数学相关课程，并在此基础上深入探索大语言模型与深度学习等 AI 领域的理论与实践。"
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
      en: "High School Graduate",
      zh: "高中毕业生"
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
    authors: ["Minghao Chen", "Yuhang Yang", "Zihan Liu"]
  }
];
