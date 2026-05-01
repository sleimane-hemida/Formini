"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AdminSidebarPage } from '../sidebar/sidebar';
import { AdminHeaderPage } from '../headerAdmin/headerAdmin';
import { 
  FaUsers, 
  FaBook, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaArrowUp, 
  FaArrowDown, 
  FaEllipsisV 
} from 'react-icons/fa';

// Importation dynamique de ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function AdminDashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Statistiques épurées
  const stats = [
    { label: 'Utilisateurs', value: '1,250', growth: '+12%', isPositive: true, icon: FaUsers, color: 'text-[#0C8CE9]' },
    { label: 'Formations', value: '48', growth: '+3%', isPositive: true, icon: FaBook, color: 'text-gray-600' },
    { label: 'Revenus', value: '15,200 MRU', growth: '+8%', isPositive: true, icon: FaMoneyBillWave, color: 'text-gray-600' },
    { label: 'Engagement', value: '78%', growth: '-2%', isPositive: false, icon: FaChartLine, color: 'text-gray-600' },
  ];

  // Configuration graphique ultra-minimaliste
  const revenueChartOptions = {
    chart: {
      id: 'revenue-chart',
      toolbar: { show: false },
      fontFamily: 'inherit',
      sparkline: { enabled: false }
    },
    colors: ['#0C8CE9'],
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '11px' } }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'inherit',
      },
      y: { 
        formatter: (val) => `${val} MRU`,
        title: {
          formatter: (seriesName) => `${seriesName}:`,
        }
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
      }
    }
  };

  const revenueChartSeries = [{
    name: 'Revenus',
    data: [3200, 4500, 4100, 5200, 4800, 7200, 6800, 9400, 8900, 10200, 11500, 12800]
  }];

  const userDistributionOptions = {
    chart: { id: 'user-distribution-chart' },
    labels: ['Apprenants', 'Formateurs', 'Admins'],
    colors: ['#0C8CE9', '#94a3b8', '#10b981'],
    legend: { position: 'bottom', fontSize: '12px', fontFamily: 'inherit' },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '12px',
              color: '#94a3b8',
              formatter: () => '1,250'
            }
          }
        }
      }
    }
  };

  const userDistributionSeries = [850, 350, 50];

  // Configuration du graphique des inscriptions (Bar Chart)
  const usersCountOptions = {
    chart: {
      id: 'users-count-chart',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: ['#0C8CE9'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%',
      }
    },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontSize: '11px' } }
    },
    yaxis: { show: false },
    tooltip: { theme: 'light' }
  };

  const usersCountSeries = [{
    name: 'Nouveaux Utilisateurs',
    data: [45, 52, 38, 65, 48, 82, 70, 95, 110, 120, 105, 130]
  }];

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Correction forcée pour la visibilité du texte dans les graphiques */}
      <style jsx global>{`
        .apexcharts-tooltip {
          color: #1e293b !important; /* Slate-800 */
          box-shadow: none !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
        }
        .apexcharts-tooltip-title {
          font-weight: 800 !important;
          color: #64748b !important; /* Slate-500 */
        }
        .apexcharts-xaxistooltip {
          color: #1e293b !important;
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 8px !important;
        }
      `}</style>

      <AdminSidebarPage 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      <div className={`flex-1 min-w-0 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <AdminHeaderPage />

        <main className="p-4 sm:p-8 pb-20 lg:pb-8 max-w-7xl mx-auto w-full space-y-10">
          {/* Header Simple */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 pb-4 sm:pb-6 gap-3">
            <div>
              <h1 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">Vue d'ensemble</h1>
              <p className="text-gray-400 text-[10px] sm:text-xs mt-1">Plateforme Formini • Dimanche 16 Avril</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-100 rounded-lg text-[10px] sm:text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                Rapport
              </button>
              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0C8CE9] rounded-lg text-[10px] sm:text-xs font-bold text-white hover:bg-[#0a70bb] transition-all">
                Nouvelle Formation
              </button>
            </div>
          </div>

          {/* Cartes de Statistiques Ultra-Clean */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 sm:gap-4 p-4 sm:p-6 border border-gray-200 rounded-2xl sm:rounded-3xl group hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-gray-50 ${stat.color}`}>
                    <stat.icon size={16} />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md ${stat.isPositive ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                    {stat.growth}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section Graphiques et Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Ligne de tendance */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider">Volume de revenus</h3>
              </div>
              <div className="h-64 w-full border border-gray-200 rounded-2xl p-4">
                <Chart 
                  options={revenueChartOptions}
                  series={revenueChartSeries}
                  type="area"
                  height="100%"
                />
              </div>
            </div>

            {/* Répartition */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Utilisateurs</h3>
              <div className="h-64 w-full border border-gray-200 rounded-2xl flex items-center justify-center p-6">
                <Chart 
                  options={userDistributionOptions}
                  series={userDistributionSeries}
                  type="donut"
                  width="100%"
                />
              </div>
            </div>
          </div>

          {/* Nouveau Graphique : Utilisateurs par mois */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Acquisition Utilisateurs</h3>
            <div className="h-64 w-full border border-gray-200 rounded-2xl p-4">
              <Chart 
                options={usersCountOptions}
                series={usersCountSeries}
                type="bar"
                height="100%"
              />
            </div>
          </div>

          {/* Section Activité Fine Table */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
             <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Activité Récente</h3>
                <button className="text-[11px] font-bold text-[#0C8CE9]">Voir tout</button>
             </div>
             <div className="divide-y divide-gray-50">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#0C8CE9]"></div>
                      <p className="text-sm text-gray-600">Inscription d'un nouveau formateur spécialisé en <span className="font-bold text-gray-900">Design UI/UX</span></p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-300">IL Y A 2H</span>
                  </div>
                ))}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
