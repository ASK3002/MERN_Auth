import XLSX from 'xlsx';
import Expense from '../models/Expense.js';

export const uploadExpenses = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const userId = req.user._id;

    // Read the uploaded Excel file buffer
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Parse the sheet to JSON
    const rows = XLSX.utils.sheet_to_json(sheet); // Assumes headers in first row

    const expenses = rows.map(row => {
      // Handle various header name capitalizations
      const title = row.title || row.Title;
      const amount = parseFloat(row.amount || row.Amount);
      const category = row.category || row.Category;
      let dateValue = row.date || row.Date;

      if (!title || isNaN(amount) || !category || !dateValue) {
        throw new Error("Invalid row data: " + JSON.stringify(row));
      }

      // If Excel stores date as number, convert from serial to Date
      if (typeof dateValue === 'number') {
        const excelEpoch = new Date(1900, 0, 1);
        dateValue = new Date(excelEpoch.getTime() + (dateValue - 1) * 86400000);
      } else {
        dateValue = new Date(dateValue);
      }

      return {
        user: userId,
        title,
        amount,
        category,
        date: dateValue,
      };
    });

    // Insert all expenses
    await Expense.insertMany(expenses);

    res.status(200).json({ message: 'Expenses uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Error uploading expenses', error: err.message });
  }
};
