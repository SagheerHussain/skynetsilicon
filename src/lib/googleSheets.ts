import { google } from "googleapis";
import path from "path";

// Replace with your own Google Sheet ID
const SHEET_ID = "1SEjod9-3TskorCSGASGzZspnBj5nAwskwwLeDhAOwy8";

// Google Sheets Authentication
export const getSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "secret.json"), // Absolute path to your key file
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  return google.sheets({ version: "v4", auth });
};

// Fetch Data from Google Sheets
export const fetchData = async (sheetName: string) => {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A:C` // Target sheet and columns A, B, C
  });

  const rows = response.data.values || [];
  if (rows.length <= 1) return []; // No data besides headers

  // Map rows to objects
  return rows.slice(1).map(([id, name, email]) => ({ id, name, email }));
};

// Add Data to Google Sheets
export const addData = async (
  sheetName: string,
  data: { id: string; name: string; email: string }
) => {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A:C`, // Target sheet and columns A, B, C
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[data.id, data.name, data.email]]
    }
  });
};

// Add User to Google Sheets
export const addUser = async (user: {
  id: string;
  name: string;
  email: string;
}) => {
  await addData("users", user); // Add data to the 'users' sheet
};

// Add Customer to Google Sheets
export const addCustomer = async (customer: {
  id: string;
  name: string;
  email: string;
}) => {
  await addData("customers", customer); // Add data to the 'customers' sheet
};

// Fetch Users from Google Sheets
export const getUsers = async () => {
  return await fetchData("users"); // Fetch data from the 'users' sheet
};

// Fetch Customers from Google Sheets
export const getCustomers = async () => {
  return await fetchData("customers"); // Fetch data from the 'customers' sheet
};

// Generate a Unique ID
export const generateUniqueId = () => {
  return `id-${Date.now()}`; // Generate a unique timestamp-based ID
};
