import React, { useEffect, useState } from 'react';
import convertToSimpleDate from '../../components/Admin/TimeSetting/SetDate';

function EmployeeNotice(props) {
    const [notice, setNotice] = useState([]);

    useEffect(() => {
        setNotice(props.notice);
    }, [props.notice]);

    return (
        <div className="mt-8 flex justify-center items-center h-full">
            <div className="w-full max-w-3xl shadow-md rounded-lg p-8 bg-gray-300">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Notice For You By Admin</h2>
                <div className="space-y-6">
                    {notice.map((n, index) => (
                        <div key={index} className="bg-gray-200 rounded-lg shadow p-6 text-black">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-sm text-gray-600">{convertToSimpleDate(n.createdAt)}</p>
                                <p className="text-sm text-gray-600">Notice by: {n.createdBy}</p>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{n.title}</h3>
                            <p className="text-base">{n.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmployeeNotice;
