import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@" + pdfjs.version + "/build/pdf.worker.min.mjs";

const BookReader = ({
  fileUrl,
  bookId,
  bookName,
  onClose,
  onProgressUpdate,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved progress
  useEffect(() => {
    const savedPage = localStorage.getItem(`book_progress_${bookId}`);
    if (savedPage) {
      setPageNumber(parseInt(savedPage, 10));
    }
  }, [bookId]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => {
      const newPage = prevPageNumber + offset;
      const progress = numPages ? Math.round((newPage / numPages) * 100) : 0;

      // Save progress locally
      localStorage.setItem(`book_progress_${bookId}`, newPage);
      localStorage.setItem(`book_progress_percent_${bookId}`, progress);
      localStorage.setItem(
        `book_last_read_${bookId}`,
        new Date().toISOString(),
      );

      // Update parent
      if (onProgressUpdate) {
        onProgressUpdate(bookId, progress);
      }
      return newPage;
    });
  };

  const previousPage = () => {
    if (pageNumber > 1) changePage(-1);
  };

  const nextPage = () => {
    if (pageNumber < numPages) changePage(1);
  };

  /* Keyboard Support */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") previousPage();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pageNumber, numPages]); // Dependencies ensure fresh state for next/prev

  /* Swipe Support */
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPage();
    }
    if (isRightSwipe) {
      previousPage();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header / Controls */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#1a1a1a] flex items-center justify-between px-6 z-10">
        <h2 className="text-white font-Outfit text-lg truncate max-w-[70%]">
          {bookName}
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-white/70 font-Outfit text-sm">
            Page {pageNumber} of {numPages || "--"}
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="text-white w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-full pt-16 pb-20 flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
            <p className="text-white ml-3 font-Outfit">Loading Book...</p>
          </div>
        )}

        <div className="relative flex items-center shadow-2xl">
          {/* Previous Button */}
          <button
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="absolute -left-16 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden md:block"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* PDF Document */}
          <div className="bg-white rounded-sm overflow-hidden max-h-[85vh] aspect-[1/1.4] relative select-none">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="w-[500px] h-[700px] bg-white flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
              }
              error={
                <div className="w-[300px] h-[200px] bg-white flex items-center justify-center text-red-500 font-Outfit p-4 text-center">
                  Error loading PDF. Please try again.
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                height={window.innerHeight * 0.8}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-xl"
              />
            </Document>
          </div>

          {/* Next Button */}
          <button
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="absolute -right-16 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden md:block"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Controls (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#1a1a1a] flex md:hidden items-center justify-between px-8">
        <button
          disabled={pageNumber <= 1}
          onClick={previousPage}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <span className="text-white font-Outfit text-sm">
          {Math.round((pageNumber / numPages) * 100)}% Read
        </span>
        <button
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Central Page Turn Effect (Visual only for now) */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-Outfit text-xs">
        Use arrows to flip pages
      </div>
    </div>
  );
};

export default BookReader;
