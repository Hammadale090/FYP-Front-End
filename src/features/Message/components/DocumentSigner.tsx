import React, { useRef, useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface MyModalProps {
  children: React.ReactNode;
  numPages: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  savePdfWithSignature: () => Promise<void>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCanvas: boolean;
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyModal: React.FC<MyModalProps> = ({
  children,
  numPages,
  pageNumber,
  setPageNumber,
  savePdfWithSignature,
  showModal,
  setShowModal,
  showCanvas,
  setShowCanvas,
}) => {
  const modalContainerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    overflow: "scroll",
  };

  const modalBackgroundStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  };

  const modalContentStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "white",
    marginTop: "500px",
    zIndex: 10000,
  };

  return (
    <>
      {showModal && (
        <div style={modalContainerStyle}>
          <div
            style={modalBackgroundStyle}
            onClick={() => setShowModal(false)}
          ></div>
          <div style={modalContentStyle}>
            <div className="flex items-center px-4 ">
              <button
                className="px-2  rounded-[12px] py-[2px] border-2 border-slate-100 mr-4"
                onClick={() => {
                  setShowModal(false);
                  setShowCanvas(false);
                }}
              >
                x
              </button>
              {pageNumber > 1 && (
                <button
                  onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
                  disabled={pageNumber === 1}
                  className="px-2  rounded-[12px] py-[2px] border-2 border-slate-100 mx-4"
                >
                  Previous
                </button>
              )}
              <p>
                Page {pageNumber} of {numPages}
              </p>
              {pageNumber < numPages && (
                <button
                  onClick={() =>
                    setPageNumber(Math.min(pageNumber + 1, numPages || 1))
                  }
                  disabled={pageNumber === numPages}
                  className="px-2  rounded-[12px] py-[2px] border-2 border-slate-100 mx-4"
                >
                  Next
                </button>
              )}
              {!showCanvas && (
                <button
                  onClick={() => setShowCanvas(true)}
                  className="px-2  rounded-[12px] py-[2px] border-2 border-slate-100  ml-20 mt-2 mb-2"
                >
                  Sign
                </button>
              )}
              <button
                onClick={savePdfWithSignature}
                className="px-2  rounded-[12px] py-[2px] border-2 border-slate-100  ml-20 mt-2 mb-2"
              >
                Save
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

interface DocumentSignerProps {
  document_link: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentSigner: React.FC<DocumentSignerProps> = ({
  document_link,
  showModal,
  setShowModal,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
  const [canvasPosition, setCanvasPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [showCanvas, setShowCanvas] = useState<boolean>(false);

  const signatureCanvasRef = useRef<SignatureCanvas>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && handleRef.current) {
        const rect = handleRef.current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        const newPosX = Math.max(offsetX, 0);
        const newPosY = Math.max(offsetY, 0);

        setCanvasPosition({
          x: newPosX,
          y: newPosY,
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleCanvasDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleCanvasMouseDown = () => {
    setIsDrawing(true);
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing && signatureCanvasRef.current) {
      const canvas = signatureCanvasRef.current;
      const rect = canvas.getTrimmedCanvas().getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      // canvas?.drawDot(offsetX, offsetY);
    }
  };

  const savePdfWithSignature = async () => {
    if (!document_link || !signatureCanvasRef.current) return;

    const existingPdfBytes = await fetch(document_link).then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const signatureImage = await pdfDoc.embedPng(
      signatureCanvasRef.current.getTrimmedCanvas().toDataURL("image/png")
    );

    const pages = pdfDoc.getPages();
    const targetPage = pages[pageNumber - 1];
    const { width, height } = targetPage.getSize();

    const canvas = signatureCanvasRef.current;
    const rect = canvas.getTrimmedCanvas().getBoundingClientRect();

    const pdfX = canvasPosition.x + 30;
    const pdfY = height - canvasPosition.y - 90;

    targetPage.drawImage(signatureImage, {
      x: pdfX,
      y: pdfY,
    });

    const modifiedPdfBytes = await pdfDoc.save();
    setPdfData(new Uint8Array(modifiedPdfBytes));

    const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
    await saveAs(blob, "modified_document.pdf");
    setShowModal(false);
    setShowCanvas(false);
  };

  const handleClearCanvas = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  return (
    <MyModal
      numPages={numPages || 1}
      pageNumber={pageNumber}
      savePdfWithSignature={savePdfWithSignature}
      setPageNumber={setPageNumber}
      showModal={showModal}
      setShowModal={setShowModal}
      setShowCanvas={setShowCanvas}
      showCanvas={showCanvas}
    >
      <div>
        <Document
          file={document_link}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="relative border-2 border-slate-200"
        >
          <Page
            pageNumber={pageNumber}
            // style={{ position: "relative" }}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          >
            {showCanvas && (
              <div
                id="canvas-box"
                style={{
                  position: "absolute",
                  left: `${canvasPosition.x}px`,
                  top: `${canvasPosition.y}px`,
                  zIndex: isDrawing ? 1 : "auto",
                  border: "2px dotted black",
                  width: "200px", // Adjust canvas box width
                  height: "100px", // Adjust canvas box height
                }}
                onMouseDown={handleCanvasMouseDown}
                onMouseUp={handleCanvasMouseUp}
                onMouseMove={handleCanvasMouseMove}
              >
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{
                    width: 200,
                    height: 100,
                    className: "sigCanvas",
                  }}
                  ref={signatureCanvasRef}
                />
                <button
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -20,
                    zIndex: isDrawing ? "auto" : 1,
                  }}
                  className="px-2  rounded-[12px] py-[2px] border-2 border-slate-100 "
                  onClick={handleClearCanvas}
                >
                  clear
                </button>

                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    left: -10,
                    zIndex: isDrawing ? "auto" : 1,
                  }}
                  id="drag-button"
                  ref={handleRef}
                  onMouseDown={handleCanvasDragStart}
                >
                  <div
                    style={{
                      backgroundColor: "gray",
                      cursor: "pointer",
                      borderRadius: "50%",
                      color: "white",
                      paddingInline: "6px",
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            )}
          </Page>
        </Document>
      </div>
    </MyModal>
  );
};

export default DocumentSigner;
