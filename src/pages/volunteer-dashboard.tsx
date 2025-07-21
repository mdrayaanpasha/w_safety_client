import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Phone, MapPin, Info, Loader2, ShieldCheck, Hourglass } from 'lucide-react';

// --- Helper Components for a Cleaner UI ---

// A themed spinner for loading states
const Spinner = () => (
    <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
    </div>
);

// A dynamic status badge with dark-theme colors
const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles: { [key: string]: string } = {
        'PENDING': 'bg-slate-700 text-slate-300',
        'IN_PROGRESS': 'bg-blue-500/20 text-blue-300',
        'RESOLVED': 'bg-green-500/20 text-green-300',
    };
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-slate-700 text-slate-300'}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

// The main Complaint Card component, styled for the dark theme
const ComplaintCard = ({ complaint, onUpdateStatus, isUpdating }: { complaint: any, onUpdateStatus: Function, isUpdating: boolean }) => (
    <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-indigo-500/50">
        {/* Card Header */}
        <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-300">ID: {complaint.complaintId}</h3>
            <StatusBadge status={complaint.volunteerStatus} />
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-4 flex-grow">
            <div>
                <p className="font-semibold text-slate-100">{complaint.complainantName}</p>
                <div className="flex items-center text-sm text-slate-400 mt-1">
                    <Phone size={14} className="mr-2" />
                    {complaint.complainantPhone}
                </div>
            </div>
            <div className="text-sm text-slate-300 space-y-2">
                <p className="flex items-start"><Info size={14} className="mr-2 mt-0.5 shrink-0" /> <strong>Type:</strong> &nbsp;{complaint.type}</p>
                <p className="flex items-start"><MapPin size={14} className="mr-2 mt-0.5 shrink-0" /> <strong>Location:</strong> &nbsp;{complaint.location}</p>
            </div>
            <p className="text-sm text-slate-400 pt-3 border-t border-slate-800">{complaint.description || 'No description provided.'}</p>
        </div>

        {/* Card Footer */}
        <div className="p-4 bg-slate-800/50 flex justify-between items-center">
            <p className="text-xs text-slate-500">
                {new Date(complaint.reportedAt).toLocaleString()}
            </p>
            <div className="flex gap-2">
                <button
                    disabled={isUpdating || complaint.volunteerStatus === 'IN_PROGRESS'}
                    onClick={() => onUpdateStatus(complaint.dispatchId, 'IN_PROGRESS')}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-1 px-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Hourglass size={14} /> Start
                </button>
                <button
                    disabled={isUpdating || complaint.volunteerStatus === 'RESOLVED'}
                    onClick={() => onUpdateStatus(complaint.dispatchId, 'RESOLVED')}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShieldCheck size={14} /> Resolve
                </button>
            </div>
        </div>
    </div>
);

// --- Main Dashboard Component ---

const VolunteerDashboard = () => {
    const [complaints, setComplaints] = useState<any[]>([]);
    const [userType, setUserType] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState(false);

    const BACKEND_URL = 'http://localhost:3000';
    const token = localStorage.getItem('VL-TK');

    useEffect(() => {
        const decodeToken = () => {
            if (!token) return;
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserType(payload.userType);
            } catch {
                console.error('Failed to decode JWT.');
            }
        };

        const fetchComplaints = async () => {
            if (!token) { setLoading(false); return; }
            setLoading(true);
            try {
                const response = await axios.post(`${BACKEND_URL}/api/user/check-dispatch`, { token });
                setComplaints(response.data?.complaints || []);
            } catch (err: any) {
                toast.error(err.response?.data?.error || 'Failed to fetch complaints.');
                setComplaints([]);
            } finally {
                setLoading(false);
            }
        };

        decodeToken();
        fetchComplaints();
    }, [token]);

    const updateStatus = async (dispatchId: number, newStatus: 'IN_PROGRESS' | 'RESOLVED') => {
        setStatusUpdating(true);
        const promise = axios.post(`${BACKEND_URL}/api/complaint/updateVolunteers`, { token, dispatchId, newStatus });

        toast.promise(promise, {
            loading: 'Updating status...',
            success: () => {
                // Update state locally for an instant UI update
                setComplaints(prev =>
                    prev.map(c => c.dispatchId === dispatchId ? { ...c, volunteerStatus: newStatus } : c)
                );
                return `Status updated to ${newStatus.replace('_', ' ')}!`;
            },
            error: (err) => err.response?.data?.error || 'Failed to update status.',
        });

        try {
            await promise;
        } catch (error) {
            // Error is handled by toast.promise
        } finally {
            setStatusUpdating(false);
        }
    };

    return (
        <div className="min-h-screen font-sans bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8 bg-grid-slate-800/[0.2]">
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: { background: '#334155', color: '#f1f5f9' },
                }}
            />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-100">Volunteer Dashboard</h1>
                    {userType && (
                        <span className="text-sm font-medium text-white bg-indigo-600 px-3 py-1 rounded-full">{userType}</span>
                    )}
                </div>

                {loading ? (
                    <Spinner />
                ) : complaints.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {complaints.map((complaint) => (
                            <ComplaintCard
                                key={complaint.dispatchId}
                                complaint={complaint}
                                onUpdateStatus={updateStatus}
                                isUpdating={statusUpdating}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-12 mt-8">
                        <h3 className="text-xl font-semibold text-slate-200">All Clear!</h3>
                        <p className="mt-2 text-slate-400">There are no active complaints assigned to you right now.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteerDashboard;