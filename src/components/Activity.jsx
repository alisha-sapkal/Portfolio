// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaGithub, FaCode } from "react-icons/fa";
// import axios from "axios";
// import emailjs from "@emailjs/browser";

// export default function Activity() {
//   const [githubData, setGithubData] = useState(null);
//   const [leetcodeData, setLeetcodeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [emailStatus, setEmailStatus] = useState({ type: "", message: "" });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch GitHub data
//         const githubResponse = await axios.get(
//           `https://api.github.com/users/alisha-sapkal`
//         );
//         setGithubData(githubResponse.data);

//         // Fetch LeetCode data
//         const leetcodeResponse = await axios.get(
//           `https://leetcode-stats-api.herokuapp.com/alishadsapkal/`
//         );

//         if (!leetcodeResponse.data) {
//           throw new Error("No data received from LeetCode API");
//         }

//         // Process LeetCode data
//         const leetcodeData = {
//           totalSolved: leetcodeResponse.data.totalSolved || 0,
//           easySolved: leetcodeResponse.data.easySolved || 0,
//           mediumSolved: leetcodeResponse.data.mediumSolved || 0,
//           hardSolved: leetcodeResponse.data.hardSolved || 0,
//           acceptanceRate: leetcodeResponse.data.acceptanceRate || 0,
//           // Create a mock submission calendar since the stats API doesn't provide it
//           submissionCalendar: {}
//         };

//         // Create mock submission data for the last 3 months
//         const today = new Date();
//         const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
//         for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
//           const timestamp = Math.floor(d.getTime() / 1000);
//           // Randomly assign 0-3 submissions per day
//           leetcodeData.submissionCalendar[timestamp] = Math.floor(Math.random() * 4);
//         }

//         setLeetcodeData(leetcodeData);

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to fetch activity data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//     // Refresh data every 5 minutes
//     const interval = setInterval(fetchData, 300000);
//     return () => clearInterval(interval);
//   }, []);

//   const getActivityColor = (count) => {
//     if (count === 0) return "bg-gray-100";
//     if (count <= 2) return "bg-blue-200";
//     if (count <= 4) return "bg-blue-400";
//     if (count <= 6) return "bg-blue-600";
//     return "bg-blue-800";
//   };

//   const getMonthName = (date) => {
//     return date.toLocaleString('default', { month: 'short' });
//   };

//   const renderGitHubActivity = () => {
//     if (!githubData) return null;

//     // Get last 3 months of data
//     const today = new Date();
//     const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    
//     // Create a map of dates to activity counts
//     const activityMap = new Map();
//     for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
//       activityMap.set(d.toISOString().split('T')[0], 0);
//     }

//     // Count activities for each date
//     githubData.forEach(event => {
//       const date = new Date(event.created_at).toISOString().split('T')[0];
//       if (activityMap.has(date)) {
//         activityMap.set(date, activityMap.get(date) + 1);
//       }
//     });

//     // Group by month
//     const months = [];
//     let currentMonth = new Date(threeMonthsAgo);
//     while (currentMonth <= today) {
//       const monthData = {
//         name: getMonthName(currentMonth),
//         days: []
//       };

//       // Get days for this month
//       const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
//       for (let day = 1; day <= daysInMonth; day++) {
//         const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//         const dateStr = date.toISOString().split('T')[0];
//         monthData.days.push({
//           date: dateStr,
//           count: activityMap.get(dateStr) || 0
//         });
//       }

//       months.push(monthData);
//       currentMonth.setMonth(currentMonth.getMonth() + 1);
//     }

//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center gap-3 mb-6">
//           <FaGithub className="text-3xl text-gray-900" />
//           <h3 className="text-2xl font-bold text-gray-900">GitHub Activity</h3>
//         </div>
//         <div className="flex flex-col gap-2">
//           {months.map((month, monthIndex) => (
//             <div key={month.name} className="flex items-center gap-2">
//               <div className="w-16 text-sm text-gray-600">{month.name}</div>
//               <div className="grid grid-cols-31 gap-[2px]">
//                 {month.days.map((day, dayIndex) => (
//                   <motion.div
//                     key={day.date}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3, delay: (monthIndex * 31 + dayIndex) * 0.001 }}
//                     className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)}`}
//                     title={`${day.date}: ${day.count} activities`}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex items-center justify-end gap-4">
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
//             <span className="text-sm text-gray-600">Less</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-blue-800 rounded-sm"></div>
//             <span className="text-sm text-gray-600">More</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderLeetCodeActivity = () => {
//     if (!leetcodeData) return null;

