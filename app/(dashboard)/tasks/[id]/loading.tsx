// app/(dashboard)/tasks/[id]/loading.tsx
export default function TaskDetailsLoading() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="h-10 w-64 bg-muted animate-pulse rounded" />
      <div className="h-32 bg-muted animate-pulse rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}
