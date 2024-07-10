import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

function PaymentPDF({ address, totalAmount , list, details, gst }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setProperties({
      title: 'Payment Details',
      author: 'Your Company Name',
    });

    const generateInvoiceId = () => {
      return 'INV' + Math.floor(Math.random() * 10000);
    };

    const invoiceId = generateInvoiceId();
    const paymentDate = new Date().toLocaleDateString();

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoiceId}`, doc.internal.pageSize.width - 15, 15, 'right');
    doc.text(`Order Id: 12ABX11121`, doc.internal.pageSize.width - 15, 25, 'right');
    doc.text(`Payment Date: ${paymentDate}`, doc.internal.pageSize.width - 15, 35, 'right');

    const spaceAboveTable = 30;
    const startY = spaceAboveTable;

    const gstColumns = address.state === "Tamil Nadu" ? ['CGST', 'SGST'] : ['IGST'];

    doc.autoTable({
      startY: startY + 30,
      head: [['Name', 'Price', 'Quantity', 'Subtotal', ...gstColumns, 'Price with GST']],
      body: list.map((product) => {
        
        let subtotal = product.quantity * product.price;
        let gst = 0;
        if (product.hsnCode === "HSN-123") {
          gst = (subtotal * 16) / 100;
        } else if (product.hsnCode === "HSN-234") {
          gst = (subtotal * 14) / 100;
        } else {
          gst = (subtotal * 18) / 100;
        }

        const priceWithGst = subtotal+gst;

        const cgst=gst/2;
        const sgst=gst/2;
        const igst=gst;
        return [
          product.name,
          product.price.toFixed(2),
          product.quantity,
          subtotal.toFixed(2),
          ...address.state === "Tamil Nadu" ? [cgst, sgst] : [igst],
          priceWithGst
        ];
      }),
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 35 }, 
        1: { cellWidth: 20 }, 
        2: { cellWidth: 20 }, 
        3: { cellWidth: 25 }, 
        4: { cellWidth: 25 }, 
        5: { cellWidth: 25 }, 
        ...(address.state === "Tamil Nadu" ? { 6: { cellWidth: 30 } } : {}), 
      },
    });

    doc.setFontSize(14);
    const paymentInfoStartY = doc.lastAutoTable.finalY + 10;
    doc.text(`Name: ${address.name}`, 10, paymentInfoStartY);
    doc.text(`Amount: Rs${totalAmount}`, 10, paymentInfoStartY + 10);
    doc.text(`GST: Rs${gst}`, 10, paymentInfoStartY + 20);
    doc.text(`Mode Of Delivery: ${details.deliveryType}`, 10, paymentInfoStartY + 30);
    doc.text(`Shipping Charges: Rs 50`, 10, paymentInfoStartY + 40);
    doc.text(`Payment Type: ${details.paymentType}`, 10, paymentInfoStartY + 50);
    doc.text(`Address: ${address.addressLine1} ${address.addressLine2} ${address.addressLine3}`, 10, paymentInfoStartY + 60);
    doc.text(`Pincode: ${address.pincode}`, 10, paymentInfoStartY + 70);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(25);
    doc.text(`Total Amount of Payment: Rs${totalAmount}`, 10, paymentInfoStartY + 90);
    doc.save('Invoice.pdf');

    const csvContent = `Name,Price,Quantity,Subtotal,${gstColumns.join(',')},Price with GST\n` +
      list.map((product) => {
        const subtotal = product.price * product.quantity;
        const cgst = address.state === "Tamil Nadu" ? (subtotal * 0.09).toFixed(2) : '-';
        const sgst = address.state === "Tamil Nadu" ? (subtotal * 0.09).toFixed(2) : '-';
        const igst = address.state !== "Tamil Nadu" ? (subtotal * 0.18).toFixed(2) : '-';
        const priceWithGst = address.state === "Tamil Nadu" ? (subtotal + subtotal * 0.18).toFixed(2) : (subtotal + subtotal * 0.18).toFixed(2);

        return `${product.name},${product.price.toFixed(2)},${product.quantity},${subtotal.toFixed(2)},${address.state === "Tamil Nadu" ? `${cgst},${sgst}` : `${igst}`},${priceWithGst}`;
      }).join('\n');

    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(csvBlob, 'Invoice.csv');
  };

  return (
    <div>
      <button onClick={generatePDF}>Export Invoice Here</button>
    </div>
  );
}

export default PaymentPDF;
