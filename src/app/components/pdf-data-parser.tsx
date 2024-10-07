"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function PDFParser() {
    const [parsedData, setParsedData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const [progress, setProgress] = useState(0);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setError("");

        if (file && file.type === "application/pdf") {
            setLoading(true);
            setFileName(file.name);
            setProgress(0);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("/api/upload-pdf", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setParsedData(data.parsedText);
                    setProgress(100);
                } else {
                    throw new Error("Failed to parse PDF. Please check the file.");
                }
            } catch (err) {
                setError("An error occurred while parsing the PDF. Please try again.");
                setParsedData("");
            } finally {
                setLoading(false);
            }
        } else {
            setError("Please upload a valid PDF file.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white shadow-sm">
                <div className="flex items-center justify-center">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    <span className="text-xl font-semibold text-gray-800">PDF Data Parser</span>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Parse Data from PDF</h1>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Label htmlFor="pdf-file" className="text-lg font-medium text-gray-700 mb-2 block">
                            Upload PDF
                        </Label>
                        <div className="flex items-center space-x-2 mt-1">
                            <Input
                                id="pdf-file"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                className="flex-1"
                            />
                            <Button type="button" size="icon" className="bg-blue-600 hover:bg-blue-700">
                                <Upload className="h-4 w-4" />
                                <span className="sr-only">Upload</span>
                            </Button>
                        </div>
                        {fileName && <p className="mt-2 text-sm text-gray-600">Selected file: {fileName}</p>}
                    </div>

                    {error && (
                        <Alert variant="destructive" className="bg-red-50 border-red-400">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertTitle className="text-red-600">Error</AlertTitle>
                            <AlertDescription className="text-red-600">{error}</AlertDescription>
                        </Alert>
                    )}

                    {loading && (
                        <div className="space-y-2">
                            <Progress value={progress} className="w-full" />
                            <p className="text-sm text-gray-600 text-center">Parsing PDF... {progress}%</p>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Label htmlFor="parsed-data" className="text-lg font-medium text-gray-700 mb-2 block">
                            Parsed Data
                        </Label>
                        <Textarea
                            id="parsed-data"
                            placeholder="Parsed data will appear here..."
                            value={parsedData}
                            readOnly
                            className="mt-1 h-64 w-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                </div>
            </main>
            <footer className="py-4 px-4 border-t bg-white">
                <p className="text-center text-sm text-gray-500">© 2024 PDF Data Parser. All rights reserved.</p>
            </footer>
        </div>
    );
}
