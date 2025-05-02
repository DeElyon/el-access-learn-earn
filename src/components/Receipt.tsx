
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

interface ReceiptData {
  receiptId: string;
  userId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  course: string;
  amount: string;
  paymentMethod: string;
  status: string;
  transactionId: string;
}

interface ReceiptProps {
  receiptData: ReceiptData;
}

export const Receipt: React.FC<ReceiptProps> = ({ receiptData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'Bank Transfer';
      case 'bank_deposit': return 'Bank Deposit';
      case 'mobile_banking': return 'Mobile Banking';
      case 'ussd': return 'USSD Transfer';
      default: return method;
    }
  };
  
  const handleDownload = () => {
    // Create a printable version of the receipt
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>EL ACCESS 2.0 - Receipt #${receiptData.receiptId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .receipt {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #3498db;
          }
          .receipt-id {
            font-size: 18px;
            color: #666;
            margin: 10px 0;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-weight: bold;
            margin-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .status {
            padding: 5px 10px;
            border-radius: 4px;
            display: inline-block;
            background-color: #4CAF50;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="logo">EL ACCESS 2.0</div>
            <div class="receipt-id">Receipt #${receiptData.receiptId}</div>
            <div>Transaction ID: ${receiptData.transactionId}</div>
            <div>Date: ${formatDate(receiptData.date)}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Student Information:</div>
            <div>Name: ${receiptData.customerName}</div>
            <div>Email: ${receiptData.customerEmail}</div>
            <div>Phone: ${receiptData.customerPhone}</div>
            <div>User ID: ${receiptData.userId}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Course Information:</div>
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${receiptData.course}</td>
                  <td>${receiptData.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="section">
            <div class="section-title">Payment Information:</div>
            <div>Method: ${getPaymentMethodDisplay(receiptData.paymentMethod)}</div>
            <div>Status: <span class="status">${receiptData.status}</span></div>
          </div>
          
          <div class="footer">
            <p>Thank you for registering with EL ACCESS 2.0!</p>
            <p>If you have any questions, please contact us at elcoderssoftwares12@gmail.com or WhatsApp: 08088578817</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Let the content render then print
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
  
  return (
    <Card className="border border-gray-200 shadow-md mt-4 max-w-2xl mx-auto bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">EL ACCESS 2.0</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Official Receipt</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Receipt #{receiptData.receiptId}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(receiptData.date)}</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Student Information</h3>
            <p className="text-sm mt-1">{receiptData.customerName}</p>
            <p className="text-sm">{receiptData.customerEmail}</p>
            <p className="text-sm">{receiptData.customerPhone}</p>
            <p className="text-sm">User ID: <span className="font-mono">{receiptData.userId}</span></p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Transaction Details</h3>
            <p className="text-sm mt-1">Transaction ID: {receiptData.transactionId}</p>
            <p className="text-sm">Payment Method: {getPaymentMethodDisplay(receiptData.paymentMethod)}</p>
            <p className="text-sm">
              Status: 
              <span className="ml-1 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {receiptData.status}
              </span>
            </p>
          </div>
        </div>
        
        <div className="my-6">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Course Information</h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <p className="font-medium">{receiptData.course}</p>
              </div>
              <p className="font-bold text-lg">{receiptData.amount}</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mt-6 flex justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Thank you for choosing EL ACCESS 2.0
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload} 
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Receipt;
