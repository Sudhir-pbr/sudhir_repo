import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Radar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale);

const StudentCareerDashboard = ({ user, onLogout }) => {
  const [summary, setSummary] = useState({});
  const [skills, setSkills] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interview, setInterview] = useState({});
  const [rejections, setRejections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryRes, skillsRes, appsRes, interviewRes, rejectionsRes] = await Promise.all([
          fetch('http://localhost:5000/api/student-dashboard/summary', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/student-dashboard/skills', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/student-dashboard/applications', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/student-dashboard/interview', { headers }).then(res => res.json()),
          fetch('http://localhost:5000/api/student-dashboard/rejections', { headers }).then(res => res.json()),
        ]);

        if (!summaryRes.success) throw new Error(summaryRes.message);
        if (!skillsRes.success) throw new Error(skillsRes.message);
        if (!appsRes.success) throw new Error(appsRes.message);
        if (!interviewRes.success) throw new Error(interviewRes.message);
        if (!rejectionsRes.success) throw new Error(rejectionsRes.message);

        setSummary(summaryRes.data);
        setSkills(skillsRes.data);
        setApplications(appsRes.data);
        setInterview(interviewRes.data);
        setRejections(rejectionsRes.data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart Data (with fallbacks)
  const skillsChartData = {
    labels: skills.map(s => s.skill_name) || [],
    datasets: [{
      label: 'Skill Grade (%)',
      data: skills.map(s => s.grade) || [],
      backgroundColor: ['#4cc9f0', '#4895ef', '#4361ee', '#3f37c9', '#3a0ca3', '#480ca8', '#560bad', '#7209b7'],
    }],
  };

  const applicationChartData = {
    labels: ['Accepted', 'Rejected', 'Pending', 'Not Applied'],
    datasets: [{
      data: [
        summary.applications?.accepted || 0,
        summary.applications?.rejected || 0,
        summary.applications?.pending || 0,
        3, // Hardcoded 'Not Applied' for demo
      ],
      backgroundColor: ['#4cc9f0', '#f72585', '#ffbe0b', '#8d99ae'],
    }],
  };

  const interviewChartData = {
    labels: ['Technical Knowledge', 'Problem Solving', 'Communication', 'System Design', 'Cultural Fit', 'Past Experience'],
    datasets: [
      {
        label: 'Your Performance',
        data: [
          interview.technical_knowledge || 0,
          interview.problem_solving || 0,
          interview.communication || 0,
          interview.system_design || 0,
          interview.cultural_fit || 0,
          interview.past_experience || 0,
        ],
        backgroundColor: 'rgba(67, 97, 238, 0.2)',
        borderColor: 'rgba(67, 97, 238, 1)',
        borderWidth: 2,
      },
      {
        label: 'Average Candidate',
        data: [75, 70, 75, 70, 80, 70],
        backgroundColor: 'rgba(242, 37, 133, 0.2)',
        borderColor: 'rgba(242, 37, 133, 1)',
        borderWidth: 2,
      },
    ],
  };

  const rejectionChartData = {
    labels: rejections.map(r => r.reason) || [],
    datasets: [{
      data: rejections.map(r => r.count) || [],
      backgroundColor: ['#f72585', '#b5179e', '#7209b7', '#560bad', '#480ca8'],
    }],
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-5 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p className="text-gray-600">Computer Science Student | Class of 2025</p>
          </div>
        </div>
        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </header>

      <h2 className="text-2xl font-bold text-blue-600 mb-5">Career Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold">Skills Mastered</h3>
          <p className="text-3xl font-bold">{summary.skillsMastered || 0}</p>
          <p className="text-gray-500">Out of {summary.totalSkills || 0} required skills</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold">Average Score</h3>
          <p className="text-3xl font-bold">{summary.averageScore || '0.0'}%</p>
          <p className="text-gray-500">Across all skill assessments</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold">Job Matches</h3>
          <p className="text-3xl font-bold">{summary.jobMatches || 0}</p>
          <p className="text-gray-500">Companies matching your profile</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold">Applications</h3>
          <p className="text-3xl font-bold">{summary.applications?.total || 0}</p>
          <p className="text-gray-500">
            {summary.applications?.accepted || 0} accepted, {summary.applications?.rejected || 0} rejected, {summary.applications?.pending || 0} pending
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-5">Skills Assessment</h3>
          <div className="h-72"><Bar data={skillsChartData} options={{ maintainAspectRatio: false }} /></div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-5">Job Application Status</h3>
          <div className="h-72"><Doughnut data={applicationChartData} options={{ maintainAspectRatio: false }} /></div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h3 className="font-semibold mb-5">Skills Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Skill</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Progress</th>
                <th className="p-3">Industry Demand</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3">{skill.skill_name}</td>
                  <td className="p-3">{skill.grade}%</td>
                  <td className="p-3">
                    <div className="w-full bg-gray-200 rounded h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded" style={{ width: `${skill.progress}%` }}></div>
                    </div>
                  </td>
                  <td className="p-3">{skill.industry_demand}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-white ${skill.status === 'Mastered' ? 'bg-blue-500' : skill.status === 'Proficient' ? 'bg-teal-500' : skill.status === 'Developing' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                      {skill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Applications and Interview Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-5">Companies Matching Your Skills</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3">Company</th>
                  <th className="p-3">Match %</th>
                  <th className="p-3">Required Skills</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3">{app.company_name}</td>
                    <td className="p-3">{app.match_percentage}%</td>
                    <td className="p-3">{app.required_skills}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-white ${app.status === 'Applied' || app.status === 'Interview Scheduled' ? 'bg-blue-500' : app.status === 'Not Applied' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-5">Interview Performance</h3>
          <div className="h-72"><Radar data={interviewChartData} options={{ maintainAspectRatio: false }} /></div>
        </div>
      </div>

      {/* Areas for Improvement and Rejections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-5">Areas for Improvement</h3>
          <div className="flex items-center py-3 border-b">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mr-3">!</div>
            <div>
              <h4 className="font-semibold">Cloud Computing</h4>
              <p className="text-gray-500">Take AWS or Azure certification course</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-5">Interview Rejections</h3>
          <div className="h-72"><Pie data={rejectionChartData} options={{ maintainAspectRatio: false }} /></div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold mb-5">Recommended Courses</h3>
          <div className="flex items-center py-3 border-b">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">1</div>
            <div>
              <h4 className="font-semibold">AWS Cloud Practitioner</h4>
              <p className="text-gray-500">Fundamental cloud concepts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCareerDashboard;