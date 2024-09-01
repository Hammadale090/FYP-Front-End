import { DashboardIcon, FaqIcon, FeedIcon, FiltersIcon, MessageIcon, MortgageIcon, PropertyIcon, RealtorsIcon, ReviewIcon, SettingsIcon } from "./svgs";

export const SidebarList = [

    {
        id: 1,
        text: "Feed",
        Icon: FeedIcon,
        link: "/dashboard/feed"
    },
    {
        id: 2,
        text: "Preferences",
        Icon: DashboardIcon,
        link: "/dashboard/preferences"
    },
    {
        id: 3,
        text: "Property",
        Icon: PropertyIcon,
        link: "/dashboard/property"
    },
    {
        id: 4,
        text: "Realtors",
        Icon: RealtorsIcon,
        link: "/dashboard/realtors"
    },
    {
        id: 5,
        text: "Mortgage Broker",
        Icon: MortgageIcon,
        link: "/dashboard/brokers"
    },

    {
        id: 6,
        text: "Message",
        Icon: MessageIcon,
        link: "/dashboard/message"
    },
    {
        id: 7,
        text: "FAQs",
        Icon: FaqIcon,
        link: "/dashboard/faqs"
    },
    {
        id: 8,
        text: "Filters",
        Icon: FiltersIcon,
        link: "/filters"
    },
    // {
    //     id: 9,
    //     text: "Running Adds",
    //     Icon: SettingsIcon,
    //     link: "/dashboard/running-adds"
    // },


]