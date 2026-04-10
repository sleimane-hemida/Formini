"use client";
import React from 'react';

export default function FacturationTile({ invoice }) {
	if (!invoice) return null;
	return (
		<div className="p-4 border rounded-lg">
			<div className="flex justify-between items-center">
				<div>
					<div className="text-sm text-gray-600">{invoice.ref}</div>
					<div className="text-xs text-gray-500">{invoice.date}</div>
				</div>
				<div className="text-right">
					<div className="font-medium">{invoice.amount} {invoice.currency}</div>
					<div className="text-xs text-gray-500">{invoice.status}</div>
				</div>
			</div>
		</div>
	);
}
