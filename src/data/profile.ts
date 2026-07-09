export type Locale = "en" | "zh";

type Localized = Record<Locale, string>;

export type TimelineItem = {
  period: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
};

export type RecognitionItem = {
  period: string;
  title: Localized;
  subtitle: Localized;
};

export type Project = {
  period: string;
  status: Localized;
  role: Localized;
  title: Localized;
  summary: Localized;
};

export type Publication = {
  year: string;
  venue: Localized;
  title: Localized;
  authors: string;
  summary: Localized;
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
  email: "yuhangyang@smail.nju.edu.cn",
  avatar: "/images/avatar.png",
  cv: "/files/cv.pdf",
  motto: {
    en: "Search the World and Find Myself",
    zh: "看世界也找自己"
  },
  intro: {
    en: "I am an undergraduate student in mathematics at Nanjing University. I am drawn to the beauty, rigor, and absolute logic of mathematics, and I am equally fascinated by the rapid development of artificial intelligence and machine learning. I hope to study AI through mathematics, using precise reasoning to understand the ideas behind modern learning systems. In both study and life, I value careful work, continuous refinement, and the pursuit of excellence.",
    zh: "我是南京大学数学专业本科生。我热爱数学的美感、严谨与绝对逻辑，也对人工智能和机器学习的迅速发展感到震撼并充满憧憬。我希望继续学习 AI，并尝试用数学的语言和推理去理解现代学习系统背后的思想。在生活和学习中，我重视一丝不苟的态度、持续打磨的过程，以及对更高标准的追求。"
  },
  socials: [
    { label: "GitHub", url: "https://github.com/YoungDrifter" },
    { label: "X", url: "https://x.com/Yuhangar" },
    { label: "Zhihu", url: "https://www.zhihu.com/people/emrysyang" },
    { label: "Xiaohongshu", url: "https://www.xiaohongshu.com/user/profile/6a0dd2930000000001007000" }
  ],
  interests: [
    { en: "Computational Mathematics", zh: "计算数学" },
    { en: "Probability Theory", zh: "概率论" },
    { en: "Deep Learning", zh: "深度学习" },
    { en: "Machine Learning Theory", zh: "机器学习理论" }
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
      en: "University",
      zh: "大学"
    },
    description: {
      en: "Building a foundation in analysis, probability, algebra, computational mathematics, and learning theory while exploring how these areas meet in modern models.",
      zh: "持续夯实分析、概率、代数、计算数学与学习理论基础，并探索它们在现代模型中的交汇。"
    }
  },
  {
    period: "2021 – 2024",
    title: {
      en: "Hengyang No. 8 High School",
      zh: "衡阳市第八中学"
    },
    subtitle: {
      en: "High School",
      zh: "高中"
    },
    description: {
      en: "Developed study habits, problem-solving discipline, and an early interest in mathematical thinking.",
      zh: "在这一阶段逐渐形成学习习惯、解题训练与对数学思维的兴趣。"
    }
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
      en: "To be updated",
      zh: "待补充"
    },
    description: {
      en: "Reserved for future research, industry, or academic internship experiences once they are ready to present.",
      zh: "预留给未来可以正式展示的科研、企业或学术实习经历。"
    }
  }
];

export const honors: RecognitionItem[] = [
  {
    period: "2025.12",
    title: {
      en: "Nanjing University People's Scholarship",
      zh: "南京大学人民奖学金"
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
    period: "TBD",
    status: {
      en: "Placeholder",
      zh: "占位"
    },
    role: {
      en: "Project entry",
      zh: "项目条目"
    },
    title: {
      en: "Project Placeholder",
      zh: "项目占位"
    },
    summary: {
      en: "A reserved space for a future selected project. Details can be added when the work is ready to present.",
      zh: "这里暂时作为未来精选项目的占位，待项目成熟后再补充具体内容。"
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
    authors: "Yuhang Yang",
    summary: {
      en: "A reserved space for future research writing or formal publications.",
      zh: "这里暂时作为未来研究写作或正式论文的占位。"
    }
  }
];
