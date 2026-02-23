import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const GATEWAY_URL = 'http://localhost:3000';

const SocketExample: React.FC = () => {
    const [chatSocket, setChatSocket] = useState<Socket | null>(null);
    const [videoSocket, setVideoSocket] = useState<Socket | null>(null);
    const [eventsSocket, setEventsSocket] = useState<Socket | null>(null);

    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs(prev => [`${new Date().toLocaleTimeString()} - ${message}`, ...prev.slice(0, 49)]);
        console.log(message);
    };

    useEffect(() => {
        // 1. Chat Socket
        const chat = io(`${GATEWAY_URL}/chat`, {
            path: '/socket.io',
            withCredentials: true,
            transports: ['polling', 'websocket']
        });

        chat.on('connect', () => {
            addLog('[CHAT] Connected');
            chat.emit('sendMessage', { text: 'Hello from SlotFlow Client' });
        });

        chat.on('messageReceived', (data) => {
            addLog(`[CHAT] Data Received: ${JSON.stringify(data)}`);
        });

        chat.on('disconnect', () => addLog('[CHAT] Disconnected'));
        setChatSocket(chat);

        // 2. Video Socket
        const video = io(`${GATEWAY_URL}/video`, {
            path: '/socket.io',
            withCredentials: true,
            transports: ['polling', 'websocket']
        });

        video.on('connect', () => {
            addLog('[VIDEO] Connected');
            video.emit('signal', { type: 'offer', sampleSdp: 'v=0...' });
        });

        video.on('signalResponse', (data) => {
            addLog(`[VIDEO] Data Received: ${JSON.stringify(data)}`);
        });

        video.on('disconnect', () => addLog('[VIDEO] Disconnected'));
        setVideoSocket(video);

        // 3. Events Socket
        const events = io(`${GATEWAY_URL}/events`, {
            path: '/socket.io',
            withCredentials: true,
            transports: ['polling', 'websocket']
        });

        events.on('connect', () => {
            addLog('[EVENTS] Connected');
            events.emit('subscribe', { channel: 'system-updates' });
        });

        events.on('eventUpdate', (data) => {
            addLog(`[EVENTS] Data Received: ${JSON.stringify(data)}`);
        });

        events.on('disconnect', () => addLog('[EVENTS] Disconnected'));
        setEventsSocket(events);

        return () => {
            chat.disconnect();
            video.disconnect();
            events.disconnect();
        };
    }, []);

    return (
        <div className="p-6 bg-slate-900 text-slate-100 rounded-xl shadow-2xl max-w-2xl mx-auto border border-slate-800">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                SlotFlow Realtime Architecture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatusCard label="Chat" socket={chatSocket} />
                <StatusCard label="Video" socket={videoSocket} />
                <StatusCard label="Events" socket={eventsSocket} />
            </div>

            <div className="relative">
                <div className="absolute top-2 right-2 px-2 py-1 bg-slate-800 rounded text-xs text-slate-500 uppercase font-bold tracking-widest">
                    Live Logs
                </div>
                <div className="h-80 overflow-y-auto bg-black/50 p-4 rounded-lg border border-slate-800 font-mono text-xs leading-relaxed">
                    {logs.length === 0 && <div className="text-slate-600 italic">Waiting for connections...</div>}
                    {logs.map((log, i) => (
                        <div key={i} className={`mb-1 ${log.includes('Received') ? 'text-emerald-400' : 'text-slate-300'}`}>
                            <span className="text-slate-600 mr-2 opacity-50">{log.split(' - ')[0]}</span>
                            {log.split(' - ')[1]}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-xs text-slate-500 text-center">
                Connected via API Gateway (Port 3000) → Realtime Service (Port 5000)
            </div>
        </div>
    );
};

const StatusCard = ({ label, socket }: { label: string, socket: Socket | null }) => {
    const connected = socket?.connected ?? false;
    return (
        <div className={`p-4 rounded-lg border transition-all duration-300 ${connected ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/50 border-slate-700'}`}>
            <div className="text-sm font-medium text-slate-400 mb-1">{label} Namespace</div>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${connected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
                <span className={`text-sm font-bold ${connected ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {connected ? 'CONNECTED' : 'OFFLINE'}
                </span>
            </div>
        </div>
    );
};

export default SocketExample;