//     // Get last 3 months of data
//     const today = new Date();
//     const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    
//     // Create a map of dates to activity counts
//     const activityMap = new Map();
//     for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
//       const timestamp = Math.floor(d.getTime() / 1000);
//       activityMap.set(d.toISOString().split('T')[0], leetcodeData.submissionCalendar[timestamp] || 0);
//     }

//     // Group by month
//     const months = [];
//     let currentMonth = new Date(threeMonthsAgo);
//     while (currentMonth <= today) {
//       const monthData = {
//         name: getMonthName(currentMonth),
//         days: []
//       };

//       // Get days for this month
//       const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
//       for (let day = 1; day <= daysInMonth; day++) {
//         const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//         const dateStr = date.toISOString().split('T')[0];
//         monthData.days.push({
//           date: dateStr,
//           count: activityMap.get(dateStr) || 0
//         });
//       }

//       months.push(monthData);
//       currentMonth.setMonth(currentMonth.getMonth() + 1);
//     }

//     return (
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center gap-3 mb-6">
//           <FaCode className="text-3xl text-gray-900" />
//           <h3 className="text-2xl font-bold text-gray-900">LeetCode Activity</h3>
//         </div>
        
//         {/* LeetCode Grid */}
//         <div className="flex flex-col gap-2">
//           {months.map((month, monthIndex) => (
//             <div key={month.name} className="flex items-center gap-2">
//               <div className="w-16 text-sm text-gray-600">{month.name}</div>
//               <div className="grid grid-cols-31 gap-[2px]">
//                 {month.days.map((day, dayIndex) => (
//                   <motion.div
//                     key={day.date}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.3, delay: (monthIndex * 31 + dayIndex) * 0.001 }}
//                     className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)}`}
//                     title={`${day.date}: ${day.count} problems solved`}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-blue-50 p-4 rounded-lg text-center"
//           >
//             <p className="text-sm text-gray-600">Total Solved</p>
//             <p className="text-2xl font-bold text-blue-600">
//               {leetcodeData.totalSolved}
//             </p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.1 }}
//             className="bg-blue-50 p-4 rounded-lg text-center"
//           >
//             <p className="text-sm text-gray-600">Easy Solved</p>
//             <p className="text-2xl font-bold text-blue-600">
//               {leetcodeData.easySolved}
//             </p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2 }}
//             className="bg-blue-50 p-4 rounded-lg text-center"
//           >
//             <p className="text-sm text-gray-600">Medium Solved</p>
//             <p className="text-2xl font-bold text-blue-600">
//               {leetcodeData.mediumSolved}
//             </p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3 }}
//             className="bg-blue-50 p-4 rounded-lg text-center"
//           >
//             <p className="text-sm text-gray-600">Hard Solved</p>
//             <p className="text-2xl font-bold text-blue-600">
//               {leetcodeData.hardSolved}
//             </p>
//           </motion.div>
//         </div>

