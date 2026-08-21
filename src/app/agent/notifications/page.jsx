'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Search,
    MoreVertical,
    CheckCircle2,
    Users,
    Play,
    Bell,
    MapPin,
    SquarePen,
    Camera,
    Settings,
    Phone,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    X,
    Volume2,
    Share2,
    Heart,
    Send
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

export default function NotificationsPage() {
    const [hasHydrated, setHasHydrated] = useState(false);
    const [activeTab, setActiveTab] = useState('General');
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedReel, setSelectedReel] = useState(null);
    const [currentSegment, setCurrentSegment] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [videoProgress, setVideoProgress] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    // Reset segment when a new reel is selected
    useEffect(() => {
        if (selectedReel) {
            setCurrentSegment(0);
            setIsPlaying(true);
            setVideoProgress(0);
        }
    }, [selectedReel]);

    // Handle video time updates for seekbar
    const handleTimeUpdate = useCallback(() => {
        const video = videoRef.current;
        if (video && video.duration) {
            setVideoProgress((video.currentTime / video.duration) * 100);
        }
    }, []);

    // Auto-advance to next segment when video ends
    const handleVideoEnded = useCallback(() => {
        if (selectedReel && currentSegment < (selectedReel.videos?.length || 1) - 1) {
            setCurrentSegment(prev => prev + 1);
            setVideoProgress(0);
        } else {
            setSelectedReel(null);
            setCurrentSegment(0);
        }
    }, [selectedReel, currentSegment]);

    // Seek video on seekbar click
    const handleSeek = useCallback((e) => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        video.currentTime = percent * video.duration;
    }, []);

    // Toggle play/pause
    const togglePlayPause = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    }, []);

    const tabs = ['General', 'Groups', 'NetraReels'];

    const generals = [
        { id: '1', type: "lead", title: 'New Property Lead', body: 'A new user is interested in DLF Phase 5 Property.', time: '2026-05-04T10:30:00Z', price: "₹ 1 Cr", location: "DLF Phase 5, Gurugram", beds: 4, baths: 5, sqft: "4,500", message: "A new user is interested in DLF Phase 5 Property.", unread: 1 },
        { id: '2', type: "subscription", title: 'Subscription Update', body: 'Your premium plan will expire in 3 days.', time: '2026-05-03T14:15:00Z', message: "Your premium plan will expire in 3 days.", unread: 0 },
        { id: '3', type: "property", title: 'Property Approved', body: 'Your listing for Cyber City Penthouse has been approved.', time: '2026-04-26T11:00:00Z', message: "Your listing for Cyber City Penthouse has been approved.", unread: 0 },
        { id: '4', type: "lead", title: 'New Property Lead', body: 'A new user is interested in DLF Phase 5 Property.', time: '2026-05-04T10:30:00Z', price: "₹ 1 Cr", location: "DLF Phase 5, Gurugram", beds: 4, baths: 5, sqft: "4,500", message: "A new user is interested in DLF Phase 5 Property.", unread: 0 },
        { id: '5', type: "subscription", title: 'Subscription Update', body: 'Your premium plan will expire in 3 days.', time: '2026-05-03T14:15:00Z', message: "Your premium plan will expire in 3 days.", unread: 0 },
        { id: '6', type: "property", title: 'Property Approved', body: 'Your listing for Cyber City Penthouse has been approved.', time: '2026-04-26T11:00:00Z', message: "Your listing for Cyber City Penthouse has been approved.", unread: 0 },
        { id: '7', type: "lead", title: 'New Property Lead', body: 'A new user is interested in DLF Phase 5 Property.', time: '2026-05-04T10:30:00Z', price: "₹ 1 Cr", location: "DLF Phase 5, Gurugram", beds: 4, baths: 5, sqft: "4,500", message: "A new user is interested in DLF Phase 5 Property.", unread: 0 },
        { id: '8', type: "subscription", title: 'Subscription Update', body: 'Your premium plan will expire in 3 days.', time: '2026-05-03T14:15:00Z', message: "Your premium plan will expire in 3 days.", unread: 0 },
        { id: '9', type: "property", title: 'Property Approved', body: 'Your listing for Cyber City Penthouse has been approved.', time: '2026-04-26T11:00:00Z', message: "Your listing for Cyber City Penthouse has been approved.", unread: 0 },

    ];

    const contacts = [
        {
            id: 1,
            name: 'Launched a new project',
            message: 'Hello, how are you? I am going to market. Do you want somthing?',
            time: '2026-05-04T10:30:00Z',
            image: '/dev/1.png'
        },
        {
            id: 2,
            name: 'Newly launched project',
            message: 'I just arrived in front of the college.',
            time: '2026-05-04T10:30:00Z',
            image: '/dev/2.png'
        },
        {
            id: 3,
            name: 'Upcoming Projects',
            message: 'I received my new phone that I ordered from online shoping.',
            time: '2026-05-04T10:30:00Z',
            image: '/dev/3.png'
        }
    ];

    const reelsData = [
        {
            id: 1, name: 'M3M', time: 'Yesterday at 9:56 pm', image: '/dev/1.png', viewed: false, segments: 4,
            videos: [
                '/video.mp4',
                '/video.mp4',
                '/video.mp4',
                '/video.mp4',
            ]
        },
        {
            id: 2, name: 'Emaar', time: 'Yesterday at 6:45 pm', image: '/dev/2.png', viewed: false, segments: 1,
            videos: [
                '/video.mp4',
            ]
        },
        {
            id: 3, name: 'Hero', time: 'Yesterday at 3:20 pm', image: '/dev/3.png', viewed: false, segments: 2,
            videos: [
                '/video.mp4',
                '/video.mp4',
            ]
        },
        {
            id: 4, name: 'Godrej', time: 'Yesterday at 12:59 pm', image: '/dev/4.png', viewed: true, segments: 3,
            videos: [
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            ]
        },
        {
            id: 5, name: 'Omaxe', time: 'Today at 7:57 am', image: '/dev/5.png', viewed: true, segments: 1,
            videos: [
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            ]
        },
    ];

    const StatusRing = ({ segments, viewed }) => {
        const id = React.useId();
        const radius = 49;
        const strokeWidth = 5;
        const normalizedRadius = radius - strokeWidth;
        const circumference = normalizedRadius * 2 * Math.PI;
        const gap = segments > 1 ? 10 : 0;
        const segmentLength = (circumference / segments) - gap;

        return (
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <defs>
                    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF8A00" />
                        <stop offset="50%" stopColor="#FF5A00" />
                        <stop offset="100%" stopColor="#E63E00" />
                    </linearGradient>
                </defs>
                {[...Array(segments)].map((_, i) => (
                    <circle
                        key={i}
                        stroke={viewed ? "#CBD5E1" : `url(#${id})`}
                        strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                        style={{ strokeDashoffset: -i * (circumference / segments) }}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={normalizedRadius}
                        cx="50"
                        cy="50"
                        strokeLinecap="round"
                    />
                ))}
            </svg>
        );
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden selection:bg-primary/10 relative">
            <div className={`w-full lg:w-[450px] h-screen min-h-0 flex flex-col border-r border-slate-100 bg-white shadow-xl relative z-20 ${selectedChat ? 'hidden lg:flex' : 'flex'
                }`}>
                <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-2 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0 md:gap-0">
                            <Link href="/agent" className="text-slate-400 hover:text-slate-900 transition-colors">
                                <ChevronLeft size={24} />
                            </Link>
                            <div className="relative w-28 md:w-32 h-8 md:h-10">
                                <Image src="/logo_3D.jpg" alt="PropNetra" fill className="object-contain" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-1 bg-slate-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-slate-100">
                                <MapPin size={10} className="text-red-500" />
                                <span className="agent-tiny font-bold text-slate-900">Gurgaon</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-12 pr-4 py-2 md:py-2 bg-slate-50 border-none agent-body font-medium focus:ring-0 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4 overflow-x-auto border-b border-slate-50">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`cursor-pointer agent-small font-black uppercase tracking-widest whitespace-nowrap px-3 rounded-full py-2 border transition-all ${activeTab === tab
                                    ? 'border-amber-500'
                                    : 'text-slate-400 border-slate-200 hover:text-slate-600'
                                    }`}
                            >
                                <span className={activeTab === tab ? 'gradent_text_color' : ''}>{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto min-h-0 pb-20 [scrollbar-width:thin] [scrollbar-color:var(--color-primary)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-button]:!hidden [&::-webkit-scrollbar-button]:!h-0 [&::-webkit-scrollbar-button]:!w-0" data-lenis-prevent>
                    {activeTab == "General" ?
                        generals.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedChat(contact)}
                                className={`flex items-center gap-3 md:gap-4 p-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-50 relative ${selectedChat?.id === contact.id ? 'bg-slate-50 border-l-4 border-l-primary' : ''
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden relative shadow-md">
                                        <Image src="/logo-512.png" alt={contact.title} fill className="object-contain" />
                                    </div>
                                    {/* <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div> */}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="agent-body font-bold text-slate-900 tracking-tight">{contact.title}</h3>
                                        <span className="agent-tiny font-bold text-green-500">
                                            {hasHydrated ? moment(contact.time).fromNow() : ''}
                                        </span>
                                    </div>
                                    <p className="agent-meta font-medium text-slate-500 line-clamp-2 leading-snug">
                                        {contact.message}
                                    </p>
                                </div>
                            </div>))
                        : null}
                    {activeTab === 'NetraReels' ? (
                        <div className="flex flex-col">
                            {reelsData.filter(r => !r.viewed).map((reel) => (
                                <div
                                    key={reel.id}
                                    onClick={() => setSelectedReel(reel)}
                                    className="flex items-center gap-3 md:gap-4 p-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50/50"
                                >
                                    <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 p-0.5">
                                        <div className="absolute inset-0">
                                            <StatusRing segments={reel.segments} viewed={false} />
                                        </div>
                                        <div className="w-13 h-13 rounded-full overflow-hidden relative border-2 border-white shadow-sm z-10">
                                            <Image src={reel.image} alt={reel.name} fill className="object-contain" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="agent-body font-black text-slate-700 tracking-tight">{reel.name}</h3>
                                        <span className="agent-small font-bold text-slate-500">{reel.time}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="px-5 pt-3 md:px-6 md:pt-3 bg-slate-50/50">
                                <span className="agent-small font-black text-slate-700 uppercase tracking-widest">Viewed</span>
                            </div>
                            {reelsData.filter(r => r.viewed).map((reel) => (
                                <div
                                    key={reel.id}
                                    onClick={() => setSelectedReel(reel)}
                                    className="flex items-center gap-3 md:gap-4 p-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50/50"
                                >
                                    <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 p-0.5">
                                        <div className="absolute inset-0">
                                            <StatusRing segments={reel.segments} viewed={true} />
                                        </div>
                                        <div className="w-13 h-13 rounded-full overflow-hidden relative border-2 border-white shadow-sm z-10">
                                            <Image src={reel.image} alt={reel.name} fill className="object-contain" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="agent-body font-black text-slate-400 tracking-tight">{reel.name}</h3>
                                        <span className="agent-small font-bold text-slate-300">{reel.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {activeTab === 'Groups' ? (
                        contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedChat(contact)}
                                className={`flex items-start gap-3 md:gap-4 p-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-50 relative ${selectedChat?.id === contact.id ? 'bg-slate-50 border-l-4 border-l-primary' : ''
                                    }`}
                            >
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden relative shadow-md">
                                        <Image src={contact?.image || "/logo-512.png"} alt={contact.name} fill className="object-contain" />
                                    </div>
                                    {/* <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div> */}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="agent-body font-bold text-slate-900 tracking-tight">{contact.name}</h3>
                                        <span className="agent-tiny font-bold text-green-500">
                                            {hasHydrated ? moment(contact.time).fromNow() : ''}
                                        </span>
                                    </div>
                                    <p className="agent-meta font-medium text-slate-500 line-clamp-2 leading-snug">
                                        {contact.message}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>
            </div>

            <div className={`flex-1 flex flex-col bg-[#F8F9FB] relative h-full overflow-hidden transition-all duration-300 ${selectedChat ? 'flex' : 'hidden lg:flex'}`}>
                {selectedChat ? (
                    <div className="flex flex-col h-full bg-white lg:bg-transparent">
                        <div className="p-4 md:p-6 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm sticky top-0 z-30">
                            <div className="flex items-center gap-3 md:gap-4">
                                <button onClick={() => setSelectedChat(null)} className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-slate-900">
                                    <ChevronLeft size={24} />
                                </button>
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative border border-slate-200">
                                    <Image src={selectedChat.image || "/logo-512.png"} alt={selectedChat.name || selectedChat.title} fill className="object-contain" />
                                </div>
                                <div>
                                    <h3 className="agent-body font-black text-slate-900 tracking-tight">{selectedChat.name || selectedChat.title}</h3>
                                    <span className="agent-tiny font-bold text-green-500">Online</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4 text-slate-400">
                                <button className="p-2 hover:text-slate-900 transition-colors"><Phone className="w-[18px] h-[18px] md:w-5 md:h-5" /></button>
                                <button className="p-2 hover:text-slate-900 transition-colors"><MoreVertical className="w-[18px] h-[18px] md:w-5 md:h-5" /></button>
                            </div>
                        </div>

                        <div className="flex-1 p-4 md:p-10 overflow-y-auto flex flex-col gap-4 md:gap-6 bg-[#F8F9FB]">
                            {/* <div className="flex flex-col items-center mb-4 md:mb-8">
                                <span className="bg-white px-3 md:px-4 py-1 rounded-full agent-tiny font-black text-slate-400 uppercase tracking-widest shadow-sm border border-slate-100">Today</span>
                            </div> */}
                            <div className="flex gap-3 md:gap-4 max-w-[85%] md:max-w-lg">
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden relative shrink-0">
                                    <Image src={selectedChat.image || "/logo-512.png"} alt={selectedChat.name || selectedChat.title} fill className="object-contain" />
                                </div>
                                <div className="bg-white p-3 pb-0 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                                    <p className="agent-body font-medium text-slate-700 leading-relaxed">{selectedChat.message}</p>
                                    <span className="agent-tiny font-bold text-slate-400 mt-2 mb-4 block text-right">{moment(selectedChat.time).format("LLL")}</span>
                                    {selectedChat?.type == "lead" &&
                                        <Link href="/agent/projects/1" className='w-full py-2 flex justify-center mt-4 border-t-1 border-slate-900/10'>
                                            <button className="agent-button gradent_text_color cursor-pointer rounded-full">Property Details</button>
                                        </Link>
                                    }
                                    {selectedChat?.type == "subscription" &&
                                        <Link href="/agent/subscription" className='w-full py-2 flex justify-center mt-4 border-t-1 border-slate-900/10'>
                                            <button className="agent-button gradent_text_color cursor-pointer rounded-full">Plan Details</button>
                                        </Link>
                                    }
                                    {selectedChat?.type == "property" &&
                                        <Link href="/agent/projects/1" className='w-full py-2 flex justify-center mt-4 border-t-1 border-slate-900/10'>
                                            <button className="agent-button gradent_text_color cursor-pointer rounded-full">Property Details</button>
                                        </Link>
                                    }
                                    {selectedChat?.type == "contact" &&
                                        <Link href="/agent/contacts" className='w-full py-2 flex justify-center mt-4 border-t-1 border-slate-900/10'>
                                            <button className="agent-button gradent_text_color cursor-pointer rounded-full">View Details</button>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-10 lg:p-20 text-center bg-white overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div className="mb-4 md:mb-8 lg:mb-12 relative group bg-slate-50 rounded-3xl border-2 border-slate-100 scale-75 md:scale-90 lg:scale-100">
                            <div className="w-64 h-40 md:w-72 md:h-48  flex items-center justify-center relative shadow-inner overflow-hidden">
                                <div className="w-40 h-28 md:w-48 md:h-32 bg-white border-2 border-slate-200 rounded-xl relative shadow-lg flex overflow-hidden">
                                    <div className="w-12 md:w-16 h-full bg-orange-500 flex flex-col p-2 md:p-3 gap-2">
                                        <div className="w-full h-1 bg-white/30 rounded-full"></div>
                                        <div className="w-full h-1 bg-white/30 rounded-full"></div>
                                        <div className="w-2/3 h-1 bg-white/30 rounded-full"></div>
                                    </div>
                                    <div className="flex-1 p-3 md:p-4 flex flex-col gap-2 md:gap-3 bg-slate-50">
                                        <div className="w-full h-1 md:h-1.5 bg-slate-200 rounded-full"></div>
                                        <div className="w-3/4 h-1 md:h-1.5 bg-slate-200 rounded-full"></div>
                                        <div className="w-1/2 h-1 md:h-1.5 bg-slate-200 rounded-full"></div>
                                        <div className="mt-auto flex justify-end">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-3 md:bottom-4 inset-x-0 flex justify-center">
                                    <div className="w-24 md:w-32 h-1 bg-slate-200 rounded-full"></div>
                                </div>
                            </div>
                            <h2 className="agent-body font-bold text-slate-900 mb-3 md:mb-6 leading-tight max-w-sm tracking-tight px-4">
                                Click on NetraReels to <br /> view <span className="gradent_text_color">Reel Updates</span>
                            </h2>

                            <p className="agent-small font-medium text-slate-500 mb-6 md:mb-10 lg:mb-12 max-w-xs leading-relaxed px-6">
                                Share Photos, Videos and Text that disappear after 72 Hours
                            </p>

                            <button className="px-8 md:px-12 py-3 md:py-3.5 bg-gradient-to-r from-[#FF8A00] to-[#E63E00] text-white rounded-full font-bold agent-small hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 transition-all active:scale-95 shadow-lg shadow-orange-500/20 mb-4">
                                Download
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {selectedReel && (
                <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in zoom-in duration-300">
                    {/* Segment Progress Bars */}
                    <div className="absolute top-0 inset-x-0 p-2 md:p-3 z-[110] flex gap-1">
                        {[...Array(selectedReel.videos?.length || selectedReel.segments)].map((_, i) => (
                            <div key={i} className="h-0.5 md:h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all ease-linear"
                                    style={{
                                        width: i < currentSegment ? '100%' : i === currentSegment ? `${videoProgress}%` : '0%',
                                        transitionDuration: i === currentSegment ? '100ms' : '0ms'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className="absolute top-4 md:top-8 inset-x-0 px-4 md:px-8 z-[110] flex items-center justify-between text-white">
                        <div className="flex items-center gap-2 md:gap-3">
                            <button onClick={() => { setSelectedReel(null); setCurrentSegment(0); }} className="p-1.5 md:p-2 hover:bg-white/10 rounded-full transition-colors">
                                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                            </button>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden relative border border-white/20">
                                <Image src={selectedReel.image} alt={selectedReel.name} fill className="object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="agent-body font-black tracking-tight">{selectedReel.name}</span>
                                <span className="agent-tiny font-bold text-white/60">{selectedReel.time}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 md:gap-6">
                            <Volume2 className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
                            <MoreVertical className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
                            <X className="w-6 h-6 md:w-7 md:h-7 cursor-pointer hover:scale-110 transition-transform" onClick={() => { setSelectedReel(null); setCurrentSegment(0); }} />
                        </div>
                    </div>

                    {/* Video Player Area */}
                    <div className="flex-1 flex flex-col items-center justify-center relative p-4 md:p-8 overflow-hidden">
                        <div className="relative h-full max-h-[75vh] md:max-h-[85vh] aspect-[9/16] bg-slate-900 overflow-hidden shadow-2xl border border-white/10 group">
                            {/* Video Element */}
                            <video
                                ref={videoRef}
                                key={`${selectedReel.id}-${currentSegment}`}
                                src={selectedReel.videos?.[currentSegment]}
                                className="w-full h-full object-cover"
                                autoPlay
                                playsInline
                                onTimeUpdate={handleTimeUpdate}
                                onEnded={handleVideoEnded}
                            />

                            {/* Tap to Play/Pause Overlay */}
                            <div
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                onClick={togglePlayPause}
                            >
                                {!isPlaying && (
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white animate-in fade-in zoom-in duration-200">
                                        <Play className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" />
                                    </div>
                                )}
                            </div>

                            {/* Seekbar at Bottom */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-10 flex items-end cursor-pointer group/seek z-[120] px-1 pb-1"
                                onClick={handleSeek}
                            >
                                <div className="w-full h-1 group-hover/seek:h-2 bg-white/20 rounded-full transition-all relative overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full transition-[width] duration-100 ease-linear relative"
                                        style={{ width: `${videoProgress}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/seek:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Prev/Next Navigation */}
                        <button
                            className="hidden md:flex absolute left-4 md:left-10 w-12 h-12 md:w-14 md:h-14 items-center justify-center bg-black/40 hover:bg-black/60 rounded-full text-white transition-all shadow-xl"
                            onClick={() => { if (currentSegment > 0) { setCurrentSegment(prev => prev - 1); setVideoProgress(0); } }}
                        >
                            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                        </button>
                        <button
                            className="hidden md:flex absolute right-4 md:right-10 w-12 h-12 md:w-14 md:h-14 items-center justify-center bg-black/40 hover:bg-black/60 rounded-full text-white transition-all shadow-xl"
                            onClick={() => {
                                const totalSegments = selectedReel.videos?.length || selectedReel.segments;
                                if (currentSegment < totalSegments - 1) {
                                    setCurrentSegment(prev => prev + 1);
                                    setVideoProgress(0);
                                } else {
                                    setSelectedReel(null);
                                    setCurrentSegment(0);
                                }
                            }}
                        >
                            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
