---

# PDF Data Parser

This is a PDF parser application built with Next.js that allows users to upload a PDF file and view its extracted text content. The app provides feedback during loading and handles errors to enhance the user experience.

## Features
- Upload a PDF file and parse its text content.
- Displays parsed text in a user-friendly format.
- Loading indicator and error alerts for better user experience.
  
## Installation

### Prerequisites
- Node.js (version 14 or later)
- NPM or Yarn

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/username/pdf-parser.git
   cd pdf-parser
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Next.js:**

   Add the following configuration in `next.config.js` to allow `pdf2json` as an external server component package:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     experimental: {
       serverComponentsExternalPackages: ["pdf2json"],
     },
   };

   export default nextConfig;
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

5. **Access the application:**  
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Usage
1. On the home page, click **Upload PDF** to select a PDF file from your computer.
2. The system will display a loading bar while parsing the PDF.
3. Once parsing is complete, the extracted text content will appear in the "Parsed Data" area.
4. If there is an error, an alert will be shown.

## Tech Stack
- **Frontend:** Next.js, React
- **PDF Parsing:** pdf2json
- **Icons and UI Elements:** lucide-react, custom styles

---
