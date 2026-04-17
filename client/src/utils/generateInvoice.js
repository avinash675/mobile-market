import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoice = (order) => {
  const doc = new jsPDF();
  const brandColor = [15, 23, 42]; // Slate 900
  const secondaryColor = [100, 116, 139]; // Slate 500
  const successColor = [16, 185, 129]; // Emerald 500

  const date = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // --- STEP 1: HEADER DESIGN ---
  // Left: Brand
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brandColor);
  doc.text('MOBIXA', 20, 25);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text('Smart Technology, Smarter Choices', 20, 31);

  // Right: Invoice Info
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brandColor);
  doc.text('INVOICE', 140, 25);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text(`Invoice ID:  #INV-${order.id.split('-').pop()}`, 140, 33);
  doc.text(`Order ID:    #${order.id}`, 140, 38);
  doc.text(`Date:         ${date}`, 140, 43);

  // Divider
  doc.setDrawColor(241, 245, 249);
  doc.line(20, 52, 190, 52);

  // --- STEP 2: BILLING SECTION ---
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brandColor);
  doc.text('BILL TO', 20, 65);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(order.details?.address?.fullName || 'Valued Customer', 20, 72);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  const address = order.details?.address;
  if (address) {
    doc.text(`${address.addressLine1}`, 20, 78);
    doc.text(`${address.city}, ${address.state} ${address.pincode}`, 20, 84);
  } else {
    doc.text('Address not provided', 20, 78);
  }

  // --- STEP 3: PRODUCT TABLE ---
  const tableColumn = ["Product Name", "Brand", "Qty", "Unit Price", "Total"];
  
  // Format items for table
  const tableRows = order.items ? order.items.map(item => [
    item.name,
    item.brand || 'N/A',
    item.quantity.toString(),
    `INR ${item.price.toLocaleString()}`,
    `INR ${(item.price * item.quantity).toLocaleString()}`
  ]) : [[order.productName, order.brand || 'N/A', "1", `INR ${order.price.toLocaleString()}`, `INR ${order.price.toLocaleString()}`]];

  autoTable(doc, {
    startY: 95,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { 
      fillColor: [248, 250, 252], 
      textColor: brandColor, 
      fontStyle: 'bold',
      lineWidth: 0.1,
      lineColor: [226, 232, 240]
    },
    bodyStyles: { 
      textColor: brandColor,
      fontSize: 9,
      cellPadding: 6,
      lineWidth: 0.1,
      lineColor: [241, 245, 249]
    },
    columnStyles: {
      0: { cellWidth: 70 },
      2: { halign: 'center' },
      3: { halign: 'right' },
      4: { halign: 'right' }
    },
    margin: { left: 20, right: 20 }
  });

  // --- STEP 4 & 5: SUMMARY & GRAND TOTAL ---
  const finalY = doc.lastAutoTable.finalY + 15;

  // Subtotal & Shipping (Right Aligned)
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.text('Subtotal:', 140, finalY);
  doc.setTextColor(...brandColor);
  doc.text(`INR ${order.price.toLocaleString()}`, 190, finalY, { align: 'right' });
  
  doc.setTextColor(...secondaryColor);
  doc.text('Shipping:', 140, finalY + 7);
  doc.setTextColor(...successColor);
  doc.setFont('helvetica', 'bold');
  doc.text('FREE', 190, finalY + 7, { align: 'right' });

  // Payment Method
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text('Payment Method:', 20, finalY);
  doc.setTextColor(...brandColor);
  doc.setFont('helvetica', 'bold');
  doc.text(order.details?.paymentMethod?.toUpperCase() || 'UPI', 20, finalY + 7);

  // Payment Status
  doc.setTextColor(...successColor);
  doc.text('Payment Status: Paid ✔', 20, finalY + 14);

  // Grand Total Highlight - Increased separation and bold formatting
  doc.setDrawColor(226, 232, 240); // Lighter border for clean look
  doc.setLineWidth(0.5);
  doc.line(130, finalY + 15, 190, finalY + 15);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...brandColor);
  doc.text('Grand Total:', 130, finalY + 28);
  // Using INR as a separate prefix or part of the string
  doc.text(`INR ${order.price.toLocaleString()}`, 190, finalY + 28, { align: 'right' });

  // --- STEP 7: FOOTER ---
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text('Thank you for shopping with Mobixa!', 105, 275, { align: 'center' });
  doc.setFontSize(7);
  doc.text('This is a computer-generated document. No signature is required.', 105, 280, { align: 'center' });

  // Save PDF
  doc.save(`Mobixa_Invoice_${order.id.split('-').pop()}.pdf`);
};
