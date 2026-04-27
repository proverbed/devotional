import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-muted-foreground">Signed in as {user?.email}</p>
      <button
        type="button"
        onClick={() => signOut()}
        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Sign out
      </button>
    </div>
  );
}
