"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiDownload, FiCalendar, FiChevronDown } from "react-icons/fi";

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function formatDisplay(iso) {
  const [y, m, day] = iso.split("-");
  return `${day}/${m}`;
}

export default function PageHeader({ title, subtitle, actions }) {
  const today = new Date();
  const defaultEnd = isoDate(today);
  const s = new Date();
  s.setDate(today.getDate() - 29);
  const defaultStart = isoDate(s);

  const [open, setOpen] = useState(false);
  // To avoid hydration mismatches, initialize dates/label to stable server-friendly values
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [label, setLabel] = useState("Derniers 30 jours");
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Compute label on mount to keep server/client markup stable
  useEffect(() => {
    const computed = startDate === defaultStart && endDate === defaultEnd ? "Derniers 30 jours" : `${formatDisplay(startDate)} - ${formatDisplay(endDate)}`;
    setLabel(computed);
  }, [startDate, endDate]);

  const applyRange = () => {
    setOpen(false);
    // future: notify parent via props
  };

  const defaultActions = (
    <div className="flex items-center gap-3">
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center bg-gray-100 rounded-md px-3 py-2 text-sm text-gray-700"
        >
          <FiCalendar className="mr-2 text-gray-500" />
          <span className="truncate max-w-[10rem]">{label}</span>
          <FiChevronDown className="ml-2 text-gray-500" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50 p-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500">Du</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm text-gray-800 bg-white"
                style={{ color: '#0B1220', WebkitTextFillColor: '#0B1220' }}
              />

              <label className="text-xs text-gray-500">Au</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm text-gray-800 bg-white"
                style={{ color: '#0B1220', WebkitTextFillColor: '#0B1220' }}
              />

              <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStartDate(defaultStart);
                    setEndDate(defaultEnd);
                    setOpen(false);
                  }}
                  className="text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-50 whitespace-nowrap"
                >
                  Réinitialiser
                </button>

                <div className="flex gap-2 flex-col sm:flex-row">
                  <button type="button" onClick={() => setOpen(false)} className="text-sm text-gray-700 px-5 py-1 rounded border whitespace-nowrap">
                    Annuler
                  </button>
                  <button type="button" onClick={applyRange} className="text-sm bg-blue-600 text-white px-8 py-1 rounded whitespace-nowrap">
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 focus:outline-none">
        <FiDownload />
        Exporter
      </button>
    </div>
  );

  return (
    <div className="mb-8">
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-3 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div>{actions ? actions : defaultActions}</div>
      </div>
    </div>
  );
}
