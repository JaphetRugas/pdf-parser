import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Validate the file type
    if (!file || file.type !== "application/pdf") {
        return NextResponse.json(
            { message: "Invalid file type. Only PDF is allowed." },
            { status: 400 }
        );
    }

    // Read file data
    const arrayBuffers = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffers);

    // Parse PDF directly from the buffer
    const pdfParser = new (PDFParser as any)(null, 1);

    return new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", (errData: any) => {
            console.error("PDF parsing error:", errData.parserError);
            reject(new Error("Failed to parse PDF"));
        });

        pdfParser.on("pdfParser_dataReady", () => {
            const parsedText = pdfParser.getRawTextContent();
            resolve(parsedText);
        });

        // Load PDF from buffer
        pdfParser.parseBuffer(buffer);
    })
        .then((parsedText) => {
            // Return the response with the parsed text
            return NextResponse.json({
                message: "File parsed successfully",
                parsedText, // Include the parsed text in the response
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        });
}
