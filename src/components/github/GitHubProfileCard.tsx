"use client";

interface Props {
  user: any;
}

export default function GitHubProfileCard({ user }: Props) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-black/40 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-5">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-24 w-24 rounded-full border-2 border-cyan-400"
        />

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-cyan-300">
            {user.name}
          </h2>

          <p className="text-gray-400">
            @{user.login}
          </p>

          {user.bio && (
            <p className="text-sm text-gray-300">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-cyan-500/10 p-4 text-center">
          <div className="text-xl font-bold text-cyan-300">
            {user.public_repos}
          </div>
          <div className="text-xs text-gray-400">
            Repositories
          </div>
        </div>

        <div className="rounded-xl bg-cyan-500/10 p-4 text-center">
          <div className="text-xl font-bold text-cyan-300">
            {user.followers}
          </div>
          <div className="text-xs text-gray-400">
            Followers
          </div>
        </div>

        <div className="rounded-xl bg-cyan-500/10 p-4 text-center">
          <div className="text-xl font-bold text-cyan-300">
            {user.following}
          </div>
          <div className="text-xs text-gray-400">
            Following
          </div>
        </div>
      </div>
    </div>
  );
}