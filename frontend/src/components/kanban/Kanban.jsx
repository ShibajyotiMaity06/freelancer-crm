import React, { useState, useEffect } from 'react';
import { Search, Plus, Clock, AlertCircle, CheckCircle2, X, Trash2, Pencil, Loader2 } from 'lucide-react';

import { getAllLeads, createLead, updateLead, deleteLead } from '../../api/leadApi';

// ─────────────────────────────────────────────
// COLUMNS CONFIG
// ─────────────────────────────────────────────
const COLUMNS = [
  { id: 'New',           title: 'NEW LEADS',     totalKey: 'new' },
  { id: 'Contacted',     title: 'CONTACTED',     totalKey: 'contacted' },
  { id: 'Proposal Sent', title: 'PROPOSAL SENT', totalKey: 'proposal' },
  { id: 'Negotiation',   title: 'NEGOTIATION',   totalKey: 'negotiation' },
  { id: 'Won',           title: 'WON',           totalKey: 'won', badgeColor: 'bg-emerald-500 text-white' },
  { id: 'Lost',          title: 'LOST',          totalKey: 'lost', badgeColor: 'bg-red-500/20 text-red-400' },
];

const getStatusBadgeStyle = (status, nextFollowUpDate) => {
  const now = new Date();
  const followUp = nextFollowUpDate ? new Date(nextFollowUpDate) : null;

  if (followUp && status !== 'Won' && status !== 'Lost') {
    const diffHours = (followUp - now) / (1000 * 60 * 60);
    if (diffHours < 0)    return { text: `Overdue`,     type: 'overdue',  Icon: AlertCircle };
    if (diffHours < 24)   return { text: `Due in ${Math.ceil(diffHours)}h`, type: 'dueDate', Icon: Clock };
    if (diffHours < 48)   return { text: 'Tomorrow',    type: 'normal',   Icon: Clock };
  }
  if (status === 'Won')        return { text: 'Won ✓',         type: 'success',  Icon: CheckCircle2 };
  if (status === 'Negotiation') return { text: 'Ready to Close', type: 'success', Icon: CheckCircle2 };
  return { text: status, type: 'normal', Icon: null };
};

const getBadgeStyles = (type) => {
  switch (type) {
    case 'dueDate':    return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
    case 'overdue':    return 'bg-red-500/10 text-red-400 border border-red-500/20';
    case 'success':    return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'normal':     return 'bg-[#2A2A2D] text-gray-300 border border-gray-700/50';
    default:           return 'bg-gray-800 text-gray-300';
  }
};

const EMPTY_FORM = {
  name: '', company: '', email: '', phone: '', source: 'Other',
  dealValue: '', status: 'New', nextFollowUpDate: '', notes: '',
};

