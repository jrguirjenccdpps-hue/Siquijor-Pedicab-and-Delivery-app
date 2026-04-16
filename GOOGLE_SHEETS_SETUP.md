# Google Sheets Integration Setup Guide

This guide will help you connect your booking dashboard to Google Sheets for FREE.

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Siquijor Pedicab Bookings"
3. Create the following sheets (tabs at the bottom):

### Sheet 1: "Bookings"
Add these column headers in row 1:
```
A: Timestamp
B: Reference
C: Type (pedicab/delivery)
D: Customer Name
E: Contact Number
F: Email
G: Pickup Location
H: Dropoff/Delivery Location
I: Passengers/Item Description
J: Item Weight (for delivery)
K: Contact Method
L: Notes
M: Status (pending/assigned/in-progress/completed/cancelled)
N: Driver Name
O: Plate Number
P: Driver Contact
```

### Sheet 2: "Drivers"
Add these column headers:
```
A: Driver ID
B: Driver Name
C: Password
D: Plate Number
E: Contact Number
F: Status (active/inactive)
G: Current Booking
```

### Sheet 3: "Feedback"
Add these column headers:
```
A: Timestamp
B: Name
C: Email
D: Rating
E: Feedback
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete the default code and paste the code below:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Handle different types of requests
    if (data.action === 'submitBooking') {
      return submitBooking(ss, data);
    } else if (data.action === 'updateStatus') {
      return updateStatus(ss, data);
    } else if (data.action === 'getBooking') {
      return getBooking(ss, data);
    } else if (data.action === 'getDriverBookings') {
      return getDriverBookings(ss, data);
    } else if (data.action === 'driverLogin') {
      return driverLogin(ss, data);
    } else if (data.action === 'acceptBooking') {
      return acceptBooking(ss, data);
    } else if (data.action === 'submitFeedback') {
      return submitFeedback(ss, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Unknown action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = e.parameter.action;
    
    if (action === 'getAllBookings') {
      return getAllBookings(ss);
    } else if (action === 'getPendingBookings') {
      return getPendingBookings(ss);
    } else if (action === 'getBooking') {
      return getBooking(ss, { reference: e.parameter.reference });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Unknown action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function submitBooking(ss, data) {
  var sheet = ss.getSheetByName('Bookings');
  
  var rowData = [
    new Date(),                          // Timestamp
    data.reference,                      // Reference
    data.type,                           // Type
    data.customerName,                   // Customer Name
    data.contactNumber,                  // Contact Number
    data.email || '',                    // Email
    data.pickupLocation,                 // Pickup Location
    data.dropoffLocation || data.deliveryLocation, // Dropoff/Delivery Location
    data.passengers || data.itemDescription, // Passengers/Item Description
    data.itemWeight || '',               // Item Weight
    data.contactMethod || '',            // Contact Method
    data.notes || '',                    // Notes
    'pending',                           // Status
    '',                                  // Driver Name
    '',                                  // Plate Number
    ''                                   // Driver Contact
  ];
  
  sheet.appendRow(rowData);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Booking submitted successfully',
    reference: data.reference
  })).setMimeType(ContentService.MimeType.JSON);
}

function updateStatus(ss, data) {
  var sheet = ss.getSheetByName('Bookings');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  for (var i = 1; i < values.length; i++) {
    if (values[i][1] === data.reference) { // Column B (index 1) is Reference
      sheet.getRange(i + 1, 13).setValue(data.status); // Column M (index 12) is Status
      if (data.driverName) sheet.getRange(i + 1, 14).setValue(data.driverName);
      if (data.plateNumber) sheet.getRange(i + 1, 15).setValue(data.plateNumber);
      if (data.driverContact) sheet.getRange(i + 1, 16).setValue(data.driverContact);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Status updated successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: 'Booking not found'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getBooking(ss, data) {
  var sheet = ss.getSheetByName('Bookings');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  for (var i = 1; i < values.length; i++) {
    if (values[i][1] === data.reference) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        booking: {
          timestamp: values[i][0],
          reference: values[i][1],
          type: values[i][2],
          customerName: values[i][3],
          contactNumber: values[i][4],
          email: values[i][5],
          pickupLocation: values[i][6],
          dropoffLocation: values[i][7],
          details: values[i][8],
          itemWeight: values[i][9],
          contactMethod: values[i][10],
          notes: values[i][11],
          status: values[i][12],
          driverName: values[i][13],
          plateNumber: values[i][14],
          driverContact: values[i][15]
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: 'Booking not found'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getAllBookings(ss) {
  var sheet = ss.getSheetByName('Bookings');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  var bookings = [];
  for (var i = 1; i < values.length; i++) {
    bookings.push({
      timestamp: values[i][0],
      reference: values[i][1],
      type: values[i][2],
      customerName: values[i][3],
      contactNumber: values[i][4],
      status: values[i][12],
      driverName: values[i][13]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    bookings: bookings
  })).setMimeType(ContentService.MimeType.JSON);
}

function getPendingBookings(ss) {
  var sheet = ss.getSheetByName('Bookings');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  var bookings = [];
  for (var i = 1; i < values.length; i++) {
    if (values[i][12] === 'pending') {
      bookings.push({
        timestamp: values[i][0],
        reference: values[i][1],
        type: values[i][2],
        customerName: values[i][3],
        contactNumber: values[i][4],
        email: values[i][5],
        pickupLocation: values[i][6],
        dropoffLocation: values[i][7],
        details: values[i][8],
        contactMethod: values[i][10],
        notes: values[i][11]
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    bookings: bookings
  })).setMimeType(ContentService.MimeType.JSON);
}

function driverLogin(ss, data) {
  var sheet = ss.getSheetByName('Drivers');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  for (var i = 1; i < values.length; i++) {
    if (values[i][1] === data.driverName && values[i][2] === data.password) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        driver: {
          id: values[i][0],
          name: values[i][1],
          plateNumber: values[i][3],
          contactNumber: values[i][4],
          status: values[i][5]
        }
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: 'Invalid credentials'
  })).setMimeType(ContentService.MimeType.JSON);
}

function acceptBooking(ss, data) {
  var sheet = ss.getSheetByName('Bookings');
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  for (var i = 1; i < values.length; i++) {
    if (values[i][1] === data.reference) {
      sheet.getRange(i + 1, 13).setValue('assigned');
      sheet.getRange(i + 1, 14).setValue(data.driverName);
      sheet.getRange(i + 1, 15).setValue(data.plateNumber);
      sheet.getRange(i + 1, 16).setValue(data.driverContact);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'Booking accepted successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: 'Booking not found'
  })).setMimeType(ContentService.MimeType.JSON);
}

function submitFeedback(ss, data) {
  var sheet = ss.getSheetByName('Feedback');
  
  var rowData = [
    new Date(),
    data.name,
    data.email,
    data.rating,
    data.feedback
  ];
  
  sheet.appendRow(rowData);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Feedback submitted successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon and select **Web app**
3. Configure:
   - Description: "Siquijor Pedicab API"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Authorize the script (click through the permissions)
6. Copy the **Web App URL** (it looks like: `https://script.google.com/macros/s/XXXXXXXX/exec`)

