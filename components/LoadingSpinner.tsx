export default function LoadingSpinner() {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
} 