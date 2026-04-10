export const invoices = [
  {
    id: '1',
    ref: 'INV-2026-001',
    date: '2026-04-01',
    amount: 1200,
    currency: 'MRU',
    status: 'Payée',
    instructor: 'Ali Diop',
    participants: 10,
    items: [
      { desc: 'Formation Développement Web ', qty: 1, unit: 1200, total: 1200 }
    ],
    notes: 'Facture pour formation de 10 personnes'
  },
  {
    id: '2',
    ref: 'INV-2026-002',
    date: '2026-04-03',
    amount: 600,
    currency: 'MRU',
    status: 'En attente',
    instructor: 'Moussa Fall',
    participants: 5,
    items: [
      { desc: 'Formation Design UI/UX', qty: 1, unit: 600, total: 600 }
    ],
    notes: ''
  },
  {
    id: '3',
    ref: 'INV-2026-003',
    date: '2026-03-20',
    amount: 1500,
    currency: 'MRU',
    status: 'Annulée',
    instructor: 'Fatou Ndiaye',
    participants: 15,
    items: [
      { desc: 'Formation Marketing digital', qty: 1, unit: 1500, total: 1500 }
    ],
    notes: 'Remise appliquée'
  }
];
