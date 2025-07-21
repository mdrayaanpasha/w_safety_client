import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Lock, User, Mail, MapPin, Check, X, Loader2, Shield } from 'lucide-react';

const BACKEND_URL = 'https://w-safety-server.vercel.app';

// --- Helper Components ---

// A themed spinner for loading states
const Spinner = () => (
    <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
    </div>
);

// Fullscreen Image Modal with a close button
const FullscreenImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
    <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-indigo-400 transition-colors z-10">
            <X size={32} />
        </button>
        <img
            src={src}
            alt="Verification Proof in Fullscreen"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image
        />
    </div>
);


// User Verification Card
const UserVerificationCard = ({ user, onVerify, onReject, onImageClick }: { user: any; onVerify: (id: number) => void; onReject: (id: number) => void; onImageClick: (src: string) => void; }) => (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-indigo-500/50">
        <div className="flex p-4 gap-4">
            {/* Image Section */}
            {user.filePath ? (
                <img
                    src={`${user.filePath}`}
                    alt={`${user.name}'s proof`}
                    className="w-24 h-24 rounded-lg object-cover cursor-pointer border-2 border-slate-700 hover:border-indigo-500 transition-all"
                    onClick={() => onImageClick(`${BACKEND_URL}${user.filePath}`)}
                />
            ) : (
                <div className="w-24 h-24 bg-slate-700 flex items-center justify-center text-slate-500 text-xs rounded-lg">
                    No Image
                </div>
            )}

            {/* Details Section */}
            <div className="flex-1 space-y-2 text-sm">
                <p className="font-bold text-slate-100">{user.name}</p>
                <p className="flex items-center text-slate-400 gap-2"><Mail size={14} /> {user.email}</p>
                <p className="flex items-center text-slate-400 gap-2"><Shield size={14} /> {user.type}</p>
                <p className="flex items-center text-slate-400 gap-2"><MapPin size={14} /> {user.location}</p>
            </div>
        </div>
        {/* Actions Footer */}
        <div className="bg-slate-900/50 p-3 mt-auto flex justify-end gap-3">
            <button
                onClick={() => onReject(user.id)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-lg text-sm font-semibold transition-colors"
            >
                <X size={16} /> Reject
            </button>
            <button
                onClick={() => onVerify(user.id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-lg text-sm font-semibold transition-colors"
            >
                <Check size={16} /> Accept
            </button>
        </div>
    </div>
);

// --- Main Admin Component ---
const AdminPendingVerifications = () => {
    const [adminPassword, setAdminPassword] = useState('');
    const [users, setUsers] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

    const handleFetch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!adminPassword) {
            toast.error('Admin password is required.');
            return;
        }
        setLoading(true);
        const promise = axios.post(`${BACKEND_URL}/api/user/pending-verifications`, { adminPassword });

        toast.promise(promise, {
            loading: 'Fetching pending users...',
            success: (response) => {
                setUsers(response.data.users || []);
                return response.data.users?.length > 0 ? `${response.data.users.length} users found.` : 'No users pending.';
            },
            error: (err) => err.response?.data?.error || 'Error fetching users.',
        });

        try {
            await promise;
        } catch (error) {
            // Error handled by toast.promise
        } finally {
            setLoading(false);
        }
    };

    const createApiActionHandler = (action: 'verify' | 'reject') => async (userId: number) => {
        const url = `${BACKEND_URL}/api/user/${action}/${userId}`;
        const promise = axios.post(url, { adminPassword });

        toast.promise(promise, {
            loading: `${action === 'verify' ? 'Verifying' : 'Rejecting'} user...`,
            success: () => {
                setUsers(prev => prev?.filter(u => u.id !== userId) || null);
                return `User ${action === 'verify' ? 'verified' : 'rejected'} successfully.`;
            },
            error: (err) => err.response?.data?.error || `Error ${action}ing user.`,
        });
    };

    const handleVerify = createApiActionHandler('verify');
    const handleReject = createApiActionHandler('reject');

    return (
        <div className="min-h-screen font-sans bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8 bg-grid-slate-800/[0.2]">
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#334155', color: '#f1f5f9' } }} />

            <div className="max-w-5xl mx-auto">
                <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-center text-slate-100">Pending Verifications</h2>
                    <form onSubmit={handleFetch} className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                placeholder="Enter Admin Password"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : 'Fetch Users'}
                        </button>
                    </form>
                </div>

                <div className="mt-8">
                    {loading && <Spinner />}
                    {!loading && users && users.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {users.map(user => (
                                <UserVerificationCard
                                    key={user.id}
                                    user={user}
                                    onVerify={handleVerify}
                                    onReject={handleReject}
                                    onImageClick={setFullscreenImage}
                                />
                            ))}
                        </div>
                    )}
                    {!loading && users && users.length === 0 && (
                        <div className="text-center bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-12">
                            <h3 className="text-xl font-semibold text-slate-200">All Caught Up!</h3>
                            <p className="mt-2 text-slate-400">There are no new users waiting for verification.</p>
                        </div>
                    )}
                    {!loading && users === null && (
                        <div className="text-center bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-xl p-12">
                            <User size={48} className="mx-auto text-indigo-400 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-200">Ready for Review</h3>
                            <p className="mt-2 text-slate-400">Enter your admin password and click 'Fetch Users' to see the list.</p>
                        </div>
                    )}
                </div>
            </div>

            {fullscreenImage && <FullscreenImageModal src={fullscreenImage} onClose={() => setFullscreenImage(null)} />}
        </div>
    );
};

export default AdminPendingVerifications;