import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloseOutline } from "react-ionicons";

const FileUploadSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  interface Document {
    path: string;
    name: string;
    lastModified: number;
    lastModifiedDate: Date;
    size: number;
    type: string;
    webkitRelativePath: string;
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    // Handle the files here
    setDocuments((prev: Document[]) => [...prev, ...acceptedFiles]);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
      "application/xml": [".xml"],
    },
  });
  const onRemoveDocument = (doc: Document) => {
    setDocuments((prev) => prev.filter((d) => d !== doc));
  };

  // Dummy data for documents

  return (
    <div className="flex flex-col  container justify-between w-full gap-4 p-4">
      <div className="flex-1">
        {/* Upload area */}
        <div
          {...getRootProps()}
          className="border-dashed border-2 bg-dropzone-area  border-green-500 p-4 text-center h-52 flex justify-center items-center rounded-lg cursor-pointer transition-all hover:bg-gray-100 hover:border-green-600"
        >
          <input {...getInputProps()} className="h-[500px]" />
          <div className="flex flex-col items-center gap-6 w-[80%]">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <img src="/upload-file.png" className="h-10 w-10" />
                <p>
                  Select a CSV, PDF, XML file to upload or drag and drop it here
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 justify-items-center gap-x-6">
        {/* List of documents */}
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="mb-2 flex items-center w-full justify-between "
          >
            <span className="mr-2 ">{doc.name}</span>
            <button
              className=" text-red-500 p-1 "
              onClick={() => onRemoveDocument(doc)}
            >
              <CloseOutline />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadSection;
