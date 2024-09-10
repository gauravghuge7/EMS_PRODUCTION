
import { useEffect, useState } from 'react';
import convertToSimpleDate from '../components/Admin/TimeSetting/SetDate';

function EmployeeNotification(props) {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Assuming props.announcement is an array of announcement objects
    setAnnouncements(props?.announcement);
  }, [props?.announcement]);

  return (
    <div className="mt-8 flex justify-center items-center h-full ">
      <div className="w-full max-w-3xl  shadow-md rounded-lg p-8 bg-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Recent Announcements</h2>
        <div className="space-y-6">
          {announcements.map((ann, index) => (
            <div key={index} className="bg-gray-200 rounded-lg shadow p-6 text-black">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">{convertToSimpleDate(ann.createdAt)}</p>
                <p className="text-sm text-gray-600">Announced by: {ann.createdBy}</p>
              </div>
              <p className="text-base">{ann.announcement}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeNotification;