## Step 4: Update Your Code

1. Open `src/App.tsx`
2. Find this line:
   ```typescript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL'
   ```
3. Replace with your Web App URL:
   ```typescript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   ```

## Step 5: Add Sample Drivers

In the "Drivers" sheet, add sample driver data:

| Driver ID | Driver Name | Password | Plate Number | Contact Number | Status | Current Booking |
|-----------|-------------|----------|--------------|----------------|--------|-----------------|
| DRV001 | Juan Santos | pass123 | 1234-AB | 09123456789 | active | |
| DRV002 | Pedro Cruz | pass456 | 5678-CD | 09987654321 | active | |

## Testing

1. Rebuild and deploy your website
2. Submit a test booking
3. Check your Google Sheet - the data should appear in the "Bookings" sheet!

## Troubleshooting

**CORS Errors**: If you get CORS errors, make sure your Web App is deployed with "Execute as: Me" and "Who has access: Anyone"

**Data not appearing**: Check the browser console for errors. Make sure the column headers match exactly.

**Script errors**: Go to Extensions → Apps Script → Executions to see error logs

## Next Steps

Once this is working, we can build:
1. **Driver Dashboard** - Login and accept bookings
2. **Admin Dashboard** - View all bookings and manage drivers
3. **Real-time updates** - Auto-refresh booking status
