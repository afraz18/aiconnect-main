import { BarChart3Icon, FolderOpenIcon, WandSparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
    {
        name: "Asana",
        logo: "/assets/company-01.svg",
    },
    {
        name: "Tidal",
        logo: "/assets/company-02.svg",
    },
    {
        name: "Innovaccer",
        logo: "/assets/company-03.svg",
    },
    {
        name: "Linear",
        logo: "/assets/company-04.svg",
    },
    {
        name: "Raycast",
        logo: "/assets/company-05.svg",
    },
    {
        name: "Labelbox",
        logo: "/assets/company-06.svg",
    }
] as const;

export const PROCESS = [
    {
        title: "Create AI Interviews",
        description: "Set up intelligent interview sessions tailored to your hiring needs.",
        icon: FolderOpenIcon,
    },
    {
        title: "AI-Powered Assessment",
        description: "Let our AI evaluate candidates' technical and soft skills efficiently.",
        icon: WandSparklesIcon,
    },
    {
        title: "Analyze Results",
        description: "Get detailed insights and reports on candidate performance and potential.",
        icon: BarChart3Icon,
    },
] as const;

export const FEATURES = [
    {
        title: "AI Interview Sessions",
        description: "Conduct smart, automated interviews powered by advanced AI.",
    },
    {
        title: "Skill Assessment",
        description: "Comprehensive evaluation of technical and soft skills.",
    },
    {
        title: "Secure Sessions",
        description: "Encrypted and secure interview environments.",
    },
    {
        title: "Custom Questions",
        description: "Create tailored question sets for different roles.",
    },
    {
        title: "Interview Scheduling",
        description: "Automated scheduling and candidate management.",
    },
    {
        title: "Team Collaboration",
        description: "Share interview results and collaborate with hiring teams.",
    },
] as const;

export const REVIEWS = [
    {
        name: "Michael Smith",
        username: "@michaelsmith",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        review: "AIConnect has revolutionized our hiring process! The AI-powered interviews save us countless hours while maintaining high-quality candidate assessment."
    },
    {
        name: "Emily Johnson",
        username: "@emilyjohnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 4,
        review: "As a tech recruiter, this platform has been invaluable. The AI assessments are spot-on, and the automated scheduling is a huge time-saver."
    },
    {
        name: "Daniel Williams",
        username: "@danielwilliams",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        review: "The depth of technical assessment provided by AIConnect is impressive. It helps us identify top talent efficiently and effectively."
    },
    {
        name: "Sophia Brown",
        username: "@sophiabrown",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        review: "AIConnect streamlines our entire interview process. The AI insights are incredibly helpful in making informed hiring decisions."
    },
    {
        name: "James Taylor",
        username: "@jamestaylor",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        review: "This platform has transformed our recruitment process. The AI interviews are thorough and the candidate experience is exceptional."
    },
    {
        name: "Olivia Martinez",
        username: "@oliviamartinez",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4,
        review: "AIConnect helps us conduct technical interviews at scale. The automated assessments are reliable and save our team valuable time."
    },
    {
        name: "William Garcia",
        username: "@williamgarcia",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 5,
        review: "Game-changer for technical hiring! The AI's ability to assess both technical skills and soft skills is remarkable."
    },
    {
        name: "Mia Rodriguez",
        username: "@miarodriguez",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 4,
        review: "We've tried several interview platforms, but AIConnect stands out with its AI capabilities and user-friendly interface."
    },
    {
        name: "Henry Lee",
        username: "@henrylee",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 5,
        review: "AIConnect has streamlined our entire hiring pipeline. The insights from AI interviews are invaluable for making hiring decisions."
    },
] as const;
