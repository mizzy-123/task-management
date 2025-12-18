export default function TaskTableSkeleton() {
  return (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div className="overflow-hidden rounded-lg border">
        <div className="w-full">
          {/* Header Skeleton */}
          <div className="bg-muted border-b px-4 py-3">
            <div className="flex gap-4">
              <div className="h-4 w-8 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-8 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
          {/* Rows Skeleton */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-b px-4 py-4">
              <div className="flex gap-4 items-center">
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-4">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
