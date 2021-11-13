import React from 'react';

interface IProps {
    totalItems: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    itemsPerPage: number;
}

function paginator(totalItems: number, currentPage: number, itemsPerPage: number, chunkSize = 15) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let rangeStart = 1;
    let rangeEnd = totalPages;
    if (totalPages > chunkSize) {
        const pivot = Math.ceil(chunkSize / 2);
        if (currentPage > pivot) {
            if (currentPage + pivot <= totalPages) {
                rangeStart = currentPage - pivot + 1;
                if (2 * pivot === chunkSize) rangeEnd = currentPage + pivot;
                else rangeEnd = currentPage + pivot - 1;
            } else {
                if (2 * pivot === chunkSize) {
                    rangeStart = totalPages - 2 * pivot + 1;
                } else {
                    rangeStart = totalPages - 2 * (pivot - 1);
                }
                rangeEnd = totalPages;
            }
        } else rangeEnd = rangeStart + chunkSize - 1;
    }
    return new Array(rangeEnd - rangeStart + 1).fill(0).map((_, index) => rangeStart + index);
}

const Pager: React.FC<IProps> = (props) => {
    const { totalItems, currentPage, itemsPerPage, onPageChange } = props;
    const pages = paginator(totalItems, currentPage, itemsPerPage);
    return (
        <ul className="nav justify-content-center">
            {pages.map((page) => (
                <li className={`nav-item`}>
                    <button
                        type="button"
                        className={`btn btn-link ${currentPage === page ? 'disabled' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default Pager;
