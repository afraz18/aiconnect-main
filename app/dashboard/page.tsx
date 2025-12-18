"use client";

import React, { useState } from "react";
<<<<<<< HEAD
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import OverviewView from "@/components/dashboard/views/overview-view";
import RecordingView from "@/components/dashboard/views/recording-view";
import InterviewsView from "@/components/dashboard/views/interviews-view";

export type DashboardView = "overview" | "recording" | "interviews";

export default function DashboardPage() {
    const [activeView, setActiveView] = useState<DashboardView>("overview");

    const renderView = () => {
        switch (activeView) {
            case "overview":
                return <OverviewView setActiveView={setActiveView} />;
            case "recording":
                return <RecordingView />;
            case "interviews":
                return <InterviewsView />;
            default:
                return <OverviewView setActiveView={setActiveView} />;
        }
    };

    return (
        <div className="flex gap-8">
            <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
            <main className="flex-1">{renderView()}</main>
        </div>
    );
=======

import OverviewView from "@/components/dashboard/views/overview-view";
import RecordingView from "@/components/dashboard/views/recording-view";
import InterviewsView from "@/components/dashboard/views/interviews-view";
import SettingsView from "@/components/dashboard/views/settings-view";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("overview");

  const renderView = () => {
    switch (activeView) {
      case "recording":
        return <RecordingView />;

      case "interviews":
        return <InterviewsView />;

      case "settings":
        return <SettingsView />;

      default:
        // pass setter so overview buttons can switch views
        return <OverviewView setActiveView={setActiveView} />;
    }
  };

  return <div className="h-full w-full">{renderView()}</div>;
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
}
