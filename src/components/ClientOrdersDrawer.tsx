import React from 'react';
import { ClientOrder } from '../types';
import { X, ShoppingBag, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface ClientOrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ClientOrder[];
  onNewOrder: () => void;
}

export const ClientOrdersDrawer: React.FC<ClientOrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onNewOrder
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-neutral-800 bg-neutral-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950/60 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-neutral-100 font-display">Client Projects & Orders</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of orders */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-xs text-neutral-400">
              Track submitted briefs, ongoing development sprints, and turnkey deliveries.
            </div>

            {orders.length === 0 ? (
              <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-8 text-center">
                <AlertCircle className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-neutral-300">No active orders yet</div>
                <p className="mt-1 text-xs text-neutral-500">Pick a template or scope a custom MVP to submit your first project brief.</p>
                <button
                  onClick={() => { onClose(); onNewOrder(); }}
                  className="mt-4 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-300"
                >
                  Start New Project
                </button>
              </div>
            ) : (
              orders.map((order) => {
                const isDev = order.status === 'In Development';
                const isReady = order.status === 'Ready to Launch';
                return (
                  <div
                    key={order.id}
                    className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 transition-all hover:border-neutral-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-400">{order.id}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        isReady ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        isDev ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-neutral-800 text-neutral-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-neutral-200">{order.templateTitle}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Client: {order.clientName} ({order.companyName})
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] border-t border-neutral-800/80 pt-2 text-neutral-400">
                      <span>Timeline: {order.timeline}</span>
                      <span className="font-bold text-neutral-100 tabular-nums">${order.totalPrice}</span>
                    </div>

                    {order.notes && (
                      <div className="rounded bg-neutral-900 p-2 text-[11px] text-neutral-400 line-clamp-2">
                        "{order.notes}"
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer CTA */}
          <div className="border-t border-neutral-800 bg-neutral-950/80 p-4">
            <button
              onClick={() => { onClose(); onNewOrder(); }}
              className="w-full rounded-lg bg-amber-400 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-all"
            >
              Order Another Project
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
