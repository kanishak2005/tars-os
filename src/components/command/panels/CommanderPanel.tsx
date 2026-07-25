"use client";

import WorkspaceContainer from "../WorkspaceContainer";

export default function CommanderPanel() {
  return (
    <WorkspaceContainer
      title="Commander"
      subtitle="Welcome back, Commander. All primary systems are operational."
    >
      <div className="space-y-6">
        <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-6">
          <h2 className="mb-2 text-xl font-semibold text-cyan-300">
            Mission Brief
          </h2>

          <p className="text-gray-300">
            T.A.R.S. has completed system initialization.
            Select a module from Mission Control to begin exploring
            repositories, projects, or terminal operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-cyan-500/20 bg-black/30 p-5">
            <p className="text-sm text-gray-400">Repositories</p>
            <h3 className="mt-2 text-3xl font-bold text-cyan-300">--</h3>
          </div>

          <div className="rounded-lg border border-cyan-500/20 bg-black/30 p-5">
            <p className="text-sm text-gray-400">Projects</p>
            <h3 className="mt-2 text-3xl font-bold text-cyan-300">--</h3>
          </div>

          <div className="rounded-lg border border-cyan-500/20 bg-black/30 p-5">
            <p className="text-sm text-gray-400">System Status</p>
            <h3 className="mt-2 text-3xl font-bold text-green-400">
              ONLINE
            </h3>
          </div>
        </div>
      </div>
    </WorkspaceContainer>
  );
}