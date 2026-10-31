import React from "react";
import { appointments } from "@/content/appointments";
import type { Appointment } from "@/content/types";

interface AppointmentListProps {
  filterStatus?: "current" | "former";
  className?: string;
  items?: Appointment[];
  showGrouped?: boolean;
}

export function AppointmentList({
  filterStatus,
  className = "",
  items = appointments,
  showGrouped = true,
}: AppointmentListProps) {
  if (filterStatus) {
    const filtered = items.filter((item) => item.status === filterStatus);
    return (
      <div className={`divide-y divide-line border-y border-line ${className}`}>
        {filtered.map((item) => renderSimpleRow(item))}
      </div>
    );
  }

  if (!showGrouped) {
    return (
      <div className={`divide-y divide-line border-y border-line ${className}`}>
        {items.map((item) => renderSimpleRow(item))}
      </div>
    );
  }

  // Grouped Layout matching Stitch design: Current Standing Timeline + Former Representations
  const current = items.filter(
    (a) => a.status === "current" && a.verified && a.role.verified && a.organization.verified
  );
  const former = items.filter(
    (a) => a.status === "former" && a.verified && a.role.verified && a.organization.verified
  );

  return (
    <div className={`space-y-8 ${className}`}>
      {/* 1. CURRENT STANDING TIMELINE */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-accent-text font-semibold">
            Current Standing &bull; Active Panels
          </span>
        </div>

        <div className="relative pl-6 sm:pl-7 border-l-2 border-accent space-y-6 sm:space-y-7 ml-2">
          {current.map((item) => {
            const tag =
              item.id === "panel-counsel-uoi"
                ? "CENTRAL GOVERNMENT"
                : item.id === "panel-counsel-up"
                ? "STATE STANDING"
                : "PUBLIC SECTOR";

            return (
              <div key={item.id} className="relative group">
                {/* Node dot on the vertical red line */}
                <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background group-hover:scale-125 transition-transform" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-accent-text block">
                  {tag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-foreground font-medium mt-0.5 group-hover:text-accent-text transition-colors">
                  {item.role.value} &mdash; {item.organization.value}
                </h3>
                <p className="text-xs text-secondary mt-1 leading-relaxed">
                  {item.id === "panel-counsel-uoi" &&
                    "Appearing on behalf of the Central Government before judicial forums in Delhi."}
                  {item.id === "panel-counsel-up" &&
                    "Representing state administrative bodies and public instrumentalities."}
                  {item.id === "panel-counsel-dmrc" &&
                    "Advising and handling public transit infrastructure and arbitration matters."}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. FORMER REPRESENTATIONS */}
      {former.length > 0 && (
        <div className="pt-6 border-t border-line">
          <span className="text-[10px] uppercase font-mono tracking-wider text-secondary block mb-3 font-semibold">
            FORMER REPRESENTATIONS
          </span>
          <ul className="space-y-2.5 text-xs text-secondary">
            {former.map((item) => (
              <li key={item.id} className="flex items-center gap-2.5">
                <span className="w-1.5 h-[1.5px] bg-secondary shrink-0" />
                <span className="text-foreground/90 font-medium">
                  Former {item.role.value} &mdash; {item.organization.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function renderSimpleRow(item: Appointment) {
  if (!item.verified || !item.role.verified || !item.organization.verified) {
    return null;
  }
  const isCurrent = item.status === "current";

  return (
    <div
      key={item.id}
      className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group min-h-[56px]"
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-xs tracking-wider uppercase font-semibold text-accent-text">
            {item.role.value}
          </span>
          <span className="text-line text-xs" aria-hidden="true">
            /
          </span>
          <span className="font-display text-lg sm:text-xl text-foreground font-medium">
            {item.organization.value}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`text-[10px] tracking-[0.16em] uppercase px-2 py-0.5 rounded-[2px] font-mono border ${
            isCurrent
              ? "border-accent/40 bg-accent/10 text-accent-text"
              : "border-line text-secondary bg-surface"
          }`}
        >
          {isCurrent ? "Active Panel" : "Former Appointment"}
        </span>
      </div>
    </div>
  );
}
