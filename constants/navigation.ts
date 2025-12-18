<<<<<<< HEAD
import {
    HelpCircleIcon,
    LineChartIcon,
    Link2Icon,
    LockIcon,
    NewspaperIcon,
    ClockIcon,
    FileTextIcon
} from "lucide-react";
=======
import { HelpCircleIcon, LineChartIcon, Link2Icon, LockIcon, NewspaperIcon, QrCodeIcon } from "lucide-react";
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf

export const NAV_LINKS = [
    {
        title: "Meeting",
        href: "/meeting",
        menu: [
            {
                title: "Create a Meeting",
                tagline: "Host your own secure meeting.",
                href: "/meeting/create",
                icon: LockIcon,
            },
            {
                title: "Schedule a Meeting",
                tagline: "Plan meetings in advance.",
                href: "/meeting/schedule",
                icon: LineChartIcon,
            },
            {
                title: "Join a Meeting",
                tagline: "Quickly join an existing meeting.",
                href: "/meeting/join",
                icon: Link2Icon,
            },
<<<<<<< HEAD
            {
                title: "Meeting History",
                tagline: "View your past meeting activity.",
                href: "/meeting/history",
                icon: ClockIcon,
            },
            {
                title: "AI Notes",
                tagline: "Auto-generated meeting notes.",
                href: "/meeting/ai-notes",   // ✅ FIXED ROUTE
                icon: FileTextIcon,
            },
=======
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
        ],
    },

    {
        title: "Interview",
        href: "/interview",
        menu: [
            {
<<<<<<< HEAD
                title: "Create an Interview",
=======
                title: "Create a Interview",
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                tagline: "Host your own secure interview.",
                href: "/interview/create",
                icon: LockIcon,
            },
            {
<<<<<<< HEAD
                title: "Schedule an Interview",
=======
                title: "Schedule a Interview",
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                tagline: "Plan interviews in advance.",
                href: "/interview/schedule",
                icon: LineChartIcon,
            },
            {
<<<<<<< HEAD
                title: "Join an Interview",
=======
                title: "Join a Interview",
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                tagline: "Quickly join an existing interview.",
                href: "/interview/join",
                icon: Link2Icon,
            },
        ],
    },

    {
        title: "Pricing",
        href: "/pricing",
    },
<<<<<<< HEAD

=======
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
    {
        title: "Resources",
        href: "/resources",
        menu: [
            {
                title: "Blog",
                tagline: "Read articles on the latest trends in tech.",
                href: "/resources/blog",
                icon: NewspaperIcon,
            },
            {
                title: "Help",
                tagline: "Get answers to your questions.",
                href: "/resources/help",
                icon: HelpCircleIcon,
            },
        ]
<<<<<<< HEAD
    }
=======
    },
    {
        title: "About",
        href: "/about",
    },
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
];
