import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { formatDate } from '@fullcalendar/core/index.js';
import { AdminFetchRevenueReportRow } from '../../types/api/payment';

type ExcelRow = {
  '#': number | string;
  Date: string;
  Discount: string;
  'Total Amount': string;
  'Payment Gateway': string;
};

export const exportToExcel = (
  fileName: string,
  sheetName: string,
  data: AdminFetchRevenueReportRow[],
) => {
  if (!data.length) return;

  const formattedData: ExcelRow[] = data.map((row, index) => ({
    '#': index + 1,
    Date: row.createdAt ? formatDate(row.createdAt) : 'Not Available',
    Discount: `₹ ${row.discountAmount?.toFixed(2) ?? '0.00'}`,
    'Total Amount': `₹ ${row.totalAmount?.toFixed(2) ?? '0.00'}`,
    'Payment Gateway': row.paymentGateway ?? 'Not Available',
  }));

  const grandDiscount = data.reduce((sum, r) => sum + (r.discountAmount ?? 0), 0);
  const grandTotal = data.reduce((sum, r) => sum + (r.totalAmount ?? 0), 0);

  formattedData.push({
    '#': '',
    Date: 'Grand Total',
    Discount: `₹ ${grandDiscount.toFixed(2)}`,
    'Total Amount': `₹ ${grandTotal.toFixed(2)}`,
    'Payment Gateway': '',
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  worksheet['!cols'] = [
    { wpx: 30 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 100 },
    { wpx: 120 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const handleExportExcel = async (
  e: React.MouseEvent<HTMLButtonElement>,
  reportData: Array<AdminFetchRevenueReportRow>,
  fileName: string,
) => {
  e.preventDefault();

  if (!reportData || !Array.isArray(reportData)) {
    toast.error('No report in the table');
    return;
  }
  try {
    await exportToExcel(`${fileName}-report`, 'Report', reportData);
    toast.success('Excel file exported successfully!');
  } catch (error) {
    toast.error('Failed to export Excel file. Please try again.');
    console.error('Export to Excel error:', error);
  }
};
