// export const PLANS = [
//     {
//         name: "Free",
//         info: "For most individuals",
//         price: {
//             monthly: 0,
//             yearly: 0,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 100 tags", limit: "100 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "1K clicks/month" },
//             { text: "Community support", tooltip: "Get answers your questions on discord" },
//             { text: "AI powered suggestions", tooltip: "Get up to 100 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Start for free",
//             href: "/auth/sign-up?plan=free",
//             variant: "default",
//         }
//     },
//     {
//         name: "Pro",
//         info: "For small businesses",
//         price: {
//             monthly: 9,
//             yearly: 90,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 500 tags", limit: "500 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "20K clicks/month" },
//             { text: "Export click data", tooltip: "Upto 1K links" },
//             { text: "Priority support", tooltip: "Get 24/7 chat support" },
//             { text: "AI powered suggestions", tooltip: "Get up to 500 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Get started",
//             href: "/auth/sign-up?plan=pro",
//             variant: "purple",
//         }
//     },
//     {
//         name: "Business",
//         info: "For large organizations",
//         price: {
//             monthly: 49,
//             yearly: 490,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Unlimited tags" },
//             { text: "Customizable branded links"},
//             { text: "Track clicks", tooltip: "Unlimited clicks" },
//             { text: "Export click data", tooltip: "Unlimited clicks" },
//             { text: "Dedicated manager", tooltip: "Get priority support from our team" },
//             { text: "AI powered suggestions", tooltip: "Get unlimited AI powered suggestions" },
//         ],
//         btn: {
//             text: "Contact team",
//             href: "/auth/sign-up?plan=business",
//             variant: "default",
//         }
//     }
// ];

// export const PRICING_FEATURES = [
//     {
//         text: "Shorten links",
//         tooltip: "Create shortened links",
//     },
//     {
//         text: "Track clicks",
//         tooltip: "Track clicks on your links",
//     },
//     {
//         text: "See top countries",
//         tooltip: "See top countries where your links are clicked",
//     },
//     {
//         text: "Upto 10 tags",
//         tooltip: "Add upto 10 tags to your links",
//     },
//     {
//         text: "Community support",
//         tooltip: "Community support is available for free users",
//     },
//     {
//         text: "Priority support",
//         tooltip: "Get priority support from our team",
//     },
//     {
//         text: "AI powered suggestions",
//         tooltip: "Get AI powered suggestions for your links",
//     },
// ];

// export const WORKSPACE_LIMIT = 2;
export const PLANS = [
    {
        name: "Free",
        info: "For individual recruiters",
        price: {
            monthly: 0,
            yearly: 0,
        },
        features: [
            { text: "AI Interview Sessions", tooltip: "Up to 5 interviews/month" },
            { text: "Basic Skills Assessment", tooltip: "Core technical skills evaluation" },
            { text: "Interview Templates", tooltip: "Access to basic interview templates" },
            { text: "Basic Analytics", tooltip: "Essential candidate performance metrics" },
            { text: "Community support", tooltip: "Get answers in our community forum" },
            { text: "AI Interview Assistant", tooltip: "Basic AI-powered interview suggestions" },
        ],
        btn: {
            text: "Start for free",
            href: "/auth/sign-up?plan=free",
            variant: "default",
        }
    },
    {
        name: "Pro",
        info: "For growing teams",
        price: {
            monthly: 49,
            yearly: Math.round(49 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "Unlimited AI Interviews", tooltip: "No monthly limit" },
            { text: "Advanced Skills Assessment", tooltip: "Technical and soft skills evaluation" },
            { text: "Custom Interview Templates", tooltip: "Create and save custom templates" },
            { text: "Advanced Analytics", tooltip: "Detailed performance insights" },
            { text: "Priority Support", tooltip: "24/7 chat and email support" },
            { text: "Team Collaboration", tooltip: "Up to 10 team members" },
            { text: "Advanced AI Features", tooltip: "Enhanced AI interview capabilities" },
        ],
        btn: {
            text: "Get started",
            href: "/auth/sign-up?plan=pro",
            variant: "purple",
        }
    },
    {
        name: "Enterprise",
        info: "For large organizations",
        price: {
            monthly: 199,
            yearly: Math.round(199 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "Custom AI Models", tooltip: "Tailored to your industry" },
            { text: "Unlimited Everything", tooltip: "No restrictions on usage" },
            { text: "White-labeling", tooltip: "Custom branding options" },
            { text: "Enterprise Analytics", tooltip: "Advanced reporting and insights" },
            { text: "Dedicated Success Manager", tooltip: "Personalized support and training" },
            { text: "API Access", tooltip: "Integration with your HR systems" },
            { text: "Custom AI Training", tooltip: "Train AI on your requirements" },
        ],
        btn: {
            text: "Contact team",
            href: "/auth/sign-up?plan=enterprise",
            variant: "default",
        }
    }
];

export const PRICING_FEATURES = [
    {
        text: "AI Interview Sessions",
        tooltip: "Conduct automated AI-powered interviews",
    },
    {
        text: "Skills Assessment",
        tooltip: "Evaluate technical and soft skills",
    },
    {
        text: "Interview Analytics",
        tooltip: "Get detailed insights on candidate performance",
    },
    {
        text: "Custom Templates",
        tooltip: "Create role-specific interview templates",
    },
    {
        text: "Team Collaboration",
        tooltip: "Work together on hiring decisions",
    },
    {
        text: "Priority Support",
        tooltip: "Get dedicated support from our team",
    },
    {
        text: "AI Interview Assistant",
        tooltip: "Get AI-powered interview recommendations",
    },
];

export const WORKSPACE_LIMIT = 2;