import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen pt-24">

            <header className="bg-white shadow-sm">
                <div className="max-w-7xl flex items-center justify-center mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-poppins  p-2 rounded-lg bg-violet-100  border w-fit  font-light text-center  text-gray-900">About US</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h2 className="text-2xl leading-6 font-medium text-gray-900">Empowering Workplaces</h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Streamline your HR processes with our cutting-edge solution.</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <dl>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Our Mission</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">To simplify employee management and enhance workplace productivity.</dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Key Features</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                    <div className="w-0 flex-1 flex items-center">
                                                        <span className="ml-2 flex-1 w-0 truncate">Employee Profiles</span>
                                                    </div>
                                                </li>
                                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                    <div className="w-0 flex-1 flex items-center">
                                                        <span className="ml-2 flex-1 w-0 truncate">Time Tracking</span>
                                                    </div>
                                                </li>
                                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                    <div className="w-0 flex-1 flex items-center">
                                                        <span className="ml-2 flex-1 w-0 truncate">Performance Management</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Why Choose Us</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            Our system is designed with a focus on user experience, security, and scalability. We leverage the latest technologies to ensure your data is safe and your workflows are efficient.
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;