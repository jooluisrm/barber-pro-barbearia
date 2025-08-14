export const ItemInfoProduct = ({ label, value, className }: { label: string; value: string; className?: string }) => (
    <div className="flex flex-col min-w-0">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <span className={`text-base text-gray-900 dark:text-gray-100 ${className || ""}`}>{value}</span>
    </div>
);