// ════════════════════════════════════════════════
// MODALS (Create/Edit & Delete)
// ════════════════════════════════════════════════
const LeadModal = ({ mode, formData, onChange, onSubmit, onClose, loading }) => {
  const isEdit = mode === 'edit';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#111113] border border-gray-800 rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">{isEdit ? '✏️ Edit Lead' : '➕ Add New Lead'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs text-gray-400 font-medium mb-1 block">Client Name <span className="text-red-400">*</span></label>
              <input name="name" value={formData.name} onChange={onChange} required placeholder="e.g. Rahul Sharma" className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Company</label>
              <input name="company" value={formData.company} onChange={onChange} placeholder="e.g. Acme Inc." className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Deal Value (₹) <span className="text-red-400">*</span></label>
              <input name="dealValue" type="number" value={formData.dealValue} onChange={onChange} required placeholder="e.g. 50000" className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Email</label>
              <input name="email" type="email" value={formData.email} onChange={onChange} placeholder="client@example.com" className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Phone</label>
              <input name="phone" value={formData.phone} onChange={onChange} placeholder="+91 98765 43210" className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Source</label>
              <select name="source" value={formData.source} onChange={onChange} className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                {['LinkedIn', 'Upwork', 'Referral', 'Cold Outreach', 'Other'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1 block">Status</label>
              <select name="status" value={formData.status} onChange={onChange} className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                {['New', 'Contacted', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-400 font-medium mb-1 block">Next Follow-up Date <span className="text-red-400">*</span></label>
              <input name="nextFollowUpDate" type="date" value={formData.nextFollowUpDate} onChange={onChange} required className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-400 font-medium mb-1 block">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={onChange} rows={3} placeholder="Any context about this lead..." className="w-full bg-[#1A1A1D] border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none" />
            </div>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 bg-[#1A1A1D] hover:bg-gray-800 text-gray-300 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-800 cursor-pointer">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isEdit ? 'Save Changes' : 'Create Lead'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteModal = ({ lead, onConfirm, onClose, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
    <div className="bg-[#111113] border border-gray-800 rounded-2xl w-full max-w-sm mx-4 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="text-center">
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-400" /></div>
        <h2 className="text-lg font-bold text-white mb-2">Delete Lead?</h2>
        <p className="text-sm text-gray-400 mb-6">Are you sure you want to delete <span className="text-white font-medium">{lead?.name}</span>? This cannot be undone.</p>
        <div className="flex space-x-3">
          <button onClick={onClose} className="flex-1 bg-[#1A1A1D] hover:bg-gray-800 text-gray-300 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-800 cursor-pointer">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-2 cursor-pointer">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════
// MAIN KANBAN COMPONENT
// ════════════════════════════════════════════════
const Kanban = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [dragOverCol, setDragOverCol] = useState(null); // Track which column is being dragged over

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getAllLeads();
      setLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      const newLead = await createLead(formData);
      setLeads((prev) => [newLead, ...prev]);
      setShowCreate(false);
      setFormData(EMPTY_FORM);
    } catch (err) { console.error(err); } 
    finally { setModalLoading(false); }
  };

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setFormData({
      ...lead,
      nextFollowUpDate: lead.nextFollowUpDate ? lead.nextFollowUpDate.split('T')[0] : '',
    });
    setShowEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setModalLoading(true);
      const updated = await updateLead(selectedLead._id, formData);
      setLeads((prev) => prev.map((l) => (l._id === updated._id ? updated : l)));
      setShowEdit(false);
      setSelectedLead(null);
      setFormData(EMPTY_FORM);
    } catch (err) { console.error(err); } 
    finally { setModalLoading(false); }
  };

  const openDeleteModal = (lead) => {
    setSelectedLead(lead);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    try {
      setModalLoading(true);
      await deleteLead(selectedLead._id);
      setLeads((prev) => prev.filter((l) => l._id !== selectedLead._id));
      setShowDelete(false);
      setSelectedLead(null);
    } catch (err) { console.error(err); } 
    finally { setModalLoading(false); }
  };

  // ── DRAG AND DROP HANDLERS ──
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    
    const leadId = e.dataTransfer.getData('leadId');
    const leadToMove = leads.find((l) => l._id === leadId);
    
    // If it's dropped in the same column, do nothing
    if (!leadToMove || leadToMove.status === newStatus) return;

    // 1. Optimistic UI Update (instant visual change)
    setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l)));

    // 2. Call API to update database
    try {
      await updateLead(leadId, { status: newStatus });
    } catch (err) {
      console.error('Failed to move lead:', err);
      fetchLeads(); // Revert back if API fails
    }
  };

  const getLeadsForColumn = (status) => leads.filter((l) => l.status === status);
  const getColumnTotal = (status) => leads.filter((l) => l.status === status).reduce((sum, l) => sum + (l.dealValue || 0), 0).toLocaleString('en-IN');
  const totalPipeline = leads.filter((l) => l.status !== 'Lost').reduce((sum, l) => sum + (l.dealValue || 0), 0).toLocaleString('en-IN');
  
  // Projected Revenue Calculation
  const probabilityMap = { New: 0.1, Contacted: 0.25, 'Proposal Sent': 0.5, Negotiation: 0.75, Won: 1, Lost: 0 };
  const projectedRevenue = leads.reduce((sum, l) => sum + (l.dealValue || 0) * (probabilityMap[l.status] || 0), 0).toLocaleString('en-IN');

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {showCreate && <LeadModal mode="create" formData={formData} onChange={handleChange} onSubmit={handleCreate} onClose={() => { setShowCreate(false); setFormData(EMPTY_FORM); }} loading={modalLoading} />}
      {showEdit && <LeadModal mode="edit" formData={formData} onChange={handleChange} onSubmit={handleUpdate} onClose={() => { setShowEdit(false); setSelectedLead(null); setFormData(EMPTY_FORM); }} loading={modalLoading} />}
      {showDelete && <DeleteModal lead={selectedLead} onConfirm={handleDelete} onClose={() => { setShowDelete(false); setSelectedLead(null); }} loading={modalLoading} />}

      <div className="min-h-screen text-white font-sans bg-[#0A0A0B]">
        <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 w-full flex flex-col h-screen">
          <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800/60 bg-[#0A0A0B]/80 backdrop-blur-md">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
                <span className="font-bold text-xl tracking-tight">FlowCRM</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Quick search..." className="bg-[#151517] border border-gray-800 rounded-full pl-9 pr-4 py-1.5 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-300 placeholder-gray-500" />
              </div>
              <button onClick={() => setShowCreate(true)} className="bg-white text-black hover:bg-gray-200 flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer active:scale-95">
                <Plus className="w-4 h-4" /><span>Add Lead</span>
              </button>
            </div>
          </header>

          <div className="px-8 mt-8 mb-8 flex flex-col md:flex-row md:items-start justify-between shrink-0">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-500 tracking-wider uppercase">Live Pipeline</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">Revenue Dashboard</h1>
            </div>
            <div className="mt-6 md:mt-0 flex items-center bg-[#151517] rounded-xl border border-gray-800 p-4 shadow-lg">
              <div className="pr-8 cursor-default">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total Pipeline Value</p>
                <p className="text-3xl font-bold">₹{totalPipeline}</p>
              </div>
              <div className="pl-8 border-l border-gray-800 cursor-default" title="Calculated based on stage probability">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Projected Revenue ⓘ</p>
                <p className="text-3xl font-bold text-sky-400">₹{projectedRevenue}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <span className="ml-3 text-gray-400">Loading leads...</span>
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto px-8 pb-8 flex items-start space-x-6 hide-scrollbar relative">
              {COLUMNS.map((col) => {
                const colLeads = getLeadsForColumn(col.id);
                const isDragOver = dragOverCol === col.id;
                
                return (
                  <div
                    key={col.id}
                    onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.id); }}
                    onDragLeave={() => setDragOverCol(null)}
                    onDrop={(e) => handleDrop(e, col.id)}
                    className={`w-[300px] shrink-0 flex flex-col rounded-[20px] p-4 min-h-[500px] transition-colors border ${
                      isDragOver ? 'bg-[#151517] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-[#0A0A0B]/50 border-gray-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest">{col.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.badgeColor || 'bg-gray-800 text-gray-300'}`}>
                          {colLeads.length}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">₹{getColumnTotal(col.id)}</span>
                    </div>

                    <div className="flex flex-col space-y-4 h-full">
                      {colLeads.length === 0 && (
                        <div className="text-center mt-10 text-gray-700 text-xs border-2 border-dashed border-gray-800/50 rounded-xl py-8">
                          Drop leads here
                        </div>
                      )}
                      {colLeads.map((lead) => {
                        const badge = getStatusBadgeStyle(lead.status, lead.nextFollowUpDate);
                        return (
                          <div
                            key={lead._id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, lead._id)}
                            className="bg-[#151517] p-4 rounded-2xl border border-gray-800/80 hover:border-gray-600 transition-all group relative overflow-hidden cursor-grab active:cursor-grabbing hover:shadow-lg hover:-translate-y-0.5"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-gray-100 text-sm">{lead.name}</h4>
                              <span className="font-semibold text-sm text-sky-400">
                                ₹{(lead.dealValue || 0).toLocaleString('en-IN')}
                              </span>
                            </div>

                            <p className="text-xs text-gray-500 mb-4">
                              {lead.company || '—'} {lead.source ? `• ${lead.source}` : ''}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeStyles(badge.type)}`}>
                                {badge.Icon && <badge.Icon className="w-3 h-3" strokeWidth={2.5} />}
                                <span>{badge.text}</span>
                              </div>

                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => { e.stopPropagation(); openEditModal(lead); }} className="w-7 h-7 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center transition-colors cursor-pointer">
                                  <Pencil className="w-3.5 h-3.5 text-indigo-400" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); openDeleteModal(lead); }} className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-colors cursor-pointer">
                                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Kanban;