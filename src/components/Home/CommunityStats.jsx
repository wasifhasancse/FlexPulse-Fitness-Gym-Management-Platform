import { FiUsers, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';

export default function CommunityStats() {
  const stats = [
    {
      id: 1,
      label: 'Active Members',
      value: '12K+',
      icon: <FiUsers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      description: 'Developers and creators sharing insights daily.'
    },
    {
      id: 2,
      label: 'Topics Discussed',
      value: '45K+',
      icon: <FiMessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      description: 'From quick troubleshooting to deep-dive tutorials.'
    },
    {
      id: 3,
      label: 'Solutions Found',
      value: '98.4%',
      icon: <FiCheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      description: 'Our community answers questions in record time.'
    },
  ];

  return (
    <section className="bg-gray-50/50 dark:bg-[#0b1329] py-20 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Built by the community, for the community
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Join a rapidly growing ecosystem where tech enthusiasts gather to solve complex problems, collaborate on open-source projects, and grow together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="relative p-8 bg-white dark:bg-[#111c3a] rounded-2xl border border-gray-100 dark:border-slate-800/60 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 rounded-xl p-3 mb-5">
                {stat.icon}
              </div>

              <div>
                {/* Large Counter Number */}
                <span className="block text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  {stat.value}
                </span>

                {/* Label */}
                <span className="block mt-1 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {stat.label}
                </span>

                {/* Description */}
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
