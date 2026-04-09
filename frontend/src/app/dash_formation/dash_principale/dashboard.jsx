"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Header from "../../../composant/layout/header";
import Sidebar from "../sidebar/sidebar";
import PageHeader from "./PageHeader";
import Footer from "../../../composant/layout/footer";
import { FiBarChart2, FiBook, FiDollarSign, FiStar } from "react-icons/fi";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const kpis = useMemo(
    () => [
      { id: "courses", title: "Formations", value: 12, delta: "+8%", icon: FiBook },
      { id: "sales", title: "Ventes", value: 34, delta: "+12%", icon: FiBarChart2 },
      { id: "revenue", title: "Revenu", value: "€1,240", delta: "+6%", icon: FiDollarSign },
      { id: "rating", title: "Notes", value: 4.8, delta: "+0.2", icon: FiStar }
    ],
    []
  );

  const pieOptions = {
    chart: { toolbar: { show: false }, foreColor: "#111827" },
    labels: ["Prix normal", "avec Promotion", "Gratuites"],
    legend: { position: "bottom", labels: { colors: "#111827" } },
    colors: ["#0C8CE9", "#0A71BC", "#6EE7B7"],
    dataLabels: { enabled: false },
    tooltip: { theme: "dark", style: { fontSize: "13px" } },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: { show: true, color: "#111827" },
            value: { show: true, color: "#111827" },
            total: { show: true, label: "Total", color: "#111827" }
          }
        }
      }
    }
  };
  const pieSeries = [45, 35, 20];

  const lineOptions = {
    chart: { toolbar: { show: false }, zoom: { enabled: false }, foreColor: "#111827" },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { categories: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4", "Semaine 5", "Semaine 6", "Semaine 7"], labels: { style: { colors: "#111827" } } },
    yaxis: { labels: { style: { colors: "#111827" } } },
    colors: ["#0C8CE9"],
    grid: { strokeDashArray: 4 },
    tooltip: { theme: "dark", style: { fontSize: "13px" } },
    legend: { labels: { colors: "#111827" } }
  };
  const lineSeries = [{ name: "Visites", data: [30, 45, 35, 60, 55, 80, 95] }];

  const barOptions = {
    chart: { toolbar: { show: false }, foreColor: "#111827" },
    plotOptions: { bar: { borderRadius: 6 } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"], labels: { style: { colors: "#111827" } } },
    yaxis: { labels: { style: { colors: "#111827" } } },
    colors: ["#0C8CE9"],
    dataLabels: { enabled: false },
    tooltip: { theme: "dark", style: { fontSize: "13px" } },
    legend: { labels: { colors: "#111827" } }
  };
  const barSeries = [{ name: "Ventes", data: [12, 18, 25, 15, 30] }];

  return (
    <>
    <div className="min-h-screen bg-gray-50 pt-24">
      <Header />

      <div className="flex w-full">
        <div className="pl-[17px] sm:pl-[17px]">
          <Sidebar />
        </div>

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <main>
              <PageHeader title="Tableau de bord" subtitle="Vue d'ensemble des performances et statistiques." />

              <div className="dashboard-body space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpis.map((k) => (
                  <div key={k.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">{k.title}</p>
                      <p className="mt-1 text-2xl font-bold text-gray-900">{k.value}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-green-500">{k.delta}</div>
                      <div className="mt-2 bg-blue-50 p-2 rounded-md">
                        <k.icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium mb-3 text-gray-900">Répartition des types de ventes</h3>
                  <Chart options={pieOptions} series={pieSeries} type="donut" height={260} />
                </div>

                <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium mb-3 text-gray-900">Visites</h3>
                  <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
                </div>

                <div className="col-span-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium mb-3 text-gray-900">Ventes par mois</h3>
                  <Chart options={barOptions} series={barSeries} type="bar" height={300} />
                </div>
              </div>

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
