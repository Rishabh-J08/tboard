
interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    children,
    className= '',
    padding= 'md'
}) => {
    const paddings = {
        none: 'p-0',
        sm: ' p-3',
        md:'p-4',
        lg: 'p-6'
    };
    return (
        <div
          className={`
            bg-white rounded-lg shadow-sm border border-gray-200
            ${paddings[padding]}
            ${className}
          `}
        >
          {children}
        </div>
      );
}