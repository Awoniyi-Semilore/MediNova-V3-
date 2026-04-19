import { cn } from '../../utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  className,
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700',
        'transition-all duration-300',
        hover && 'hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600',
        className
      )}
    >
      {children}
    </div>
  );
}