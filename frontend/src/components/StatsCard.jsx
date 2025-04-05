


// export default function StatsCard({ title, value, description, color = 'blue' }) {
//   const colorClasses = {
//     blue: 'bg-blue-100 text-blue-600',
//     green: 'bg-green-100 text-green-600',
//     purple: 'bg-purple-100 text-purple-600',
//     orange: 'bg-orange-100 text-orange-600'
//   };

//   // Default icon based on title if no icon provided
//   const getIcon = (title) => {
//     switch(title?.toLowerCase()) {
//       case 'mncs visited':
//         return '🏢';
//       case 'students selected':
//         return '🎓';
//       case 'highest package':
//         return '💰';
//       case 'upcoming drives':
//         return '📅';
//       default:
//         return '📊';
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-6 flex items-start">
//       <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${colorClasses[color]}`}>
//         {getIcon(title)}
//       </div>
//       <div className="flex-1">
//       <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
//         <h3 className="text-2xl font-bold mb-1">{value}</h3>
//         <p className="text-sm text-gray-500 mt-1">{description}</p>
//       </div>
//     </div>
//   );
// }




















export default function StatsCard({ title, value, description, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  const getIcon = (title) => {
    switch (title?.toLowerCase()) {
      case 'mncs visited':
        return '🏢';
      case 'students selected':
        return '🎓';
      case 'highest package':
        return '💰';
      case 'upcoming drives':
        return '📅';
      case 'total candidates':
        return '👥';
      case 'shortlisted':
        return '✅';
      case 'interviews':
        return '🎤';
      case 'offers':
        return '✨';
      default:
        return '📊';
    }
  };

  // Add logging to debug prop values
  console.log('StatsCard - Props:', { title, value, description, color });

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-start">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${colorClasses[color]}`}>
        {getIcon(title)}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-800">{title || 'No Title'}</h4>
        <h3 className="text-2xl font-bold mb-1">{value !== undefined ? value : 'N/A'}</h3>
        <p className="text-sm text-gray-500 mt-1">{description || 'No description'}</p>
      </div>
    </div>
  );
}