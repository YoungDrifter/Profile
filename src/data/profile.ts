export type Locale = "en" | "zh";

type Localized = Record<Locale, string>;

export type TimelineItem = {
  period: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
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
  status: Localized;
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
  alternateName: "Emrys Yang",
  role: {
    en: "Undergraduate Student in Mathematics",
    zh: "数学专业本科生"
  },
  institution: {
    en: "School of Mathematics, Nanjing University",
    zh: "南京大学数学学院"
  },
  location: {
    en: "Nanjing, China",
    zh: "中国南京"
  },
  email: "yuhangyang@smail.nju.edu.cn",
  avatar: "/images/avatar.png",
  cv: "/files/cv.pdf",
  intro: {
    en: "I am an undergraduate student in mathematics at Nanjing University. My current interests lie in probability theory, mathematical analysis, and the mathematical structure of learning systems.",
    zh: "我是南京大学数学专业本科生，目前关注概率论、数学分析，以及学习系统背后的数学结构。"
  },
  focus: {
    en: "I hope to understand learning models through probability, analysis, and rigorous abstraction, while keeping implementation close enough to sharpen the questions.",
    zh: "我希望用概率、分析和严谨的抽象理解学习模型，同时通过实现与实验让问题保持具体。"
  },
  socials: [
    { label: "GitHub", url: "https://github.com/EmrysBlake" },
    { label: "X", url: "https://x.com/EmrysBlakeYang" },
    { label: "知乎", url: "https://www.zhihu.com/people/74-44-50-26-39" },
    { label: "小红书", url: "https://www.xiaohongshu.com/user/profile/692941e000000000380194d0" }
  ],
  interests: [
    { en: "Probability Theory", zh: "概率论" },
    { en: "Mathematical Analysis", zh: "数学分析" },
    { en: "Deep Learning", zh: "深度学习" },
    { en: "Machine Learning Theory", zh: "机器学习理论" }
  ]
};

export const education: TimelineItem[] = [
  {
    period: "2024 – Present",
    title: {
      en: "Nanjing University",
      zh: "南京大学数学学院"
    },
    subtitle: {
      en: "BSc in Mathematics · School of Mathematics",
      zh: "数学专业本科"
    },
    description: {
      en: "Second-year undergraduate student, building a foundation in mathematical analysis, probability, algebra, and machine learning.",
      zh: "本科二年级，持续夯实数学分析、概率论、代数与机器学习基础。"
    }
  },
  {
    period: "2021 – 2024",
    title: {
      en: "Hengyang No. 8 High School",
      zh: "衡阳市第八中学"
    },
    subtitle: {
      en: "High School Diploma",
      zh: "高中"
    },
    description: {
      en: "A formative period for learning habits, problem solving, and mathematical intuition.",
      zh: "学习习惯、问题意识与数学直觉逐渐形成的重要阶段。"
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
      en: "A placeholder for future research, industry, or academic internship experiences.",
      zh: "这里暂时作为未来科研、企业或学术实习经历的占位。"
    }
  }
];

export const awards: TimelineItem[] = [
  {
    period: "2025.12",
    title: {
      en: "Nanjing University People's Scholarship",
      zh: "南京大学人民奖学金"
    },
    subtitle: {
      en: "Nanjing University",
      zh: "南京大学"
    },
    description: {
      en: "Awarded in recognition of academic performance and overall development.",
      zh: "因学业表现与综合发展获得认可。"
    }
  },
  {
    period: "2025.11",
    title: {
      en: "National College Student Mathematics Competition (Jiangsu) - Second Prize",
      zh: "全国大学生数学竞赛江苏赛区二等奖"
    },
    subtitle: {
      en: "Chinese Mathematical Society",
      zh: "中国数学会"
    },
    description: {
      en: "Recognized for mathematical problem-solving ability.",
      zh: "在本科数学竞赛中体现较强的问题解决能力。"
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
    },
    description: {
      en: "Completed a team-based modeling project focused on quantitative analysis.",
      zh: "完成团队建模项目，围绕结构化定量分析展开。"
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
    status: {
      en: "In Preparation",
      zh: "准备中"
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
