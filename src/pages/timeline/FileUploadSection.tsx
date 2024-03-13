import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export interface DropZoneDocument {
  path: string;
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
}
type FileUploadSectionProps = {
  documents?: DropZoneDocument[];
  onRemoveDocument: (doc: DropZoneDocument) => void;
  onDrop: (acceptedFiles: any) => void;
};

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  documents,
  onRemoveDocument,
  onDrop,
}) => {
  //  const [documents, setDocuments] = useState<Document[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      setErrorMessage(null);
      if (fileRejections.length > 0) {
        const { errors } = fileRejections[0];
        const errorMessages = errors.map((error) => {
          switch (error.code) {
            case "file-invalid-type":
              return "The file format is not supported. Your file must be one of the following formats: PDF, CSV, XML.";
            case "file-too-large":
              return "The uploaded file exceeds the maximum allowed size. Your file must be no larger than 10MB.";
            case "too-many-files":
              return "You cannot upload more than 6 documents. Please limit your upload to 6 documents.";
            default:
              return "An error occurred while uploading the file. Please try again later.";
          }
        });
        setErrorMessage(errorMessages[0]);
      } else {
        onDrop(acceptedFiles);
      }
    },

    accept: {
      "text/csv": [".csv"],
      "application/pdf": [".pdf"],
      "application/xml": [".xml"],
    },
    maxFiles: 6,
    maxSize: 10 * 1024 * 1024, //10mb
  });

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
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
      <div className="flex-1 grid grid-cols-2 justify-items-center gap-x-6">
        {/* List of documents */}
        {documents?.map((doc) => (
          <div
            key={doc.name}
            className="mb-2 flex items-center w-full justify-between "
          >
            <span className="mr-2 ">{doc.name}</span>
            <button
              className=" text-red-500 p-1 "
              onClick={() => onRemoveDocument(doc)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadSection;