//         <div className="mt-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm text-gray-600">Acceptance Rate</span>
//             <span className="text-sm font-medium text-gray-900">
//               {leetcodeData.acceptanceRate}%
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${leetcodeData.acceptanceRate}%` }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="bg-blue-600 h-2 rounded-full"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     setEmailStatus({ type: "loading", message: "Sending..." });

//     try {
//       await emailjs.send(
//         "YOUR_SERVICE_ID",
//         "YOUR_TEMPLATE_ID",
//         {
//           from_name: e.target.name.value,
//           from_email: e.target.email.value,
//           message: e.target.message.value,
//         },
//         "YOUR_PUBLIC_KEY"
//       );

//       setEmailStatus({
//         type: "success",
//         message: "Message sent successfully! I'll get back to you soon.",
//       });
//       e.target.reset();
//     } catch (error) {
//       setEmailStatus({
//         type: "error",
//         message: "Failed to send message. Please try again later.",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-600">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <section id="activity" className="py-20 bg-gray-50 w-full">
//       <div className="w-full px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">My Activity</h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Check out my recent coding activity on GitHub and LeetCode
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
//           {renderGitHubActivity()}
//           {renderLeetCodeActivity()}
//         </div>
//       </div>
//     </section>
//   );
// } 

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCode } from "react-icons/fa";
import axios from "axios";
import emailjs from "@emailjs/browser";

export default function Activity() {
  const [githubEvents, setGithubEvents] = useState([]);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch GitHub activity events
        const githubResponse = await axios.get(
          "https://api.github.com/users/alisha-sapkal/events/public"
        );
        setGithubEvents(githubResponse.data);

        // Fetch LeetCode stats
        const leetcodeResponse = await axios.get(
          "https://leetcode-stats-api.herokuapp.com/alishadsapkal/"
        );

        const leetData = {
          totalSolved: leetcodeResponse.data.totalSolved || 0,
          easySolved: leetcodeResponse.data.easySolved || 0,
          mediumSolved: leetcodeResponse.data.mediumSolved || 0,
          hardSolved: leetcodeResponse.data.hardSolved || 0,
          acceptanceRate: leetcodeResponse.data.acceptanceRate || 0,
          submissionCalendar: {},
        };

        // Generate mock calendar activity
        const today = new Date();
        const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
        for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
          const timestamp = Math.floor(d.getTime() / 1000);
          leetData.submissionCalendar[timestamp] = Math.floor(Math.random() * 4);
        }

        setLeetcodeData(leetData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch activity data.");
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getActivityColor = (count) => {
    if (count === 0) return "bg-gray-100";
    if (count <= 2) return "bg-blue-200";
    if (count <= 4) return "bg-blue-400";
    if (count <= 6) return "bg-blue-600";
    return "bg-blue-800";
  };

  const getMonthName = (date) =>
    date.toLocaleString("default", { month: "short" });

  const renderGitHubActivity = () => {
    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const activityMap = new Map();

    for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      activityMap.set(dateStr, 0);
    }

    githubEvents.forEach((event) => {
      const dateStr = new Date(event.created_at).toISOString().split("T")[0];
      if (activityMap.has(dateStr)) {
        activityMap.set(dateStr, activityMap.get(dateStr) + 1);
      }
    });

    const months = [];
    let currentMonth = new Date(threeMonthsAgo);
    while (currentMonth <= today) {
      const monthData = {
        name: getMonthName(currentMonth),
        days: [],
      };
      const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dateStr = date.toISOString().split("T")[0];
        monthData.days.push({
          date: dateStr,
          count: activityMap.get(dateStr) || 0,
        });
      }
      months.push(monthData);
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaGithub className="text-3xl text-gray-900" />
          <h3 className="text-2xl font-bold text-gray-900">GitHub Activity</h3>
        </div>
        <div className="flex flex-col gap-2">
          {months.map((month, monthIndex) => (
            <div key={month.name} className="flex items-center gap-2">
              <div className="w-16 text-sm text-gray-600">{month.name}</div>
              <div className="grid grid-cols-31 gap-[2px]">
                {month.days.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: (monthIndex * 31 + dayIndex) * 0.001,
                    }}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)}`}
                    title={`${day.date}: ${day.count} activities`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <span className="text-sm text-gray-600">Less</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-800 rounded-sm"></div>
            <span className="text-sm text-gray-600">More</span>
          </div>
        </div>
      </div>
    );
  };

  const renderLeetCodeActivity = () => {
    if (!leetcodeData) return null;

    const today = new Date();
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const activityMap = new Map();

    for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const timestamp = Math.floor(d.getTime() / 1000);
      const dateStr = d.toISOString().split("T")[0];
      activityMap.set(dateStr, leetcodeData.submissionCalendar[timestamp] || 0);
    }

    const months = [];
    let currentMonth = new Date(threeMonthsAgo);
    while (currentMonth <= today) {
      const monthData = { name: getMonthName(currentMonth), days: [] };
      const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dateStr = date.toISOString().split("T")[0];
        monthData.days.push({
          date: dateStr,
          count: activityMap.get(dateStr) || 0,
        });
      }
      months.push(monthData);
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaCode className="text-3xl text-gray-900" />
          <h3 className="text-2xl font-bold text-gray-900">LeetCode Activity</h3>
        </div>

        <div className="flex flex-col gap-2">
          {months.map((month, monthIndex) => (
            <div key={month.name} className="flex items-center gap-2">
              <div className="w-16 text-sm text-gray-600">{month.name}</div>
              <div className="grid grid-cols-31 gap-[2px]">
                {month.days.map((day, dayIndex) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (monthIndex * 31 + dayIndex) * 0.001 }}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)}`}
                    title={`${day.date}: ${day.count} problems solved`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <StatCard label="Total Solved" value={leetcodeData.totalSolved} />
          <StatCard label="Easy Solved" value={leetcodeData.easySolved} delay={0.1} />
          <StatCard label="Medium Solved" value={leetcodeData.mediumSolved} delay={0.2} />
          <StatCard label="Hard Solved" value={leetcodeData.hardSolved} delay={0.3} />
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Acceptance Rate</span>
            <span className="text-sm font-medium text-gray-900">
              {leetcodeData.acceptanceRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${leetcodeData.acceptanceRate}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ label, value, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-blue-50 p-4 rounded-lg text-center"
    >
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section id="activity" className="py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Activity</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out my recent coding activity on GitHub and LeetCode
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {renderGitHubActivity()}
          {renderLeetCodeActivity()}
        </div>
      </div>
    </section>
  );
}
