import React from 'react';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ children, className, ...props }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className={`w-full text-sm text-left ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC<React.TableHTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => (
  <thead className="text-xs uppercase bg-gray-50 text-gray-700" {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.TableHTMLAttributes<HTMLTableSectionElement>> = ({ children, ...props }) => (
  <tbody {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.TableHTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...props }) => (
  <tr className={`bg-white border-b hover:bg-gray-50 ${className}`} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => (
  <th className={`px-6 py-3 font-medium ${className}`} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => (
  <td className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </td>
);