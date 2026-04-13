"use client";

import React from "react";
import Header from "../../../composant/layout/header";
import Nav from "../navigation/nav";
import Footer from "../../../composant/layout/footer";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import dynamic from 'next/dynamic';

// Dynamic import for ApexCharts to prevent Next.js SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AcceuilPage() {
    // ----------------------------------------------------
    // Configurations Graphiques
    // ----------------------------------------------------

    const lineChartOptions = {
        chart: {
            type: 'line',
            toolbar: { show: false },
            fontFamily: 'inherit',
            background: 'transparent',
            parentHeightOffset: 0
        },
        colors: ['#000000', '#abc4ff'],
        stroke: {
            curve: 'smooth',
            width: [1.5, 1.5],
            dashArray: [0, 4]
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#64748b', fontSize: '12px', fontWeight: 500 }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#64748b', fontSize: '12px', fontWeight: 500 },
                formatter: (value) => value === 0 ? '0' : `${value / 1000}K`
            },
            min: 0,
            max: 30000,
            tickAmount: 3
        },
        grid: { show: false },
        legend: { show: false },
        tooltip: { theme: 'light' }
    };

    const lineChartSeries = [
        { name: 'This year', data: [11000, 13000, 24000, 21000, 26000, 28000, 29000] }, 
        { name: 'Last year', data: [5000, 20000, 6000, 16000, 24000, 30000, 31000] }
    ];

    const barChartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'inherit',
            parentHeightOffset: 0
        },
        colors: ['#a1c4e8', '#5ddbc5', '#000000', '#7bb8ff', '#ba93ec', '#6cd988'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '40%',
                distributed: true 
            }
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        xaxis: {
            categories: ['Linux', 'Mac', 'iOS', 'Windows', 'Android', 'Other'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#64748b', fontSize: '12px', fontWeight: 500 } }
        },
        yaxis: {
            labels: {
                style: { colors: '#64748b', fontSize: '12px', fontWeight: 500 },
                formatter: (value) => value === 0 ? '0' : `${value / 1000}K`
            },
            min: 0,
            max: 30000,
            tickAmount: 3
        },
        grid: { show: false }
    };

    const barChartSeries = [{
        name: 'Traffic',
        data: [17000, 30000, 21000, 31000, 13000, 26000]
    }];

    const donutChartOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit'
        },
        colors: ['#333333', '#7bb8ff', '#5ddbc5', '#a1c4e8'], 
        plotOptions: {
            pie: {
                donut: {
                    size: '60%'
                }
            }
        },
        dataLabels: { enabled: false },
        // On modifie la bordure pour qu'elle corresponde à la nouvelle couleur de fond des éléments
        stroke: { show: true, colors: ['#f1f5f9'], width: 3 }, 
        legend: { show: false }, 
        tooltip: { enabled: true }
    };

    const donutChartSeries = [52.1, 22.8, 13.9, 11.2];

    return (
        <div className="bg-white min-h-screen text-slate-900 font-sans">
            <Header />
            <div className="pt-24"> 
                <Nav />
                {/* On s'aligne sur la même largeur que le profil pour la consistance */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    
                    {/* Le grand conteneur principal avec ombre et bordure, comme demandé */}
                    <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/40 rounded-[2rem] p-6 sm:p-10 mb-8">

                    {/* STATS CARDS */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {/* Views (Fonds très légèrement plus foncés avec bordure) */}
                        <div className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl p-5 flex flex-col justify-center">
                            <span className="text-[13px] text-slate-700 font-semibold mb-2">Views</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">7,265</span>
                                <span className="flex items-center text-[11px] font-bold text-slate-500">
                                    +11.01% <HiArrowTrendingUp className="ml-1 text-sm text-emerald-500" />
                                </span>
                            </div>
                        </div>

                        {/* Visits */}
                        <div className="bg-blue-50 border border-blue-100 shadow-sm rounded-2xl p-5 flex flex-col justify-center">
                            <span className="text-[13px] text-slate-700 font-semibold mb-2">Visits</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">3,671</span>
                                <span className="flex items-center text-[11px] font-bold text-slate-500">
                                    -0.03% <HiArrowTrendingDown className="ml-1 text-sm text-red-400" />
                                </span>
                            </div>
                        </div>

                        {/* New Users */}
                        <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-2xl p-5 flex flex-col justify-center">
                            <span className="text-[13px] text-slate-700 font-semibold mb-2">New Users</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">156</span>
                                <span className="flex items-center text-[11px] font-bold text-slate-500">
                                    +15.03% <HiArrowTrendingUp className="ml-1 text-sm text-emerald-500" />
                                </span>
                            </div>
                        </div>

                        {/* Active Users */}
                        <div className="bg-sky-50 border border-sky-100 shadow-sm rounded-2xl p-5 flex flex-col justify-center">
                            <span className="text-[13px] text-slate-700 font-semibold mb-2">Active Users</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">2,318</span>
                                <span className="flex items-center text-[11px] font-bold text-slate-500">
                                    +6.08% <HiArrowTrendingUp className="ml-1 text-sm text-emerald-500" />
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* MAIN LINE CHART SECTION */}
                    {/* Fond gris un peu plus prononcé (slate-100) pour bien détacher l'élément */}
                    <section className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl p-6 mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            
                            <div className="flex flex-wrap items-center gap-4 text-[13px]">
                                <span className="font-bold text-slate-900">Total Users</span>
                                <span className="font-semibold text-slate-500">Total Projects</span>
                                <span className="font-semibold text-slate-500">Operating Status</span>
                                
                                <div className="hidden sm:block h-4 w-px bg-slate-300 ml-1"></div>

                                <div className="flex items-center gap-4 ml-0 sm:ml-2">
                                    <span className="flex items-center text-slate-700 font-semibold text-[12px]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-black mr-1.5"></span>
                                        This year
                                    </span>
                                    <span className="flex items-center text-slate-500 font-semibold text-[12px]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                                        Last year
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hauteur du graphique réduite */}
                        <div className="h-[230px] w-full">
                            <Chart options={lineChartOptions} series={lineChartSeries} type="line" height="100%" />
                        </div>
                    </section>

                    {/* DUAL CHARTS SECTION */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* Traffic by Device */}
                        <div className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl p-6">
                            <h3 className="text-[14px] font-bold text-slate-900 mb-6">Traffic by Device</h3>
                            <div className="h-[200px] w-[95%]">
                                <Chart options={barChartOptions} series={barChartSeries} type="bar" height="100%" />
                            </div>
                        </div>

                        {/* Traffic by Location */}
                        <div className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col">
                            <h3 className="text-[14px] font-bold text-slate-900 mb-6">Traffic by Location</h3>
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start h-full gap-8">
                                
                                {/* Taille du Donut réduite */}
                                <div className="w-[140px] h-[140px] flex-shrink-0">
                                    <Chart options={donutChartOptions} series={donutChartSeries} type="donut" width="100%" height="100%" />
                                </div>

                                <div className="flex-1 w-full pl-0 sm:pl-4">
                                    <ul className="flex flex-col gap-3 text-[12px] font-semibold text-slate-700 w-full max-w-[200px]">
                                        <li className="flex justify-between items-center w-full">
                                            <span className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-[#333333] rounded-full mr-2"></span> 
                                                United States
                                            </span>
                                            <span className="text-slate-900 font-bold">52.1%</span>
                                        </li>
                                        <li className="flex justify-between items-center w-full">
                                            <span className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-[#7bb8ff] rounded-full mr-2"></span> 
                                                Canada
                                            </span>
                                            <span className="text-slate-900 font-bold">22.8%</span>
                                        </li>
                                        <li className="flex justify-between items-center w-full">
                                            <span className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-[#5ddbc5] rounded-full mr-2"></span> 
                                                Mexico
                                            </span>
                                            <span className="text-slate-900 font-bold">13.9%</span>
                                        </li>
                                        <li className="flex justify-between items-center w-full">
                                            <span className="flex items-center">
                                                <span className="w-1.5 h-1.5 bg-[#a1c4e8] rounded-full mr-2"></span> 
                                                Other
                                            </span>
                                            <span className="text-slate-900 font-bold">11.2%</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                    </section>
                    
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
