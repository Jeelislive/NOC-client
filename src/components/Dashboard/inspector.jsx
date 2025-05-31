import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ListChecks, Users, Settings } from 'lucide-react'; // Example icons

// Reusable Card component for Inspector Dashboard
const InspectorDashboardCard = ({ title, description, link, icon: Icon, isComingSoon }) => {
  const cardBaseClasses = "block bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-shadow duration-300";
  const interactiveClasses = "hover:shadow-2xl transform hover:-translate-y-1";
  const comingSoonClasses = "opacity-70 cursor-not-allowed";

  const CardContent = () => (
    <div className="flex flex-col items-center text-center relative">
      {isComingSoon && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
          Coming Soon
        </div>
      )}
      <Icon className="w-12 h-12 text-red-600 dark:text-red-500 mb-4" strokeWidth={1.5} />
      <h2 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );

  if (isComingSoon) {
    return (
      <div className={`${cardBaseClasses} ${comingSoonClasses}`}>
        <CardContent />
      </div>
    );
  }

  return (
    <Link
      to={link}
      className={`${cardBaseClasses} ${interactiveClasses}`}
    >
      <CardContent />
    </Link>
  );
};

const Inspector = () => {
  const dashboardItems = [
    {
      title: "Application List",
      description: "View and manage all NOC applications.",
      link: "applicationlist",
      icon: FileText,
      isComingSoon: false,
    },
    {
      title: "Manage Checklists",
      description: "Work in progress. This feature is coming soon!",
      link: "#",
      icon: ListChecks,
      isComingSoon: true,
    },
    // {
    //   title: "User Management",
    //   description: "View and manage applicant accounts.",
    //   link: "user-management", // Placeholder link
    //   icon: Users,
    // },
    // {
    //   title: "System Settings",
    //   description: "Configure system parameters.",
    //   link: "system-settings", // Placeholder link
    //   icon: Settings,
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800 dark:text-white">
          Inspector Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {dashboardItems.map((item) => (
            <InspectorDashboardCard
              key={item.title}
              title={item.title}
              description={item.description}
              link={item.link}
              icon={item.icon}
              isComingSoon={item.isComingSoon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inspector;
