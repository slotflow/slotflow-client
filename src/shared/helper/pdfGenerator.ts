import jsPDF from "jspdf";
import { format } from "date-fns";
import { toast } from "react-toastify";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logos/logo.png";
import { AdminFetchRevenueReportRow } from "../interface/api/adminReportApiInterface";

interface JsPDFWithAutoTable extends jsPDF {
    lastAutoTable?: { finalY: number };
}

export const exportToPDF = async (
    fileName: string,
    title: string,
    data: AdminFetchRevenueReportRow[]
) => {
    if (!data.length) return;

    const doc: JsPDFWithAutoTable = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const img = new Image();
    img.src = logo;

    await new Promise<void>((resolve) => {
        img.onload = () => {
            doc.addImage(img, "PNG", 14, 8, 12, 12);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            const today = format(new Date(), "dd MMM yyyy");
            doc.text(`Date: ${today}`, pageWidth - 14, 15, { align: "right" });

            doc.setDrawColor(0);
            doc.setLineWidth(0.3);
            doc.line(14, 22, pageWidth - 14, 22);

            resolve();
        };
    });

    const titleY = 30;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), pageWidth / 2, titleY, { align: "center" });

    const titleWidth = doc.getTextWidth(title.toUpperCase());
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(
        (pageWidth - titleWidth) / 2,
        titleY + 2,
        (pageWidth + titleWidth) / 2,
        titleY + 2
    );

    const body = data.map((row, index) => {
        const formattedDate = row.createdAt
            ? format(new Date(row.createdAt), "dd MMM yyyy")
            : "N/A";

        return [
            index + 1,
            formattedDate,
            row.paymentGateway ?? "N/A",
            row.initialAmount?.toFixed(2) ?? "0.00",
            row.discountAmount?.toFixed(2) ?? "0.00",
            row.totalAmount?.toFixed(2) ?? "0.00",
        ];
    });

    const grandInitial = data.reduce((sum, r) => sum + (r.initialAmount ?? 0), 0);
    const grandDiscount = data.reduce((sum, r) => sum + (r.discountAmount ?? 0), 0);
    const grandTotal = data.reduce((sum, r) => sum + (r.totalAmount ?? 0), 0);

    autoTable(doc, {
        startY: titleY + 10,
        head: [["#", "Date", "Payment Gateway", "Inital Amount", "Discount", "Total Amount"]],
        body,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: {
            fillColor: [99, 91, 255],
            textColor: 255,
            fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    const finalY = doc.lastAutoTable?.finalY ?? titleY + 10;
    const rightX = pageWidth - 14;

    doc.setDrawColor(0);
    doc.setLineWidth(0.3);
    doc.line(14, finalY + 5, rightX, finalY + 5);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    let totalY = finalY + 12;

    doc.text(`Grand Initial Total : rs ${grandInitial.toFixed(2)}`, rightX, totalY, { align: "right" });
    totalY += 8;
    doc.text(`Grand Discount Total : rs ${grandDiscount.toFixed(2)}`, rightX, totalY, { align: "right" });
    totalY += 8;
    doc.text(`Grand Total : rs ${grandTotal.toFixed(2)}`, rightX, totalY, { align: "right" });

    doc.save(`${fileName}.pdf`);
};



export const handleExportPDF = async (e: React.MouseEvent<HTMLButtonElement>, reportData: Array<AdminFetchRevenueReportRow>, fileName: string) => {
    e.preventDefault();

    if (!reportData || !Array.isArray(reportData)) {
        toast.error("No report in the table");
        return;
    }
    try {
        await exportToPDF(`${fileName}-report`, `${fileName.toUpperCase()} REPORT`, reportData);
        toast.success("PDF file exported successfully!");
    } catch (error) {
        toast.error("Failed to export PDF file. Please try again.");
        console.error("Export to PDF error:", error);
    }
};