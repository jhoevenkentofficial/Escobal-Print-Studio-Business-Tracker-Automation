
// Import React to provide namespace for ReactNode
import React from 'react';

export enum View {
    LANDING = 'LANDING',
    DASHBOARD = 'DASHBOARD'
}

export interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    color: string;
    icon: React.ReactNode;
    isCritical?: boolean;
}

export interface LiveFeedItem {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'busy';
    action: string;
    detail: string;
    time: string;
    color: string;
}

export interface ServiceCard {
    title: string;
    description: string;
    icon: React.ReactNode;
    image: string;
    details: string;
    samples?: string[];
}

export * from './schema';
