import React from 'react';
import { AlertCircle, CheckCircle, InfoIcon } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success';
  title?: string;
  children: React.ReactNode;
}

const variants = {
  default: 'bg-blue-50 text-blue-800 border-blue-200',
  destructive: 'bg-red-50 text-red-800 border-red-200',
  success: 'bg-green-50 text-green-800 border-green-200',
};

const icons = {
  default: InfoIcon,
  destructive: AlertCircle,
  success: CheckCircle,
};

export const Alert: React.FC<AlertProps> = ({ 
  variant = 'default', 
  title, 
  children,
  className = '',
  ...props 
}) => {
  const Icon = icons[variant];

  return (
    <div className={`rounded-lg border p-4 ${variants[variant]} ${className}`} {...props}>
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5" />
        <div>
          {title && (
            <h5 className="font-semibold mb-1">{title}</h5>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h5 className={`font-semibold mb-1 ${className}`} {...props}>{children}</h5>
);

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`text-sm ${className}`} {...props}>{children}</div>
);