import Link from 'next/link';
import React from 'react';

const Pagination = ({ totalPages, page, buildPageLink }) => {
  return (
   <div className="mt-16 text-center">
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 font-['Inter'] text-sm text-[#535C91] dark:text-[#9290C3]">
                <Link
                  href={`?page=${Math.max(1, page - 1)}`}
                  className="px-3.5 py-1.5 rounded-lg border border-brand-500/10 hover:bg-[#535C91]/10 dark:hover:bg-[#1B1A55]/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  &lt;
                </Link>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNo) => (
                    <Link
                      key={pageNo}
                      href={`?page=${pageNo}`}
                      className={`px-3.5 py-1.5 rounded-lg border font-bold transition-colors cursor-pointer ${
                        pageNo === page
                          ? "bg-btn-bg text-btn-text border-brand-500/20"
                          : "border-brand-500/10 hover:bg-[#535C91]/10 dark:hover:bg-[#1B1A55]/60 hover:text-foreground"
                      }`}
                    >
                      {pageNo}
                    </Link>
                  ),
                )}
                <Link
                  href={`?page=${Math.min(totalPages, page + 1)}`}
                  className="px-3.5 py-1.5 rounded-lg border border-brand-500/10 hover:bg-[#535C91]/10 dark:hover:bg-[#1B1A55]/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  &gt;
                </Link>
              </div>
            )}
          </div>
  );
};

export default Pagination;
